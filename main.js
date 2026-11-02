import { getDataset, filterLahan, calculateSummary, addLahan, updateLahan, deleteLahan } from './modules/lahan_service.js';
import { validateLahanForm, displayErrors } from './modules/form_validator.js';
import { renderSummaryUI, renderTableUI, renderCardsUI } from './modules/ui_renderer.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("=========================================");
  console.log("🌱 SISTEM MANAJEMEN LAHAN DITERAPKAN (ES MODULES)");
  console.log("Dataset Awal Memori:", getDataset());
  console.log("Statistik Awal (Reduce):", calculateSummary());
  console.log("=========================================");

  const form = document.getElementById('lahan-form');
  const feedback = document.getElementById('form-feedback');
  const previewBox = document.getElementById('live-preview');
  const btnCancel = document.getElementById('btn-cancel');

  const namaInput = document.getElementById('nama-lahan');
  const jenisInput = document.getElementById('jenis-tanaman');
  const luasInput = document.getElementById('luas-lahan');
  const hasilInput = document.getElementById('estimasi-panen');

  const searchInput = document.getElementById('filter-search');
  const categorySelect = document.getElementById('filter-category');

  const refreshUI = () => {
    const filteredData = filterLahan(searchInput.value, categorySelect.value);
    renderTableUI(filteredData, handleEdit, handleDelete);
    renderCardsUI(filteredData, handleToggleStatus);
    
    const summary = calculateSummary();
    renderSummaryUI(summary);

    console.log(`[UI REFRESH] Data Ditampilkan (${filteredData.length} entitas). Total Hasil: ${summary.totalHasil} Kg`);
  };

  document.getElementById('tab-form-btn').addEventListener('click', () => {
    document.getElementById('tab-form-btn').classList.add('active');
    document.getElementById('tab-cards-btn').classList.remove('active');
    document.getElementById('page-form').classList.add('active');
    document.getElementById('page-cards').classList.remove('active');
  });

  document.getElementById('tab-cards-btn').addEventListener('click', () => {
    document.getElementById('tab-cards-btn').classList.add('active');
    document.getElementById('tab-form-btn').classList.remove('active');
    document.getElementById('page-cards').classList.add('active');
    document.getElementById('page-form').classList.remove('active');
  });

  const handleLivePreview = () => {
    const nama = namaInput.value.trim();
    const jenis = jenisInput.value;
    const luas = parseInt(luasInput.value, 10);
    const hasil = parseInt(hasilInput.value, 10);

    if (nama || jenis || !isNaN(luas) || !isNaN(hasil)) {
      previewBox.innerHTML = `<strong>Live Preview:</strong> ${nama || '...'} | Komoditas: ${jenis || '...'} | ${isNaN(luas) ? 0 : luas} m² | Est: ${isNaN(hasil) ? 0 : hasil} Kg`;
    } else {
      previewBox.innerHTML = `<strong>Live Preview:</strong> Belum ada data diinputkan.`;
    }
  };

  namaInput.addEventListener('input', handleLivePreview);
  jenisInput.addEventListener('change', handleLivePreview);
  luasInput.addEventListener('input', handleLivePreview);
  hasilInput.addEventListener('input', handleLivePreview);

  searchInput.addEventListener('input', refreshUI);
  categorySelect.addEventListener('change', refreshUI);

  const handleEdit = (id) => {
    const item = getDataset().find(l => l.id === id);
    if (!item) return;

    document.getElementById('edit-id').value = item.id;
    namaInput.value = item.nama;
    jenisInput.value = item.jenis;
    luasInput.value = item.luas;
    hasilInput.value = item.hasil;

    document.getElementById('form-title').textContent = `Edit Data Lahan #${item.id}`;
    document.getElementById('btn-submit').textContent = "Update Data Lahan";
    btnCancel.classList.remove('hidden');
    handleLivePreview();

    console.log(`[EDIT MODE] Memuat ID ${id} (${item.nama}) ke formulir.`);
  };

  const handleDelete = (id) => {
    const deleted = deleteLahan(id);
    if (deleted) {
      feedback.textContent = `Data lahan '${deleted.nama}' berhasil dihapus.`;
      feedback.className = "feedback-msg success";
      console.log(`[ACTION DELETE] Lahan ID ${id} (${deleted.nama}) dihapus.`);
      refreshUI();
    }
  };

  const handleToggleStatus = (id) => {
    const item = getDataset().find(l => l.id === id);
    if (item) {
      item.status = !item.status;
      console.log(`[ACTION TOGGLE] Status Lahan ID ${id} diubah menjadi: ${item.status ? 'Aktif' : 'Istirahat'}`);
      refreshUI();
    }
  };

  btnCancel.addEventListener('click', () => {
    form.reset();
    document.getElementById('edit-id').value = "";
    document.getElementById('form-title').textContent = "Tambah Data Lahan Baru";
    document.getElementById('btn-submit').textContent = "Simpan Data Lahan";
    btnCancel.classList.add('hidden');
    previewBox.innerHTML = `<strong>Live Preview:</strong> Belum ada data diinputkan.`;
    displayErrors({});
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      nama: namaInput.value.trim(),
      jenis: jenisInput.value,
      luas: parseInt(luasInput.value, 10),
      hasil: parseInt(hasilInput.value, 10)
    };

    const validation = validateLahanForm(formData);
    displayErrors(validation.errors);

    if (!validation.isValid) {
      feedback.textContent = "Mohon perbaiki kesalahan input pada formulir!";
      feedback.className = "feedback-msg error";
      console.warn("[VALIDASI ERROR]", validation.errors);
      return;
    }

    const editId = document.getElementById('edit-id').value;
    if (editId) {
      updateLahan(parseInt(editId, 10), formData);
      feedback.textContent = `Data lahan '${formData.nama}' berhasil diperbarui.`;
      feedback.className = "feedback-msg success";
      console.log(`[ACTION UPDATE] Data Lahan ID ${editId} diperbarui:`, formData);
      btnCancel.click();
    } else {
      const added = addLahan(formData);
      feedback.textContent = `Data lahan '${formData.nama}' berhasil ditambahkan.`;
      feedback.className = "feedback-msg success";
      console.log(`[ACTION ADD] Data Lahan Baru tersimpan:`, added);
      form.reset();
      previewBox.innerHTML = `<strong>Live Preview:</strong> Belum ada data diinputkan.`;
    }

    refreshUI();
  });

  refreshUI();
});