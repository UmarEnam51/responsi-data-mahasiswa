import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, onConfirm, student }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="sm">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-6 fw-bold text-danger d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-triangle-fill fs-5"></i>
          Konfirmasi Hapus Mahasiswa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <p className="mb-2 text-secondary small">
          Apakah Anda yakin ingin menghapus data mahasiswa berikut dari pangkalan data akademik?
        </p>
        <div className="p-2 bg-light rounded-2 border">
          <strong className="d-block text-dark">{student?.nama}</strong>
          <small className="text-muted font-monospace">NIM: {student?.nim}</small>
          <div className="small text-muted">{student?.prodi}</div>
        </div>
        <small className="text-danger mt-2 d-block fst-italic" style={{ fontSize: '0.75rem' }}>
          *Data yang dihapus tidak dapat dikembalikan.
        </small>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" size="sm" onClick={handleClose} className="rounded-pill px-3">
          Batal
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm} className="rounded-pill px-3 shadow-sm">
          <i className="bi bi-trash3 me-1"></i>Hapus Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
