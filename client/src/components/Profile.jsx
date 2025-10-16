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
    const [isLoading,setIsloading] = useState(false)

    const getUserData=async()=>{
        try {
            setIsloading(true);
            const res = await fetch(`${baseURL}/profile/getUserInfo` , {
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
        }finally{
          setIsloading(false);
        }
    }

    useEffect(()=>{
            getUserData();
            getHistory();
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

  const [msg,setMsg] = useState(null);

  const [pwdData,setPwdData] = useState({
    oldPwd:"",
    newPwd:"",
    newCpwd:""
  });

  const handlePwdChange=(e)=>{
      setPwdData({...pwdData , [e.target.name]:e.target.value });
  }

const handleResetPwd=async()=>{

    if(pwdData.newPwd !== pwdData.newCpwd){
      setMsg("Password & Confirm password not matching");
    }else{
      try {
            setMsg(null);
            setIsloading(true)
            const response = await fetch(`${baseURL}/profile/resetPWD`, {
                method:"post",
                credentials:'include',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(pwdData)
            });
          const res = await response.json();
          if(res.msg === 'ok'){
              succ("password reseted successfully");
          }else if(res.msg === 'notLogin'){
              Err('Login to Reset Password');
          }else if(res.msg === 'falsePWD'){
              Warn('Old Password is Not Correct')
          }
          else if(res.msg === 'error'){
              Warn('Something Went Wrong');
          }
      } catch (error) {
          Warn('Something Went Wrong');
      }finally{
        setIsloading(false);
      }
  } 
}


  const [histData,setHistData] = useState(null);

  const getHistory=async()=>{
    const hist = await fetch(`${baseURL}/profile/getHistory` , {
      method:"get",
      credentials:'include'
    });

    const data = await hist.json();
    if(data.msg === 'ok'){
      setHistData(data.histData.searchHistory);
    }else if(data.msg === 'error'){
      Warn('Error Fetching History');
    }else{
      Warn('Error Fetching History');
    }

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

              <h2>History</h2>
          <div className="hist_main_container">
               {
                    histData?.length > 0 ? histData.map((n,idx)=>{
                        return <p className="p_hist" key={idx} >{idx+1} . {n}</p>
                    }) : 'No History yet'
               }
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
            <h3>Reset Password 🔒</h3>
            <input type="password" onChange={handlePwdChange} name='oldPwd' placeholder="Old password" />
            <input type="password" onChange={handlePwdChange} name='newPwd' placeholder="New password" />
            <input type="password" onChange={handlePwdChange} name='newCpwd' placeholder="Confirm password" />
            {isLoading? <span class="loader__"></span>: null}
            <p style={{'textAlign':'center','color':'red'}}>{msg}</p>
            <button className="primary-btn" onClick={handleResetPwd}>Reset Password</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
