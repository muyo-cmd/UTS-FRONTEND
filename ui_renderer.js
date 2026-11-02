export const renderSummaryUI = (summary) => {
  document.getElementById('stat-total-lahan').textContent = `${summary.totalPlot} Plot`;
  document.getElementById('stat-total-luas').textContent = `${summary.totalLuas.toLocaleString('id-ID')} m²`;
  document.getElementById('stat-total-hasil').textContent = `${summary.totalHasil.toLocaleString('id-ID')} Kg`;
};

export const renderTableUI = (dataset, onEdit, onDelete) => {
  const tbody = document.getElementById('lahan-table-body');
  if (!tbody) return;

  if (dataset.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state" style="text-align:center; padding: 15px; color:#777;">Tidak ada data lahan yang cocok.</td></tr>`;
    return;
  }

  tbody.innerHTML = dataset.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${item.nama}</strong></td>
      <td><span class="badge">${item.jenis}</span></td>
      <td>${item.luas.toLocaleString('id-ID')} m²</td>
      <td>${item.hasil.toLocaleString('id-ID')} Kg</td>
      <td class="action-cell">
        <button class="btn btn-warning btn-sm btn-edit" data-id="${item.id}">Edit</button>
        <button class="btn btn-danger btn-sm btn-delete" data-id="${item.id}">Hapus</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => onEdit(parseInt(btn.getAttribute('data-id'), 10)));
  });
  tbody.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => onDelete(parseInt(btn.getAttribute('data-id'), 10)));
  });
};

export const renderCardsUI = (dataset, onToggleStatus) => {
  const container = document.getElementById('cards-grid-container');
  if (!container) return;
  container.innerHTML = '';

  if (dataset.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1; text-align:center;">Tidak ada card lahan.</p>';
    return;
  }

  dataset.forEach(item => {
    const card = document.createElement('article');
    card.className = 'lahan-card';
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
      <div>
        <div style="display:flex; justify-size:space-between; align-items:center; margin-bottom:8px;">
          <h3 style="font-size:1rem;">${item.nama}</h3>
        </div>
        <p style="font-size:0.85rem; color:#555;">Komoditas: <strong>${item.jenis}</strong></p>
        <p style="font-size:0.85rem; color:#555;">Luas: ${item.luas.toLocaleString('id-ID')} m²</p>
        <p style="font-size:0.85rem; color:#2e7d32; font-weight:bold; margin-top:4px;">Hasil: ${item.hasil.toLocaleString('id-ID')} Kg</p>
      </div>
      <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
        <span class="badge ${item.status ? 'badge-active' : 'badge-inactive'}">
          ${item.status ? '● Aktif' : '○ Istirahat'}
        </span>
        <button class="btn btn-warning btn-sm btn-toggle" data-id="${item.id}">Toggle Status</button>
      </div>
    `;

    card.querySelector('.btn-toggle').addEventListener('click', () => onToggleStatus(item.id));
    container.append(card);
  });
};