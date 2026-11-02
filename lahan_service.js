const lahanDataset = [
  { id: 1, nama: "Plot Sawah Argopuro A1", jenis: "Padi", luas: 2500, hasil: 5000, status: true },
  { id: 2, nama: "Lahan Ladang Tejakula B2", jenis: "Jagung", luas: 1800, hasil: 3200, status: true },
  { id: 3, nama: "Kebun Horti Ijen C3", jenis: "Cabai", luas: 1000, hasil: 1500, status: false },
  { id: 4, nama: "Plot Naga Banyuwangi D4", jenis: "Buah Naga", luas: 3000, hasil: 6500, status: true },
  { id: 5, nama: "Sawah Irigasi Rogojampi E5", jenis: "Padi", luas: 2000, hasil: 4200, status: true }
];

export const getDataset = () => lahanDataset;

export const filterLahan = (searchTerm = '', categoryValue = 'ALL') => {
  const term = searchTerm.trim().toLowerCase();
  return lahanDataset.filter(item => {
    const namaLahan = item.nama ? item.nama.toLowerCase() : '';
    const isNameMatch = namaLahan.includes(term);
    const isCategoryMatch = (categoryValue === 'ALL' || item.jenis === categoryValue);
    return isNameMatch && isCategoryMatch;
  });
};

export const calculateSummary = () => {
  const totalPlot = lahanDataset.length;
  const totalLuas = lahanDataset.reduce((acc, curr) => acc + (curr.luas || 0), 0);
  const totalHasil = lahanDataset.reduce((acc, curr) => acc + (curr.hasil || 0), 0);

  return { totalPlot, totalLuas, totalHasil };
};

export const addLahan = (newLahan) => {
  newLahan.id = lahanDataset.length > 0 ? Math.max(...lahanDataset.map(l => l.id)) + 1 : 1;
  newLahan.status = true;
  lahanDataset.push(newLahan);
  return newLahan;
};

export const updateLahan = (id, updatedData) => {
  const index = lahanDataset.findIndex(l => l.id === id);
  if (index !== -1) {
    lahanDataset[index] = { ...lahanDataset[index], ...updatedData };
    return true;
  }
  return false;
};

export const deleteLahan = (id) => {
  const index = lahanDataset.findIndex(l => l.id === id);
  if (index !== -1) {
    return lahanDataset.splice(index, 1)[0];
  }
  return null;
};