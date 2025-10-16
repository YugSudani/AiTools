import React, { useEffect, useState } from "react";
import './admin.css'
import { useNavigate } from "react-router-dom";

const Admin = () => {
    
    
            const navigate = useNavigate();
            const baseURL = process.env.REACT_APP_BaseURL;

            const [expandedUserId, setExpandedUserId] = useState(null);

            const toggleExpand = (id) => {
                setExpandedUserId(expandedUserId === id ? null : id);
            };

            const restrictUser=async(email)=> {
                
                const response = await fetch(`${baseURL}/admin/restrictUser`,{
                    method:"POST",
                    credentials:'include',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({email:email})
                })
                
                const resp_ = await response.json();
                if(resp_.msg === 'ok'){
                    alert(`User ${email} has been restricted.`);
                }else{
                    // console.log(resp_.msg)
                    alert(`Failed to restricte ${email}`);
                }
            };

            const [isLoading,setIsLoading] = useState(true);
            const [allUsers,setAllUser] = useState(null);

            const fetchAllUser=async()=>{
                try {
                    setIsLoading(true);
                    const response = await fetch(`${baseURL}/admin/fetchEntireHistory`,{
                        method:"GET",
                        credentials:'include'
                    })

                    const userData = await response.json();

                    if(userData.msg === "adminAccessOnly"){
                        alert("admin Access Only");
                        navigate('../login');
                    }else{
                        setAllUser(userData.userData);
                    }


                } catch (error) {
                    alert("Error fetching User");   
                }finally{
                    setIsLoading(false);
                }
            }

            useEffect(()=>{
                fetchAllUser();
            },[])
            

            return (
                <div className="admin-panel">
                <h2>Admin Panel</h2>

                { isLoading ? <><span class="loaderAdmin"></span><br />
                <span class="loaderAdmin"></span></>: null}

                <div className="user-list">
                    {allUsers?.map((user) => (
                    <div className="user-card fade-in" key={user._id}>
                        <div className="user-header">
                        <div>
                            <strong>{user.name}</strong>
                            <p>{user.email}</p>
                            <span
                            className="see-history"
                            onClick={() => toggleExpand(user._id)}
                            >
                            {expandedUserId === user._id ? "Hide History" : "See History"}
                            </span>
                        </div>
                        <button onClick={() => restrictUser(user.email)}>Restrict User</button>
                        </div>

                        {expandedUserId === user._id && (
                        <div className="user-history">
                            <h4>History</h4>
                            <ul>
                            {user.searchHistory.map((entry, index) => (
                                <li key={index}>{entry}</li>
                            ))}
                            </ul>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>
                );
            };

export default Admin;
