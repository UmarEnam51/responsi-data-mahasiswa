import { Row, Col, Card } from 'react-bootstrap';

const StatCards = ({ students }) => {
  const total = students.length;
  const activeCount = students.filter((s) => s.status === 'Aktif').length;
  const leaveCount = students.filter((s) => s.status === 'Cuti').length;
  const graduatedCount = students.filter((s) => s.status === 'Lulus').length;

  const avgIpk = total > 0
    ? (students.reduce((acc, curr) => acc + (parseFloat(curr.ipk) || 0), 0) / total).toFixed(2)
    : '0.00';

  const cumlaudeCount = students.filter((s) => parseFloat(s.ipk) >= 3.75).length;

  const stats = [
    {
      title: 'Total Mahasiswa',
      value: total,
      subtext: `${activeCount} mahasiswa aktif`,
      icon: 'bi-people-fill',
      bgGradient: 'stat-gradient-blue',
      textColor: 'text-primary',
    },
    {
      title: 'Status Aktif',
      value: activeCount,
      subtext: `${leaveCount} cuti, ${graduatedCount} lulus`,
      icon: 'bi-person-check-fill',
      bgGradient: 'stat-gradient-green',
      textColor: 'text-success',
    },
    {
      title: 'Rata-rata IPK',
      value: avgIpk,
      subtext: 'Skala Indeks 4.00',
      icon: 'bi-mortarboard-fill',
      bgGradient: 'stat-gradient-purple',
      textColor: 'text-purple',
    },
    {
      title: 'Kandidat Cumlaude',
      value: cumlaudeCount,
      subtext: 'IPK ≥ 3.75 (Prestasi Tinggi)',
      icon: 'bi-award-fill',
      bgGradient: 'stat-gradient-amber',
      textColor: 'text-warning',
    },
  ];

  return (
    <Row className="g-3 mb-4">
      {stats.map((stat, idx) => (
        <Col key={idx} xs={12} sm={6} lg={3}>
          <Card className={`stat-card h-100 border-0 shadow-sm ${stat.bgGradient}`}>
            <Card.Body className="p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="stat-card-title text-uppercase fw-bold small text-secondary">
                  {stat.title}
                </span>
                <h3 className="stat-card-value fw-bold mb-1 mt-1 text-dark">
                  {stat.value}
                </h3>
                <small className="stat-card-sub text-muted" style={{ fontSize: '0.75rem' }}>
                  {stat.subtext}
                </small>
              </div>
              <div className={`stat-icon-wrapper ${stat.textColor}`}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
