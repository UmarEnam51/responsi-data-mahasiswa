import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import GradeModal from './components/GradeModal';
import DeleteModal from './components/DeleteModal';
import { INITIAL_STUDENTS } from './utils/dummyData';
import './App.css';

function App() {
  // State data mahasiswa (LocalStorage persistence)
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('unisa_siakad_students');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Gagal membaca localStorage', e);
    }
    return INITIAL_STUDENTS;
  });

  // State menu & layout
  const [activeMenu, setActiveMenu] = useState('mahasiswa');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [prodiFilter, setProdiFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('nim-asc');

  // Modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedStudentForGrade, setSelectedStudentForGrade] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Notification Toast state
  const [toastInfo, setToastInfo] = useState(null);

  // Save to localStorage when students change
  useEffect(() => {
    try {
      localStorage.setItem('unisa_siakad_students', JSON.stringify(students));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage', e);
    }
  }, [students]);

  // DOM JavaScript & jQuery Integration: Efek visual dan animasi
  useEffect(() => {
    // jQuery: Efek pudar (fade-in) pada container tabel setiap kali filter berubah
    if ($('#tableContainer').length) {
      $('#tableContainer').hide().fadeIn(250);
    }
  }, [searchQuery, prodiFilter, statusFilter, sortBy]);

  const showToast = (message, variant = 'success') => {
    setToastInfo({ message, variant });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // CRUD 1: CREATE (Tambah Mahasiswa Baru)
  const handleAddStudent = (studentData) => {
    // Cek duplikasi NIM
    const existing = students.find((s) => s.nim.trim() === studentData.nim.trim());
    if (existing) {
      showToast(`Gagal: Mahasiswa dengan NIM ${studentData.nim} sudah terdaftar!`, 'danger');
      return;
    }

    const newStudent = {
      ...studentData,
      id: Date.now(),
      courses: studentData.courses || [],
    };

    setStudents([newStudent, ...students]);
    showToast(`Data mahasiswa ${newStudent.nama} (${newStudent.nim}) berhasil ditambahkan!`, 'success');
  };

  // CRUD 2: UPDATE (Edit Data Mahasiswa)
  const handleEditStudent = (updatedData) => {
    setStudents(
      students.map((s) => (s.id === studentToEdit.id ? { ...s, ...updatedData } : s))
    );
    showToast(`Data mahasiswa ${updatedData.nama} berhasil diperbarui!`, 'info');
    setStudentToEdit(null);
  };

  // CRUD 3: DELETE (Hapus Data Mahasiswa)
  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id));
      showToast(`Data mahasiswa ${studentToDelete.nama} (${studentToDelete.nim}) telah dihapus.`, 'warning');
      setStudentToDelete(null);
      setShowDeleteModal(false);
    }
  };

  // CRUD 4: UPDATE NILAI & KHS (Modal Form Input Nilai)
  const handleUpdateStudentCourses = (studentId, updatedCourses, newIpk) => {
    setStudents(
      students.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            courses: updatedCourses,
            ipk: newIpk,
          };
        }
        return s;
      })
    );
    showToast(`Nilai KHS & IPK berhasil diperbarui menjadi ${newIpk}!`, 'success');
  };

  // Filter & Sorting Logic
  const filteredStudents = students
    .filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = s.nama.toLowerCase().includes(q) || s.nim.toLowerCase().includes(q);
      const matchProdi = prodiFilter === 'All' || s.prodi === prodiFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchQuery && matchProdi && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'nim-asc') return a.nim.localeCompare(b.nim);
      if (sortBy === 'nama-asc') return a.nama.localeCompare(b.nama);
      if (sortBy === 'ipk-desc') return parseFloat(b.ipk) - parseFloat(a.ipk);
      if (sortBy === 'ipk-asc') return parseFloat(a.ipk) - parseFloat(b.ipk);
      return 0;
    });

  const handleResetFilters = () => {
    setSearchQuery('');
    setProdiFilter('All');
    setStatusFilter('All');
    setSortBy('nim-asc');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Mobile Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${!isSidebarCollapsed ? 'show' : ''}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Component */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className={`main-content-wrapper ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Navbar Component */}
        <Navbar
          toggleSidebar={toggleSidebar}
          onOpenAddModal={() => {
            setStudentToEdit(null);
            setShowStudentModal(true);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dashboard Body Container */}
        <main className="flex-grow-1 p-3 p-md-4">
          <Container fluid className="px-0">
            {/* Page Header Title */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
              <div>
                <h4 className="fw-bold mb-1 text-dark">
                  Dashboard Manajemen Data Mahasiswa & Akademik
                </h4>
                <p className="text-muted small mb-0">
                  Sistem Informasi Akademik Terpadu (SIAKAD) — Universitas 'Aisyiyah Yogyakarta
                </p>
              </div>

              {/* Identity Pill */}
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-white text-dark border px-3 py-2 shadow-sm d-flex align-items-center gap-2">
                  <i className="bi bi-person-badge-fill text-primary"></i>
                  <span>Mahasiswa: <strong>Umar</strong> (NIM: <strong>2511501006</strong>)</span>
                </span>
              </div>
            </div>

            {/* 1. Stat Cards (Ringkasan Statistik Akademik) */}
            <StatCards students={students} />

            {/* 2. Main Student Table & Filters */}
            <StudentTable
              students={filteredStudents}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              prodiFilter={prodiFilter}
              setProdiFilter={setProdiFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onOpenEditModal={(student) => {
                setStudentToEdit(student);
                setShowStudentModal(true);
              }}
              onOpenDeleteModal={(student) => {
                setStudentToDelete(student);
                setShowDeleteModal(true);
              }}
              onOpenGradeModal={(student) => {
                setSelectedStudentForGrade(student);
                setShowGradeModal(true);
              }}
              onResetFilters={handleResetFilters}
            />
          </Container>
        </main>

        {/* Footer */}
        <footer className="bg-white border-top py-3 px-4 text-center text-md-start d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small className="text-muted">
            &copy; 2026 <strong>SIAKAD Universitas 'Aisyiyah Yogyakarta</strong>. All rights reserved.
          </small>
          <small className="text-secondary">
            Responsi 1 Pemrograman Fullstack &bull; Dosen: <strong>Wildan Muhammad Ardana, S.Kom., M.Kom.</strong>
          </small>
        </footer>
      </div>

      {/* Modal 1: Tambah / Edit Mahasiswa */}
      {showStudentModal && (
        <StudentModal
          key={studentToEdit ? `edit-${studentToEdit.id}` : 'add-new'}
          show={showStudentModal}
          handleClose={() => {
            setShowStudentModal(false);
            setStudentToEdit(null);
          }}
          onSave={studentToEdit ? handleEditStudent : handleAddStudent}
          studentToEdit={studentToEdit}
        />
      )}

      {/* Modal 2: Input Nilai & KHS */}
      {showGradeModal && selectedStudentForGrade && (
        <GradeModal
          key={`grade-${selectedStudentForGrade.id}`}
          show={showGradeModal}
          handleClose={() => {
            setShowGradeModal(false);
            setSelectedStudentForGrade(null);
          }}
          student={selectedStudentForGrade}
          onUpdateStudentCourses={handleUpdateStudentCourses}
        />
      )}

      {/* Modal 3: Konfirmasi Hapus */}
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
      />

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1060 }}>
        {toastInfo && (
          <Toast
            onClose={() => setToastInfo(null)}
            show={!!toastInfo}
            delay={3500}
            autohide
            bg={toastInfo.variant}
          >
            <Toast.Header closeButton>
              <i className="bi bi-info-circle-fill me-2 text-primary"></i>
              <strong className="me-auto">SIAKAD Notifikasi</strong>
              <small className="text-muted">Baru saja</small>
            </Toast.Header>
            <Toast.Body className={toastInfo.variant === 'light' ? 'text-dark' : 'text-white'}>
              {toastInfo.message}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </div>
  );
}

export default App;

