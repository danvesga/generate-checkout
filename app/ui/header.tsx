const Header = ({w1, w2, w3}: {w1: string, w2: string, w3: string}) => {

    return(
        <div className="flex flex-col gap-4">
            <div style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex', gap: 16, }}>
                <div style={{width: w1, color: '#848383', fontSize: 24, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Item</div>
                <div style={{width: w2, color: '#848383', fontSize: 24, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Quantity</div>
                <div style={{width: w3, color: '#848383', fontSize: 24, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Price</div>
            </div>
            <div style={{width: '90%', height: '100%', border: '1px #BABABA solid'}}/>
        </div>
    );
};

export default Header;