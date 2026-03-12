"use client";

import React, { useEffect } from 'react';
import MetricCard from '@/components/MetricCard';
import RevenueChart from '@/components/Dashboard/RevenueChart';
import RecentBookings from '@/components/Dashboard/RecentBookings';
import { Calendar, Users, DollarSign, Activity } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '@/store/adminThunk';

export default function Dashboard() {
    const dispatch = useDispatch();
    const {getDashboardStatsData} = useSelector((state)=>state.getDashboardStats)
    console.log("getDashboardStatsData",getDashboardStatsData)
    useEffect(()=>{
       dispatch(getDashboardStats())
    },[])
    const metrics = [
        { title: 'Total Bookings', value: getDashboardStatsData?.data?.totalBookings, icon: Calendar, trend: 'up' },
        { title: 'Active Users', value: getDashboardStatsData?.data?.activeUsers, icon: Users, trend: 'up' },
        { title: 'Total Revenue', value:getDashboardStatsData?.data?.totalEarnings , icon: DollarSign, trend: 'up' },
        { title: 'Total Staff', value: getDashboardStatsData?.data?.totalStaff, icon: Activity, trend: 'up' },
    ];

    return (
        <div className="dashboard-container animate-fade-in">
            <div className="metrics-grid">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            <div className="dashboard-sections">
                <RevenueChart />
                <RecentBookings />
            </div>

            <style jsx>{`
                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .dashboard-sections {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1.5rem;
                }

                @media (max-width: 1024px) {
                    .dashboard-sections {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 640px) {
                    .metrics-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                        margin-bottom: 1rem;
                    }

                    .dashboard-sections {
                        gap: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
