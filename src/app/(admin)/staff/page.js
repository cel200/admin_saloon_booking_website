
import React from 'react';
import StaffHeader from '@/components/Staff/StaffHeader';
import StaffList from '@/components/Staff/StaffList';

export default function StaffPage() {
   

    return (
        <div className="page-container animate-fade-in">
            <StaffHeader />
            <StaffList  />
        </div>
    );
}
