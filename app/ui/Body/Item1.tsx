"use client"
import React, { useState } from "react";
import Check from "@/app/ui/Body/Check";
import Star from "@/app/ui/Body/Star";

  const QuantityAdjuster = ({amount, increment, decrement,}: {amount: number; increment: () => void; decrement: () => void;}) => (
    <div style={{paddingLeft: 8, paddingRight: 8, paddingTop: 10, paddingBottom: 6, borderRadius: 8, border: '1px #BABABA solid', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <button style={{width: 24, height: 24, position: 'relative'}} onClick={decrement}>
                <div style={{width: 14, height: 0, left: 5, top: 12, position: 'absolute', border: '2px black solid'}}></div>
            </button>
            <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{amount}</div>
            <button style={{width: 24, height: 24, position: 'relative'}} onClick={increment}>
                <div style={{width: 0, height: 14, left: 12, top: 7, position: 'absolute', border: '2px black solid'}}></div>
                <div style={{width: 14, height: 0, left: 7, top: 12, position: 'absolute', border: '2px black solid'}}></div>
            </button>
        </div>
  );



const Item1 = ({ name, tag, quantity, price , stars , onToggle , isSelected , setQuantity}: {name: string, tag: string, quantity: number, price: string, stars: number , onToggle: () => void , isSelected: boolean , setQuantity: (newQuantity: number) => void}) => {
    const [status, setStatus] = useState<"selected" | "unselected">("unselected");

    const toggleStatus = () => {
        setStatus((prevStatus) => (prevStatus === "unselected" ? "selected" : "unselected"));
        onToggle();
    };

    const incrementQuantity = () => setQuantity(quantity + 1)
    const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);


    return (
        <div style={{width: '100%', height: '25%', paddingLeft: 16, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 72, display: 'inline-flex'}}>
            <div className={`w-10 h-10 flex items-center justify-center border ${isSelected? "bg-blue-700" : "border-black"} rounded`} onClick={toggleStatus}>
                {isSelected && <Check />}
            </div>

            <div style={{flex: 1, height: 162, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
                <div style={{width: 162, height: 162, position: 'relative', background: '#BABABA', borderRadius: 8}} />

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold" style={{maxWidth: "200px", whiteSpace: "normal", wordBreak: "break-word"}}>{name}</h3>
                        <span className="px-3 py-1 rounded text-sm" style={{background: '#CECEFF'}}>{tag}</span>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} filled={index < stars} />
                        ))}
                    </div>
                </div>   
            </div>
            
            <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 80, paddingRight: 150}}>
                <QuantityAdjuster 
                    amount={quantity}
                    increment={incrementQuantity}
                    decrement={decrementQuantity}/>
                <div style={{color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{price}</div>
            </div>
        </div>
    );
    
};

export default Item1;