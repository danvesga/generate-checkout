"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState , useEffect } from "react";
import Item3 from '@/app/ui/Body/Item3';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = searchParams.get("items");
  const selectedItems = items ? JSON.parse(decodeURIComponent(items)) : [];
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const total = selectedItems.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  }, [selectedItems]);

  const handleStepClick = () => {
    router.push('/checkout')
  };

    return <div className="flex flex-col gap-3">
      <div style={{color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', textAlign: 'center'}}>Thank you! Your order is being processed.</div>
        <p>Order details:</p>
        <Header
          w1={'90%'}
          w2={'32%'}
          w3={'40%'}
        />
        {selectedItems.length > 0 ? (
          selectedItems.map((item: Product) => (
            <Item3
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
        <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8, display: 'inline-flex'}}>
          <div onClick={() => handleStepClick()} style={{paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 100, border: '1px black solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
              <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Go to dashboard</div>
          </div>
      </div>
    </div>
      ;
  }