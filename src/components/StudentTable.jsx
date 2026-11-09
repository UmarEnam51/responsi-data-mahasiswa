import { Table, Card, Form, InputGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PRODI_LIST } from '../utils/dummyData';

const StudentTable = ({
  students,
  searchQuery,
  setSearchQuery,
  prodiFilter,
  setProdiFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenGradeModal,
  onResetFilters,
}) => {
  // Helper badge status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif':
        return <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i className="bi bi-check-circle-fill me-1"></i>Aktif</span>;
      case 'Cuti':
        return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1"><i className="bi bi-pause-circle-fill me-1"></i>Cuti</span>;
      case 'Lulus':
        return <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1"><i className="bi bi-mortarboard-fill me-1"></i>Lulus</span>;
      case 'Non-Aktif':
        return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i className="bi bi-x-circle-fill me-1"></i>Non-Aktif</span>;
      default:
        return <span className="badge bg-secondary-subtle text-secondary px-2 py-1">{status}</span>;
    }
  };

  // Helper badge IPK
  const getIpkBadge = (ipkNum) => {
    const val = parseFloat(ipkNum);
    if (val >= 3.75) {
      return (
        <span className="badge-ipk badge-ipk-cumlaude" title="Predikat: Dengan Pujian (Cumlaude)">
          <i className="bi bi-star-fill me-1"></i>{val.toFixed(2)}
        </span>
      );
    } else if (val >= 3.50) {
      return (
        <span className="badge-ipk badge-ipk-sangat-memuaskan" title="Predikat: Sangat Memuaskan">
          <i className="bi bi-check-circle me-1"></i>{val.toFixed(2)}
        </span>
      );
    } else {
      return (
        <span className="badge-ipk badge-ipk-memuaskan" title="Predikat: Memuaskan">
          {val.toFixed(2)}
        </span>
      );
    }
  };

  // Helper badge Prodi
  const getProdiBadge = (prodi) => {
    switch (prodi) {
      case 'Teknologi Informasi':
        return <span className="badge bg-indigo-subtle text-indigo border border-indigo-subtle">{prodi}</span>;
      case 'Sistem Informasi':
        return <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle">{prodi}</span>;
      case 'Bioteknologi':
        return <span className="badge bg-teal-subtle text-teal border border-teal-subtle">{prodi}</span>;
      default:
        return <span className="badge bg-light text-dark border">{prodi}</span>;
    }
  };

  const isFilterActive = searchQuery || prodiFilter !== 'All' || statusFilter !== 'All' || sortBy !== 'nim-asc';

  return (
    <Card className="border-0 shadow-sm student-table-card rounded-4 overflow-hidden mb-4">
      {/* Table Header & Controls */}
      <Card.Header className="bg-white py-3 px-4 border-bottom">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div>
            <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
              <i className="bi bi-table text-primary"></i>
              Daftar Data Mahasiswa
            </h5>
            <small className="text-muted">
              Manajemen data akademik, program studi, status dan kartu hasil studi
            </small>
          </div>

          {/* Quick Filter Inputs */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            {/* Search Input for Mobile/Tablet */}
            <InputGroup size="sm" style={{ width: '220px' }}>
              <InputGroup.Text className="bg-light border-end-0 text-secondary">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cari NIM/Nama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-start-0 bg-light"
              />
            </InputGroup>

            {/* Filter Prodi */}
            <Form.Select
              size="sm"
              value={prodiFilter}
              onChange={(e) => setProdiFilter(e.target.value)}
              style={{ width: '170px' }}
            >
              <option value="All">Semua Prodi</option>
              {PRODI_LIST.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Form.Select>

            {/* Filter Status */}
            <Form.Select
              size="sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '130px' }}
            >
              <option value="All">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Lulus">Lulus</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </Form.Select>

            {/* Sort Dropdown */}
            <Form.Select
              size="sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '140px' }}
            >
              <option value="nim-asc">NIM (Terkecil)</option>
              <option value="nama-asc">Nama (A-Z)</option>
              <option value="ipk-desc">IPK Tertinggi</option>
              <option value="ipk-asc">IPK Terendah</option>
            </Form.Select>

            {/* Reset Filter Button */}
            {isFilterActive && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={onResetFilters}
                title="Reset Semua Filter"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
              </Button>
            )}
          </div>
        </div>
      </Card.Header>

      {/* Table Body */}
      <div className="table-responsive" id="tableContainer">
        <Table hover className="align-middle mb-0 custom-student-table">
          <thead className="table-light text-secondary small text-uppercase fw-semibold">
            <tr>
              <th className="ps-4" style={{ width: '50px' }}>No</th>
              <th>Nama Mahasiswa</th>
              <th>NIM</th>
              <th>Program Studi</th>
              <th className="text-center">Semester</th>
              <th className="text-center">IPK</th>
              <th className="text-center">Status</th>
              <th className="text-end pe-4" style={{ width: '160px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-5 text-muted">
                  <div className="empty-table-state">
                    <i className="bi bi-search fs-1 text-secondary opacity-50 mb-2 d-block"></i>
                    <h6 className="fw-semibold">Data Tidak Ditemukan</h6>
                    <p className="small text-muted mb-2">
                      Tidak ada mahasiswa yang cocok dengan kriteria pencarian/filter saat ini.
                    </p>
                    {isFilterActive && (
                      <Button variant="primary" size="sm" onClick={onResetFilters} className="rounded-pill px-3">
                        Reset Filter
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              students.map((mhs, idx) => (
                <tr key={mhs.id} className="student-table-row">
                  <td className="ps-4 text-secondary small fw-medium">{idx + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="student-avatar-circle">
                        {mhs.nama.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '200px' }}>
                          {mhs.nama}
                          {mhs.nim === '2511501006' && (
                            <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.65rem' }}>
                              ⭐ Mahasiswa
                            </span>
                          )}
                        </div>
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>
                          {mhs.email || `${mhs.nim}@unisayogya.ac.id`}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-monospace fw-semibold text-secondary">
                      {mhs.nim}
                    </span>
                  </td>
                  <td>{getProdiBadge(mhs.prodi)}</td>
                  <td className="text-center">
                    <span className="badge bg-light text-dark border">
                      Sem. {mhs.semester || '-'}
                    </span>
                  </td>
                  <td className="text-center">{getIpkBadge(mhs.ipk)}</td>
                  <td className="text-center">{getStatusBadge(mhs.status)}</td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-1">
                      {/* Tombol Input Nilai / KHS */}
                      <OverlayTrigger placement="top" overlay={<Tooltip>Input Nilai / KHS</Tooltip>}>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="btn-action-icon"
                          onClick={() => onOpenGradeModal(mhs)}
                        >
                          <i className="bi bi-journal-check"></i>
                        </Button>
                      </OverlayTrigger>

                      {/* Tombol Edit Data Mahasiswa */}
                      <OverlayTrigger placement="top" overlay={<Tooltip>Edit Data Mahasiswa</Tooltip>}>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="btn-action-icon"
                          onClick={() => onOpenEditModal(mhs)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </OverlayTrigger>

                      {/* Tombol Hapus Data Mahasiswa */}
                      <OverlayTrigger placement="top" overlay={<Tooltip>Hapus Mahasiswa</Tooltip>}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="btn-action-icon"
                          onClick={() => onOpenDeleteModal(mhs)}
                        >
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Table Footer */}
      <Card.Footer className="bg-white py-3 px-4 border-top d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
        <small className="text-muted">
          Menampilkan <strong>{students.length}</strong> data mahasiswa
        </small>
        <div className="d-flex gap-2">
          <span className="badge bg-light text-secondary border">
            Predikat: <strong className="text-purple">Cumlaude (≥3.75)</strong> | <strong className="text-success">Sangat Memuaskan (≥3.50)</strong>
          </span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudentTable;
