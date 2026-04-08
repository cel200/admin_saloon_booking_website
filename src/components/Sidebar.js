"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Scissors, LogOut, Settings, Briefcase, Bell } from 'lucide-react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/adminSlice';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const pathname = usePathname();
  const router = useRouter()
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Staff', icon: Briefcase, path: '/staff' },
    { name: 'Services', icon: Scissors, path: '/services' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];
  const dispatch = useDispatch()
  function handleLogout() {
    dispatch(logout())
    Cookies.remove("token")
    router.push("/login")
    console.log("logout")
  }
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar} />
      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <div className="logo-icon">
            <Scissors size={24} color="white" />
          </div>
          <h1 className="logo-text">Luxe<span className="text-accent">Salon</span></h1>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
                <item.icon size={20} />
                <span>{item.name}</span>
                {isActive && <div className="active-indicator" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <style jsx>{`
            .sidebar {
            width: var(--sidebar-width);
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--glass-border);
            z-index: 50;
            transition: transform 0.3s ease;
            }

            .sidebar-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.5);
                z-index: 45;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                display: none;
            }

            .logo-container {
            padding: 2rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            }

            .logo-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            }

            .nav-menu {
            flex: 1;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            }

            .nav-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.25rem;
            border-radius: var(--radius-md);
            color: var(--text-secondary);
            position: relative;
            transition: all var(--transition-fast);
            }

            .nav-item:hover {
            color: var(--text-primary);
            background: rgba(255,255,255,0.03);
            }

            .nav-item.active {
            color: var(--text-primary);
            background: rgba(139, 92, 246, 0.1);
            }

            .active-indicator {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: var(--accent-primary);
            border-radius: 4px 0 0 4px;
            }

            .sidebar-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--glass-border);
            }

            .logout-btn {
            width: 100%;
            color: #ef4444; /* Red */
            }
            .logout-btn:hover {
            background: rgba(239, 68, 68, 0.1);
            color: #f87171;
            }

            @media (max-width: 768px) {
                .sidebar {
                    transform: translateX(-100%);
                    background: var(--bg-primary);
                }
                .sidebar.open {
                    transform: translateX(0);
                }
                .sidebar-overlay {
                    display: block;
                }
                .sidebar-overlay.open {
                    opacity: 1;
                    pointer-events: auto;
                }
                .logo-container {
                    padding: 1.25rem;
                }
                .logo-text {
                    font-size: 1.25rem;
                }
                .nav-item {
                    padding: 0.85rem 1rem;
                }
            }
        `}</style>
      </aside>
    </>
  );
};
export default Sidebar;
