import React, { useEffect, useState, useRef } from "react";
import "../stylesheets/buyToken.css";
const QRcode = require("../imgs/QRcode.webp");

const tokenPackages = [
  { id:0 , amount: 50, bonus: "5", price: 49 },
  { id:1 , amount: 100, bonus: "10", price: 109 },
  { id:2 , amount: 200, bonus: "25", price: 219 },
  { id:3 , amount: 500, bonus: "55", price: 449 },
];

const BuyTokens = () => {

    const QRref = useRef(null)

    const [pack,setPack] = useState({
        amount:0,
        price:0,
        bonus:0,
    });
    
    const [total,setTotal] = useState(44);
    const [showQR,setShowQR] = useState(false);

    const handleSelectPack=(id)=>{
        setShowQR(false);
        setPack(tokenPackages[id]);
        setShowQR(true);
        QRref.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    useEffect(()=>{
        setTotal(pack.price-pack.bonus);
    },[pack])

  

  return (
    <main className="buy-page">
      <h2>Token Store 🪙</h2>
            
      <div className="token-row">
        {tokenPackages.map((pkg, index) => (
          <div className="token-card fade-in" key={pkg.id}>
            <h3>{pkg.amount} Tokens</h3>
            <p>💰 Price: ₹{pkg.price}</p>
            <p>🎁 Get bonus {pkg.bonus}</p>
            <p>📅 Expiry: Unlimited</p>
            <button className="buy-btn" onClick={()=>handleSelectPack(pkg.id)}>Buy Tokens</button>
          </div>
        ))}
      </div>

      <div className="summary-panel fade-in">
        <h3>Purchase Summary</h3>
        <div className="summary-row">
          <span>Tokens:</span>
          <span>{pack.amount}</span>
        </div>
        <div className="summary-row">
          <span>Price :</span>
          <span>₹{pack.price}</span>
        </div>
        <div className="summary-row">
          <span>Disscount:</span>
          <span>₹{pack.bonus}</span>
        </div>
        <div className="summary-row total">
          <span>Total Amount:</span>
          <span>₹{total}</span>
        </div>

        <div  ref={QRref} className="qr-box">
            <p>Scan to Pay</p>
          { showQR ? <><img src={QRcode} alt="Payment QR" /> <h4 >Note : Token Will be credited in Few Minutes of payment</h4> </>: "OR Code To be Loaded"}
        </div>
      </div>
    </main>
  );
};

export default BuyTokens;
