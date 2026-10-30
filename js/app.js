// IPTV Neo - Progressive Web App
// High-End OLED Glassmorphic IPTV Client

// Demo Content (Nordic & World Channels with real working HLS test streams)
const DEMO_DATA = {
  account: {
    id: 'demo-account',
    name: 'IPTV Neo Demo (Nordic & World)',
    type: 'demo',
    serverUrl: 'demo.iptvneo.app',
    status: 'Aktiv (Demo)',
    expDate: 'Obegränsad'
  },
  liveCategories: [
    { id: 'all', name: 'Alla kanaler' },
    { id: 'nordic', name: 'Sverige & Norden' },
    { id: 'sports', name: 'Sport & Premium' },
    { id: 'news', name: 'Nyheter & Dokumentär' },
    { id: 'world', name: 'Internationellt' }
  ],
  channels: [
    {
      id: 'svt1',
      streamId: 101,
      name: 'SVT 1 HD',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/SVT1_logo_2016.svg/320px-SVT1_logo_2016.svg.png',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      categoryId: 'nordic',
      epg: 'Rapport & Aktuellt (20:00 - 21:00)'
    },
    {
      id: 'svt2',
      streamId: 102,
      name: 'SVT 2 HD',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/SVT2_logo_2016.svg/320px-SVT2_logo_2016.svg.png',
      url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
      categoryId: 'nordic',
      epg: 'Vetenskapens värld (20:00 - 21:00)'
    },
    {
      id: 'tv4',
      streamId: 103,
      name: 'TV4 HD',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/TV4_logo_2023.svg/320px-TV4_logo_2023.svg.png',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      categoryId: 'nordic',
      epg: 'Nyheterna & Efter fem (19:30 - 20:30)'
    },
    {
      id: 'sport1',
      streamId: 201,
      name: 'Viasat Sport Premium',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200',
      url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
      categoryId: 'sports',
      epg: 'Premier League: Arsenal vs Man City'
    },
    {
      id: 'eurosport',
      streamId: 202,
      name: 'Eurosport 1 HD',
      logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      categoryId: 'sports',
      epg: 'Grand Slam Tennis Live'
    },
    {
      id: 'bbc',
      streamId: 301,
      name: 'BBC World News HD',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/BBC.svg/320px-BBC.svg.png',
      url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
      categoryId: 'news',
      epg: 'BBC World News Today'
    },
    {
      id: 'bloomberg',
      streamId: 302,
      name: 'Bloomberg TV Global',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      categoryId: 'news',
      epg: 'Markets & Global Finance'
    }
  ],
  movieCategories: [
    { id: 'all', name: 'Alla filmer' },
    { id: 'action', name: 'Action & Äventyr' },
    { id: 'scifi', name: 'Sci-Fi & Thriller' },
    { id: 'drama', name: 'Drama & Nordic Noir' }
  ],
  movies: [
    {
      id: 'mov1',
      streamId: 501,
      name: 'Tears of Steel: Sci-Fi Chronicle',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      categoryId: 'scifi',
      rating: '8.6',
      year: '2024',
      plot: 'I en futuristisk dystopi försöker en grupp forskare rädda mänskligheten med hjälp av artificiell intelligens och tidsförskjutning.'
    },
    {
      id: 'mov2',
      streamId: 502,
      name: 'Big Buck Bunny: The Wild Forest',
      poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      categoryId: 'action',
      rating: '8.1',
      year: '2023',
      plot: 'När skogens lugn störs av tre busiga gnagare tar en enorm skogshare saken i egna tassar i en actionfylld komedi.'
    },
    {
      id: 'mov3',
      streamId: 503,
      name: 'Sintel: Dragon Quest Saga',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      categoryId: 'action',
      rating: '8.9',
      year: '2024',
      plot: 'En ensam krigardotter reser genom snöklädda berg och farliga ödemarker för att återförenas med sin förlorade drakunge.'
    },
    {
      id: 'mov4',
      streamId: 504,
      name: 'Nordic Frost: Deep Investigation',
      poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      categoryId: 'drama',
      rating: '8.4',
      year: '2024',
      plot: 'Ett iskallt mysterium skakar en enslig by i norra Sverige där en polisinspektör avslöjar mörka familjehemligheter.'
    }
  ],
  series: [
    {
      id: 'ser1',
      name: 'The Quantum Horizon',
      poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
      rating: '9.1',
      seasons: 2,
      plot: 'En expedition bortom solsystemets gränser stöter på anomalier som böjer tid och rum.'
    },
    {
      id: 'ser2',
      name: 'Stockholm Noir',
      poster: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600',
      rating: '8.7',
      seasons: 3,
      plot: 'En undre värld i förändring kolliderar med finanseliten i Stockholms innerstad.'
    }
  ]
};

// Application State
const state = {
  currentTab: 'home',
  accounts: JSON.parse(localStorage.getItem('iptv_neo_accounts') || '[]'),
  activeAccount: null,
  channels: [],
  liveCategories: [],
  selectedLiveCategory: 'all',
  movies: [],
  movieCategories: [],
  selectedMovieCategory: 'all',
  series: [],
  favorites: new Set(JSON.parse(localStorage.getItem('iptv_neo_favorites') || '[]')),
  searchQuery: '',
  showFavoritesOnly: false,
  nowPlaying: null,
  isPlaying: false,
  hlsInstance: null
};

// Storage Helpers
function saveAccounts() {
  localStorage.setItem('iptv_neo_accounts', JSON.stringify(state.accounts));
}

function saveFavorites() {
  localStorage.setItem('iptv_neo_favorites', JSON.stringify(Array.from(state.favorites)));
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }
  saveFavorites();
  renderCurrentTab();
  if ('vibrate' in navigator) navigator.vibrate(20);
}

// Proxied fetch helper for Xtream servers that lack CORS headers or mixed HTTP
async function smartFetch(url) {
  try {
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (err) {
    // If blocked by CORS or Mixed Content, use fallback CORS proxy
    console.log('Direct fetch blocked, trying proxy for:', url);
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const proxyRes = await fetch(proxyUrl);
    return await proxyRes.json();
  }
}

// Xtream API Handler
async function loadXtreamAccount(account) {
  let server = account.serverUrl.trim().replace(/\/$/, '');
  if (!server.startsWith('http://') && !server.startsWith('https://')) {
    server = 'http://' + server;
  }

  const base = `${server}/player_api.php?username=${encodeURIComponent(account.username)}&password=${encodeURIComponent(account.password)}`;

  try {
    // 1. Auth check
    const authData = await smartFetch(base);
    if (authData?.user_info?.status) {
      account.status = authData.user_info.status;
    }

    // 2. Live Categories & Streams
    const [liveCats, liveStreams, vodCats, vodStreams] = await Promise.all([
      smartFetch(`${base}&action=get_live_categories`).catch(() => []),
      smartFetch(`${base}&action=get_live_streams`).catch(() => []),
      smartFetch(`${base}&action=get_vod_categories`).catch(() => []),
      smartFetch(`${base}&action=get_vod_streams`).catch(() => [])
    ]);

    state.liveCategories = [
      { id: 'all', name: 'Alla kanaler' },
      ...(Array.isArray(liveCats) ? liveCats.map(c => ({ id: String(c.category_id), name: c.category_name })) : [])
    ];

    state.channels = (Array.isArray(liveStreams) ? liveStreams : []).map(s => ({
      id: `xtream_${s.stream_id}`,
      streamId: s.stream_id,
      name: s.name,
      logo: s.stream_icon,
      url: `${server}/live/${account.username}/${account.password}/${s.stream_id}.m3u8`,
      categoryId: String(s.category_id || 'all'),
      epg: 'Livesändning'
    }));

    state.movieCategories = [
      { id: 'all', name: 'Alla filmer' },
      ...(Array.isArray(vodCats) ? vodCats.map(c => ({ id: String(c.category_id), name: c.category_name })) : [])
    ];

    state.movies = (Array.isArray(vodStreams) ? vodStreams : []).map(m => ({
      id: `vod_${m.stream_id}`,
      streamId: m.stream_id,
      name: m.name,
      poster: m.stream_icon,
      url: `${server}/movie/${account.username}/${account.password}/${m.stream_id}.${m.container_extension || 'mp4'}`,
      categoryId: String(m.category_id || 'all'),
      rating: m.rating || '8.0',
      year: m.year || '',
      plot: m.plot || ''
    }));

    state.series = [];
    renderCurrentTab();
  } catch (err) {
    alert('Kunde inte ansluta till Xtream-servern: ' + err.message);
  }
}

// M3U Parser
function parseM3U(content) {
  const lines = content.split('\n');
  const channels = [];
  const catMap = {};
  let currentName = '';
  let currentLogo = '';
  let currentGroup = 'Allmän';

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      const groupMatch = line.match(/group-title="([^"]+)"/);
      currentGroup = groupMatch ? groupMatch[1] : 'Allmän';

      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      currentLogo = logoMatch ? logoMatch[1] : '';

      const commaIdx = line.lastIndexOf(',');
      currentName = commaIdx !== -1 ? line.substring(commaIdx + 1).trim() : 'Kanal';
    } else if (!line.startsWith('#') && (line.startsWith('http://') || line.startsWith('https://'))) {
      const catId = currentGroup.toLowerCase().replace(/\s+/g, '_');
      catMap[catId] = currentGroup;

      channels.push({
        id: `m3u_${channels.length + 1}`,
        streamId: channels.length + 1,
        name: currentName || `Kanal ${channels.length + 1}`,
        logo: currentLogo,
        url: line,
        categoryId: catId,
        epg: 'Livesändning'
      });
      currentName = '';
      currentLogo = '';
    }
  }

  state.channels = channels;
  state.liveCategories = [
    { id: 'all', name: 'Alla kanaler' },
    ...Object.entries(catMap).map(([id, name]) => ({ id, name }))
  ];
  state.movies = [];
  state.series = [];
  renderCurrentTab();
}

// Demo Mode Launcher
function launchDemo() {
  state.activeAccount = DEMO_DATA.account;
  state.channels = DEMO_DATA.channels;
  state.liveCategories = DEMO_DATA.liveCategories;
  state.movies = DEMO_DATA.movies;
  state.movieCategories = DEMO_DATA.movieCategories;
  state.series = DEMO_DATA.series;
  renderCurrentTab();
  closeModal();
}

// Video Player Management
const videoEl = document.getElementById('main-video');
const videoOverlay = document.getElementById('video-overlay');
const miniPlayer = document.getElementById('mini-player');
const channelDrawer = document.getElementById('player-drawer');

function playMedia(item) {
  state.nowPlaying = item;
  state.isPlaying = true;

  document.getElementById('hud-channel-name').textContent = item.name;
  document.getElementById('hud-channel-sub').textContent = item.epg || item.plot || 'Direktsändning';
  document.getElementById('mini-title').textContent = item.name;
  document.getElementById('mini-sub').textContent = item.epg || 'Spelar nu';

  videoOverlay.style.display = 'flex';
  miniPlayer.style.display = 'none';

  // HLS stream playback: Native Safari/iOS vs Hls.js fallback
  if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    // Native Apple iOS Safari hardware HLS
    videoEl.src = item.url;
    videoEl.play().catch(e => console.log('Autoplay deferred:', e));
  } else if (window.Hls && Hls.isSupported() && item.url.includes('.m3u8')) {
    if (state.hlsInstance) state.hlsInstance.destroy();
    const hls = new Hls({ enableWorker: true });
    hls.loadSource(item.url);
    hls.attachMedia(videoEl);
    state.hlsInstance = hls;
    hls.on(Hls.Events.MANIFEST_PARSED, () => videoEl.play());
  } else {
    videoEl.src = item.url;
    videoEl.play().catch(e => console.log('Autoplay deferred:', e));
  }

  // Populate drawer
  renderZapperDrawer();
}

function minimizePlayer() {
  videoOverlay.style.display = 'none';
  if (state.nowPlaying) {
    miniPlayer.style.display = 'flex';
  }
}

function expandPlayer() {
  videoOverlay.style.display = 'flex';
  miniPlayer.style.display = 'none';
}

function togglePlay() {
  if (videoEl.paused) {
    videoEl.play();
    document.getElementById('btn-play-pause').innerHTML = '⏸';
  } else {
    videoEl.pause();
    document.getElementById('btn-play-pause').innerHTML = '▶';
  }
}

function togglePiP() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (videoEl.requestPictureInPicture) {
    videoEl.requestPictureInPicture();
  } else if (videoEl.webkitSetPresentationMode) {
    // Safari iOS Picture in Picture
    videoEl.webkitSetPresentationMode(
      videoEl.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture'
    );
  }
}

function toggleAirPlay() {
  if (window.WebKitPlaybackTargetAvailabilityEvent) {
    videoEl.webkitShowPlaybackTargetPicker();
  } else {
    alert('AirPlay är tillgängligt via iOS Kontrollcenter.');
  }
}

function toggleChannelDrawer() {
  channelDrawer.classList.toggle('open');
}

function renderZapperDrawer() {
  const container = document.getElementById('drawer-channels-list');
  container.innerHTML = state.channels.map(ch => `
    <div class="drawer-item ${state.nowPlaying?.id === ch.id ? 'active' : ''}" onclick="playMedia(state.channels.find(c => c.id === '${ch.id}')); toggleChannelDrawer();">
      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${state.nowPlaying?.id === ch.id ? 'var(--primary)' : 'rgba(255,255,255,0.2)'};"></span>
      <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${ch.name}</span>
    </div>
  `).join('');
}

// Views Rendering
function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  renderCurrentTab();
}

function renderCurrentTab() {
  const contentEl = document.getElementById('tab-content');
  document.getElementById('brand-account').textContent = state.activeAccount?.name || 'Demo-läge';

  if (state.currentTab === 'home') {
    renderHome(contentEl);
  } else if (state.currentTab === 'live') {
    renderLiveTV(contentEl);
  } else if (state.currentTab === 'movies') {
    renderMovies(contentEl);
  } else if (state.currentTab === 'series') {
    renderSeries(contentEl);
  } else if (state.currentTab === 'settings') {
    renderSettings(contentEl);
  }
}

// 1. Home View
function renderHome(container) {
  const hero = state.movies[0] || state.channels[0];
  const favChannels = state.channels.filter(c => state.favorites.has(c.id));
  const popularChannels = state.channels.slice(0, 8);

  container.innerHTML = `
    <!-- Hero Banner -->
    ${hero ? `
      <div class="hero-card">
        <div class="hero-tag">🔥 Utvalt Just Nu</div>
        <div class="hero-title">${hero.name}</div>
        <div class="hero-desc">${hero.plot || hero.epg || 'Se direktsänd TV och VOD i högsta kvalitet.'}</div>
        <button class="btn-play-hero" onclick="playMedia(${JSON.stringify(hero).replace(/"/g, '&quot;')})">
          ▶ Spela Nu
        </button>
      </div>
    ` : ''}

    <!-- Shortcuts -->
    <div class="shortcuts-grid">
      <div class="shortcut-card shortcut-live" onclick="switchTab('live')">
        <div class="icon">📺</div>
        <div>
          <div class="label">Live TV</div>
          <div class="count">${state.channels.length} kanaler</div>
        </div>
      </div>
      <div class="shortcut-card shortcut-movies" onclick="switchTab('movies')">
        <div class="icon">🎬</div>
        <div>
          <div class="label">Filmer</div>
          <div class="count">${state.movies.length} st</div>
        </div>
      </div>
      <div class="shortcut-card shortcut-favs" onclick="state.showFavoritesOnly = true; switchTab('live');">
        <div class="icon">⭐</div>
        <div>
          <div class="label">Favoriter</div>
          <div class="count">${state.favorites.size} st</div>
        </div>
      </div>
    </div>

    <!-- Favorite Channels (if any) -->
    ${favChannels.length > 0 ? `
      <div class="section-header">
        <div class="section-title">Mina Favoritkanaler</div>
      </div>
      <div class="h-scroll">
        ${favChannels.map(ch => renderChannelPill(ch)).join('')}
      </div>
    ` : ''}

    <!-- Popular Channels -->
    <div class="section-header">
      <div class="section-title">Populära Kanaler</div>
      <div style="font-size: 13px; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="switchTab('live')">Visa alla</div>
    </div>
    <div class="h-scroll">
      ${popularChannels.map(ch => renderChannelPill(ch)).join('')}
    </div>

    <!-- Trending Movies -->
    <div class="section-header">
      <div class="section-title">Senaste Filmer</div>
      <div style="font-size: 13px; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="switchTab('movies')">Visa alla</div>
    </div>
    <div class="h-scroll">
      ${state.movies.map(m => `
        <div class="movie-poster-card" onclick="openMovieModal('${m.id}')">
          <div class="movie-poster-box">
            ${m.poster ? `<img src="${m.poster}" class="movie-poster-img" alt="${m.name}" onerror="this.style.display='none'">` : ''}
            <span style="font-size: 32px; color: rgba(255,255,255,0.2);">🎬</span>
            ${m.rating ? `<div class="movie-rating-badge">★ ${m.rating}</div>` : ''}
          </div>
          <div class="movie-title">${m.name}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderChannelPill(ch) {
  return `
    <div class="channel-pill-card" onclick="playMedia(state.channels.find(c => c.id === '${ch.id}'))">
      <div class="channel-screen-box">
        <div class="channel-live-dot"><span style="width: 4px; height: 4px; border-radius: 50%; background: #fff;"></span> LIVE</div>
        ${ch.logo ? `<img src="${ch.logo}" class="channel-logo-img" alt="${ch.name}" onerror="this.style.display='none'">` : ''}
        <span style="font-size: 26px; color: var(--primary);">📺</span>
      </div>
      <div class="channel-title">${ch.name}</div>
      <div class="channel-epg">${ch.epg || 'Livesändning'}</div>
    </div>
  `;
}

// 2. Live TV View
function renderLiveTV(container) {
  const filtered = state.channels.filter(ch => {
    const matchCat = state.selectedLiveCategory === 'all' || ch.categoryId === state.selectedLiveCategory;
    const matchSearch = !state.searchQuery || ch.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchFav = !state.showFavoritesOnly || state.favorites.has(ch.id);
    return matchCat && matchSearch && matchFav;
  });

  container.innerHTML = `
    <!-- Search Bar -->
    <div class="search-box">
      <span>🔍</span>
      <input type="text" class="search-input" placeholder="Sök bland ${state.channels.length} kanaler..." value="${state.searchQuery}" oninput="state.searchQuery = this.value; renderLiveTV(document.getElementById('tab-content'))">
      <span style="cursor: pointer; color: ${state.showFavoritesOnly ? '#FFD60A' : 'var(--text-dim)'}; font-size: 18px;" onclick="state.showFavoritesOnly = !state.showFavoritesOnly; renderLiveTV(document.getElementById('tab-content'))">★</span>
    </div>

    <!-- Category Pills -->
    <div class="filter-bar">
      ${state.liveCategories.map(cat => `
        <button class="filter-pill ${state.selectedLiveCategory === cat.id ? 'active' : ''}" onclick="state.selectedLiveCategory = '${cat.id}'; renderLiveTV(document.getElementById('tab-content'))">
          ${cat.name}
        </button>
      `).join('')}
    </div>

    <!-- Channels List -->
    <div style="padding-top: 8px;">
      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 50px 20px; color: var(--text-dim);">
          <div style="font-size: 40px; margin-bottom: 12px;">📺</div>
          <div>Inga kanaler matchade sökningen.</div>
        </div>
      ` : filtered.map(ch => `
        <div class="channel-list-item">
          <div class="channel-logo-circle" onclick="playMedia(state.channels.find(c => c.id === '${ch.id}'))">
            ${ch.logo ? `<img src="${ch.logo}" style="max-width: 80%; max-height: 80%; object-fit: contain;" alt="${ch.name}" onerror="this.style.display='none'">` : ''}
            <span style="font-size: 20px; color: var(--primary);">📺</span>
          </div>
          <div class="channel-details" onclick="playMedia(state.channels.find(c => c.id === '${ch.id}'))">
            <div class="channel-name">${ch.name}</div>
            <div class="channel-meta">
              <span style="color: #FF375F; font-size: 10px;">●</span>
              <span>${ch.epg || 'Livesändning'}</span>
            </div>
          </div>
          <button class="star-btn ${state.favorites.has(ch.id) ? 'active' : ''}" onclick="toggleFavorite('${ch.id}')">★</button>
        </div>
      `).join('')}
    </div>
  `;
}

// 3. Movies View
function renderMovies(container) {
  const filtered = state.movies.filter(m => {
    const matchCat = state.selectedMovieCategory === 'all' || m.categoryId === state.selectedMovieCategory;
    const matchSearch = !state.searchQuery || m.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  container.innerHTML = `
    <!-- Category Pills -->
    <div class="filter-bar">
      ${state.movieCategories.map(cat => `
        <button class="filter-pill ${state.selectedMovieCategory === cat.id ? 'active' : ''}" onclick="state.selectedMovieCategory = '${cat.id}'; renderMovies(document.getElementById('tab-content'))">
          ${cat.name}
        </button>
      `).join('')}
    </div>

    <!-- 3-Column Grid -->
    <div class="catalog-grid">
      ${filtered.map(m => `
        <div class="movie-poster-card" onclick="openMovieModal('${m.id}')">
          <div class="movie-poster-box" style="width: 100%; height: 160px;">
            ${m.poster ? `<img src="${m.poster}" class="movie-poster-img" alt="${m.name}" onerror="this.style.display='none'">` : ''}
            <span style="font-size: 32px; color: rgba(255,255,255,0.2);">🎬</span>
            ${m.rating ? `<div class="movie-rating-badge">★ ${m.rating}</div>` : ''}
          </div>
          <div class="movie-title">${m.name}</div>
          <div style="font-size: 11px; color: var(--text-dim);">${m.year || ''}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. Series View
function renderSeries(container) {
  container.innerHTML = `
    <div class="catalog-grid">
      ${state.series.map(s => `
        <div class="movie-poster-card" onclick="openSeriesModal('${s.id}')">
          <div class="movie-poster-box" style="width: 100%; height: 160px;">
            ${s.poster ? `<img src="${s.poster}" class="movie-poster-img" alt="${s.name}" onerror="this.style.display='none'">` : ''}
            <span style="font-size: 32px; color: rgba(255,255,255,0.2);">📺</span>
            ${s.rating ? `<div class="movie-rating-badge">★ ${s.rating}</div>` : ''}
          </div>
          <div class="movie-title">${s.name}</div>
          <div style="font-size: 11px; color: var(--text-dim);">${s.seasons} Säsonger</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. Settings View
function renderSettings(container) {
  container.innerHTML = `
    <div style="padding: 16px;">
      <!-- Active Account Card -->
      <div class="hero-card" style="margin: 0 0 20px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted);">AKTIVT KONTO</div>
            <div style="font-size: 18px; font-weight: 800;">${state.activeAccount?.name || 'Inget valt'}</div>
          </div>
          <button class="btn-header" onclick="openAccountModal()">Hantera</button>
        </div>
        <div style="font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-glass); padding-top: 10px; display: flex; justify-content: space-between;">
          <span>Status: <strong style="color: #30D158;">${state.activeAccount?.status || 'Aktiv'}</strong></span>
          <span>Giltigt: ${state.activeAccount?.expDate || 'Obegränsad'}</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 15px; font-weight: 800; margin-bottom: 12px;">App-inställningar</div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-glass);">
          <span>Videomotor</span>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 13px;">Apple HLS / Hls.js</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
          <span>Hårdvaruavkodning</span>
          <span style="color: #30D158; font-weight: 600; font-size: 13px;">Aktiv (Metal / WebKit)</span>
        </div>
      </div>

      <!-- Demo Launch -->
      <button class="btn-primary" style="margin-bottom: 16px; background: rgba(255,255,255,0.08); border: 1px solid var(--border-glass); box-shadow: none;" onclick="launchDemo()">
        ✨ Återställ till Demo-läge
      </button>

      <div style="text-align: center; font-size: 12px; color: var(--text-dim); margin-top: 24px;">
        IPTV Neo PWA v1.0.0<br>Optimerad för Safari iOS & Standalone Hemskärm
      </div>
    </div>
  `;
}

// Modal System
function openAccountModal() {
  document.getElementById('account-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('account-modal').style.display = 'none';
  document.getElementById('detail-modal').style.display = 'none';
}

function openMovieModal(id) {
  const mov = state.movies.find(m => m.id === id);
  if (!mov) return;
  const modal = document.getElementById('detail-modal');
  modal.querySelector('.modal-content').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 140px; height: 200px; border-radius: var(--radius-md); overflow: hidden; margin: 0 auto 16px auto; background: rgba(255,255,255,0.05);">
        ${mov.poster ? `<img src="${mov.poster}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
      </div>
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 6px;">${mov.name}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">${mov.year || ''} • Betyg: ★ ${mov.rating || 'N/A'}</div>
      <div style="font-size: 13px; line-height: 1.5; color: var(--text-muted); margin-bottom: 24px;">${mov.plot || 'Ingen sammanfattning tillgänglig.'}</div>
      <button class="btn-primary" onclick="closeModal(); playMedia(state.movies.find(m => m.id === '${mov.id}'))">
        ▶ Spela Film Nu
      </button>
      <button class="btn-header" style="margin: 12px auto 0 auto;" onclick="closeModal()">Stäng</button>
    </div>
  `;
  modal.style.display = 'flex';
}

function openSeriesModal(id) {
  const ser = state.series.find(s => s.id === id);
  if (!ser) return;
  const modal = document.getElementById('detail-modal');
  modal.querySelector('.modal-content').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 6px;">${ser.name}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Betyg: ★ ${ser.rating} • ${ser.seasons} Säsonger</div>
      <div style="text-align: left; margin-top: 20px;">
        <div style="font-size: 15px; font-weight: 800; margin-bottom: 10px;">Avsnitt (Säsong 1)</div>
        ${[1, 2, 3, 4, 5].map(ep => `
          <div class="drawer-item" style="margin-bottom: 8px; justify-content: space-between;" onclick="closeModal(); playMedia({ name: '${ser.name} S01E0${ep}', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', epg: 'Avsnitt ${ep}' })">
            <span>Avsnitt ${ep}</span>
            <span style="color: var(--primary);">▶ Spela</span>
          </div>
        `).join('')}
      </div>
      <button class="btn-header" style="margin: 20px auto 0 auto;" onclick="closeModal()">Stäng</button>
    </div>
  `;
  modal.style.display = 'flex';
}

// Account Form Handlers
function saveXtreamForm(e) {
  e.preventDefault();
  const name = document.getElementById('xtream-name').value || 'Mitt IPTV';
  const server = document.getElementById('xtream-server').value;
  const user = document.getElementById('xtream-user').value;
  const pass = document.getElementById('xtream-pass').value;

  const newAcc = {
    id: 'acc_' + Date.now(),
    name,
    type: 'xtream',
    serverUrl: server,
    username: user,
    password: pass
  };

  state.accounts.push(newAcc);
  state.activeAccount = newAcc;
  saveAccounts();
  closeModal();
  loadXtreamAccount(newAcc);
}

function saveM3UForm(e) {
  e.preventDefault();
  const name = document.getElementById('m3u-name').value || 'M3U Spellista';
  const url = document.getElementById('m3u-url').value;

  const newAcc = {
    id: 'acc_' + Date.now(),
    name,
    type: 'm3u',
    url
  };

  state.accounts.push(newAcc);
  state.activeAccount = newAcc;
  saveAccounts();
  closeModal();

  fetch(url)
    .then(r => r.text())
    .then(content => parseM3U(content))
    .catch(err => alert('Kunde inte läsa M3U-spellistan: ' + err.message));
}

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  // Service Worker Registration for PWA Standalone Mode
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg failed:', err));
  }

  // Load active account or demo
  if (state.accounts.length > 0) {
    state.activeAccount = state.accounts[0];
    if (state.activeAccount.type === 'xtream') {
      loadXtreamAccount(state.activeAccount);
    } else {
      launchDemo();
    }
  } else {
    launchDemo();
  }
});
