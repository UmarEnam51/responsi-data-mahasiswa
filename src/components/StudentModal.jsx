import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { PRODI_LIST } from '../utils/dummyData';

const StudentModal = ({ show, handleClose, onSave, studentToEdit }) => {
  const [formData, setFormData] = useState(() => ({
    nim: studentToEdit?.nim || '',
    nama: studentToEdit?.nama || '',
    prodi: studentToEdit?.prodi || PRODI_LIST[0],
    semester: studentToEdit?.semester || 5,
    ipk: studentToEdit?.ipk !== undefined ? studentToEdit.ipk : '3.50',
    status: studentToEdit?.status || 'Aktif',
    gender: studentToEdit?.gender || 'Laki-laki',
    email: studentToEdit?.email || '',
    dosenPa: studentToEdit?.dosenPa || 'Wildan Muhammad Ardana, S.Kom., M.Kom.',
  }));

  const [validated, setValidated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nim.trim() || !formData.nama.trim()) {
      setValidated(true);
      setErrorMsg('Mohon lengkapi NIM dan Nama Mahasiswa!');
      return;
    }

    const ipkNum = parseFloat(formData.ipk);
    if (isNaN(ipkNum) || ipkNum < 0 || ipkNum > 4.0) {
      setErrorMsg('IPK harus berupa angka antara 0.00 s.d 4.00');
      return;
    }

    const payload = {
      ...formData,
      ipk: ipkNum.toFixed(2),
      email: formData.email.trim() || `${formData.nim.trim()}@student.unisayogya.ac.id`,
    };

    onSave(payload);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2">
          <div className="modal-icon-badge bg-primary-subtle text-primary">
            <i className={`bi ${studentToEdit ? 'bi-pencil-square' : 'bi-person-plus-fill'}`}></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold">
              {studentToEdit ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
            </h5>
            <small className="text-muted fw-normal" style={{ fontSize: '0.8rem' }}>
              {studentToEdit ? `Memperbarui profil akademik NIM: ${studentToEdit.nim}` : 'Lengkapi formulir registrasi data akademik'}
            </small>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body className="py-3 px-4">
          {errorMsg && (
            <div className="alert alert-danger py-2 small mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          <Row className="g-3">
            {/* NIM */}
            <Col md={6}>
              <Form.Group controlId="studentNim">
                <Form.Label className="fw-semibold small text-secondary">
                  Nomor Induk Mahasiswa (NIM) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nim"
                  placeholder="Contoh: 2511501006"
                  value={formData.nim}
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.nim.trim()}
                  disabled={!!studentToEdit} // Lock NIM on edit to preserve ID consistency
                />
                <Form.Control.Feedback type="invalid">
                  NIM wajib diisi!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Nama Lengkap */}
            <Col md={6}>
              <Form.Group controlId="studentNama">
                <Form.Label className="fw-semibold small text-secondary">
                  Nama Lengkap Mahasiswa <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  placeholder="Contoh: Umar"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.nama.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  Nama lengkap wajib diisi!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Program Studi */}
            <Col md={6}>
              <Form.Group controlId="studentProdi">
                <Form.Label className="fw-semibold small text-secondary">
                  Program Studi
                </Form.Label>
                <Form.Select
                  name="prodi"
                  value={formData.prodi}
                  onChange={handleChange}
                >
                  {PRODI_LIST.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Semester */}
            <Col md={3}>
              <Form.Group controlId="studentSemester">
                <Form.Label className="fw-semibold small text-secondary">
                  Semester
                </Form.Label>
                <Form.Select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* IPK Kumulatif */}
            <Col md={3}>
              <Form.Group controlId="studentIpk">
                <Form.Label className="fw-semibold small text-secondary">
                  IPK (0.00 - 4.00)
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                  name="ipk"
                  placeholder="3.75"
                  value={formData.ipk}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            {/* Status Aktif */}
            <Col md={4}>
              <Form.Group controlId="studentStatus">
                <Form.Label className="fw-semibold small text-secondary">
                  Status Akademik
                </Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Aktif">🟢 Aktif</option>
                  <option value="Cuti">🟡 Cuti Akademik</option>
                  <option value="Lulus">🔵 Lulus</option>
                  <option value="Non-Aktif">🔴 Non-Aktif</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Jenis Kelamin */}
            <Col md={4}>
              <Form.Group controlId="studentGender">
                <Form.Label className="fw-semibold small text-secondary">
                  Jenis Kelamin
                </Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Email */}
            <Col md={4}>
              <Form.Group controlId="studentEmail">
                <Form.Label className="fw-semibold small text-secondary">
                  Email Institusi
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="otomatis jika dikosongkan"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            {/* Dosen PA */}
            <Col md={12}>
              <Form.Group controlId="studentDosenPa">
                <Form.Label className="fw-semibold small text-secondary">
                  Dosen Pembimbing Akademik (PA)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="dosenPa"
                  placeholder="Nama dosen PA beserta gelar"
                  value={formData.dosenPa}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 px-4 pb-3">
          <Button variant="light" onClick={handleClose} className="rounded-pill px-3">
            Batal
          </Button>
          <Button type="submit" variant="primary" className="rounded-pill px-4 shadow-sm">
            <i className="bi bi-check-lg me-1"></i>
            {studentToEdit ? 'Simpan Perubahan' : 'Tambah Mahasiswa'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StudentModal;

