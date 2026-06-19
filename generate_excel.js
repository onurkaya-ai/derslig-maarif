const xlsx = require('xlsx');

const designs = [
  { id: 1, code: 'TMOD-OFF', name: 'Teacher Mode OFF', designIdBase: 100 },
  { id: 2, code: 'TATIL-H', name: 'Tatil Hesabı', designIdBase: 200 },
  { id: 3, code: 'GERGIN-Y', name: 'Gergin Yay', designIdBase: 300 },
  { id: 4, code: 'RENKLI-M', name: 'Renkli Matematik', designIdBase: 400 },
  { id: 5, code: 'TATIL-M', name: 'Tatil Modu', designIdBase: 500 }
];

const genders = ['Erkek', 'Kadın'];
const colors = [
  { label: 'Beyaz', hex: '#FFFFFF', colorway: 'Koyu', designOffset: 1 },
  { label: 'Siyah', hex: '#000000', colorway: 'Acik', designOffset: 2 }
];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const rows = [];
rows.push([
  'variant_key', 'tasarim_kodu', 'tasarim_adi', 'cinsiyet', 'gomlek_renk_label', 'gomlek_renk_hex', 
  'beden', 'productId', 'gender', 'productSize', 'productColor', 'productColorLabel', 
  'designId', 'colorway', 'price_ic_maliyet', 'not'
]);

for (const design of designs) {
  for (const gender of genders) {
    for (const color of colors) {
      for (const size of sizes) {
        // e.g. TMOD-OFF-E-BEYAZ-M
        const variantKey = `${design.code}-${gender.charAt(0).toUpperCase()}-${color.label.toUpperCase()}-${size}`;
        const designId = design.designIdBase + color.designOffset;
        rows.push([
          variantKey,
          design.code,
          design.name,
          gender,
          color.label,
          color.hex,
          size,
          design.id,
          gender === 'Kadın' ? 'Kadin' : 'Erkek',
          size,
          color.hex,
          color.label,
          designId,
          color.colorway,
          250, // placeholder cost
          'Otomatik dolduruldu'
        ]);
      }
    }
  }
}

const wb = xlsx.readFile('Derslig_Tisho_Varyant_Katalogu.xlsx');
const ws = xlsx.utils.aoa_to_sheet(rows);

// Ensure column widths look nice
ws['!cols'] = [
  { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 18 }, { wch: 15 },
  { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 15 }, { wch: 18 },
  { wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 20 }
];

wb.Sheets['Varyantlar'] = ws;
xlsx.writeFile(wb, 'Derslig_Tisho_Varyant_Katalogu.xlsx');
console.log('Excel updated successfully. Total variants:', rows.length - 1);
