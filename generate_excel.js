const xlsx = require('xlsx');

const designs = [
  { id: 1, code: 'TMOD-OFF', name: 'Teacher Mode OFF', designIdBase: 100, fileKoyu: 'design_teachermode_beyaz.png', fileAcik: 'design_teachermode_siyah.png' },
  { id: 2, code: 'TATIL-H', name: 'Tatil Hesabı', designIdBase: 200, fileKoyu: 'design_2ay3ay_beyaz.png', fileAcik: 'design_2ay3ay_siyah.png' },
  { id: 3, code: 'GERGIN-Y', name: 'Gergin Yay', designIdBase: 300, fileKoyu: 'design_gerginyay_beyaz.png', fileAcik: 'design_gerginyay_siyah.png' },
  { id: 4, code: 'RENKLI-M', name: 'Renkli Matematik', designIdBase: 400, fileKoyu: 'design_teacher_beyaz.png', fileAcik: 'design_teacher_siyah.png' },
  { id: 5, code: 'TATIL-M', name: 'Tatil Modu', designIdBase: 500, fileKoyu: 'design_tatilmodu_beyaz.png', fileAcik: 'design_tatilmodu_siyah.png' }
];

const genders = ['Erkek', 'Kadın'];
const colors = [
  { label: 'Beyaz', hex: '#FFFFFF', colorway: 'Koyu', designOffset: 1 },
  { label: 'Siyah', hex: '#000000', colorway: 'Acik', designOffset: 2 }
];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

// --- 1. VARYANTLAR ---
const variantRows = [];
variantRows.push([
  'variant_key', 'tasarim_kodu', 'tasarim_adi', 'cinsiyet', 'gomlek_renk_label', 'gomlek_renk_hex', 
  'beden', 'productId', 'gender', 'productSize', 'productColor', 'productColorLabel', 
  'designId', 'colorway', 'price_ic_maliyet', 'not'
]);

for (const design of designs) {
  for (const gender of genders) {
    for (const color of colors) {
      for (const size of sizes) {
        const variantKey = `${design.code}-${gender.charAt(0).toUpperCase()}-${color.label.toUpperCase()}-${size}`;
        const designId = design.designIdBase + color.designOffset;
        variantRows.push([
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
          250, 
          'Otomatik dolduruldu'
        ]);
      }
    }
  }
}

// --- 2. TASARIM ŞABLONLARI ---
const templateRows = [];
templateRows.push([
  'designId', 'tasarim_adi', 'colorway', 'gomlek_renk', 'side', 'type', 
  'link', 'linkBig', 'x', 'y', 'width', 'height', 'rotation'
]);

const baseUrl = 'https://onurkaya-ai.github.io/derslig-maarif/landing_assets/';

for (const design of designs) {
  for (const color of colors) {
    const designId = design.designIdBase + color.designOffset;
    const fileName = color.colorway === 'Koyu' ? design.fileKoyu : design.fileAcik;
    templateRows.push([
      designId,
      design.name,
      color.colorway,
      color.label,
      0, // front side
      'photo',
      baseUrl + fileName,
      baseUrl + fileName,
      120, // default x
      80,  // default y
      300, // default width
      400, // default height
      0    // default rotation
    ]);
  }
}

// --- WRITE TO EXCEL ---
const wb = xlsx.readFile('Derslig_Tisho_Varyant_Katalogu.xlsx');

// Replace Varyantlar sheet
const wsVaryant = xlsx.utils.aoa_to_sheet(variantRows);
wsVaryant['!cols'] = [
  { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 18 }, { wch: 15 },
  { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 15 }, { wch: 18 },
  { wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 20 }
];
wb.Sheets['Varyantlar'] = wsVaryant;

// Replace Tasarim_Sablonlari sheet
const wsSablon = xlsx.utils.aoa_to_sheet(templateRows);
wsSablon['!cols'] = [
  { wch: 10 }, { wch: 20 }, { wch: 10 }, { wch: 15 }, { wch: 8 }, { wch: 10 },
  { wch: 60 }, { wch: 60 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }
];
wb.Sheets['Tasarim_Sablonlari'] = wsSablon;

xlsx.writeFile(wb, 'Derslig_Tisho_Varyant_Katalogu.xlsx');
console.log('Excel updated successfully. Variants:', variantRows.length - 1, 'Templates:', templateRows.length - 1);
