"use client"
import React from 'react';
import { Plus } from 'lucide-react';
import './UserHeader.css';

export default function UserHeader() {
    return (
        <div className="user-header animate-fade-in">
            <div className="header-content">
                <h2 className="text-xl font-bold text-primary mb-1">Users</h2>
                <p>Manage system users and their roles.</p>
            </div>
            <button className="btn btn-primary">
                <Plus size={18} />
                Add User
            </button>
        </div>
    );
}
