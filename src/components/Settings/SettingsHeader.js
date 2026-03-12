"use client"
import React from 'react';
import { Save } from 'lucide-react';
import './SettingsHeader.css';
import { useDispatch } from 'react-redux';
import { updateSettings } from '@/store/adminThunk';

export default function SettingsHeader({email,name}) {
    console.log("email",email)
    const dispatch = useDispatch()
    function hanldeSave(){
       dispatch(updateSettings({saloonEmail:email,saloonName:name})) 
    }
    return (
        <div className="settings-header animate-fade-in">
            <div className="header-content">
                <h2 className="text-xl font-bold text-primary mb-1">Settings</h2>
                <p>Manage application preferences and configurations.</p>
            </div>
            <button className="btn btn-primary" onClick={hanldeSave}>
                <Save size={18} />
                Save Changes
            </button>
        </div>
    );
}
