"use client"
import React, { useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Table from '../Table'; // Correct import path
import './UserList.css';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '@/store/adminThunk';

export default function UserList({ users }) {
    const headers = ['Name', 'Email', 'Mobile Number', 'Status'];
    const dispatch = useDispatch()
     const { listUserData, listUserLoading } = useSelector((state) => state.listUser);
  console.log("listUserData",listUserData)
 useEffect(()=>{
    dispatch(listUsers());
 },[])
   
    
    const renderRow = (user) => (
        <>
            <td>
                <div className="user-cell">
                    <div className="avatar-sm">{user.fullName.charAt(0)}</div>
                    <span className="font-medium text-sm md:text-base">{user.fullName}</span>
                </div>
            </td>
            <td className="text-secondary">{user.email}</td>
            <td>
                <span className="badge-role">{user.mobileNo}</span>
            </td>
            <td>
                <div className="status-cell">
                    <span className={`status-dot ${user.status === 'Active' ? 'online' : 'offline'}`} />
                    <span className="text-sm font-medium opacity-90">{user.status}</span>
                </div>
            </td>
        </>
    );

    const renderActions = (user) => (
        <div className="actions-wrapper">
            <button className="icon-btn-sm edit" aria-label="Edit user">
                <Edit2 size={16} />
            </button>
            <button className="icon-btn-sm delete" aria-label="Delete user">
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <div className="user-list-wrapper animate-fade-in delay-100">
            <div className="responsive-table-container">
                <Table
                    headers={headers}
                    data={listUserData?.data}
                    renderRow={renderRow}
                    actions={renderActions}
                />
            </div>
        </div>
    );
}
