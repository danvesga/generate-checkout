"use client"
import Item2 from '@/app/ui/Body/Item2';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState , useEffect , Suspense} from "react";
import Header from '@/app/ui/header';

interface Product {
  id: string;
  name: string;
  categories: string[];
  price: string;
  stars: number;
  quantity: number
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading payment details...</p>}>
      <PaymentContent />
    </Suspense>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = searchParams.get("items");
  const selectedItems = items ? JSON.parse(decodeURIComponent(items)) : [];
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const total = selectedItems.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  }, [selectedItems]);

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleStepClick = () => {
    const encodedItems = encodeURIComponent(JSON.stringify(selectedItems))
    console.log("Form Data Submitted:", formData);
    router.push(`/checkout?items=${encodedItems}`)
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

    return <div className="flex flex-col gap-3">
        <Header
          w1={'73%'}
          w2={'30%'}
          w3={'40%'}
        />
        {selectedItems.length > 0 ? (
          selectedItems.map((item: Product) => (
            <Item2
              key={item.id}
              name={item.name}
              tag={item.categories && item.categories.length > 0 ? item.categories[0] : 'Unknown'}
              quantity={item.quantity}
              price={`$${item.price || 0}`}
              stars={item.stars / 100 || 0}
            />
          ))
        ) : (
          <p>No items selected</p>
        )}
        <div style={{width: '100%', textAlign: 'right', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Total cost: ${totalCost.toFixed(2)} </div>
        <p style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400'}}>Enter payment details</p>

      <div style={{width: '80%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
        <div><span style={{color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Cardholder name</span><span style={{color: '#AA0000', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>*</span></div>

          <input type="text" placeholder="First and last name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid black", }}/>

        <div><span style={{color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Card Information</span><span style={{color: '#AA0000', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>*</span></div>
          
          <input type="text" placeholder="Card number" value={formData.cardNumber} onChange={(e) => handleChange("cardNumber", e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid black", }}/>
          
          <div style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex', gap: 16, }}>
            <input type="text" placeholder="Expiration date MM/YY" value={formData.expirationDate} onChange={(e) => handleChange("expirationDate", e.target.value)} 
            style={{ width: "50%", padding: "12px", borderRadius: "8px",border: "1px solid black",}}/>

            <input type="text" placeholder="CVV" value={formData.cvv} onChange={(e) => handleChange("cvv", e.target.value)} 
            style={{ width: "50%", padding: "12px", borderRadius: "8px",border: "1px solid black",}}/>
            </div>
          </div>
      
        
        <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8, display: 'inline-flex'}}>
          <div onClick={() => handleStepClick()} style={{paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 100, border: '1px black solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
              <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Complete order</div>
          </div>
      </div>
    </div>
    
      ;
  }
    
    
    
