import { useState } from 'react';
import { Modal, Button, Table, Form, Row, Col, Badge } from 'react-bootstrap';

const GRADE_POINTS = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'D': 1.0,
  'E': 0.0,
};

const GradeModal = ({ show, handleClose, student, onUpdateStudentCourses }) => {
  const [courses, setCourses] = useState(() => student?.courses || []);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    sks: 3,
    nilai: 'A',
  });

  const calculateIpk = (courseList) => {
    if (!courseList || courseList.length === 0) return '0.00';
    let totalSks = 0;
    let totalPoints = 0;

    courseList.forEach((c) => {
      const sks = parseInt(c.sks, 10) || 0;
      const point = GRADE_POINTS[c.nilai] !== undefined ? GRADE_POINTS[c.nilai] : 3.0;
      totalSks += sks;
      totalPoints += sks * point;
    });

    if (totalSks === 0) return '0.00';
    return (totalPoints / totalSks).toFixed(2);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.name.trim()) return;

    const updated = [
      ...courses,
      {
        id: Date.now(),
        code: newCourse.code.trim().toUpperCase() || `MK${courses.length + 1}`,
        name: newCourse.name.trim(),
        sks: parseInt(newCourse.sks, 10) || 3,
        nilai: newCourse.nilai,
      },
    ];

    setCourses(updated);
    setNewCourse({ code: '', name: '', sks: 3, nilai: 'A' });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleSaveAll = () => {
    const computedIpk = calculateIpk(courses);
    onUpdateStudentCourses(student.id, courses, computedIpk);
    handleClose();
  };

  const currentIpk = calculateIpk(courses);
  const totalSks = courses.reduce((acc, c) => acc + (parseInt(c.sks, 10) || 0), 0);

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2">
          <div className="modal-icon-badge bg-info-subtle text-info">
            <i className="bi bi-journal-bookmark-fill"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold">Kartu Hasil Studi & Input Nilai</h5>
            <small className="text-muted fw-normal" style={{ fontSize: '0.8rem' }}>
              Mahasiswa: <strong>{student?.nama}</strong> (NIM: {student?.nim}) - {student?.prodi}
            </small>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-3 px-4">
        {/* Academic Summary Header */}
        <div className="bg-light p-3 rounded-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2 border">
          <div>
            <span className="text-secondary small d-block">Indeks Prestasi Kumulatif (IPK):</span>
            <h3 className="mb-0 fw-bold text-primary d-flex align-items-center gap-2">
              {currentIpk}
              {parseFloat(currentIpk) >= 3.75 ? (
                <Badge bg="warning" text="dark" className="fs-6">Cumlaude</Badge>
              ) : (
                <Badge bg="success" className="fs-6">Memuaskan</Badge>
              )}
            </h3>
          </div>
          <div className="text-end">
            <span className="text-secondary small d-block">Total SKS Diambil:</span>
            <h4 className="mb-0 fw-semibold text-dark">{totalSks} SKS</h4>
          </div>
        </div>

        {/* Existing Courses Table */}
        <h6 className="fw-bold small text-secondary text-uppercase mb-2">Daftar Mata Kuliah & Nilai</h6>
        <div className="table-responsive border rounded-3 mb-4">
          <Table size="sm" hover className="align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th className="ps-3" style={{ width: '40px' }}>No</th>
                <th>Kode</th>
                <th>Mata Kuliah</th>
                <th className="text-center">SKS</th>
                <th className="text-center">Nilai</th>
                <th className="text-center">Bobot</th>
                <th className="text-end pe-3" style={{ width: '50px' }}>Hapus</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-3 text-muted small">
                    Belum ada mata kuliah yang diinputkan.
                  </td>
                </tr>
              ) : (
                courses.map((c, i) => (
                  <tr key={c.id || i}>
                    <td className="ps-3 text-muted small">{i + 1}</td>
                    <td className="font-monospace small">{c.code || '-'}</td>
                    <td className="fw-semibold text-dark">{c.name}</td>
                    <td className="text-center">{c.sks}</td>
                    <td className="text-center">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2">
                        {c.nilai}
                      </span>
                    </td>
                    <td className="text-center text-muted small font-monospace">
                      {GRADE_POINTS[c.nilai] !== undefined ? GRADE_POINTS[c.nilai].toFixed(1) : '-'}
                    </td>
                    <td className="text-end pe-3">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-0"
                        onClick={() => handleDeleteCourse(c.id)}
                        title="Hapus Nilai"
                      >
                        <i className="bi bi-trash3"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Form Tambah Nilai Baru */}
        <div className="card p-3 border border-secondary-subtle bg-light-subtle rounded-3">
          <h6 className="fw-bold small text-dark mb-2 d-flex align-items-center gap-1">
            <i className="bi bi-plus-circle-fill text-primary"></i>
            Input Nilai Mata Kuliah Baru
          </h6>
          <Form onSubmit={handleAddCourse}>
            <Row className="g-2">
              <Col md={3}>
                <Form.Control
                  size="sm"
                  placeholder="Kode (misal: TI305)"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  size="sm"
                  placeholder="Nama Mata Kuliah *"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  required
                />
              </Col>
              <Col md={2}>
                <Form.Select
                  size="sm"
                  value={newCourse.sks}
                  onChange={(e) => setNewCourse({ ...newCourse, sks: e.target.value })}
                >
                  <option value="1">1 SKS</option>
                  <option value="2">2 SKS</option>
                  <option value="3">3 SKS</option>
                  <option value="4">4 SKS</option>
                  <option value="6">6 SKS</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select
                  size="sm"
                  value={newCourse.nilai}
                  onChange={(e) => setNewCourse({ ...newCourse, nilai: e.target.value })}
                >
                  <option value="A">Nilai A (4.0)</option>
                  <option value="A-">Nilai A- (3.7)</option>
                  <option value="B+">Nilai B+ (3.3)</option>
                  <option value="B">Nilai B (3.0)</option>
                  <option value="B-">Nilai B- (2.7)</option>
                  <option value="C+">Nilai C+ (2.3)</option>
                  <option value="C">Nilai C (2.0)</option>
                  <option value="D">Nilai D (1.0)</option>
                  <option value="E">Nilai E (0.0)</option>
                </Form.Select>
              </Col>
              <Col md={1}>
                <Button type="submit" variant="primary" size="sm" className="w-100">
                  <i className="bi bi-plus"></i>
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 px-4 pb-3">
        <Button variant="light" onClick={handleClose} className="rounded-pill px-3">
          Tutup
        </Button>
        <Button variant="primary" onClick={handleSaveAll} className="rounded-pill px-4 shadow-sm">
          <i className="bi bi-save me-1"></i>Simpan Perubahan Nilai & IPK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GradeModal;

