"use client"
import React, { useEffect, useState } from 'react';
import SettingsHeader from '@/components/Settings/SettingsHeader';
import { Mail } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '@/store/adminThunk';

export default function SettingsPage() {
     const {getSettingsData} = useSelector((state )=> state.getSettings)
     console.log("getSettingsData",getSettingsData)
   const [email, setEmail] = useState("");
const [name, setName] = useState("");

useEffect(() => {
  if (getSettingsData?.data?.length > 0) {
    setEmail(getSettingsData.data[0].email);
    setName(getSettingsData.data[0].name);
  }
}, [getSettingsData]);
     const dispatch = useDispatch()
     useEffect(()=>{
         dispatch(getSettings())
     },[])
    return (
        <div className="page-container animate-fade-in">
            <SettingsHeader email={email} name={name}/>

            <div className="settings-grid">
                <div className="card settings-card">
                    <h3>General Information</h3>
                    <div className="form-group">
                        <label>Salon Name</label>
                        <div className="input-wrapper">
                            <input type="text" value={name || ""} onChange={(e)=>setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Contact Email</label>
                        <div className="input-wrapper">
                            <Mail size={16} className="input-icon" />
                            <input type="email" value={email || ""} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* <div className="card settings-card">
                    <h3>Notifications</h3>
                    <div className="toggle-group">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span>Email Notifications</span>
                                <p>Receive daily summaries</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span>SMS Alerts</span>
                                <p>For urgent booking changes</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
