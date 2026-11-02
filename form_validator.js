export const validateLahanForm = (formData) => {
  const errors = {};
  
  if (!formData.nama || formData.nama.trim().length < 3) {
    errors.nama = "Nama lahan minimal 3 karakter!";
  }

  if (!formData.jenis) {
    errors.jenis = "Wajib memilih komoditas tanaman!";
  }

  if (isNaN(formData.luas) || formData.luas < 10) {
    errors.luas = "Luas lahan minimal 10 m²!";
  }

  if (isNaN(formData.hasil) || formData.hasil < 1) {
    errors.hasil = "Estimasi hasil panen minimal 1 Kg!";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const displayErrors = (errors) => {
  document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group input, .form-group select').forEach(el => el.classList.remove('invalid'));

  if (errors.nama) {
    document.getElementById('err-nama-lahan').textContent = errors.nama;
    document.getElementById('nama-lahan').classList.add('invalid');
  }
  if (errors.jenis) {
    document.getElementById('err-jenis-tanaman').textContent = errors.jenis;
    document.getElementById('jenis-tanaman').classList.add('invalid');
  }
  if (errors.luas) {
    document.getElementById('err-luas-lahan').textContent = errors.luas;
    document.getElementById('luas-lahan').classList.add('invalid');
  }
  if (errors.hasil) {
    document.getElementById('err-estimasi-panen').textContent = errors.hasil;
    document.getElementById('estimasi-panen').classList.add('invalid');
  }
};