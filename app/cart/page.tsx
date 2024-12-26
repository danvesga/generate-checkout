"use client"
import Item1 from '@/app/ui/Body/Item1';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
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
  const [data, setData] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const router = useRouter();

  const handleStepClick = () => {
    const encodedItems = encodeURIComponent(JSON.stringify(selectedItems));
    console.log("Selected Items:", selectedItems);
    router.push(`/payment?items=${encodedItems}`);
  };

  const handleItemToggle = (item: Product) => {
    setSelectedItems((prev) =>
      prev.some((i) => i === item)
        ? prev.filter((i) => i !== item)
        : [...prev, item] 
    );
  };

  const updateItemQuantity = (id: string, newQuantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result.map((item: Product) => ({ ...item, quantity: 1 })));
      } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        console.error('API Error:', message);
      }
    }
    
    fetchData();
  }, []);

    return (
      <div className="flex flex-col gap-4">
        <p className="mb-4">Select items to add them to cart</p>
        <Header 
          w1={'100%'}
          w2={'25%'}
          w3={'35%'}
          />
        <ul className="space-y-4">
        {data.map((item) => (
          <li key={item.id}>
            <Item1
              name={item.name}
              tag={item.categories && item.categories.length > 0 ? item.categories[0] : 'Unknown'}
              quantity={item.quantity}
              price={`$${item.price || 0}`}
              stars={item.stars / 100 || 0}
              onToggle={() => handleItemToggle(item)}
              isSelected={selectedItems.some((i) => i.id === item.id)}
              setQuantity={(newQuantity) => updateItemQuantity(item.id, newQuantity)}
            />
          </li>
          
        ))}
      </ul>
      <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8, display: 'inline-flex'}}>
          <div onClick={() => handleStepClick()} style={{paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 100, border: '1px black solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
              <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Continue to payment</div>
          </div>
      </div>
    </div>
    );
  };