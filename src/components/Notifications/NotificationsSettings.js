"use client";
import React from 'react';
import { Bell, Mail, MessageSquare, Phone } from 'lucide-react';

const NotificationSettings = () => {
    const settings = [
        {
            category: "Platform Notifications",
            items: [
                { id: "new_booking", title: "New Bookings", desc: "Receive alerts for new appointment requests", icon: Bell, default: true },
                { id: "cancel_booking", title: "Cancellations", desc: "Get notified when a booking is cancelled", icon: Bell, default: true },
                { id: "system_update", title: "System Updates", desc: "Important platform maintenance news", icon: Bell, default: false }
            ]
        },
        {
            category: "Communication Channels",
            items: [
                { id: "email_notif", title: "Email Notifications", desc: "Send daily reports and alerts to admin email", icon: Mail, default: true },
                { id: "sms_notif", title: "SMS Alerts", desc: "Urgent notifications for last minute changes", icon: Phone, default: false },
                { id: "whatsapp_notif", title: "WhatsApp Integration", desc: "Send automated reminders to customers", icon: MessageSquare, default: true }
            ]
        }
    ];

    return (
        <div className="notification-settings-container">
            <h3 className="section-title">Notification Preferences</h3>

            <div className="settings-grid">
                {settings.map((group, groupIdx) => (
                    <div key={groupIdx} className="settings-group">
                        <h4 className="group-category">{group.category}</h4>
                        <div className="group-items">
                            {group.items.map((item) => (
                                <div key={item.id} className="settings-row">
                                    <div className="item-info">
                                        <div className="item-icon">
                                            <item.icon size={18} />
                                        </div>
                                        <div className="item-text">
                                            <span className="item-title">{item.title}</span>
                                            <p className="item-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={item.default} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .notification-settings-container {
                    background: var(--bg-card);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                    padding: 2rem;
                    height: fit-content;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    color: var(--text-primary);
                }

                .settings-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .group-category {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--accent-primary);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1.25rem;
                }

                .group-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .settings-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .settings-row:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }

                .item-info {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-start;
                }

                .item-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.03);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: var(--text-secondary);
                }

                .item-text {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .item-title {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .item-desc {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 22px;
                    flex-shrink: 0;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bg-secondary);
                    transition: 0.4s;
                    border: 1px solid var(--border-color);
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 14px;
                    width: 14px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.4s;
                }

                input:checked + .slider {
                    background-color: var(--accent-primary);
                    border-color: var(--accent-primary);
                }

                input:checked + .slider:before {
                    transform: translateX(22px);
                }

                .slider.round {
                    border-radius: 34px;
                }

                .slider.round:before {
                    border-radius: 50%;
                }

                @media (max-width: 640px) {
                    .notification-settings-container {
                        padding: 1.25rem;
                    }
                    .item-desc {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotificationSettings;
