/**
 * Derslig Ürün Kartı Render Motoru (productEngine.js)
 * ====================================================
 * Yönetim panelinden (admin.html) girilen ürün ve ürün kartı verilerini
 * okuyarak vitrinde (index.html) tişört kartlarını dinamik olarak render eder.
 *
 * Kullanım:
 *   <div id="derslig-koleksiyon" data-page-id="Ana Sayfa"></div>
 *   <script src="productEngine.js"></script>
 */

(function () {
  'use strict';

  // ─── VARSAYILAN ÜRÜNLER (6 tişört) ───
  const DEFAULT_PRODUCTS = [
    {
      id: 1, tur: 'Tekil Ürün', kategori: 'Öğretmen Koleksiyonu',
      urunAdi: 'Aydınlık Gelecek', aciklama: 'Öğretmen bir mum gibidir; kendi yanarken öğrencilerine ışık saçar.',
      urunUcreti: 0, ciziliUcret: 0,
      tasarimGorsel: 'landing_assets/landing_design_1.png',
      tshirtGorsel: 'landing_assets/tshirt_erkek.png',
      tasarimGenisligi: 12,
      fiyatYazisi: 'Sınırlı Üretim',
      taksitSayisi: 0, gecerliAy: 0, gecerliGun: 0,
      aktivasyonOnEki: '', muhasebeKodu: '', muhasebeTipi: 'Hizmet',
      kdvOrani: 20, kullanimMiktari: 'Sınırsız',
      createdAt: '2026-01-01'
    },
    {
      id: 2, tur: 'Tekil Ürün', kategori: 'Öğretmen Koleksiyonu',
      urunAdi: 'Tatil Molası', aciklama: 'Ders aralarında sıcak bir kahve ve tatil hayalleri...',
      urunUcreti: 0, ciziliUcret: 0,
      tasarimGorsel: 'landing_assets/landing_design_2.png',
      tshirtGorsel: 'landing_assets/tshirt_erkek.png',
      tasarimGenisligi: 14,
      fiyatYazisi: 'Sınırlı Üretim',
      taksitSayisi: 0, gecerliAy: 0, gecerliGun: 0,
      aktivasyonOnEki: '', muhasebeKodu: '', muhasebeTipi: 'Hizmet',
      kdvOrani: 20, kullanimMiktari: 'Sınırsız',
      createdAt: '2026-01-01'
    },
    {
      id: 3, tur: 'Tekil Ürün', kategori: 'Öğretmen Koleksiyonu',
      urunAdi: 'Kırmızı Kalemin Tatili', aciklama: 'Bütün yıl durmadan yazan o kırmızı kalem artık dinleniyor.',
      urunUcreti: 0, ciziliUcret: 0,
      tasarimGorsel: 'landing_assets/landing_design_3.png',
      tshirtGorsel: 'landing_assets/tshirt_erkek.png',
      tasarimGenisligi: 14,
      fiyatYazisi: 'Sınırlı Üretim',
      taksitSayisi: 0, gecerliAy: 0, gecerliGun: 0,
      aktivasyonOnEki: '', muhasebeKodu: '', muhasebeTipi: 'Hizmet',
      kdvOrani: 20, kullanimMiktari: 'Sınırsız',
      createdAt: '2026-01-01'
    },
    {
      id: 4, tur: 'Tekil Ürün', kategori: 'Öğretmen Koleksiyonu',
      urunAdi: 'Tatil Hesabı', aciklama: '"Öğretmenler 3 ay tatil yapıyor" efsanesine son noktayı koyan ispat.',
      urunUcreti: 0, ciziliUcret: 0,
      tasarimGorsel: 'landing_assets/landing_design_4.png',
      tshirtGorsel: 'landing_assets/tshirt_erkek.png',
      tasarimGenisligi: 13,
      fiyatYazisi: 'Sınırlı Üretim',
      taksitSayisi: 0, gecerliAy: 0, gecerliGun: 0,
      aktivasyonOnEki: '', muhasebeKodu: '', muhasebeTipi: 'Hizmet',
      kdvOrani: 20, kullanimMiktari: 'Sınırsız',
      createdAt: '2026-01-01'
    },
    {
      id: 5, tur: 'Tekil Ürün', kategori: 'Öğretmen Koleksiyonu',
      urunAdi: 'Teacher Mode OFF', aciklama: 'Okul zili çaldı, tatil başladı! Öğretmen Modu kapalı konumda.',
      urunUcreti: 0, ciziliUcret: 0,
      tasarimGorsel: 'landing_assets/landing_design_5.png',
      tshirtGorsel: 'landing_assets/tshirt_erkek.png',
      tasarimGenisligi: 13,
      fiyatYazisi: 'Sınırlı Üretim',
      taksitSayisi: 0, gecerliAy: 0, gecerliGun: 0,
      aktivasyonOnEki: '', muhasebeKodu: '', muhasebeTipi: 'Hizmet',
      kdvOrani: 20, kullanimMiktari: 'Sınırsız',
      createdAt: '2026-01-01'
    },
    {
      id: 6, tur: 'Tekil Ürün', kategori: 'Öğretmen Koleksiyonu',
      urunAdi: 'Kalemden Kanatlara', aciklama: 'Öğretmenin kaleminden dökülen bilgi, gökyüzüne kanat çırpan kuşa dönüşür.',
      urunUcreti: 0, ciziliUcret: 0,
      tasarimGorsel: 'landing_assets/landing_design_6.png',
      tshirtGorsel: 'landing_assets/tshirt_erkek.png',
      tasarimGenisligi: 14,
      fiyatYazisi: 'Sınırlı Üretim',
      taksitSayisi: 0, gecerliAy: 0, gecerliGun: 0,
      aktivasyonOnEki: '', muhasebeKodu: '', muhasebeTipi: 'Hizmet',
      kdvOrani: 20, kullanimMiktari: 'Sınırsız',
      createdAt: '2026-01-01'
    }
  ];

  const DEFAULT_CARDS = [
    {
      id: 101, productId: 1, tur: 'Ürün',
      gecerliSiniflar: [], etiket: '⭐ En Popüler', etiketStil: 'teal',
      siralama: 1, hedefSayfalar: ['Ana Sayfa', 'Mağaza'],
      paketDetayi: '', ozellikler: [
        { text: '%100 Organik Pamuk', highlighted: true },
        { text: 'Nefes alan kumaş yapısı', highlighted: false },
        { text: 'Özel tasarım baskı', highlighted: true },
        { text: 'Uzun ömürlü renkler', highlighted: false }
      ]
    },
    {
      id: 102, productId: 2, tur: 'Ürün',
      gecerliSiniflar: [], etiket: 'Yeni', etiketStil: 'teal',
      siralama: 2, hedefSayfalar: ['Ana Sayfa', 'Mağaza'],
      paketDetayi: '', ozellikler: [
        { text: '%100 Organik Pamuk', highlighted: true },
        { text: 'Nefes alan kumaş yapısı', highlighted: false },
        { text: 'Özel tasarım baskı', highlighted: true },
        { text: 'Uzun ömürlü renkler', highlighted: false }
      ]
    },
    {
      id: 103, productId: 3, tur: 'Ürün',
      gecerliSiniflar: [], etiket: '', etiketStil: 'teal',
      siralama: 3, hedefSayfalar: ['Ana Sayfa', 'Mağaza'],
      paketDetayi: '', ozellikler: [
        { text: '%100 Organik Pamuk', highlighted: true },
        { text: 'Nefes alan kumaş yapısı', highlighted: false },
        { text: 'Özel tasarım baskı', highlighted: true },
        { text: 'Uzun ömürlü renkler', highlighted: false }
      ]
    },
    {
      id: 104, productId: 4, tur: 'Ürün',
      gecerliSiniflar: [], etiket: '', etiketStil: 'teal',
      siralama: 4, hedefSayfalar: ['Ana Sayfa', 'Mağaza'],
      paketDetayi: '', ozellikler: [
        { text: '%100 Organik Pamuk', highlighted: true },
        { text: 'Nefes alan kumaş yapısı', highlighted: false },
        { text: 'Özel tasarım baskı', highlighted: true },
        { text: 'Uzun ömürlü renkler', highlighted: false }
      ]
    },
    {
      id: 105, productId: 5, tur: 'Ürün',
      gecerliSiniflar: [], etiket: '', etiketStil: 'teal',
      siralama: 5, hedefSayfalar: ['Ana Sayfa', 'Mağaza'],
      paketDetayi: '', ozellikler: [
        { text: '%100 Organik Pamuk', highlighted: true },
        { text: 'Nefes alan kumaş yapısı', highlighted: false },
        { text: 'Özel tasarım baskı', highlighted: true },
        { text: 'Uzun ömürlü renkler', highlighted: false }
      ]
    },
    {
      id: 106, productId: 6, tur: 'Ürün',
      gecerliSiniflar: [], etiket: 'Misyon', etiketStil: 'gold',
      siralama: 6, hedefSayfalar: ['Ana Sayfa', 'Mağaza'],
      paketDetayi: '', ozellikler: [
        { text: '%100 Organik Pamuk', highlighted: true },
        { text: 'Nefes alan kumaş yapısı', highlighted: false },
        { text: 'Özel tasarım baskı', highlighted: true },
        { text: 'Uzun ömürlü renkler', highlighted: false }
      ]
    }
  ];

  // ─── VERİ KATMANI ───
  const DB_VERSION = 4;
  if (localStorage.getItem('derslig_db_ver') != DB_VERSION) {
    localStorage.removeItem('derslig_products');
    localStorage.removeItem('derslig_product_cards');
    localStorage.setItem('derslig_db_ver', DB_VERSION);
  }

  function getProducts() {
    let data = localStorage.getItem('derslig_products');
    if (!data) {
      localStorage.setItem('derslig_products', JSON.stringify(DEFAULT_PRODUCTS));
      return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    }
    return JSON.parse(data);
  }

  function getProductCards() {
    let data = localStorage.getItem('derslig_product_cards');
    if (!data) {
      localStorage.setItem('derslig_product_cards', JSON.stringify(DEFAULT_CARDS));
      return JSON.parse(JSON.stringify(DEFAULT_CARDS));
    }
    return JSON.parse(data);
  }

  function getProductById(id) {
    return getProducts().find(p => p.id === id);
  }

  // ─── FİLTRELEME ───
  function filterCards(pageId, classFilter) {
    let cards = getProductCards();

    // Hedef sayfa filtresi
    if (pageId) {
      cards = cards.filter(c =>
        c.hedefSayfalar && c.hedefSayfalar.includes(pageId)
      );
    }

    // Sınıf filtresi (boş array = tüm sınıflar)
    if (classFilter) {
      const cls = parseInt(classFilter);
      if (!isNaN(cls)) {
        cards = cards.filter(c =>
          !c.gecerliSiniflar || c.gecerliSiniflar.length === 0 || c.gecerliSiniflar.includes(cls)
        );
      }
    }

    // Sıralama
    cards.sort((a, b) => (a.siralama || 0) - (b.siralama || 0));

    return cards;
  }

  // ─── YARDIMCI ───
  function formatPrice(price) {
    if (!price) return '';
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  }

  // ─── TİŞÖRT KART HTML ───
  function buildTshirtCardHTML(card, product, delayClass) {
    const hasDetail = card.paketDetayi && card.paketDetayi.trim().length > 0;

    // Etiket (badge) kaldırıldı (kullanıcı talebi)
    let badgeHTML = '';

    // Fiyat veya özel yazı
    let priceText = product.fiyatYazisi || '';
    if (product.urunUcreti && product.urunUcreti > 0) {
      priceText = formatPrice(product.urunUcreti);
      if (product.ciziliUcret && product.ciziliUcret > product.urunUcreti) {
        priceText = `<span style="text-decoration:line-through;color:#d1d5db;margin-right:6px;font-size:10px">${formatPrice(product.ciziliUcret)}</span> ${priceText}`;
      }
    }

    // Tasarım genişliği küçültüldü (MVP tasarımsal görünüm)
    const dw = (product.tasarimGenisligi || 14) * 0.65;

    // Özellikler (varsa kartın altında göster)
    let featuresHTML = '';
    if (card.ozellikler && card.ozellikler.length > 0) {
      featuresHTML = '<div class="card-features">';
      card.ozellikler.forEach(o => {
        featuresHTML += `<span>✓ ${o.text}</span>`;
      });
      featuresHTML += '</div>';
    }

    // Paketi İncele butonu
    let detailBtnHTML = '';
    if (hasDetail) {
      detailBtnHTML = `<button class="card-detail-btn" onclick="event.preventDefault();event.stopPropagation();DersligEngine.showDetail(${card.id})">Tasarımı İncele</button>`;
    }

    return `
      <div class="product-card reveal ${delayClass}" data-card-id="${card.id}" data-product-id="${card.productId}">
        <div class="card-img">
          ${badgeHTML}
          <img src="${product.tshirtGorsel || 'landing_assets/tshirt_erkek.png'}" alt="Tişört" class="tshirt-preview">
          <img src="${product.tasarimGorsel}" alt="${product.urunAdi}" class="design-preview" style="width:${dw}%">
          <img src="${product.tasarimGorsel}" alt="${product.urunAdi}" class="hover-img">
        </div>
        <div class="card-body">
          <div class="card-name">${product.urunAdi}</div>
          <div class="card-desc">${product.aciklama || ''}</div>
          ${featuresHTML}
          <div style="display:flex; gap:8px; margin-bottom:12px;">
            <select id="size-${product.id}" onclick="event.stopPropagation()" style="padding:6px; border:1.5px solid #e5e7eb; border-radius:6px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; color:#4b5563; flex:1; outline:none; cursor:pointer;">
              <option value="S">Beden: S</option>
              <option value="M" selected>Beden: M</option>
              <option value="L">Beden: L</option>
              <option value="XL">Beden: XL</option>
            </select>
            <select id="color-${product.id}" onclick="event.stopPropagation()" onchange="DersligEngine.updateCardColor(${product.id}, this.value)" style="padding:6px; border:1.5px solid #e5e7eb; border-radius:6px; font-family:'Nunito',sans-serif; font-size:12px; font-weight:700; color:#4b5563; flex:1; outline:none; cursor:pointer;">
              <option value="#FFFFFF">Renk: Beyaz</option>
              <option value="#111827">Renk: Siyah</option>
            </select>
          </div>
          <div class="card-footer">
            <span class="card-price">${priceText}</span>
            <button onclick="event.preventDefault();event.stopPropagation();DersligEngine.addToCartMVP(${product.id})" class="card-btn" style="border:none;cursor:pointer;font-family:'Nunito',sans-serif">Sepete Ekle</button>
          </div>
          ${detailBtnHTML}
        </div>
      </div>`;
  }

  // ─── DETAY MODAL ───
  function showDetailModal(cardId) {
    const card = getProductCards().find(c => c.id === cardId);
    if (!card) return;
    const product = getProductById(card.productId);
    if (!product) return;

    const existing = document.getElementById('derslig-detail-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'derslig-detail-modal';
    modal.className = 'derslig-modal-overlay';
    modal.onclick = function (e) { if (e.target === modal) closeDetailModal(); };
    modal.innerHTML = `
      <div class="derslig-modal">
        <div class="derslig-modal-header">
          <h2>${product.urunAdi}</h2>
          <button class="derslig-modal-close" onclick="DersligEngine.closeDetail()">&times;</button>
        </div>
        <div class="derslig-modal-body">
          ${card.paketDetayi}
        </div>
        <div class="derslig-modal-footer">
          <button onclick="DersligEngine.showDesign(${product.id})" class="card-btn" style="display:inline-block;border:none;cursor:pointer;font-family:'Nunito',sans-serif">Tasarımı Seç →</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    const modal = document.getElementById('derslig-detail-modal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
      document.body.style.overflow = '';
    }
  }

  // ─── MVP SEÇİM ───
  function updateCardColor(productId, hex) {
    const cardContainer = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if(cardContainer) {
       const img = cardContainer.querySelector('.tshirt-preview');
       if(hex === '#FFFFFF') img.style.filter = 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))';
       if(hex === '#111827') img.style.filter = 'invert(0.9) brightness(0.2) drop-shadow(0 10px 15px rgba(0,0,0,0.5))';
    }
  }

  function addToCartMVP(productId) {
    const sizeSelect = document.getElementById(`size-${productId}`);
    const colorSelect = document.getElementById(`color-${productId}`);
    
    window._selProductId = productId;
    window._selSize = sizeSelect ? sizeSelect.value : 'M';
    window._selColor = colorSelect ? colorSelect.value : '#FFFFFF';
    window._selPos = 'Ön Büyük';
    
    showCheckoutModal();
  }

  // ─── TASARIM SEÇİM MODAL ───
  window._selColor = '#FFFFFF';
  window._selSize = 'M';
  window._selView = 'Erkek';
  window._selPos = 'Ön Büyük';
  window._selProductId = null;
  
  function showDesignModal(productId) {
    window._selProductId = productId;
    const product = getProductById(productId);
    if (!product) return;
    
    // Varsa eskisini kaldır
    closeDesignModal();

    const dw = product.tasarimGenisligi || 14;
    
    const modal = document.createElement('div');
    modal.id = 'derslig-design-modal';
    modal.className = 'derslig-modal-overlay';
    // Sadece content alanını kaplaması için dinamik CSS
    modal.style.cssText = `
      position: fixed;
      top: 56px;
      left: 190px;
      width: calc(100% - 190px);
      height: calc(100% - 56px);
      background: rgba(0,0,0,0.4);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    `;
    
    // Mobil uyumluluk
    if(window.innerWidth < 960) {
      modal.style.left = '0';
      modal.style.width = '100%';
    }

    modal.innerHTML = `
      <div class="derslig-modal" style="display:flex; flex-direction:row; max-width:800px; width:95%; height:500px; overflow:hidden; background:#fff; border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,0.15); transform:scale(0.95); transition:transform 0.2s;">
        
        <!-- Sol Canvas Alanı -->
        <div style="flex:1; background:#f9fafb; position:relative; display:flex; align-items:center; justify-content:center; border-right:1px solid #e5e7eb;">
           <img src="${product.tshirtGorsel || 'landing_assets/tshirt_erkek.png'}" id="modalTshirtImg" style="width:75%; max-height:400px; object-fit:contain; filter:drop-shadow(0 10px 15px rgba(0,0,0,0.05)); transition:all 0.3s;">
           <img src="${product.tasarimGorsel}" id="modalDesignImg" style="position:absolute; top:42%; left:50%; transform:translate(-50%,-50%); width:${dw}%; pointer-events:none; transition:all 0.3s;">
        </div>
        
        <!-- Sağ Seçim Alanı -->
        <div style="width:360px; display:flex; flex-direction:column; padding:32px;">
           <button onclick="DersligEngine.closeDesign()" style="position:absolute; top:16px; right:16px; background:none; border:none; font-size:24px; color:#9ca3af; cursor:pointer;">&times;</button>
           
           <h2 style="font-size:24px; font-weight:900; color:#111827; margin-bottom:8px;">${product.urunAdi}</h2>
           <p style="font-size:13px; color:#6b7280; margin-bottom:24px; line-height:1.5;">${product.aciklama || ''}</p>
           
           <div style="font-size:22px; font-weight:800; color:#09b0b9; margin-bottom:24px;">${formatPrice(product.urunUcreti) || 'Sınırlı Üretim'}</div>
           
           <div style="margin-bottom:20px;">
             <div style="font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">Baskı Konumu</div>
             <div style="display:flex; gap:8px;">
               <div onclick="DersligEngine.pickModalPos(this, 'Ön Büyük')" class="modal-pos-btn active" style="padding:6px 16px; border:2px solid #09b0b9; background:#09b0b9; color:#fff; border-radius:8px; font-weight:700; cursor:pointer; font-size:13px;">Ön Büyük</div>
               <div onclick="DersligEngine.pickModalPos(this, 'Sol Göğüs')" class="modal-pos-btn" style="padding:6px 16px; border:2px solid #e5e7eb; background:#fff; color:#4b5563; border-radius:8px; font-weight:700; cursor:pointer; font-size:13px;">Sol Göğüs</div>
             </div>
           </div>

           <div style="margin-bottom:20px;">
             <div style="font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">Renk Seçimi</div>
             <div style="display:flex; gap:12px;">
               <div onclick="DersligEngine.pickModalColor(this, '#FFFFFF')" class="modal-color-btn active" style="width:32px; height:32px; border-radius:50%; background:#FFF; border:2px solid #e5e7eb; cursor:pointer;"></div>
               <div onclick="DersligEngine.pickModalColor(this, '#111827')" class="modal-color-btn" style="width:32px; height:32px; border-radius:50%; background:#111827; border:2px solid #e5e7eb; cursor:pointer;"></div>
             </div>
           </div>
           
           <div style="margin-bottom:32px;">
             <div style="font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">Beden Seçimi</div>
             <div style="display:flex; gap:8px;">
               <div onclick="DersligEngine.pickModalSize(this, 'S')" class="modal-size-btn" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border:2px solid #09b0b9; background:#09b0b9; color:#fff; border-radius:8px; font-weight:700; cursor:pointer;">S</div>
               <div onclick="DersligEngine.pickModalSize(this, 'M')" class="modal-size-btn" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border:2px solid #e5e7eb; background:#fff; color:#4b5563; border-radius:8px; font-weight:700; cursor:pointer;">M</div>
               <div onclick="DersligEngine.pickModalSize(this, 'L')" class="modal-size-btn" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border:2px solid #e5e7eb; background:#fff; color:#4b5563; border-radius:8px; font-weight:700; cursor:pointer;">L</div>
               <div onclick="DersligEngine.pickModalSize(this, 'XL')" class="modal-size-btn" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border:2px solid #e5e7eb; background:#fff; color:#4b5563; border-radius:8px; font-weight:700; cursor:pointer;">XL</div>
             </div>
           </div>
           
           <button onclick="DersligEngine.addToCartFromModal()" style="margin-top:auto; background:#E50069; color:#fff; border:none; padding:16px; border-radius:12px; font-weight:800; font-size:15px; font-family:'Nunito',sans-serif; cursor:pointer; width:100%; transition:background 0.2s;">Sepete Ekle</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Pencere yeniden boyutlandırıldığında modalın da sol menüye göre ayarlanması
    window._modalResizeHandler = function() {
      if(window.innerWidth < 960) {
        modal.style.left = '0';
        modal.style.width = '100%';
      } else {
        modal.style.left = '190px';
        modal.style.width = 'calc(100% - 190px)';
      }
    };
    window.addEventListener('resize', window._modalResizeHandler);

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modal.querySelector('.derslig-modal').style.transform = 'scale(1)';
    });
  }

  function closeDesignModal() {
    const modal = document.getElementById('derslig-design-modal');
    if (modal) {
      modal.style.opacity = '0';
      modal.querySelector('.derslig-modal').style.transform = 'scale(0.95)';
      setTimeout(() => {
        modal.remove();
        if(window._modalResizeHandler) {
          window.removeEventListener('resize', window._modalResizeHandler);
        }
      }, 200);
    }
  }
  
  function pickModalColor(btn, hex) {
    document.querySelectorAll('.modal-color-btn').forEach(b => {
      b.style.borderColor = '#e5e7eb';
      b.classList.remove('active');
    });
    btn.style.borderColor = '#09b0b9';
    btn.classList.add('active');
    window._selColor = hex;
    
    const img = document.getElementById('modalTshirtImg');
    if(hex === '#FFFFFF') img.style.filter = 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))';
    if(hex === '#111827') img.style.filter = 'invert(0.9) brightness(0.2) drop-shadow(0 10px 15px rgba(0,0,0,0.5))';
  }
  
  function pickModalSize(btn, size) {
    window._selSize = size;
    const btns = document.querySelectorAll('.modal-size-btn');
    btns.forEach(b => {
      b.style.borderColor = '#e5e7eb';
      b.style.background = '#fff';
      b.style.color = '#4b5563';
      b.classList.remove('active');
    });
    btn.style.borderColor = '#09b0b9';
    btn.style.background = '#09b0b9';
    btn.style.color = '#fff';
    btn.classList.add('active');
  }

  function pickModalPos(btn, pos) {
    window._selPos = pos;
    const btns = document.querySelectorAll('.modal-pos-btn');
    btns.forEach(b => {
      b.style.borderColor = '#e5e7eb';
      b.style.background = '#fff';
      b.style.color = '#4b5563';
      b.classList.remove('active');
    });
    btn.style.borderColor = '#09b0b9';
    btn.style.background = '#09b0b9';
    btn.style.color = '#fff';
    btn.classList.add('active');
    
    const designImg = document.getElementById('modalDesignImg');
    if (designImg) {
      if (pos === 'Sol Göğüs') {
        designImg.style.top = '32%';
        designImg.style.left = '60%';
        designImg.style.width = '12%';
      } else {
        designImg.style.top = '42%';
        designImg.style.left = '50%';
        designImg.style.width = '35%';
      }
    }
  }
  
  function addToCartFromModal() {
    closeDesignModal();
    showCheckoutModal(window._selProductId, window._selColor, window._selSize);
  }
  
  // ─── SİPARİŞ / CHECKOUT MODAL ───
  function showCheckoutModal(productId, colorHex, size) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.id = 'derslig-checkout-modal';
    modal.className = 'derslig-modal-overlay';
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
      padding: 20px;
    `;
    
    const colorNames = { '#FFFFFF': 'Beyaz', '#111827': 'Siyah', '#9ca3af': 'Gri' };
    const cName = colorNames[colorHex] || 'Özel';
    
    // Öğretmen bilgileri Derslig'den geliyormuş gibi (Mock Data)
    const teacherData = {
      name: 'Onur Kaya',
      email: 'onur.kaya@derslig.com',
      phone: '+90 555 123 4567',
      school: 'Atatürk Anadolu Lisesi'
    };

    modal.innerHTML = `
      <div class="derslig-modal" style="background:#fff; border-radius:16px; width:100%; max-width:540px; box-shadow:0 20px 60px rgba(0,0,0,0.2); transform:scale(0.95); transition:transform 0.2s; display:flex; flex-direction:column; max-height:90vh;">
        <div style="padding:24px 32px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; background:#fff; border-radius:16px 16px 0 0; z-index:10;">
          <h2 style="font-size:20px; font-weight:900; color:#111827; margin:0;">Siparişi Tamamla</h2>
          <button onclick="document.getElementById('derslig-checkout-modal').remove()" style="background:none; border:none; font-size:28px; color:#9ca3af; cursor:pointer; line-height:1;">&times;</button>
        </div>
        
        <div style="padding:32px; overflow-y:auto;">
          <!-- Sipariş Özeti -->
          <div style="background:#f0fdfa; border:1px solid rgba(9,176,185,0.2); padding:16px 20px; border-radius:12px; margin-bottom:28px; display:flex; gap:16px; align-items:center;">
            <div style="width:60px; height:60px; background:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.05); padding:8px;">
               <img src="\${product.tasarimGorsel}" style="max-width:100%; max-height:100%; object-fit:contain;">
            </div>
            <div>
              <div style="font-size:15px; font-weight:800; color:#111827; margin-bottom:4px;">\${product.urunAdi}</div>
              <div style="font-size:13px; font-weight:700; color:#09b0b9;">Beden: \${size} &nbsp;|&nbsp; Renk: \${cName}</div>
            </div>
          </div>
          
          <div style="font-size:14px; font-weight:800; color:#374151; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09b0b9" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Öğretmen Bilgileri <span style="font-size:11px; font-weight:700; color:#10b981; background:#d1fae5; padding:2px 8px; border-radius:4px; margin-left:auto;">Otomatik Dolduruldu</span>
          </div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#6b7280; margin-bottom:6px;">Ad Soyad</label>
              <input type="text" value="\${teacherData.name}" readonly style="width:100%; padding:12px 16px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; font-family:'Nunito',sans-serif; font-weight:600; color:#4b5563; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#6b7280; margin-bottom:6px;">Telefon</label>
              <input type="text" value="\${teacherData.phone}" readonly style="width:100%; padding:12px 16px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; font-family:'Nunito',sans-serif; font-weight:600; color:#4b5563; outline:none;">
            </div>
          </div>
          
          <div style="margin-bottom:28px;">
            <label style="display:block; font-size:12px; font-weight:700; color:#6b7280; margin-bottom:6px;">Görev Yapılan Okul</label>
            <input type="text" value="\${teacherData.school}" readonly style="width:100%; padding:12px 16px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; font-family:'Nunito',sans-serif; font-weight:600; color:#4b5563; outline:none;">
          </div>
          
          <div style="font-size:14px; font-weight:800; color:#374151; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09b0b9" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Teslimat Adresi
          </div>
          
          <div>
            <textarea id="derslig-checkout-address" rows="3" placeholder="Siparişinizin teslim edilmesini istediğiniz tam adresi giriniz..." style="width:100%; padding:16px; border:1.5px solid #d1d5db; border-radius:8px; font-family:'Nunito',sans-serif; font-size:14px; color:#111827; resize:vertical; outline:none; transition:border-color 0.2s;" onfocus="this.style.borderColor='#09b0b9'" oninput="document.getElementById('address-error').style.display='none'; this.style.borderColor='#09b0b9'"></textarea>
            <div id="address-error" style="display:none; color:#ef4444; font-size:12px; font-weight:700; margin-top:6px; margin-left:4px;">Lütfen teslimat adresinizi giriniz.</div>
          </div>
        </div>
        
        <div style="padding:24px 32px; border-top:1px solid #e5e7eb; background:#f9fafb; border-radius:0 0 16px 16px; display:flex; justify-content:space-between; align-items:center;">
           <div>
             <div style="font-size:12px; color:#6b7280; font-weight:600;">Ödenecek Tutar</div>
             <div style="font-size:24px; font-weight:900; color:#09b0b9;">\${formatPrice(product.urunUcreti) || 'Ücretsiz'}</div>
           </div>
           <button onclick="DersligEngine.submitOrder()" style="background:#E50069; color:#fff; border:none; padding:14px 32px; border-radius:8px; font-weight:800; font-size:15px; font-family:'Nunito',sans-serif; cursor:pointer; box-shadow:0 4px 12px rgba(229,0,105,0.25); transition:transform 0.2s;">Siparişi Onayla</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modal.querySelector('.derslig-modal').style.transform = 'scale(1)';
    });
  }
  
  function submitOrder() {
    const addressInput = document.getElementById('derslig-checkout-address');
    const address = addressInput.value;
    if (!address || address.trim() === '') {
      addressInput.style.borderColor = '#ef4444';
      document.getElementById('address-error').style.display = 'block';
      
      // Hata alanına scroll yap (eğer görünmüyorsa)
      addressInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    // Sipariş başarılı, ödeme ekranına geç
    showPaymentModal();
  }

  function showPaymentModal() {
    const checkoutModal = document.getElementById('derslig-checkout-modal');
    if (checkoutModal) checkoutModal.remove();

    const modal = document.createElement('div');
    modal.id = 'derslig-payment-modal';
    modal.className = 'derslig-modal-overlay';
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    `;

    modal.innerHTML = `
      <div class="derslig-modal" style="background:#fff; border-radius:16px; width:100%; max-width:480px; box-shadow:0 20px 60px rgba(0,0,0,0.2); transform:scale(0.95); transition:transform 0.2s; display:flex; flex-direction:column; max-height:90vh; overflow-y:auto;">
        <div style="padding:24px 32px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; background:#fff; border-radius:16px 16px 0 0; z-index:10;">
          <h2 style="font-size:20px; font-weight:900; color:#111827; margin:0;">Ödeme Bilgileri</h2>
          <button onclick="document.getElementById('derslig-payment-modal').remove()" style="background:none; border:none; font-size:24px; color:#9ca3af; cursor:pointer;">&times;</button>
        </div>
        
        <div style="padding:32px;">
          <div style="margin-bottom:20px;">
            <label style="display:block; font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">Kart Üzerindeki İsim</label>
            <input type="text" placeholder="Ad Soyad" style="width:100%; padding:14px; border:1.5px solid #d1d5db; border-radius:8px; font-family:'Nunito',sans-serif; font-size:14px; outline:none;" onfocus="this.style.borderColor='#09b0b9'" onblur="this.style.borderColor='#d1d5db'">
          </div>
          
          <div style="margin-bottom:20px;">
            <label style="display:block; font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">Kart Numarası</label>
            <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" style="width:100%; padding:14px; border:1.5px solid #d1d5db; border-radius:8px; font-family:'Nunito',sans-serif; font-size:14px; outline:none;" onfocus="this.style.borderColor='#09b0b9'" onblur="this.style.borderColor='#d1d5db'">
          </div>
          
          <div style="display:flex; gap:16px; margin-bottom:32px;">
            <div style="flex:1;">
              <label style="display:block; font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">Son Kullanma (Ay/Yıl)</label>
              <input type="text" placeholder="MM/YY" maxlength="5" style="width:100%; padding:14px; border:1.5px solid #d1d5db; border-radius:8px; font-family:'Nunito',sans-serif; font-size:14px; outline:none;" onfocus="this.style.borderColor='#09b0b9'" onblur="this.style.borderColor='#d1d5db'">
            </div>
            <div style="flex:1;">
              <label style="display:block; font-size:12px; font-weight:800; color:#374151; margin-bottom:8px; text-transform:uppercase;">CVV</label>
              <input type="text" placeholder="123" maxlength="3" style="width:100%; padding:14px; border:1.5px solid #d1d5db; border-radius:8px; font-family:'Nunito',sans-serif; font-size:14px; outline:none;" onfocus="this.style.borderColor='#09b0b9'" onblur="this.style.borderColor='#d1d5db'">
            </div>
          </div>
          
          <button onclick="DersligEngine.completePayment()" style="background:#09b0b9; color:#fff; border:none; padding:16px; border-radius:12px; font-weight:800; font-size:15px; font-family:'Nunito',sans-serif; cursor:pointer; width:100%; transition:background 0.2s; display:flex; align-items:center; justify-content:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Güvenli Ödeme Yap
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modal.querySelector('.derslig-modal').style.transform = 'scale(1)';
    });
  }

  function completePayment() {
    const modal = document.getElementById('derslig-payment-modal');
    if(modal) {
      modal.innerHTML = `
        <div class="derslig-modal" style="background:#fff; border-radius:16px; width:100%; max-width:400px; padding:48px 32px; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.2); transform:scale(1);">
           <div style="width:80px; height:80px; background:#d1fae5; color:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px;">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
           </div>
           <h2 style="font-size:24px; font-weight:900; color:#111827; margin-bottom:12px;">Siparişiniz Alındı!</h2>
           <p style="font-size:14px; color:#6b7280; margin-bottom:32px;">Ödemeniz başarıyla gerçekleşti ve siparişiniz onaylandı. Öğretmen bilgileriniz üzerinden sizinle iletişime geçeceğiz.</p>
           <button onclick="document.getElementById('derslig-payment-modal').remove()" style="background:#f3f4f6; color:#4b5563; border:none; padding:12px 32px; border-radius:8px; font-weight:800; font-size:14px; font-family:'Nunito',sans-serif; cursor:pointer;">Kapat</button>
        </div>
      `;
    }
  }

  // ─── ANA RENDER ───
  function render(containerId) {
    const container = document.getElementById(containerId || 'derslig-koleksiyon');
    if (!container) return;

    const pageId = container.dataset.pageId || null;
    const classFilter = container.dataset.classFilter || null;

    const cards = filterCards(pageId, classFilter);

    if (cards.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:48px 20px;color:#9ca3af">
          <div style="font-size:48px;margin-bottom:12px">📦</div>
          <p style="font-size:14px;font-weight:600">Henüz ürün eklenmemiş. Yönetim panelinden ürün ekleyin.</p>
          <a href="admin.html" style="color:#09b0b9;font-weight:700;font-size:13px">→ Yönetim Paneli</a>
        </div>`;
      return;
    }

    const delays = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];
    let html = '<div class="products-grid">';
    cards.forEach((card, i) => {
      const product = getProductById(card.productId);
      if (product) {
        html += buildTshirtCardHTML(card, product, delays[i % 3]);
      }
    });
    html += '</div>';

    container.innerHTML = html;

    // Scroll reveal animasyonu yeniden tetikle
    const revealEls = container.querySelectorAll('.reveal');
    if (window._dersligObserver) {
      revealEls.forEach(el => window._dersligObserver.observe(el));
    } else {
      // Kendi observer'ımızı kur
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      revealEls.forEach(el => obs.observe(el));
      window._dersligObserver = obs;
    }
  }

  // ─── EK STİLLER ───
  function injectStyles() {
    if (document.getElementById('derslig-engine-styles')) return;
    const style = document.createElement('style');
    style.id = 'derslig-engine-styles';
    style.textContent = `
      /* Kart içi ek özellikler */
      .card-features {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 12px;
      }
      .card-features span {
        font-size: 10px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 4px;
        background: #f0fdfa;
        color: #09b0b9;
      }
      .card-features span.highlighted {
        background: #09b0b9;
        color: #fff;
      }
      .card-detail-btn {
        display: block;
        width: 100%;
        margin-top: 8px;
        padding: 8px;
        border-radius: 8px;
        background: #fff;
        color: #09b0b9;
        font-weight: 700;
        font-size: 12px;
        border: 1.5px solid #09b0b9;
        cursor: pointer;
        font-family: 'Nunito', sans-serif;
        transition: all .2s;
        text-align: center;
      }
      .card-detail-btn:hover {
        background: rgba(9,176,185,.06);
      }

      .derslig-modal-overlay.active .derslig-modal { transform: scale(1); }
      .derslig-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid #f0f0f0;
      }
      .derslig-modal-header h2 { font-size: 18px; font-weight: 900; color: #111827; }
      .derslig-modal-close {
        width: 32px; height: 32px; border-radius: 8px;
        border: 1px solid #e5e7eb; background: #fff;
        font-size: 18px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        color: #9ca3af; font-family: 'Nunito', sans-serif;
      }
      .derslig-modal-close:hover { border-color: #E50069; color: #E50069; }
      .derslig-modal-body {
        padding: 24px;
        font-size: 14px; color: #374151; line-height: 1.7;
      }
      .derslig-modal-footer {
        display: flex; align-items: center; justify-content: flex-end;
        padding: 16px 24px;
        border-top: 1px solid #f0f0f0;
        background: #fafbfc;
        border-radius: 0 0 16px 16px;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── GLOBAL API ───
  window.DersligEngine = {
    render: render,
    showDetail: showDetailModal,
    closeDetail: closeDetailModal,
    showDesign: showDesignModal,
    closeDesign: closeDesignModal,
    pickModalColor: pickModalColor,
    pickModalSize: pickModalSize,
    pickModalPos: pickModalPos,
    addToCartFromModal: addToCartFromModal,
    updateCardColor: updateCardColor,
    addToCartMVP: addToCartMVP,
    showCheckoutModal: showCheckoutModal,
    submitOrder: submitOrder,
    completePayment: completePayment,
    getProducts: getProducts,
    getProductCards: getProductCards,
    filterCards: filterCards,
    resetData: function () {
      localStorage.setItem('derslig_products', JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem('derslig_product_cards', JSON.stringify(DEFAULT_CARDS));
    },
    DEFAULT_PRODUCTS: DEFAULT_PRODUCTS,
    DEFAULT_CARDS: DEFAULT_CARDS
  };

  // ─── OTOMATİK BAŞLATMA ───
  function autoInit() {
    injectStyles();
    // Sayfadaki tüm konteyner div'lerini bul ve render et
    document.querySelectorAll('[id^="derslig-koleksiyon"]').forEach(el => {
      render(el.id);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
