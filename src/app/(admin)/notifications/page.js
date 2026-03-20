"use client";
import React from 'react';
import NotificationsList from '@/components/Notifications/NotificationsList';
import NotificationsSettings from '@/components/Notifications/NotificationsSettings';

export default function NotificationsPage() {
    return (
        <div className="notifications-page animate-fade-in">
            {/* <div className="notifications-layout"> */}
                {/* <div className="main-panel"> */}
                    <NotificationsList />
                {/* </div> */}
                {/* <div className="side-panel">
                    <NotificationsSettings />
                </div> */}
            {/* </div> */}

            <style jsx>{`
                .notifications-page {
                    height: 100%;
                }

                .notifications-layout {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1.5rem;
                    min-height: calc(100vh - var(--header-height) - 4rem); /* Subtract header and padding */
                }

                .main-panel {
                    height: 100%;
                    min-height: 0;
                }

                .side-panel {
                    height: fit-content;
                }

                @media (max-width: 1024px) {
                    .notifications-layout {
                        grid-template-columns: 1fr;
                        height: auto;
                    }
                    
                    .main-panel {
                        height: 600px; /* Fixed height for mobile */
                    }
                }
            `}</style>
        </div>
    );
}
