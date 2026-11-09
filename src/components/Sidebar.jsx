const Sidebar = ({ activeMenu, setActiveMenu, isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { id: 'mahasiswa', label: 'Data Mahasiswa', icon: 'bi-people-fill', badge: 'CRUD' },
    { id: 'akademik', label: 'Input Nilai & KHS', icon: 'bi-journal-bookmark-fill' },
    { id: 'prodi', label: 'Program Studi', icon: 'bi-building-fill' },
    { id: 'laporan', label: 'Laporan IPK', icon: 'bi-graph-up-arrow' },
    { id: 'settings', label: 'Pengaturan Sistem', icon: 'bi-gear-fill' },
  ];

  return (
    <aside
      id="adminSidebar"
      className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}
    >
      {/* Brand / Logo */}
      <div className="sidebar-brand d-flex align-items-center justify-content-between p-3 border-bottom border-secondary-subtle">
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          <div className="brand-logo-icon">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          <div className="brand-text">
            <h6 className="mb-0 fw-bold text-white text-truncate">SIAKAD UNISA</h6>
            <small className="text-secondary small">Univ. 'Aisyiyah Yk</small>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-sm text-secondary d-md-none"
          onClick={toggleSidebar}
          aria-label="Tutup Sidebar"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Student Profile Card (Creator Identity) */}
      <div className="sidebar-user p-3 border-bottom border-secondary-subtle">
        <div className="d-flex align-items-center gap-2">
          <div className="user-avatar">
            <span>U</span>
          </div>
          <div className="user-info overflow-hidden">
            <h6 className="mb-0 text-white fw-semibold text-truncate">Umar</h6>
            <div className="text-secondary small font-monospace">NIM: 2511501006</div>
            <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle mt-1" style={{ fontSize: '0.68rem' }}>
              Admin Akademik
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav py-3">
        <div className="sidebar-heading px-3 text-uppercase text-secondary small fw-bold mb-2">
          Menu Utama
        </div>
        <ul className="nav flex-column gap-1 px-2">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <button
                type="button"
                className={`nav-link w-100 text-start d-flex align-items-center justify-content-between ${
                  activeMenu === item.id ? 'active' : ''
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${item.icon} fs-5`}></i>
                  <span className="menu-label">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="badge bg-primary rounded-pill menu-badge">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Responsi Info Box */}
        <div className="responsi-info-box mx-3 mt-4 p-3 rounded-3">
          <div className="d-flex align-items-center gap-2 mb-1 text-warning">
            <i className="bi bi-info-circle-fill"></i>
            <strong className="small">Responsi 1 Fullstack</strong>
          </div>
          <p className="mb-1 text-light small" style={{ fontSize: '0.78rem' }}>
            Kasus: Data Mahasiswa & Akademik
          </p>
          <div className="text-secondary small" style={{ fontSize: '0.72rem' }}>
            Dosen: W. M. Ardana, M.Kom.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
