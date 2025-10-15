import React, { useEffect, useState } from "react";
import "../stylesheets/profile.css";
import { ToastContainer, toast } from 'react-toastify';
const pIMG = require('../imgs/profile.png');

const Profile = () => {
    
    const Warn=(msg)=> toast.warning(msg);
    const Err=(msg)=> toast.error(msg);
    const succ=(msg)=> toast.success(msg);

    const baseURL = process.env.REACT_APP_BaseURL;
    const [userData,setUserData] = useState(null);

    const getUserData=async()=>{
        try {
            const res = await fetch(`${baseURL}/AI/getUserInfo` , {
                method:"get",
                credentials:'include'
            })    
            const user = await res.json();
            // console.log(user)
            if(user.msg === "notLogin"){
                Warn("You Are Not LogedIn");
            }else{
                setUserData(user);
            }
    
        } catch (error) {
            Err("Something Went Wrong")
            Warn("Try Re-Login");
        }
    }

    useEffect(()=>{
            getUserData();
    },[])


  const handleLogout=async()=>{
    // deleting cookie
    await fetch(`${baseURL}/user/logout`,{
            method:"get",
            credentials: 'include',
        });
    // remove session welcome name
    localStorage.setItem("name","user");
    // show login insted logout
    // setIslogin(false);
    window.location.reload();
  }


  return (
    <main className="profile-page">
        <ToastContainer/>
      <div className="profile-wrapper fade-in">
        {/* Left Column: Avatar + Identity */}
        <aside className="profile-sidebar">
          <img
            src={pIMG}
            alt="User Avatar"
            className="avatar"
          />
          <h2>Hello , {userData !== null ? userData.user.name : 'user'}</h2>

          <div className="token-section">
            <div className="token-label">🪙 {userData !== null ? userData.user.tokens : '0'} Tokens Remaining</div>
            <a href="#" className="buy-link">🤖 Buy Tokens Now</a>
          </div>

          <div className="logout-wrapper">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        {/* Right Column: Info + Actions */}
        <section className="profile-main">
          <div className="profile-section">
            <h3>Account Info</h3>
            <label>Full Name</label>
            <input type="text" value={userData !== null ? userData.user.name : 'Guest User'} readOnly />
            <label>Email</label>
            <input type="email" value={userData !== null ? userData.user.email : '- - -'} readOnly />
          </div>

          <div className="profile-section">
            <h3>Reset Password</h3>
            <input type="password" placeholder="Old password" />
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm password" />
            <button className="primary-btn">Reset Password</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
