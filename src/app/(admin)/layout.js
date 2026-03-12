"use client";
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getTitle = () => {
        if (pathname.includes('/dashboard')) return 'Dashboard';
        if (pathname.includes('/users')) return 'User Management';
        if (pathname.includes('/services')) return 'Services';
        if (pathname.includes('/settings')) return 'Settings';
        if (pathname.includes('/staff')) return 'Staff Management';
        if (pathname.includes('/notifications')) return 'Notifications';
        return 'Admin';
    };

    return (
        <div className="layout-container">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            <main className="main-content">
                <Header title={getTitle()} toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
                <div className="content-scrollable">
                    {children}
                </div>
            </main>
        </div>
    );
}
