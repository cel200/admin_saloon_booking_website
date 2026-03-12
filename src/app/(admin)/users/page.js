
import React from 'react';
import UserHeader from '@/components/Users/UserHeader';
import UserList from '@/components/Users/UserList';

export default function UsersPage() {
   

    return (
        <div className="page-container animate-fade-in">
            <UserHeader />
            <UserList  />
        </div>
    );
}
