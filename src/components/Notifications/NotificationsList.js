"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {
  Bell,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  Tag,
  Trash2,
  DiscAlbum,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationForAdmin } from "@/store/adminThunk";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);

  const playSound = () => {
    try {
      // Using a simple beep sound via AudioContext
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch (A5)
      oscillator.frequency.exponentialRampToValueAtTime(
        440,
        audioCtx.currentTime + 0.1,
      );

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Low volume
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + 0.1,
      );

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  // useEffect(() => {
  //     const socket = io("http://localhost:5000");

  //     socket.emit("joinAdminRoom");

  //     socket.on("newAppointment", (data) => {
  //         playSound();
  //         toast.info(data.message, {
  //             icon: <Calendar size={20} color="var(--accent-primary)" />
  //         });
  //         // Optionally add it to the list as well!
  //         setNotifications(prev => [{
  //             id: Date.now(),
  //             title: "New Appointment",
  //             message: data.message,
  //             time: "Just now",
  //             type: "appointment",
  //             unread: true,
  //             icon: Calendar,
  //             color: "var(--accent-primary)"
  //         }, ...prev]);
  //     });

  //     socket.on("appointmentStatusUpdated", (data) => {
  //         playSound();
  //         toast.success(data.message, {
  //             icon: <CheckCircle size={20} color="var(--accent-primary)" />
  //         });
  //         setNotifications(prev => [{
  //             id: Date.now(),
  //             title: "Appointment Status Updated",
  //             message: data.message,
  //             time: "Just now",
  //             type: "appointment",
  //             unread: true,
  //             icon: Calendar,
  //             color: "var(--accent-primary)"
  //         }, ...prev]);
  //     });

  //     return () => {
  //         socket.disconnect();
  //     };
  // }, []);
  const dispatch = useDispatch();
  const { getNotificationForAdminData } = useSelector(
    (state) => state.getNotificationForAdmin,
  );
  console.log("getNotificationForAdminData", getNotificationForAdminData);
  useEffect(() => {
    dispatch(getNotificationForAdmin());
  }, []);
  function formatDateTime(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  console.log(formatDateTime("2026-03-11T09:12:18.021Z"));
  return (
    <div className="notifications-list-container">
      <div className="list-header">
        <div className="header-info">
          <h3>Recent Notifications</h3>
          <p>
            You have {notifications.filter((n) => n.unread).length} unread
            messages
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-text">Mark all as read</button>
          <button className="btn-icon">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="notifications-scroll">
        {getNotificationForAdminData?.data?.map((notification) => (
          <div
            key={notification._id}
            className={`notification-item ${notification.unread ? "unread" : ""}`}
          >
            <div
              className="notification-icon-wrapper"
              style={{
                backgroundColor: `${notification.color}20`,
                color: notification.color,
              }}
            >
              <Calendar size={20} />
            </div>

            <div className="notification-content">
              <div className="notification-title-row">
                <h4 className="notification-title">{notification.message}</h4>
                <span className="notification-time">
                  <Clock size={12} className="clock-icon" />
                  {formatDateTime(notification.createdAt)}
                </span>
              </div>
              <p className="notification-message">{notification.message}</p>

              {notification.unread && <div className="unread-dot" />}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .notifications-list-container {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 500px;
        }

        .list-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
        }

        .header-info h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .header-info p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-text {
          background: transparent;
          color: var(--accent-primary);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0;
        }

        .btn-text:hover {
          text-decoration: underline;
        }

        .btn-icon {
          background: transparent;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .btn-icon:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ef4444;
        }

        .notifications-scroll {
          overflow-y: auto;
          flex: 1;
        }

        .notification-item {
          display: flex;
          padding: 1.25rem;
          gap: 1rem;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .notification-item.unread {
          background: rgba(139, 92, 246, 0.03);
        }

        .notification-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .notification-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .notification-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .clock-icon {
          opacity: 0.7;
        }

        .notification-message {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .unread-dot {
          position: absolute;
          left: 0.75rem;
          top: 1.25rem;
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-glow);
        }

        .notification-item.unread .notification-title {
          color: white;
        }

        @media (max-width: 640px) {
          .notification-item {
            padding: 1rem;
          }
          .notification-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
          .notification-time {
            order: 2;
          }
          .notification-title {
            order: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationsList;
