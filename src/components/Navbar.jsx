import { Button } from 'react-bootstrap';

const Navbar = ({ toggleSidebar, onOpenAddModal, searchQuery, setSearchQuery }) => {
  return (
    <header className="admin-navbar bg-white border-bottom px-3 py-2 d-flex align-items-center justify-content-between sticky-top shadow-sm">
      {/* Left: Sidebar Toggle & Breadcrumb */}
      <div className="d-flex align-items-center gap-3">
        <button
          id="sidebarToggleBtn"
          type="button"
          className="btn btn-outline-secondary border-0 btn-toggle-sidebar"
          onClick={toggleSidebar}
          title="Buka/Tutup Sidebar (jQuery Toggle)"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <div className="d-none d-sm-block">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item text-secondary">
                <i className="bi bi-house-door-fill me-1"></i>SIAKAD
              </li>
              <li className="breadcrumb-item active text-primary fw-semibold" aria-current="page">
                Data Mahasiswa & Akademik
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Middle: Search bar for desktop */}
      <div className="d-none d-md-block flex-grow-1 mx-4" style={{ maxWidth: '400px' }}>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-light border-end-0 text-secondary">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control bg-light border-start-0"
            placeholder="Cari NIM atau Nama Mahasiswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="btn btn-light border"
              type="button"
              onClick={() => setSearchQuery('')}
              title="Reset pencarian"
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* Right: Quick Action, Academic Year & Profile */}
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          className="btn-add-student rounded-pill px-3 shadow-sm d-flex align-items-center gap-1"
          onClick={onOpenAddModal}
        >
          <i className="bi bi-person-plus-fill"></i>
          <span className="d-none d-sm-inline">Tambah Mahasiswa</span>
        </Button>

        <div className="vr mx-2 d-none d-md-block" style={{ height: '24px' }}></div>

        {/* Academic Year Badge */}
        <span className="badge bg-light text-dark border d-none d-lg-inline-block px-2 py-1 small">
          <i className="bi bi-calendar3 me-1 text-primary"></i>TA 2026/2027 Ganjil
        </span>

        {/* User Profile Pill */}
        <div className="d-flex align-items-center gap-2 ps-2">
          <div className="navbar-avatar">
            <span>U</span>
          </div>
          <div className="d-none d-md-block text-start lh-1">
            <span className="fw-semibold small d-block">Umar</span>
            <small className="text-muted" style={{ fontSize: '0.72rem' }}>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
