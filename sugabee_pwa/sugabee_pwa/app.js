// ========================================
// SUGABEE PWA · Main App
// ========================================

import { MENU, OFFERS, INSTA, CATEGORIES } from './data.js';

// ====== STATE ======
const State = {
  tab: 'home',
  view: null, // null | 'item' | 'cart' | 'auth' | 'checkout' | 'success' | 'tracking'
  selectedItem: null,
  selectedCat: 'All',
  search: '',
  cart: load('cart', []),
  user: load('user', null),
  orders: load('orders', []),
  appliedOffer: null,
  currentOrder: null,
  notifGranted: load('notifGranted', false),
  notifAsked: load('notifAsked', false),
  deferredInstallPrompt: null,
};

function load(k, def) { try { const v = localStorage.getItem('sb_'+k); return v ? JSON.parse(v) : def; } catch { return def; } }
function save(k, v) { try { localStorage.setItem('sb_'+k, JSON.stringify(v)); } catch {} }

function setState(patch) { Object.assign(State, patch); render(); }
function persistAll() {
  save('cart', State.cart);
  save('user', State.user);
  save('orders', State.orders);
  save('notifGranted', State.notifGranted);
  save('notifAsked', State.notifAsked);
}

// ====== INSTALL PROMPT ======
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  State.deferredInstallPrompt = e;
  // Show install banner after 30s of engagement, only if not already installed
  setTimeout(() => {
    if (!isStandalone() && !load('installDismissed', false)) {
      document.getElementById('install-banner').classList.remove('hidden');
    }
  }, 30000);
});

document.getElementById('install-yes')?.addEventListener('click', async () => {
  if (State.deferredInstallPrompt) {
    State.deferredInstallPrompt.prompt();
    const { outcome } = await State.deferredInstallPrompt.userChoice;
    State.deferredInstallPrompt = null;
    if (outcome === 'accepted') {
      toast({ icon: '🎉', title: 'Installing Sugabee', sub: 'Look on your home screen!', type: 'success' });
    }
  }
  document.getElementById('install-banner').classList.add('hidden');
  save('installDismissed', true);
});

document.getElementById('install-no')?.addEventListener('click', () => {
  document.getElementById('install-banner').classList.add('hidden');
  save('installDismissed', true);
});

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; }

// Show iOS install hint on iOS only
function maybeShowIOSInstall() {
  if (isIOS() && !isStandalone() && !load('iosHintDismissed', false)) {
    setTimeout(() => {
      document.getElementById('ios-install').classList.remove('hidden');
    }, 45000);
  }
}

// ====== NOTIFICATIONS ======
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    toast({ icon: '⚠️', title: 'Notifications unavailable', sub: 'Your browser doesn\'t support this.' });
    return false;
  }
  if (Notification.permission === 'granted') {
    setState({ notifGranted: true, notifAsked: true });
    persistAll();
    return true;
  }
  const result = await Notification.requestPermission();
  const granted = result === 'granted';
  setState({ notifGranted: granted, notifAsked: true });
  persistAll();
  if (granted) {
    toast({ icon: '🔔', title: 'Notifications on!', sub: 'You\'ll know the moment your order updates.', type: 'success' });
    // Send a welcome notification
    setTimeout(() => sendNotification({
      title: 'Welcome to Sugabee 🐝',
      body: 'You\'re all set. We\'ll buzz you with order updates & exclusive offers.',
      tag: 'welcome'
    }), 1500);
  } else {
    toast({ icon: '😔', title: 'Notifications blocked', sub: 'You can enable them later in browser settings.' });
  }
  return granted;
}

function sendNotification({ title, body, tag, url }) {
  if (!State.notifGranted) return;
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SHOW_NOTIFICATION',
      title, body, tag, url
    });
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/icons/icon-192.png', tag });
  }
}

// ====== TOAST ======
function toast({ icon = '🐝', title, sub, type = '', duration = 3500 }) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      ${sub ? `<div class="toast-sub">${sub}</div>` : ''}
    </div>
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ====== ICONS (inline SVG so no external deps) ======
const Icon = {
  home: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  menu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  offers: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  orders: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronDown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`,
  pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  star: `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  flame: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  tag: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  pin2: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  chef: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>`,
  package: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  bell: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
};

// ====== RENDER ======
const root = document.getElementById('app');

function render() {
  if (State.view === 'item') return renderItemDetail();
  if (State.view === 'cart') return renderCart();
  if (State.view === 'auth') return renderAuth();
  if (State.view === 'checkout') return renderCheckout();
  if (State.view === 'success' || State.view === 'tracking') return renderTracking();
  return renderMainTabs();
}

function renderMainTabs() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Hey there';
    return 'Good evening';
  })();
  const name = State.user ? `, ${State.user.name.split(' ')[0]}` : '';

  const cartCount = State.cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = State.cart.reduce((s, x) => s + x.price * x.qty, 0);

  let content = '';
  if (State.tab === 'home') content = renderHomeContent();
  else if (State.tab === 'menu') content = renderMenuContent();
  else if (State.tab === 'offers') content = renderOffersContent();
  else if (State.tab === 'orders') content = renderOrdersContent();

  root.innerHTML = `
    <div class="page">
      <div class="app-header">
        <div class="header-top">
          <div>
            <div class="location-label">DELIVERING TO</div>
            <div class="location-value">${Icon.pin} U-block · Home ${Icon.chevronDown}</div>
          </div>
          <button class="profile-btn" id="profileBtn">${Icon.user}</button>
        </div>
        ${State.tab === 'home' ? `
          <div class="greeting">${greeting}${name}</div>
          <div class="greeting-sub">What are you craving today? 🍯</div>
          <div class="search-wrap">
            <span class="search-icon">${Icon.search}</span>
            <input type="text" class="search-input" placeholder="Search waffles, pizza, coffee..." id="searchInput" value="${State.search}" />
          </div>
        ` : `
          <div class="greeting">${State.tab === 'menu' ? 'Our menu' : State.tab === 'offers' ? 'Offers & promos' : 'Your orders'}</div>
        `}
      </div>
      ${content}
      ${cartCount > 0 ? `
        <button class="floating-cart" id="floatingCart">
          <div class="floating-cart-left">
            <div class="cart-count-badge">${cartCount}</div>
            <div>
              <div class="cart-info-label">${cartCount} item${cartCount>1?'s':''} in cart</div>
              <div class="cart-info-total">₹${cartTotal}</div>
            </div>
          </div>
          <div class="floating-cart-cta">View cart ${Icon.chevronRight}</div>
        </button>
      ` : ''}
      <nav class="bottom-nav">
        ${['home','menu','offers','orders'].map(t => `
          <button class="nav-item ${State.tab===t?'active':''}" data-tab="${t}">
            <span class="nav-icon">${Icon[t]}</span>
            <span class="nav-label">${t.charAt(0).toUpperCase()+t.slice(1)}</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;

  // Attach handlers
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    State.search = e.target.value;
    render();
    const inp = document.getElementById('searchInput');
    if (inp) { inp.focus(); inp.setSelectionRange(State.search.length, State.search.length); }
  });
  document.getElementById('floatingCart')?.addEventListener('click', () => setState({ view: 'cart' }));
  document.querySelectorAll('.nav-item').forEach(b => b.addEventListener('click', () => {
    State.tab = b.dataset.tab;
    State.search = '';
    render();
  }));
  attachHomeHandlers();
}

function renderHomeContent() {
  if (State.search) {
    const filtered = MENU.filter(m =>
      m.name.toLowerCase().includes(State.search.toLowerCase()) ||
      m.desc.toLowerCase().includes(State.search.toLowerCase())
    );
    return `
      <div class="section">
        <div class="section-head"><div class="section-title">${filtered.length} result${filtered.length!==1?'s':''}</div></div>
        ${filtered.map(menuCardHTML).join('')}
        ${filtered.length === 0 ? `<div class="empty"><div class="empty-emoji">🐝</div><div class="empty-text">No matches. Try "pancake" or "pizza"</div></div>` : ''}
      </div>
    `;
  }

  const featured = MENU.filter(m => m.tag === 'Bestseller').slice(0, 6);
  const signature = MENU.filter(m => m.tag === 'Signature' || m.tag === 'Chef Special').slice(0, 4);
  const activeOffers = OFFERS.filter(o => o.active);

  const quickCats = [
    {name:'Pancakes', emoji:'🥞'},{name:'Waffles', emoji:'🧇'},
    {name:'Pizzas', emoji:'🍕'},{name:'Burgers', emoji:'🍔'},
    {name:'Shakes', emoji:'🥤'},{name:'Coffee', emoji:'☕'},
    {name:'Momos', emoji:'🥟'},{name:'Platters', emoji:'🎮'},
  ];

  return `
    ${!State.notifAsked ? `
      <div class="notif-prompt" id="notifPrompt">
        <div class="notif-prompt-icon">🔔</div>
        <div class="notif-prompt-text">
          <div class="notif-prompt-title">Get order updates</div>
          <div class="notif-prompt-sub">Know the moment your food is ready — and never miss an offer.</div>
        </div>
        <button class="notif-prompt-btn" id="notifAskBtn">Enable</button>
      </div>
    ` : ''}

    ${activeOffers.length > 0 ? `
      <div class="section">
        <div class="section-head">
          <div class="section-title">Sweet deals 🎁</div>
          <button class="section-action" data-action="offers">See all ${Icon.chevronRight}</button>
        </div>
        <div class="offers-scroll">
          ${activeOffers.map(o => offerCardHTML(o)).join('')}
        </div>
      </div>
    ` : ''}

    <div class="section">
      <div class="section-head"><div class="section-title">What's hot 🔥</div></div>
      <div class="cat-grid">
        ${quickCats.map(c => `
          <button class="cat-item" data-cat="${c.name}">
            <div class="cat-icon">${c.emoji}</div>
            <div class="cat-name">${c.name}</div>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head">
        <div class="section-title">Loved by regulars ⭐</div>
        <button class="section-action" data-action="menu">Full menu ${Icon.chevronRight}</button>
      </div>
      <div class="featured-grid">
        ${featured.map(featuredCardHTML).join('')}
      </div>
    </div>

    ${signature.length ? `
      <div class="section">
        <div class="section-head"><div class="section-title">Chef's signatures 👨‍🍳</div></div>
        ${signature.map(menuCardHTML).join('')}
      </div>
    ` : ''}

    <div class="section">
      <div class="insta-head">
        <div>
          <div class="insta-label">@SUGABEE.CAFE</div>
          <div class="insta-title">From our feed</div>
        </div>
        ${Icon.instagram}
      </div>
      <div class="insta-grid">
        ${INSTA.slice(0,6).map(p => `<div class="insta-cell">${p.img}</div>`).join('')}
      </div>
    </div>

    <div class="text-center" style="padding: 24px 16px 100px; color: #b39c87; font-size: 12px;">
      Made with 🍯 at Sugabee · U-block, Gali No.3
    </div>
  `;
}

function renderMenuContent() {
  const cats = ['All', ...new Set(MENU.map(m => m.cat))];
  const filtered = State.selectedCat === 'All' ? MENU : MENU.filter(m => m.cat === State.selectedCat);
  return `
    <div class="section">
      <div class="menu-tabs">
        ${cats.map(c => `<button class="menu-tab ${State.selectedCat===c?'active':''}" data-menucat="${c}">${c}</button>`).join('')}
      </div>
      ${State.selectedCat === 'All' ? cats.slice(1).map(cat => {
        const items = MENU.filter(m => m.cat === cat);
        if (!items.length) return '';
        return `
          <div class="cat-section">
            <div class="cat-section-title">${cat}</div>
            ${items.map(menuCardHTML).join('')}
          </div>
        `;
      }).join('') : `
        <div style="margin-bottom: 10px; font-size: 12px; color: #847060;">${filtered.length} items</div>
        ${filtered.map(menuCardHTML).join('')}
      `}
      <div style="height: 120px;"></div>
    </div>
  `;
}

function renderOffersContent() {
  const active = OFFERS.filter(o => o.active);
  return `
    <div class="section">
      ${active.length === 0 ? `<div class="empty"><div class="empty-emoji">🎁</div><div class="empty-text">No offers right now. Check back soon!</div></div>` :
        active.map(o => `<div style="margin-bottom: 12px;">${offerCardHTML(o, true)}</div>`).join('')}
      <div style="height: 100px;"></div>
    </div>
  `;
}

function renderOrdersContent() {
  const myOrders = State.orders.filter(o => !State.user || o.customer?.phone === State.user.phone);
  if (!myOrders.length) {
    return `<div class="empty"><div class="empty-emoji">📦</div><div class="empty-text">No orders yet — your first sweet awaits 🍯</div></div>`;
  }
  return `
    <div class="section">
      ${myOrders.map(o => `
        <button class="order-history-card" data-trackorder="${o.id}" style="width: 100%; text-align: left; display: block;">
          <div class="order-row1">
            <div>
              <div class="order-id">Order #${o.id}</div>
              <div class="order-time">${new Date(o.timestamp).toLocaleString()}</div>
            </div>
            <div class="order-status-pill ${o.status}">${o.status}</div>
          </div>
          <div class="order-items-line">${o.items.map(i => `${i.qty}× ${i.name}`).join(' · ')}</div>
          <div class="order-footer">
            <div style="font-size: 11px; color: #847060;">${o.items.length} item${o.items.length>1?'s':''}</div>
            <div style="font-weight: 700; color: var(--bark);">₹${o.total}</div>
          </div>
        </button>
      `).join('')}
      <div style="height: 100px;"></div>
    </div>
  `;
}

// ====== CARD TEMPLATES ======
function featuredCardHTML(item) {
  return `
    <div class="featured-card" data-itemid="${item.id}">
      <div class="featured-img">
        ${item.img}
        ${item.tag ? `<div class="featured-tag">${item.tag.toUpperCase()}</div>` : ''}
        <div class="featured-rating"><span class="featured-rating-star">${Icon.star}</span>${item.rating}</div>
      </div>
      <div class="featured-body">
        <div class="featured-name">${item.name}</div>
        <div class="featured-desc">${item.desc}</div>
        <div class="featured-footer">
          <div class="featured-price">₹${item.price}</div>
          <button class="featured-add" data-additemid="${item.id}">${Icon.plus}</button>
        </div>
      </div>
    </div>
  `;
}

function menuCardHTML(item) {
  return `
    <div class="menu-card" data-itemid="${item.id}">
      <div class="menu-img">${item.img}</div>
      <div class="menu-info">
        <div class="menu-meta">
          <span class="veg-mark ${item.veg?'veg':'nonveg'}"></span>
          ${item.tag ? `<span class="menu-tag">${item.tag.toUpperCase()}</span>` : ''}
        </div>
        <div class="menu-name">${item.name}</div>
        <div class="menu-desc">${item.desc}</div>
        <div class="menu-footer">
          <div class="menu-price-row">
            <span class="menu-price">₹${item.price}</span>
            <span class="menu-rating">${Icon.star}${item.rating}</span>
          </div>
          <button class="menu-add-btn" data-additemid="${item.id}">+ ADD</button>
        </div>
      </div>
    </div>
  `;
}

function offerCardHTML(o, expanded = false) {
  return `
    <div class="offer-card offer-card-${o.color}" style="${expanded?'width:auto;':''}" data-offercode="${o.code}">
      <div class="offer-tag">${o.tag || 'LIMITED TIME'}</div>
      <div class="offer-title">${o.title}</div>
      <div class="offer-desc">${o.desc}</div>
      <div class="offer-code"><span class="offer-code-label">CODE</span>${o.code}</div>
    </div>
  `;
}

// ====== HANDLERS ======
function attachHomeHandlers() {
  document.querySelectorAll('[data-itemid]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-additemid]')) return;
      const item = MENU.find(m => m.id === el.dataset.itemid);
      if (item) setState({ view: 'item', selectedItem: item });
    });
  });
  document.querySelectorAll('[data-additemid]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = MENU.find(m => m.id === el.dataset.additemid);
      if (item) addToCart(item);
    });
  });
  document.querySelectorAll('[data-cat]').forEach(el => {
    el.addEventListener('click', () => {
      State.tab = 'menu';
      State.selectedCat = el.dataset.cat;
      render();
    });
  });
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      State.tab = el.dataset.action;
      render();
    });
  });
  document.querySelectorAll('[data-menucat]').forEach(el => {
    el.addEventListener('click', () => {
      State.selectedCat = el.dataset.menucat;
      render();
    });
  });
  document.querySelectorAll('[data-offercode]').forEach(el => {
    el.addEventListener('click', () => {
      const code = el.dataset.offercode;
      navigator.clipboard?.writeText(code);
      toast({ icon: '🎫', title: `Code ${code} copied!`, sub: 'Paste it at checkout to save.', type: 'offer' });
    });
  });
  document.querySelectorAll('[data-trackorder]').forEach(el => {
    el.addEventListener('click', () => {
      const order = State.orders.find(o => o.id === el.dataset.trackorder);
      if (order) setState({ view: 'tracking', currentOrder: order });
    });
  });
  document.getElementById('notifAskBtn')?.addEventListener('click', requestNotificationPermission);
  document.getElementById('profileBtn')?.addEventListener('click', () => {
    if (State.user) {
      const msg = `Signed in as ${State.user.name}\n+91 ${State.user.phone}\n\nNotifications: ${State.notifGranted ? 'ON' : 'OFF'}`;
      if (confirm(msg + '\n\nSign out?')) {
        setState({ user: null });
        persistAll();
        toast({ icon: '👋', title: 'Signed out', sub: 'See you soon!' });
      }
    } else {
      setState({ view: 'auth' });
    }
  });
}

// ====== CART ======
function addToCart(item) {
  const existing = State.cart.find(x => x.id === item.id);
  if (existing) {
    existing.qty++;
  } else {
    State.cart.push({ ...item, qty: 1 });
  }
  persistAll();
  toast({ icon: item.img, title: `${item.name} added`, sub: `₹${item.price} · Tap cart to checkout`, type: 'success', duration: 2000 });
  render();
}

function changeQty(id, delta) {
  const item = State.cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    State.cart = State.cart.filter(x => x.id !== id);
  }
  persistAll();
  render();
}

// ====== ITEM DETAIL ======
function renderItemDetail() {
  const item = State.selectedItem;
  const cartItem = State.cart.find(x => x.id === item.id);
  root.innerHTML = `
    <div class="item-detail">
      <div class="item-hero">
        ${item.img}
        <button class="item-back" id="itemBack">${Icon.back}</button>
        ${item.tag ? `<div style="position:absolute;top:calc(env(safe-area-inset-top, 0) + 16px); right:16px; background:var(--bark); color:var(--gold); padding:6px 14px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:1px;">${item.tag.toUpperCase()}</div>` : ''}
      </div>
      <div class="item-detail-body">
        <div class="item-detail-meta">
          <span class="veg-mark ${item.veg?'veg':'nonveg'}"></span>
          <span class="item-detail-cat">${item.cat}</span>
          <div class="item-detail-rating-pill">${Icon.star}${item.rating}</div>
        </div>
        <h1 class="item-detail-name">${item.name}</h1>
        <p class="item-detail-desc">${item.desc}</p>
        <div class="item-detail-quick">
          <div class="item-detail-quick-item">${Icon.clock} ${item.prep} mins prep</div>
          <div class="item-detail-quick-item">${Icon.flame} Made fresh</div>
        </div>
        <div class="item-detail-note">
          <div class="item-detail-note-label">🐝 BEE'S NOTE</div>
          <div class="item-detail-note-text">Best enjoyed within 20 minutes of arrival. Pair with our Cold Coffee for the full Sugabee experience.</div>
        </div>
      </div>
      <div class="item-detail-foot">
        <div class="item-detail-foot-price">
          <div class="item-detail-foot-label">Total</div>
          <div class="item-detail-foot-amount">₹${item.price}</div>
        </div>
        <button class="btn-primary" id="addToCartBtn">${Icon.plus} Add to cart ${cartItem ? `<span style="background:var(--gold); color:var(--bark); font-size:10px; padding:2px 8px; border-radius:100px; margin-left:4px;">${cartItem.qty} in cart</span>` : ''}</button>
      </div>
    </div>
  `;
  document.getElementById('itemBack').addEventListener('click', () => setState({ view: null }));
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    addToCart(item);
    setState({ view: null });
  });
}

// ====== CART VIEW ======
function renderCart() {
  if (!State.cart.length) {
    root.innerHTML = `
      <div class="subpage">
        <div class="subpage-header">
          <button class="subpage-back" id="back">${Icon.back}</button>
          <div class="subpage-title">Your cart</div>
        </div>
        <div class="empty"><div class="empty-emoji">🛍️</div><div class="empty-text">Your cart is empty</div></div>
      </div>
    `;
    document.getElementById('back').addEventListener('click', () => setState({ view: null }));
    return;
  }

  const total = State.cart.reduce((s, x) => s + x.price * x.qty, 0);
  const discount = State.appliedOffer ?
    (State.appliedOffer.type === 'percent' ? Math.round(total * State.appliedOffer.discount / 100) : State.appliedOffer.discount) : 0;
  const delivery = 29;
  const final = total - discount + delivery;
  const activeOffers = OFFERS.filter(o => o.active);

  root.innerHTML = `
    <div class="subpage">
      <div class="subpage-header">
        <button class="subpage-back" id="back">${Icon.back}</button>
        <div class="subpage-title">Your cart</div>
      </div>
      <div style="padding: 16px;">
        ${State.cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-img">${item.img}</div>
            <div style="flex:1; min-width: 0;">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="qty-stepper">
              <button data-minus="${item.id}">${Icon.minus}</button>
              <span class="qty-value">${item.qty}</span>
              <button data-plus="${item.id}">${Icon.plus}</button>
            </div>
          </div>
        `).join('')}

        <div class="card">
          <div class="card-head">
            <span class="card-head-icon">${Icon.tag}</span>
            <span class="card-head-title">Apply promo</span>
          </div>
          ${State.appliedOffer ? `
            <div class="promo-applied">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #4a7e2e;">${State.appliedOffer.code} applied</div>
                <div style="font-size: 11px; color: #5a9e3e;">You saved ₹${discount}</div>
              </div>
              <button id="removePromo" style="color: #4a7e2e;">${Icon.x}</button>
            </div>
          ` : `
            <div class="promo-row">
              <input class="promo-input" placeholder="Enter code" id="promoInput" />
              <button class="promo-apply" id="applyPromo">Apply</button>
            </div>
            <div id="promoErr" style="font-size: 11px; color: #c93a3a; margin-top: 6px;"></div>
            <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">
              ${activeOffers.slice(0,3).map(o => `
                <button class="promo-suggest" data-promo="${o.code}" style="width: 100%; text-align: left;">
                  <div><span style="font-weight: 700; color: var(--honey-dark);">${o.code}</span> <span style="color: #847060;">— ${o.title}</span></div>
                  ${Icon.chevronRight}
                </button>
              `).join('')}
            </div>
          `}
        </div>

        <div class="card">
          <div class="card-head-title" style="margin-bottom: 10px;">Bill details</div>
          <div class="bill-row"><span style="color: #847060;">Item total</span><span>₹${total}</span></div>
          ${discount > 0 ? `<div class="bill-row discount"><span>Discount</span><span>– ₹${discount}</span></div>` : ''}
          <div class="bill-row"><span style="color: #847060;">Delivery</span><span>₹${delivery}</span></div>
          <div class="bill-row total"><span>To pay</span><span>₹${final}</span></div>
        </div>
      </div>
      <div class="foot-pay">
        <button class="btn-honey" id="checkout">
          <span>₹${final}</span>
          <span style="margin-left: auto; display: flex; align-items: center; gap: 4px;">Proceed to pay ${Icon.chevronRight}</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('back').addEventListener('click', () => setState({ view: null }));
  document.querySelectorAll('[data-plus]').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.plus, 1)));
  document.querySelectorAll('[data-minus]').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.minus, -1)));
  document.getElementById('removePromo')?.addEventListener('click', () => {
    setState({ appliedOffer: null });
  });
  document.querySelectorAll('[data-promo]').forEach(b => b.addEventListener('click', () => applyPromo(b.dataset.promo, total)));
  document.getElementById('applyPromo')?.addEventListener('click', () => {
    const code = document.getElementById('promoInput').value.trim().toUpperCase();
    applyPromo(code, total);
  });
  document.getElementById('checkout').addEventListener('click', () => {
    setState({ view: State.user ? 'checkout' : 'auth' });
  });
}

function applyPromo(code, total) {
  const offer = OFFERS.find(o => o.code === code && o.active);
  if (!offer) {
    document.getElementById('promoErr').textContent = 'Invalid code';
    return;
  }
  if (total < offer.minOrder) {
    document.getElementById('promoErr').textContent = `Add ₹${offer.minOrder - total} more to use this`;
    return;
  }
  setState({ appliedOffer: offer });
  toast({ icon: '🎫', title: `${offer.code} applied!`, sub: `You're saving!`, type: 'success' });
}

// ====== AUTH ======
let authStep = 'phone';
let authPhone = '';
let authOtp = '';
let authName = '';

function renderAuth() {
  root.innerHTML = `
    <div class="auth-page">
      <button class="auth-back" id="authBack">${Icon.back}</button>
      <h1 class="auth-title">${authStep === 'phone' ? 'Sign in' : authStep === 'otp' ? 'Verify' : 'Almost there'}</h1>
      <p class="auth-sub">
        ${authStep === 'phone' ? "Continue with your number — we'll text you a code." :
          authStep === 'otp' ? `We sent a code to +91 ${authPhone}. (Demo: any 4 digits)` :
          'What should we call you?'}
      </p>
      ${authStep === 'phone' ? `
        <div class="phone-row">
          <div class="phone-code">+91</div>
          <input class="phone-input" id="phoneIn" placeholder="98054 89757" inputmode="numeric" maxlength="10" value="${authPhone}" />
        </div>
        <button class="btn-honey" id="authNext" ${authPhone.length<10?'disabled':''}>Send code</button>
      ` : authStep === 'otp' ? `
        <input class="otp-input" id="otpIn" inputmode="numeric" maxlength="4" placeholder="• • • •" value="${authOtp}" />
        <button class="btn-honey" id="authNext" ${authOtp.length<4?'disabled':''}>Verify</button>
      ` : `
        <input class="phone-input" id="nameIn" placeholder="Your name" style="width: 100%; margin-bottom: 20px;" value="${authName}" />
        <button class="btn-honey" id="authNext" ${!authName.trim()?'disabled':''}>Create account</button>
      `}
    </div>
  `;
  document.getElementById('authBack').addEventListener('click', () => {
    authStep = 'phone'; authPhone = ''; authOtp = ''; authName = '';
    setState({ view: 'cart' });
  });

  if (authStep === 'phone') {
    const inp = document.getElementById('phoneIn');
    inp.focus();
    inp.addEventListener('input', e => {
      authPhone = e.target.value.replace(/\D/g,'').slice(0,10);
      e.target.value = authPhone;
      document.getElementById('authNext').disabled = authPhone.length < 10;
    });
    document.getElementById('authNext').addEventListener('click', () => {
      if (authPhone.length === 10) { authStep = 'otp'; renderAuth(); }
    });
  } else if (authStep === 'otp') {
    const inp = document.getElementById('otpIn');
    inp.focus();
    inp.addEventListener('input', e => {
      authOtp = e.target.value.replace(/\D/g,'').slice(0,4);
      e.target.value = authOtp;
      document.getElementById('authNext').disabled = authOtp.length < 4;
    });
    document.getElementById('authNext').addEventListener('click', () => {
      if (authOtp.length === 4) { authStep = 'name'; renderAuth(); }
    });
  } else {
    const inp = document.getElementById('nameIn');
    inp.focus();
    inp.addEventListener('input', e => {
      authName = e.target.value;
      document.getElementById('authNext').disabled = !authName.trim();
    });
    document.getElementById('authNext').addEventListener('click', () => {
      if (authName.trim()) {
        State.user = { name: authName.trim(), phone: authPhone, joined: Date.now() };
        persistAll();
        authStep = 'phone'; authPhone = ''; authOtp = ''; authName = '';
        toast({ icon: '🎉', title: `Welcome, ${State.user.name.split(' ')[0]}!`, sub: 'You\'re part of the hive now.', type: 'success' });
        // Auto-ask notification permission for new accounts
        if (!State.notifAsked) setTimeout(requestNotificationPermission, 1500);
        setState({ view: 'checkout' });
      }
    });
  }
}

// ====== CHECKOUT ======
let checkoutAddress = { line1: '', area: 'U-block', city: 'Gali No.3' };
let checkoutPayment = 'upi';

function renderCheckout() {
  const total = State.cart.reduce((s, x) => s + x.price * x.qty, 0);
  const discount = State.appliedOffer ?
    (State.appliedOffer.type === 'percent' ? Math.round(total * State.appliedOffer.discount / 100) : State.appliedOffer.discount) : 0;
  const final = total - discount + 29;

  root.innerHTML = `
    <div class="subpage">
      <div class="subpage-header">
        <button class="subpage-back" id="back">${Icon.back}</button>
        <div class="subpage-title">Checkout</div>
      </div>
      <div style="padding: 16px;">
        <div class="card">
          <div class="card-head">
            <span class="card-head-icon">${Icon.pin2}</span>
            <span class="card-head-title">Delivery address</span>
          </div>
          <input class="promo-input" id="addr1" placeholder="Flat / building / street" style="width: 100%; margin-bottom: 8px;" value="${checkoutAddress.line1}" />
          <div style="display: flex; gap: 8px;">
            <input class="promo-input" id="addr2" style="flex: 1;" value="${checkoutAddress.area}" />
            <input class="promo-input" id="addr3" style="flex: 1;" value="${checkoutAddress.city}" />
          </div>
        </div>
        <div class="card">
          <div class="card-head">
            <span class="card-head-icon">${Icon.user}</span>
            <span class="card-head-title">Contact</span>
          </div>
          <div style="font-size: 13px;">${State.user?.name} · +91 ${State.user?.phone}</div>
        </div>
        <div class="card">
          <div class="card-head-title" style="margin-bottom: 10px;">Payment</div>
          ${[
            {id:'upi', label:'UPI', sub:'GPay, PhonePe, Paytm'},
            {id:'card', label:'Card', sub:'Debit / Credit'},
            {id:'cod', label:'Cash on delivery', sub:'Pay when it arrives'},
          ].map(p => `
            <button class="payment-option ${checkoutPayment===p.id?'active':''}" data-pay="${p.id}">
              <div>
                <div style="font-weight: 700; font-size: 13px;">${p.label}</div>
                <div style="font-size: 11px; color: #847060;">${p.sub}</div>
              </div>
              <div class="payment-option-radio"></div>
            </button>
          `).join('')}
        </div>
        <div class="card">
          <div class="card-head-title" style="margin-bottom: 10px;">Order summary</div>
          ${State.cart.map(i => `<div class="bill-row"><span style="color: #847060;">${i.qty}× ${i.name}</span><span>₹${i.price*i.qty}</span></div>`).join('')}
          <div style="border-top: 1px solid #f4e8d8; margin-top: 8px; padding-top: 8px;">
            <div class="bill-row"><span style="color: #847060;">Subtotal</span><span>₹${total}</span></div>
            ${discount > 0 ? `<div class="bill-row discount"><span>Discount (${State.appliedOffer.code})</span><span>– ₹${discount}</span></div>` : ''}
            <div class="bill-row"><span style="color: #847060;">Delivery</span><span>₹29</span></div>
            <div class="bill-row total"><span>Total</span><span>₹${final}</span></div>
          </div>
        </div>
      </div>
      <div class="foot-pay">
        <button class="btn-honey" id="placeOrder">${Icon.lock} Place order · ₹${final}</button>
      </div>
    </div>
  `;
  document.getElementById('back').addEventListener('click', () => setState({ view: 'cart' }));
  document.getElementById('addr1').addEventListener('input', e => checkoutAddress.line1 = e.target.value);
  document.getElementById('addr2').addEventListener('input', e => checkoutAddress.area = e.target.value);
  document.getElementById('addr3').addEventListener('input', e => checkoutAddress.city = e.target.value);
  document.querySelectorAll('[data-pay]').forEach(b => b.addEventListener('click', () => {
    checkoutPayment = b.dataset.pay;
    renderCheckout();
  }));
  document.getElementById('placeOrder').addEventListener('click', () => {
    if (!checkoutAddress.line1.trim()) {
      toast({ icon: '⚠️', title: 'Address needed', sub: 'Please enter your delivery address.' });
      return;
    }
    placeOrder();
  });
}

// ====== PLACE ORDER + START LIVE FLOW ======
function placeOrder() {
  const total = State.cart.reduce((s, x) => s + x.price * x.qty, 0);
  const discount = State.appliedOffer ?
    (State.appliedOffer.type === 'percent' ? Math.round(total * State.appliedOffer.discount / 100) : State.appliedOffer.discount) : 0;
  const final = total - discount + 29;
  const order = {
    id: 'SB' + Date.now().toString().slice(-6),
    items: [...State.cart],
    subtotal: total, discount, offer: State.appliedOffer?.code || null,
    total: final, delivery: 29,
    customer: State.user,
    address: { ...checkoutAddress },
    payment: checkoutPayment,
    status: 'placed',
    timestamp: Date.now(),
    eta: Math.max(...State.cart.map(x => x.prep || 10), 10) + 20,
  };
  State.orders = [order, ...State.orders];
  State.cart = [];
  State.appliedOffer = null;
  persistAll();
  setState({ view: 'tracking', currentOrder: order });

  // Send confirmation notification
  sendNotification({
    title: 'Order placed! 🐝',
    body: `Order #${order.id} confirmed. ETA ${order.eta} mins.`,
    tag: `order-${order.id}`,
    url: '/?action=track'
  });

  // Simulate kitchen progression — in production this would come from your admin/PMS
  simulateOrderProgression(order.id);
}

function simulateOrderProgression(orderId) {
  const stages = [
    { status: 'preparing', delay: 8000, title: 'In the kitchen 👨‍🍳', body: 'Our chefs are working on your order now.' },
    { status: 'ready', delay: 20000, title: 'Order ready! 📦', body: 'Your food is heading out for delivery.' },
    { status: 'delivered', delay: 35000, title: 'Delivered 🎉', body: 'Enjoy your Sugabee meal! Tap to rate us.' },
  ];
  stages.forEach(stage => {
    setTimeout(() => {
      const idx = State.orders.findIndex(o => o.id === orderId);
      if (idx === -1) return;
      State.orders[idx].status = stage.status;
      persistAll();
      sendNotification({ title: stage.title, body: stage.body, tag: `order-${orderId}-${stage.status}`, url: '/?action=track' });
      // Re-render if we're still on tracking screen
      if (State.view === 'tracking' && State.currentOrder?.id === orderId) {
        State.currentOrder = State.orders[idx];
        render();
      }
    }, stage.delay);
  });
}

// ====== TRACKING ======
function renderTracking() {
  const order = State.currentOrder || State.orders[0];
  if (!order) {
    setState({ view: null });
    return;
  }

  const stages = [
    { key: 'placed', label: 'Order placed', icon: '✓', sub: 'We\'ve received your order' },
    { key: 'preparing', label: 'In the kitchen', icon: '👨‍🍳', sub: 'Our chefs are on it' },
    { key: 'ready', label: 'Out for delivery', icon: '🛵', sub: 'Heading your way' },
    { key: 'delivered', label: 'Delivered', icon: '🎉', sub: 'Enjoy your meal! 🐝' },
  ];
  const statusOrder = ['placed', 'preparing', 'ready', 'delivered'];
  const currentIdx = statusOrder.indexOf(order.status);
  const isDone = order.status === 'delivered';

  root.innerHTML = `
    <div class="tracking">
      <div class="tracking-hero">
        <button class="auth-back" id="trackBack" style="margin: 0 0 12px; background: rgba(255,255,255,0.2);">${Icon.back}</button>
        <div class="tracking-label">${isDone ? 'ORDER DELIVERED' : 'LIVE ORDER TRACKING'}</div>
        <div class="tracking-h1">${isDone ? 'Enjoy! 🐝' : 'The hive is buzzing!'}</div>
        <div class="tracking-sub">Order <strong>#${order.id}</strong>${!isDone ? ` · ETA <strong>${order.eta} mins</strong>` : ''}</div>
      </div>

      <div class="tracker-card">
        <div class="tracker-head">
          <div style="font-weight: 700; font-size: 13px;">Order status</div>
          <div class="live-pill ${isDone?'done':''}">${isDone ? 'COMPLETED' : 'LIVE'}</div>
        </div>
        <div class="tracker-stages">
          ${stages.map((s, i) => {
            const done = i <= currentIdx;
            const current = i === currentIdx;
            return `
              <div class="tracker-stage">
                <div class="tracker-stage-marker">
                  <div class="tracker-dot ${done?'done':''} ${current?'current':''}">${s.icon}</div>
                  ${i < stages.length-1 ? `<div class="tracker-line ${i < currentIdx?'done':''}"></div>` : ''}
                </div>
                <div class="tracker-body">
                  <div class="tracker-step-name ${!done?'dim':''}">${s.label}</div>
                  <div class="tracker-step-sub ${!done?'dim':''}">${s.sub}</div>
                  ${current && !isDone ? `<div class="tracker-step-live">Updating live</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${!State.notifGranted && !isDone ? `
        <div class="notif-prompt" style="margin: 0 16px 12px;">
          <div class="notif-prompt-icon">🔔</div>
          <div class="notif-prompt-text">
            <div class="notif-prompt-title">Get notified instantly</div>
            <div class="notif-prompt-sub">Don't keep this screen open. Enable notifications instead.</div>
          </div>
          <button class="notif-prompt-btn" id="trackNotifBtn">Enable</button>
        </div>
      ` : ''}

      <div style="padding: 0 16px;">
        <div class="card">
          <div class="card-head-title" style="margin-bottom: 10px; color: #847060; font-size: 10px; letter-spacing: 1.5px;">ORDER DETAILS</div>
          ${order.items.map(i => `<div class="bill-row"><span>${i.qty}× ${i.name}</span><span style="color: #847060;">₹${i.price*i.qty}</span></div>`).join('')}
          <div style="border-top: 1px solid #f4e8d8; margin-top: 8px; padding-top: 8px;">
            <div class="bill-row"><span style="color: #847060;">Subtotal</span><span>₹${order.subtotal}</span></div>
            ${order.discount > 0 ? `<div class="bill-row discount"><span>Discount (${order.offer})</span><span>– ₹${order.discount}</span></div>` : ''}
            <div class="bill-row"><span style="color: #847060;">Delivery</span><span>₹${order.delivery}</span></div>
            <div class="bill-row total"><span>Total</span><span style="color: var(--honey-dark);">₹${order.total}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-head-title" style="margin-bottom: 10px; color: #847060; font-size: 10px; letter-spacing: 1.5px;">DELIVERING TO</div>
          <div style="font-size: 13px; font-weight: 700; color: var(--bark);">${order.customer?.name}</div>
          <div style="font-size: 11px; color: #847060; margin-top: 2px;">+91 ${order.customer?.phone}</div>
          <div style="font-size: 12px; color: #847060; margin-top: 8px;">${order.address?.line1}, ${order.address?.area}, ${order.address?.city}</div>
          <div style="font-size: 12px; color: #847060; margin-top: 4px;">Payment: ${order.payment?.toUpperCase()}</div>
        </div>

        <button class="btn-honey" id="backHome" style="background: #f4e8d8; color: var(--bark); margin-top: 8px;">Back to home</button>
      </div>
    </div>
  `;
  document.getElementById('trackBack').addEventListener('click', () => setState({ view: null, currentOrder: null }));
  document.getElementById('backHome').addEventListener('click', () => setState({ view: null, currentOrder: null, tab: 'orders' }));
  document.getElementById('trackNotifBtn')?.addEventListener('click', requestNotificationPermission);
}

// ====== STARTUP ======
function init() {
  // Hide loader after a beat
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 800);

  // Handle URL params (PWA shortcuts)
  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'orders') State.tab = 'orders';
  if (params.get('action') === 'order') State.tab = 'menu';
  if (params.get('action') === 'track' && State.orders.length) {
    State.currentOrder = State.orders[0];
    State.view = 'tracking';
  }

  render();
  maybeShowIOSInstall();

  // Demo: simulate offer notification ~60s in (only if notifs granted)
  setTimeout(() => {
    if (State.notifGranted) {
      sendNotification({
        title: '🎁 New offer just dropped!',
        body: 'Get 20% off your next order with code WELCOME20',
        tag: 'offer-promo',
        url: '/?action=offers'
      });
    }
  }, 60000);
}

init();

// Notify when app becomes installed
window.addEventListener('appinstalled', () => {
  toast({ icon: '🎉', title: 'Sugabee installed!', sub: 'Find it on your home screen.', type: 'success' });
});
