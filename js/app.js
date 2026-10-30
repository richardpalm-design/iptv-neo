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

// Clean and normalize server URL
function cleanServerUrl(raw) {
  let url = (raw || '').trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  return url.replace(/\/+$/, '');
}

// Multi-Tier Robust Fetcher: Handles Netlify Functions, Direct, and CORS Proxies
async function robustFetch(url, isJson = true) {
  url = url.trim();

  const attempts = [
    // 1. Netlify Serverless Proxy (Runs if deployed on Netlify)
    `/.netlify/functions/proxy?url=${encodeURIComponent(url)}`,
    // 2. Direct fetch (works on localhost or HTTPS endpoints)
    url,
    // 3. High-speed public CORS proxies
    `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];

  let lastError = null;

  for (const proxyUrl of attempts) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 18000); // 18s per attempt

      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      if (isJson) {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (jsonErr) {
          throw new Error('Svaret från servern var inte giltig JSON.');
        }
      } else {
        const text = await res.text();
        if (text && text.length > 5) return text;
        throw new Error('Tomt svar från servern');
      }
    } catch (err) {
      lastError = err;
      console.warn(`Fetch via ${proxyUrl} misslyckades:`, err.message);
    }
  }

  throw lastError || new Error('Kunde inte ansluta till IPTV-servern.');
}

// Status Box Helper for Account Modal
function showModalStatus(message, isError = false, isLoading = false) {
  const box = document.getElementById('modal-status-box');
  if (!box) return;
  box.style.display = 'block';
  box.style.background = isError ? 'rgba(255, 55, 95, 0.2)' : 'rgba(10, 132, 255, 0.2)';
  box.style.border = `1px solid ${isError ? '#FF375F' : '#0A84FF'}`;
  box.style.color = isError ? '#FF6987' : '#64D2FF';
  box.innerHTML = `${isLoading ? '⏳ ' : isError ? '⚠️ ' : '✅ '} ${message}`;
}

function hideModalStatus() {
  const box = document.getElementById('modal-status-box');
  if (box) box.style.display = 'none';
}

// Xtream Login Handler
async function handleXtreamSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('xtream-name').value.trim() || 'Mitt IPTV';
  const server = cleanServerUrl(document.getElementById('xtream-server').value);
  const user = document.getElementById('xtream-user').value.trim();
  const pass = document.getElementById('xtream-pass').value.trim();

  const submitBtn = document.getElementById('btn-xtream-submit');
  submitBtn.disabled = true;
  showModalStatus('Ansluter till IPTV-servern...', false, true);

  const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;

  try {
    // 1. Authenticate with server
    const authData = await robustFetch(base, true);

    if (authData?.user_info?.auth === 0) {
      throw new Error('Inloggningen nekades: Felaktigt användarnamn eller lösenord.');
    }

    const status = authData?.user_info?.status || 'Active';
    let expDate = 'Obegränsad';
    if (authData?.user_info?.exp_date) {
      const expTimestamp = parseInt(authData.user_info.exp_date);
      if (!isNaN(expTimestamp)) {
        expDate = new Date(expTimestamp * 1000).toLocaleDateString('sv-SE');
      }
    }

    showModalStatus('Inloggad! Hämtar kanallistor och kategorier...', false, true);

    // 2. Fetch categories and streams
    const [liveCats, liveStreams, vodStreams] = await Promise.all([
      robustFetch(`${base}&action=get_live_categories`, true).catch(() => []),
      robustFetch(`${base}&action=get_live_streams`, true).catch(() => []),
      robustFetch(`${base}&action=get_vod_streams`, true).catch(() => [])
    ]);

    const channels = (Array.isArray(liveStreams) ? liveStreams : []).map(s => ({
      id: `xtream_${s.stream_id}`,
      streamId: s.stream_id,
      name: s.name,
      logo: s.stream_icon,
      url: `${server}/live/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${s.stream_id}.m3u8`,
      categoryId: String(s.category_id || 'all'),
      epg: 'Livesändning'
    }));

    const movies = (Array.isArray(vodStreams) ? vodStreams : []).map(m => ({
      id: `vod_${m.stream_id}`,
      streamId: m.stream_id,
      name: m.name,
      poster: m.stream_icon,
      url: `${server}/movie/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${m.stream_id}.${m.container_extension || 'mp4'}`,
      categoryId: String(m.category_id || 'all'),
      rating: m.rating || '8.0',
      year: m.year || '',
      plot: m.plot || ''
    }));

    if (channels.length === 0 && movies.length === 0) {
      throw new Error('Kontot är inloggat, men servern returnerade 0 kanaler.');
    }

    // Save and activate account
    const account = {
      id: 'acc_' + Date.now(),
      name,
      type: 'xtream',
      serverUrl: server,
      username: user,
      password: pass,
      status,
      expDate
    };

    state.accounts = state.accounts.filter(a => a.id !== account.id);
    state.accounts.unshift(account);
    state.activeAccount = account;
    state.channels = channels;
    state.movies = movies;
    state.series = [];
    state.liveCategories = [
      { id: 'all', name: 'Alla kanaler' },
      ...(Array.isArray(liveCats) ? liveCats.map(c => ({ id: String(c.category_id), name: c.category_name })) : [])
    ];

    saveAccounts();
    showModalStatus(`Klart! Laddade ${channels.length} kanaler och ${movies.length} filmer.`, false, false);

    setTimeout(() => {
      closeModal();
      renderCurrentTab();
    }, 800);
  } catch (err) {
    showModalStatus('Fel vid anslutning: ' + err.message, true, false);
  } finally {
    submitBtn.disabled = false;
  }
}

// M3U Playlist Handler (URL, File, or Text)
async function handleM3USubmit(e) {
  e.preventDefault();
  const name = document.getElementById('m3u-name').value.trim() || 'Min M3U';
  const url = document.getElementById('m3u-url').value.trim();
  const fileInput = document.getElementById('m3u-file');
  const textInput = document.getElementById('m3u-text').value.trim();
  const submitBtn = document.getElementById('btn-m3u-submit');

  submitBtn.disabled = true;

  try {
    let content = '';

    // Option 1: File Upload
    if (fileInput.files && fileInput.files.length > 0) {
      showModalStatus('Läser in M3U-fil från enheten...', false, true);
      const file = fileInput.files[0];
      content = await file.text();
    }
    // Option 2: Pasted Text
    else if (textInput.length > 0) {
      showModalStatus('Tolkar klistrad spellista...', false, true);
      content = textInput;
    }
    // Option 3: Download from URL
    else if (url.length > 0) {
      showModalStatus('Laddar ner M3U-spellista via proxy...', false, true);
      content = await robustFetch(url, false);
    } else {
      throw new Error('Ange en M3U-URL, välj en fil eller klistra in text.');
    }

    showModalStatus('Analyserar kanaler...', false, true);
    parseM3U(content, name, url);

    showModalStatus(`Klart! Laddade ${state.channels.length} kanaler.`, false, false);
    setTimeout(() => {
      closeModal();
      renderCurrentTab();
    }, 800);
  } catch (err) {
    showModalStatus('Kunde inte läsa spellistan: ' + err.message, true, false);
  } finally {
    submitBtn.disabled = false;
  }
}

// M3U Parser
function parseM3U(content, accountName = 'M3U Spellista', sourceUrl = '') {
  if (!content) throw new Error('Spellistan är tom.');

  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const channels = [];
  const catMap = {};
  let currentName = '';
  let currentLogo = '';
  let currentGroup = 'Allmän';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      const groupMatch = line.match(/group-title=["']?([^"',]+)["']?/i);
      currentGroup = groupMatch && groupMatch[1].trim() ? groupMatch[1].trim() : 'Allmän';

      const logoMatch = line.match(/tvg-logo=["']?([^"'\s,]+)["']?/i);
      currentLogo = logoMatch && logoMatch[1].trim() ? logoMatch[1].trim() : '';

      const commaIdx = line.lastIndexOf(',');
      currentName = commaIdx !== -1 ? line.substring(commaIdx + 1).trim() : '';
    } else if (!line.startsWith('#') && (line.startsWith('http://') || line.startsWith('https://') || line.startsWith('rtmp://'))) {
      const catId = currentGroup.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'general';
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
      currentGroup = 'Allmän';
    }
  }

  if (channels.length === 0) {
    throw new Error('Hittade inga giltiga strömmar i M3U-filen. Kontrollera formatet.');
  }

  const account = {
    id: 'm3u_' + Date.now(),
    name: accountName,
    type: 'm3u',
    url: sourceUrl,
    status: 'Aktiv',
    expDate: 'Obegränsad'
  };

  state.accounts = state.accounts.filter(a => a.id !== account.id);
  state.accounts.unshift(account);
  state.activeAccount = account;
  state.channels = channels;
  state.liveCategories = [
    { id: 'all', name: 'Alla kanaler' },
    ...Object.entries(catMap).map(([id, name]) => ({ id, name }))
  ];
  state.movies = [];
  state.series = [];
  saveAccounts();
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
  if (!item || !item.url) return;
  state.nowPlaying = item;
  state.isPlaying = true;

  document.getElementById('hud-channel-name').textContent = item.name;
  document.getElementById('hud-channel-sub').textContent = item.epg || item.plot || 'Direktsändning';
  document.getElementById('mini-title').textContent = item.name;
  document.getElementById('mini-sub').textContent = item.epg || 'Spelar nu';

  videoOverlay.style.display = 'flex';
  miniPlayer.style.display = 'none';

  // HLS stream playback: Native Apple iOS Safari vs Hls.js fallback
  if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    // Native Apple iOS hardware HLS
    videoEl.src = item.url;
    videoEl.play().catch(e => console.log('Autoplay:', e));
  } else if (window.Hls && Hls.isSupported() && item.url.includes('.m3u8')) {
    if (state.hlsInstance) state.hlsInstance.destroy();
    const hls = new Hls({ enableWorker: true });
    hls.loadSource(item.url);
    hls.attachMedia(videoEl);
    state.hlsInstance = hls;
    hls.on(Hls.Events.MANIFEST_PARSED, () => videoEl.play());
  } else {
    videoEl.src = item.url;
    videoEl.play().catch(e => console.log('Autoplay:', e));
  }

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

// Tab Switching
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
        <button class="btn-play-hero" onclick="playMedia(state.movies[0] || state.channels[0])">
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
  hideModalStatus();
  switchModalTab('xtream');
}

function closeModal() {
  document.getElementById('account-modal').style.display = 'none';
  document.getElementById('detail-modal').style.display = 'none';
}

function switchModalTab(tab) {
  document.getElementById('tab-btn-xtream').classList.toggle('active', tab === 'xtream');
  document.getElementById('tab-btn-m3u').classList.toggle('active', tab === 'm3u');
  document.getElementById('tab-btn-saved').classList.toggle('active', tab === 'saved');

  document.getElementById('modal-sec-xtream').style.display = tab === 'xtream' ? 'block' : 'none';
  document.getElementById('modal-sec-m3u').style.display = tab === 'm3u' ? 'block' : 'none';
  document.getElementById('modal-sec-saved').style.display = tab === 'saved' ? 'block' : 'none';

  if (tab === 'saved') {
    renderSavedAccounts();
  }
}

function renderSavedAccounts() {
  const list = document.getElementById('saved-accounts-list');
  if (state.accounts.length === 0) {
    list.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">Inga sparade konton än.</div>`;
    return;
  }
  list.innerHTML = state.accounts.map(acc => `
    <div style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <div style="font-weight: 800; font-size: 15px; margin-bottom: 2px;">
          ${acc.name}
          ${acc.id === state.activeAccount?.id ? '<span style="font-size: 10px; background: #30D158; color: #fff; padding: 2px 6px; border-radius: 99px; margin-left: 6px;">AKTIV</span>' : ''}
        </div>
        <div style="font-size: 12px; color: var(--text-dim);">${acc.type === 'xtream' ? acc.serverUrl : 'M3U Spellista'}</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn-header" onclick="activateAccount('${acc.id}')">Välj</button>
        <button class="btn-header" style="color: #FF375F;" onclick="deleteAccount('${acc.id}')">Ta bort</button>
      </div>
    </div>
  `).join('');
}

function activateAccount(id) {
  const acc = state.accounts.find(a => a.id === id);
  if (!acc) return;
  state.activeAccount = acc;
  if (acc.type === 'xtream') {
    document.getElementById('xtream-name').value = acc.name;
    document.getElementById('xtream-server').value = acc.serverUrl;
    document.getElementById('xtream-user').value = acc.username;
    document.getElementById('xtream-pass').value = acc.password;
    handleXtreamSubmit({ preventDefault: () => {} });
  } else {
    closeModal();
    renderCurrentTab();
  }
}

function deleteAccount(id) {
  state.accounts = state.accounts.filter(a => a.id !== id);
  saveAccounts();
  if (state.activeAccount?.id === id) {
    launchDemo();
  }
  renderSavedAccounts();
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

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  // Service Worker Registration for PWA Standalone Mode
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg:', err));
  }

  // Load active account or demo
  if (state.accounts.length > 0) {
    state.activeAccount = state.accounts[0];
    if (state.activeAccount.type === 'xtream') {
      document.getElementById('xtream-name').value = state.activeAccount.name;
      document.getElementById('xtream-server').value = state.activeAccount.serverUrl;
      document.getElementById('xtream-user').value = state.activeAccount.username;
      document.getElementById('xtream-pass').value = state.activeAccount.password;
      handleXtreamSubmit({ preventDefault: () => {} });
    } else {
      launchDemo();
    }
  } else {
    launchDemo();
  }
});
