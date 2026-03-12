"use client"
import React, { useEffect, useState } from 'react';
import './RecentBookings.css';
import { io } from 'socket.io-client';

export default function RecentBookings() {
    const recentActivity = [
        { id: 1, user: 'Sarah J.', action: 'booked a Haircut', time: '2 mins ago' },
        { id: 2, user: 'Mike T.', action: 'cancelled appointment', time: '1 hour ago' },
        { id: 3, user: 'Emma W.', action: 'booked a Manicure', time: '3 hours ago' },
       
        { id: 4, user: 'James L.', action: 'left a review', time: '5 hours ago' },
    ];
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
          const socket = io("http://localhost:5000");
  
          socket.emit("joinAdminRoom");
  
          socket.on("newAppointment", (data) => {
              playSound();
              toast.info(data.message, {
                  icon: <Calendar size={20} color="var(--accent-primary)" />
              });
              // Optionally add it to the list as well!
              setNotifications(prev => [{
                  id: Date.now(),
                  title: "New Appointment",
                  message: data.message,
                  time: "Just now",
                  type: "appointment",
                  unread: true,
                  icon: Calendar,
                  color: "var(--accent-primary)"
              }, ...prev]);
          });
  
          socket.on("appointmentStatusUpdated", (data) => {
              playSound();
              toast.success(data.message, {
                  icon: <CheckCircle size={20} color="var(--accent-primary)" />
              });
              setNotifications(prev => [{
                  id: Date.now(),
                  title: "Appointment Status Updated",
                  message: data.message,
                  time: "Just now",
                  type: "appointment",
                  unread: true,
                  icon: Calendar,
                  color: "var(--accent-primary)"
              }, ...prev]);
          });
  
          return () => {
              socket.disconnect();
          };
      }, []);
    return (
        <div className="card recent-activity">
            <h3>Recent Bookings</h3>
            <ul className="activity-list">
                {notifications?.map((item) => (
                    <li key={item.id} className="activity-item">
                        <div className="activity-avatar">{item.user.charAt(0)}</div>
                        <div className="activity-info">
                            <p className="activity-text"><strong>{item.user}</strong> {item.action}</p>
                            <span className="activity-time">{item.time}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
