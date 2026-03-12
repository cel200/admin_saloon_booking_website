// "use client";
// import React from 'react';
// import { Bell, Search, User } from 'lucide-react';

// const Header = ({ title }) => {
//     return (
//         <header className="header glass">
//             <h2 className="page-title">{title}</h2>

//             <div className="header-actions">
//                 <div className="search-bar">
//                     <Search size={18} className="search-icon" />
//                     <input type="text" placeholder="Search..." />
//                 </div>

//                 <button className="icon-btn">
//                     <Bell size={20} />
//                     <span className="badge">3</span>
//                 </button>

//                 <div className="profile-btn">
//                     <div className="avatar">
//                         <User size={20} />
//                     </div>
//                     <span className="username">Admin</span>
//                 </div>
//             </div>

//             <style jsx>{`
//         .header {
//           height: var(--header-height);
//           padding: 0 2rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           position: sticky;
//           top: 0;
//           z-index: 40;
//           border-bottom: 1px solid var(--glass-border);
//         }

//         .page-title {
//           font-size: 1.25rem;
//           font-weight: 600;
//         }

//         .header-actions {
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//         }

//         .search-bar {
//           display: flex;
//           align-items: center;
//           background: rgba(255,255,255,0.05);
//           border-radius: var(--radius-full);
//           padding: 0.5rem 1rem;
//           border: 1px solid transparent;
//           transition: var(--transition-fast);
//         }

//         .search-bar:focus-within {
//           border-color: var(--accent-primary);
//           background: rgba(255,255,255,0.08);
//         }

//         .search-icon {
//           color: var(--text-secondary);
//           margin-right: 0.5rem;
//         }

//         .search-bar input {
//           background: transparent;
//           border: none;
//           color: var(--text-primary);
//           outline: none;
//           width: 200px;
//         }

//         .icon-btn {
//           position: relative;
//           color: var(--text-secondary);
//           background: transparent;
//           padding: 0.5rem;
//           border-radius: 50%;
//           transition: var(--transition-fast);
//         }

//         .icon-btn:hover {
//           color: var(--text-primary);
//           background: rgba(255,255,255,0.05);
//         }

//         .badge {
//           position: absolute;
//           top: 0;
//           right: 0;
//           background: var(--accent-secondary);
//           color: white;
//           font-size: 0.6rem;
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: 2px solid var(--bg-primary);
//         }

//         .profile-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           cursor: pointer;
//           padding: 0.25rem;
//           padding-right: 1rem;
//           border-radius: var(--radius-full);
//           transition: var(--transition-fast);
//         }

//         .profile-btn:hover {
//           background: rgba(255,255,255,0.05);
//         }

//         .avatar {
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, var(--bg-card), var(--border-color));
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: 1px solid var(--border-color);
//         }

//         .username {
//           font-weight: 500;
//           font-size: 0.9rem;
//         }
//       `}</style>
//         </header>
//     );
// };

// export default Header;

"use client";
import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

const Header = ({ title, toggleSidebar }) => {
  return (
    <header className="header glass">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar} aria-label="Open navigation menu">
          <Menu size={24} />
        </button>
        <h2 className="page-title">{title}</h2>
      </div>

      <div className="header-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>

        <div className="profile-btn">
          <div className="avatar">
            <User size={20} />
          </div>
          <span className="username">Admin</span>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: var(--header-height);
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 40;
          border-bottom: 1px solid var(--glass-border);
          transition: left 0.3s ease;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .menu-btn {
            display: none;
            background: transparent;
            color: var(--text-primary);
            padding: 0.5rem;
            cursor: pointer;
        }

        .page-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border-radius: var(--radius-full);
          padding: 0.5rem 1rem;
          border: 1px solid transparent;
          transition: var(--transition-fast);
        }

        .search-bar:focus-within {
          border-color: var(--accent-primary);
          background: rgba(255,255,255,0.08);
        }

        .search-icon {
          color: var(--text-secondary);
          margin-right: 0.5rem;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          outline: none;
          width: 200px;
        }

        .icon-btn {
          position: relative;
          color: var(--text-secondary);
          background: transparent;
          padding: 0.5rem;
          border-radius: 50%;
          transition: var(--transition-fast);
        }

        .icon-btn:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }

        .badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--accent-secondary);
          color: white;
          font-size: 0.6rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-primary);
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.25rem;
          padding-right: 1rem;
          border-radius: var(--radius-full);
          transition: var(--transition-fast);
        }

        .profile-btn:hover {
          background: rgba(255,255,255,0.05);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--bg-card), var(--border-color));
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
        }

        .username {
          font-weight: 500;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
            .header {
                padding: 0 1rem;
            }
            .search-bar input {
                width: 140px;
            }
            .username {
                display: none;
            }
            .profile-btn {
                padding-right: 0;
            }
        }

        @media (max-width: 768px) {
            .header {
                height: 64px;
            }
            .menu-btn {
                display: block;
            }
            .search-bar {
                display: none;
            }
            .header-actions {
                gap: 0.75rem;
            }
            .page-title {
                font-size: 1rem;
            }
        }
      `}</style>
    </header>
  );
};

export default Header;
