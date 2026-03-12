"use client"
import React from 'react';
import './RevenueChart.css';

export default function RevenueChart() {
    const monthlyHeights = [42, 58, 46, 64, 53, 69, 61, 56, 73, 67, 59, 76];

    return (
        <div className="card chart-section">
            <div className="card-header">
                <h3>Revenue Overview</h3>
                <button className="btn-ghost text-sm">View Report</button>
            </div>
            <div className="chart-placeholder">
                {/* Abstract Bar Chart Visualization */}
                <div className="bars">
                    {monthlyHeights.map((height, i) => (
                        <div key={i} className="bar" style={{ height: `${height}%` }}></div>
                    ))}
                </div>
                <div className="months">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
            </div>
        </div>
    );
}
