import Star from "@/app/ui/Body/Star";

const Item2= ({ name, tag, quantity, price, stars }: {name: string, tag: string, quantity: number, price: string, stars: number}) => {

    return (
        <div style={{width: '100%', height: '25%', paddingLeft: 16, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 72, display: 'inline-flex'}}>
            <div style={{height: 94, flex: '1.7 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 35, display: 'flex'}}>
                <div style={{width: 94, height: 94, position: 'relative', background: '#BABABA', borderRadius: 8}} />
                <div style={{height: 162, justifyContent: 'flex-start', alignItems: 'center', gap: 35, display: 'flex'}}>
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
                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}} />
                </div>
            </div>
            <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 220, paddingRight: 210}}>
                <div style={{flex: '0.6 1 0', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{quantity}</div>
                <div style={{flex: '1 1 0', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{price}</div>
            </div>
        </div>
    );
};

export default Item2;