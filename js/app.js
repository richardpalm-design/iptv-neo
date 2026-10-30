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
      name: 'Viasat Sport Premium HD',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200',
      url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
      categoryId: 'sports',
      epg: 'UEFA Champions League Live'
    },
    {
      id: 'sport2',
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
  seriesCategories: [
    { id: 'all', name: 'Alla serier' },
    { id: 'nordic', name: 'Nordiska Serier' }
  ],
  series: [
    {
      id: 'ser1',
      seriesId: 601,
      name: 'The Midsummer Mystery (Säsong 1)',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
      rating: '8.7',
      seasons: 1,
      plot: 'En spännande psykologisk thriller i skärgården under årets längsta natt.'
    },
    {
      id: 'ser2',
      seriesId: 602,
      name: 'Cyberpunk Stockholm 2099',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600',
      rating: '9.0',
      seasons: 2,
      plot: 'Framtidens neonupplysta gator möter virtuella agentnätverk.'
    }
  ]
};

// Default Sverige 8K IPTV Account (Configured by User)
const DEFAULT_ACCOUNT = {
  id: 'acc_sverige8k',
  name: 'Sverige 8K',
  type: 'xtream',
  serverUrl: 'https://cf.sverige8k.pro',
  username: 'b16836b7a227',
  password: 'fca112cc11',
  status: 'Aktiv',
  expDate: '2027-01-20'
};

// Application State
const state = {
  currentTab: 'home',
  accounts: JSON.parse(localStorage.getItem('iptv_neo_accounts') || '[]'),
  activeAccount: null,
  channels: [],
  liveCategories: [],
  selectedLiveCategory: 'all',
  channelPage: 1,
  movies: [],
  movieCategories: [],
  selectedMovieCategory: '167',
  moviesLoading: false,
  movieSearchQuery: '',
  moviePage: 1,
  series: [],
  seriesCategories: [],
  selectedSeriesCategory: '138',
  seriesLoading: false,
  seriesSearchQuery: '',
  seriesPage: 1,
  favorites: new Set(JSON.parse(localStorage.getItem('iptv_neo_favorites') || '[]')),
  searchQuery: '',
  showFavoritesOnly: false,
  nowPlaying: null,
  isPlaying: false,
  hlsInstance: null,
  categoryChannelsCache: {},
  categoryMoviesCache: {},
  categorySeriesCache: {}
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
    url = 'https://' + url;
  }
  // Upgrading sverige8k.pro to https avoids mixed-content blocks in iOS Safari PWA
  if (url.includes('sverige8k.pro') && url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }
  return url.replace(/\/+$/, '');
}

// VLC Stream URL generator (iOS x-callback and standard vlc protocol)
function getVlcUrl(streamUrl) {
  if (!streamUrl) return '#';
  return 'vlc-x-callback://x-callback-url/stream?url=' + encodeURIComponent(streamUrl);
}

// High-Speed Multi-Tier Proxy Fetcher (Handles HTTP on HTTPS Mixed Content & CORS)
async function robustFetch(url, isJson = true) {
  url = url.trim();

  // If server is sverige8k.pro, use https
  if (url.includes('sverige8k.pro') && url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  const attempts = [
    {
      name: 'Direct',
      getUrl: u => u,
      parse: res => (isJson ? res.json() : res.text())
    },
    {
      name: 'Netlify Proxy',
      getUrl: u => `/.netlify/functions/proxy?url=${encodeURIComponent(u)}`,
      parse: res => (isJson ? res.json() : res.text())
    },
    {
      name: 'AllOrigins',
      getUrl: u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
      parse: async res => {
        const j = await res.json();
        return isJson ? JSON.parse(j.contents) : j.contents;
      }
    }
  ];

  let lastError = null;

  for (const attempt of attempts) {
    try {
      const target = attempt.getUrl(url);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch(target, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const result = await attempt.parse(res);
      if (result) return result;
    } catch (err) {
      lastError = err;
      console.warn(`[Proxy ${attempt.name}] misslyckades:`, err.message);
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

// Fullscreen Loading Indicator
function renderLoadingHome(message = 'Ansluter till Sverige 8K...') {
  const contentEl = document.getElementById('tab-content');
  if (!contentEl) return;
  contentEl.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 24px;">
      <div style="width: 52px; height: 52px; border: 3px solid rgba(10,132,255,0.2); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 24px;"></div>
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">${message}</div>
      <div style="font-size: 13px; color: var(--text-muted); max-width: 340px; line-height: 1.5; margin-bottom: 24px;">
        Hämtar kanaler, filmer och serier från <span style="color: var(--primary); font-family: monospace;">cf.sverige8k.pro</span>...
      </div>
      <button class="btn-header" style="font-size: 13px;" onclick="launchDemo()">
        ▶ Eller starta offline demo direkt
      </button>
    </div>
  `;
}

// Complete Xtream Loader: Live TV, VOD Movies & Series (Natural Server Ordering, Unfiltered)
async function loadXtreamAccount(account, updateModal = false) {
  const name = account.name || 'Sverige 8K';
  const server = cleanServerUrl(account.serverUrl);
  const user = (account.username || '').trim();
  const pass = (account.password || '').trim();

  if (!server || !user || !pass) {
    throw new Error('Server URL, Användarnamn och Lösenord krävs.');
  }

  if (updateModal) showModalStatus('Ansluter till servern...', false, true);

  const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;

  // 1. Authenticate with server
  let authData = await robustFetch(base, true);
  if (typeof authData === 'string') {
    try { authData = JSON.parse(authData); } catch (e) {}
  }

  if (authData?.user_info && String(authData.user_info.auth) === '0') {
    throw new Error('Inloggningen nekades av servern (fel användarnamn eller lösenord).');
  }

  const status = authData?.user_info?.status || 'Aktiv';
  let expDate = '2027-01-20';
  if (authData?.user_info?.exp_date) {
    const expTimestamp = parseInt(authData.user_info.exp_date);
    if (!isNaN(expTimestamp) && expTimestamp > 0) {
      expDate = new Date(expTimestamp * 1000).toLocaleDateString('sv-SE');
    }
  }

  if (updateModal) showModalStatus('Inloggad! Hämtar kategorier...', false, true);

  // 2. Fetch categories for Live, VOD, and Series in parallel (Natural Server Ordering, Unfiltered)
  const [liveCatsRaw, vodCatsRaw, seriesCatsRaw] = await Promise.all([
    robustFetch(`${base}&action=get_live_categories`, true).catch(() => []),
    robustFetch(`${base}&action=get_vod_categories`, true).catch(() => []),
    robustFetch(`${base}&action=get_series_categories`, true).catch(() => [])
  ]);

  const mapCats = (arr) => Array.isArray(arr) ? arr.map(c => ({ id: String(c.category_id), name: c.category_name })) : [];

  const liveCats = mapCats(liveCatsRaw);
  const vodCats = mapCats(vodCatsRaw);
  const seriesCats = mapCats(seriesCatsRaw);

  state.liveCategories = [{ id: 'all', name: 'Alla kanaler' }, ...liveCats];
  state.movieCategories = vodCats;
  state.seriesCategories = seriesCats;

  // Pick initial default categories
  const defaultLiveCat = liveCats.find(c => c.name.startsWith('SE|') || c.id === '48') || liveCats[0] || { id: 'all' };
  const defaultVodCat = vodCats[0] || { id: '167', name: 'Filmer' };
  const defaultSeriesCat = seriesCats.find(c => c.name.includes('NETFLIX')) || seriesCats[0] || { id: '138', name: 'Serier' };

  state.selectedLiveCategory = defaultLiveCat.id;
  state.selectedMovieCategory = defaultVodCat.id;
  state.selectedSeriesCategory = defaultSeriesCat.id;

  state.categoryChannelsCache = state.categoryChannelsCache || {};
  state.categoryMoviesCache = state.categoryMoviesCache || {};
  state.categorySeriesCache = state.categorySeriesCache || {};

  // 3. Fetch Initial Live Channels (~75KB)
  try {
    const liveStreams = await robustFetch(`${base}&action=get_live_streams&category_id=${defaultLiveCat.id}`, true);
    state.channels = (Array.isArray(liveStreams) ? liveStreams : []).map(s => ({
      id: `xtream_${s.stream_id}`,
      streamId: s.stream_id,
      name: s.name,
      logo: s.stream_icon,
      url: `${server}/live/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${s.stream_id}.m3u8`,
      rawUrl: `${server}/live/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${s.stream_id}.ts`,
      categoryId: String(s.category_id || defaultLiveCat.id),
      epg: s.epg_channel_id ? `EPG: ${s.epg_channel_id}` : 'Livesändning'
    }));
    state.categoryChannelsCache[defaultLiveCat.id] = state.channels;
  } catch (e) {
    console.warn('Initial live fetch warning:', e);
  }

  // 4. Fetch Initial VOD Movies and Series in background so UI renders immediately
  Promise.all([
    robustFetch(`${base}&action=get_vod_streams&category_id=${defaultVodCat.id}`, true).catch(() => []),
    robustFetch(`${base}&action=get_series&category_id=${defaultSeriesCat.id}`, true).catch(() => [])
  ]).then(([vodStreams, seriesList]) => {
    state.movies = (Array.isArray(vodStreams) ? vodStreams : []).map(m => ({
      id: `vod_${m.stream_id}`,
      streamId: m.stream_id,
      name: m.name,
      poster: m.stream_icon,
      url: `${server}/movie/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${m.stream_id}.${m.container_extension || 'mp4'}`,
      categoryId: String(m.category_id || defaultVodCat.id),
      rating: m.rating || '8.2',
      year: m.year || '2026',
      plot: m.plot || ''
    }));
    state.categoryMoviesCache[defaultVodCat.id] = state.movies;

    state.series = (Array.isArray(seriesList) ? seriesList : []).map(s => ({
      id: `ser_${s.series_id}`,
      seriesId: s.series_id,
      name: s.name,
      poster: s.cover,
      categoryId: String(s.category_id || defaultSeriesCat.id),
      rating: s.rating || '8.5',
      seasons: 1,
      plot: s.plot || ''
    }));
    state.categorySeriesCache[defaultSeriesCat.id] = state.series;

    // Re-render if viewing home, movies, or series
    if (['home', 'movies', 'series'].includes(state.currentTab)) {
      renderCurrentTab();
    }
  });

  const updatedAccount = {
    id: account.id || ('acc_' + Date.now()),
    name,
    type: 'xtream',
    serverUrl: server,
    username: user,
    password: pass,
    status,
    expDate
  };

  state.accounts = state.accounts.filter(a => a.username !== user && a.id !== updatedAccount.id);
  state.accounts.unshift(updatedAccount);
  state.activeAccount = updatedAccount;
  saveAccounts();

  if (updateModal) {
    showModalStatus(`Klart! Laddade kanaler från ${name}.`, false, false);
    setTimeout(() => {
      closeModal();
      renderCurrentTab();
    }, 400);
  } else {
    renderCurrentTab();
  }

  return true;
}

async function handleXtreamSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  
  const nameInput = document.getElementById('xtream-name');
  const serverInput = document.getElementById('xtream-server');
  const userInput = document.getElementById('xtream-user');
  const passInput = document.getElementById('xtream-pass');

  const name = (nameInput ? nameInput.value : state.activeAccount?.name) || 'Sverige 8K';
  const server = cleanServerUrl(serverInput ? serverInput.value : state.activeAccount?.serverUrl);
  const user = (userInput ? userInput.value : state.activeAccount?.username || '').trim();
  const pass = (passInput ? passInput.value : state.activeAccount?.password || '').trim();

  if (!server || !user || !pass) {
    showModalStatus('Vänligen fyll i Server URL, Användarnamn och Lösenord.', true, false);
    return;
  }

  const submitBtn = document.getElementById('btn-xtream-submit');
  if (submitBtn) submitBtn.disabled = true;

  try {
    await loadXtreamAccount({ name, serverUrl: server, username: user, password: pass }, true);
  } catch (err) {
    showModalStatus('Anslutningsfel: ' + err.message, true, false);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

// M3U Playlist Handler (URL, File, or Text)
async function handleM3USubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const name = document.getElementById('m3u-name').value.trim() || 'Min M3U';
  const url = document.getElementById('m3u-url').value.trim();
  const fileInput = document.getElementById('m3u-file');
  const textInput = document.getElementById('m3u-text').value.trim();
  const submitBtn = document.getElementById('btn-m3u-submit');

  if (submitBtn) submitBtn.disabled = true;

  try {
    let content = '';

    if (fileInput.files && fileInput.files.length > 0) {
      showModalStatus('Läser in fil...', false, true);
      const file = fileInput.files[0];
      content = await file.text();
    } else if (textInput.length > 0) {
      showModalStatus('Tolkar klistrad spellista...', false, true);
      content = textInput;
    } else if (url.length > 0) {
      showModalStatus('Laddar ner M3U-spellista...', false, true);
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
    }, 600);
  } catch (err) {
    showModalStatus('Kunde inte läsa spellistan: ' + err.message, true, false);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function parseM3U(m3uText, accountName, sourceUrl) {
  const lines = m3uText.split(/\r?\n/);
  const channels = [];
  const catMap = {};

  let currentName = '';
  let currentLogo = '';
  let currentGroup = 'Allmän';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      const groupMatch = line.match(/group-title="([^"]+)"/i);
      if (groupMatch) currentGroup = groupMatch[1];

      const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
      if (logoMatch) currentLogo = logoMatch[1];

      const parts = line.split(',');
      if (parts.length > 1) {
        currentName = parts.slice(1).join(',').trim();
      }
    } else if (line.startsWith('http://') || line.startsWith('https://')) {
      const catId = 'cat_' + currentGroup.toLowerCase().replace(/[^a-z0-9]/g, '_');
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
    throw new Error('Hittade inga giltiga strömmar i M3U-filen.');
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
  state.seriesCategories = DEMO_DATA.seriesCategories;
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

  const vlcCallback = getVlcUrl(item.url);

  document.getElementById('hud-channel-name').textContent = item.name;
  const subEl = document.getElementById('hud-channel-sub');
  subEl.innerHTML = `
    <span>${item.epg || item.plot || 'Direktsändning'}</span>
  `;

  // HUD VLC Anchor button
  const vlcAnchor = document.getElementById('hud-vlc-anchor');
  if (vlcAnchor) {
    vlcAnchor.innerHTML = `
      <a href="${vlcCallback}" class="btn-vlc-pill" style="font-size: 12px; padding: 5px 12px; border-radius: 99px; text-decoration: none;">
        🟧 Spela i VLC
      </a>
    `;
  }

  document.getElementById('mini-title').textContent = item.name;
  document.getElementById('mini-sub').textContent = item.epg || 'Spelar nu';

  videoOverlay.style.display = 'flex';
  miniPlayer.style.display = 'none';

  // Video error handler for Safari HTTP redirect / MKV codec blocks
  videoEl.onerror = () => {
    subEl.innerHTML = `
      <span style="color: #FF375F; font-weight: 700;">⚠️ Safari stöder ej MKV/HTTP.</span>
      <a href="${vlcCallback}" style="display: inline-block; margin-left: 6px; background: #FF9500; color: #000; padding: 4px 10px; border-radius: 99px; font-size: 12px; text-decoration: none; font-weight: 800;">
        ▶ Klicka här för att spela i VLC
      </a>
    `;
  };

  // HLS stream playback: Native Apple iOS Safari vs Hls.js fallback
  if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    videoEl.src = item.url;
    videoEl.play().catch(() => {});
  } else if (window.Hls && Hls.isSupported() && item.url.includes('.m3u8')) {
    if (state.hlsInstance) state.hlsInstance.destroy();
    const hls = new Hls({ enableWorker: true });
    state.hlsInstance = hls;
    hls.loadSource(item.url);
    hls.attachMedia(videoEl);
    hls.on(Hls.Events.MANIFEST_PARSED, () => videoEl.play().catch(() => {}));
  } else {
    videoEl.src = item.url;
    videoEl.play().catch(() => {});
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
    state.isPlaying = true;
    document.getElementById('btn-play-pause').textContent = '⏸';
  } else {
    videoEl.pause();
    state.isPlaying = false;
    document.getElementById('btn-play-pause').textContent = '▶';
  }
}

function togglePiP() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (videoEl.requestPictureInPicture) {
    videoEl.requestPictureInPicture();
  } else if (videoEl.webkitSetPresentationMode) {
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
  if (!container) return;
  container.innerHTML = state.channels.map(ch => `
    <div class="drawer-item ${state.nowPlaying?.id === ch.id ? 'active' : ''}" onclick="playMedia(state.channels.find(c => c.id === '${ch.id}')); toggleChannelDrawer();">
      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${state.nowPlaying?.id === ch.id ? 'var(--primary)' : 'rgba(255,255,255,0.2)'};"></span>
      <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${ch.name}</span>
      <a href="${getVlcUrl(ch.url)}" class="btn-vlc-pill" style="font-size: 10px; padding: 2px 6px;" onclick="event.stopPropagation();">VLC</a>
    </div>
  `).join('');
}

// Tab Switching
function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });

  // Top header back button: visible on every tab except 'home'
  const backBtn = document.getElementById('btn-header-back');
  if (backBtn) {
    backBtn.style.display = (tab === 'home') ? 'none' : 'inline-flex';
  }

  renderCurrentTab();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentTab() {
  const contentEl = document.getElementById('tab-content');
  document.getElementById('brand-account').textContent = state.activeAccount?.name || 'Sverige 8K';

  // Sync header back button state
  const backBtn = document.getElementById('btn-header-back');
  if (backBtn) {
    backBtn.style.display = (state.currentTab === 'home') ? 'none' : 'inline-flex';
  }

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

// 1. Home View (Dashboard)
function renderHome(container) {
  const hero = state.movies[0] || state.series[0] || state.channels[0];
  const favChannels = state.channels.filter(c => state.favorites.has(c.id));
  const popularChannels = state.channels.slice(0, 8);

  container.innerHTML = `
    <!-- Hero Banner -->
    ${hero ? `
      <div class="hero-card">
        <div class="hero-tag">🔥 Utvalt Just Nu</div>
        <div class="hero-title">${hero.name}</div>
        <div class="hero-desc">${hero.plot || hero.epg || 'Se direktsänd TV, filmer och serier i högsta kvalitet.'}</div>
        <div style="display: flex; gap: 10px; align-items: center; margin-top: 14px;">
          <button class="btn-play-hero" onclick="playMedia(state.movies[0] || state.channels[0])">
            ▶ Spela Nu
          </button>
          <a href="${getVlcUrl(hero.url)}" class="btn-vlc-pill" style="font-size: 13px; padding: 10px 18px; border-radius: 12px;">
            🟧 Öppna i VLC
          </a>
        </div>
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
          <div class="count">${state.movieCategories.length} kategorier</div>
        </div>
      </div>
      <div class="shortcut-card shortcut-favs" onclick="switchTab('series')">
        <div class="icon">🎞️</div>
        <div>
          <div class="label">Serier</div>
          <div class="count">${state.seriesCategories.length} kategorier</div>
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
      <div style="font-size: 13px; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="switchTab('live')">Visa alla ›</div>
    </div>
    <div class="h-scroll">
      ${popularChannels.map(ch => renderChannelPill(ch)).join('')}
    </div>

    <!-- Trending Movies -->
    ${state.movies.length > 0 ? `
      <div class="section-header">
        <div class="section-title">Senaste Filmer (${state.movies.length} st)</div>
        <div style="font-size: 13px; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="switchTab('movies')">Visa alla ›</div>
      </div>
      <div class="h-scroll">
        ${state.movies.slice(0, 12).map(m => `
          <div class="movie-poster-card" onclick="openMovieModal('${m.id}')">
            <div class="movie-poster-box">
              ${m.poster ? `<img src="${m.poster}" class="movie-poster-img" alt="${m.name}" onerror="this.style.display='none'">` : ''}
              <span style="font-size: 32px; color: rgba(255,255,255,0.2);">🎬</span>
              ${m.rating ? `<div class="movie-rating-badge">★ ${m.rating}</div>` : ''}
            </div>
            <div class="movie-title">${m.name}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
              <span style="font-size:11px; color:var(--text-dim);">${m.year || '2026'}</span>
              <a href="${getVlcUrl(m.url)}" class="btn-vlc-pill" style="font-size:10px; padding:2px 8px;" onclick="event.stopPropagation();">▶ VLC</a>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <!-- Trending Series -->
    ${state.series.length > 0 ? `
      <div class="section-header">
        <div class="section-title">Populära Serier (${state.series.length} st)</div>
        <div style="font-size: 13px; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="switchTab('series')">Visa alla ›</div>
      </div>
      <div class="h-scroll">
        ${state.series.slice(0, 12).map(s => `
          <div class="movie-poster-card" onclick="openSeriesModal('${s.id}')">
            <div class="movie-poster-box">
              ${s.poster ? `<img src="${s.poster}" class="movie-poster-img" alt="${s.name}" onerror="this.style.display='none'">` : ''}
              <span style="font-size: 32px; color: rgba(255,255,255,0.2);">📺</span>
              ${s.rating ? `<div class="movie-rating-badge">★ ${s.rating}</div>` : ''}
            </div>
            <div class="movie-title">${s.name}</div>
            <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">Klicka för avsnitt</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
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
async function selectLiveCategory(catId) {
  state.selectedLiveCategory = catId;
  state.channelPage = 1;

  if (state.categoryChannelsCache && state.categoryChannelsCache[catId]) {
    state.channels = state.categoryChannelsCache[catId];
    renderLiveTV(document.getElementById('tab-content'));
    return;
  }

  if (state.activeAccount && state.activeAccount.type === 'xtream') {
    const server = cleanServerUrl(state.activeAccount.serverUrl);
    const user = state.activeAccount.username;
    const pass = state.activeAccount.password;
    const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
    const targetUrl = catId !== 'all' 
      ? `${base}&action=get_live_streams&category_id=${catId}`
      : `${base}&action=get_live_streams&category_id=48`;

    renderLiveTV(document.getElementById('tab-content'));
    try {
      const streams = await robustFetch(targetUrl, true);
      if (Array.isArray(streams) && streams.length > 0) {
        const channels = streams.map(s => ({
          id: `xtream_${s.stream_id}`,
          streamId: s.stream_id,
          name: s.name,
          logo: s.stream_icon,
          url: `${server}/live/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${s.stream_id}.m3u8`,
          categoryId: String(s.category_id || catId),
          epg: s.epg_channel_id ? `EPG: ${s.epg_channel_id}` : 'Livesändning'
        }));
        state.categoryChannelsCache[catId] = channels;
        state.channels = channels;
      }
    } catch (e) {
      console.warn('Category fetch error:', e);
    }
    renderLiveTV(document.getElementById('tab-content'));
  } else {
    renderLiveTV(document.getElementById('tab-content'));
  }
}

function renderLiveTV(container) {
  const filtered = state.channels.filter(ch => {
    const matchCat = state.selectedLiveCategory === 'all' || ch.categoryId === state.selectedLiveCategory;
    const matchSearch = !state.searchQuery || ch.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchFav = !state.showFavoritesOnly || state.favorites.has(ch.id);
    return matchCat && matchSearch && matchFav;
  });

  const page = state.channelPage || 1;
  const pageSize = 120;
  const displayed = filtered.slice(0, page * pageSize);
  const hasMore = filtered.length > displayed.length;

  container.innerHTML = `
    <!-- Top Nav Back Bar -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 16px 12px 16px;">
      <button class="btn-header" style="padding: 6px 14px; font-size: 13px; font-weight: 700; color: var(--primary);" onclick="switchTab('home')">
        ‹ Startsida
      </button>
      <span style="font-size: 13px; color: var(--text-dim); font-weight: 600;">${filtered.length} kanaler</span>
    </div>

    <!-- Search Bar -->
    <div class="search-box">
      <span>🔍</span>
      <input type="text" class="search-input" placeholder="Sök bland ${state.channels.length} kanaler..." value="${state.searchQuery}" oninput="state.searchQuery = this.value; state.channelPage = 1; renderLiveTV(document.getElementById('tab-content'))">
      <span style="cursor: pointer; color: ${state.showFavoritesOnly ? '#FFD60A' : 'var(--text-dim)'}; font-size: 18px;" onclick="state.showFavoritesOnly = !state.showFavoritesOnly; state.channelPage = 1; renderLiveTV(document.getElementById('tab-content'))">★</span>
    </div>

    <!-- Category Pills -->
    <div class="filter-bar">
      ${state.liveCategories.slice(0, 35).map(cat => `
        <button class="filter-pill ${state.selectedLiveCategory === cat.id ? 'active' : ''}" onclick="selectLiveCategory('${cat.id}')">
          ${cat.name}
        </button>
      `).join('')}
    </div>

    <!-- Channels List -->
    <div style="padding-top: 8px;">
      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 50px 20px; color: var(--text-dim);">
          <div style="font-size: 40px; margin-bottom: 12px;">📺</div>
          <div>Inga kanaler matchade sökningen eller kategorin.</div>
        </div>
      ` : `
        ${displayed.map(ch => `
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
            <a href="${getVlcUrl(ch.url)}" class="btn-vlc-pill" title="Öppna direkt i VLC på iPhone">▶ VLC</a>
            <button class="star-btn ${state.favorites.has(ch.id) ? 'active' : ''}" onclick="toggleFavorite('${ch.id}')">★</button>
          </div>
        `).join('')}
        ${hasMore ? `
          <div style="text-align: center; padding: 24px 16px 40px 16px;">
            <button class="btn-primary" style="display: inline-block; width: auto; padding: 12px 32px;" onclick="state.channelPage = (state.channelPage || 1) + 1; renderLiveTV(document.getElementById('tab-content'))">
              Visa fler (${filtered.length - displayed.length} kvar)
            </button>
          </div>
        ` : ''}
      `}
    </div>
  `;
}

// 3. Movies View
async function selectMovieCategory(catId) {
  state.selectedMovieCategory = catId;
  state.moviePage = 1;

  if (state.categoryMoviesCache && state.categoryMoviesCache[catId]) {
    state.movies = state.categoryMoviesCache[catId];
    renderMovies(document.getElementById('tab-content'));
    return;
  }
  if (state.activeAccount && state.activeAccount.type === 'xtream') {
    state.moviesLoading = true;
    renderMovies(document.getElementById('tab-content'));

    const server = cleanServerUrl(state.activeAccount.serverUrl);
    const user = state.activeAccount.username;
    const pass = state.activeAccount.password;
    const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
    const targetUrl = `${base}&action=get_vod_streams&category_id=${catId}`;
    
    try {
      const streams = await robustFetch(targetUrl, true);
      if (Array.isArray(streams)) {
        state.movies = streams.map(m => ({
          id: `vod_${m.stream_id}`,
          streamId: m.stream_id,
          name: m.name,
          poster: m.stream_icon,
          url: `${server}/movie/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${m.stream_id}.${m.container_extension || 'mp4'}`,
          categoryId: String(m.category_id || catId),
          rating: m.rating || '8.0',
          year: m.year || '2026',
          plot: m.plot || ''
        }));
        state.categoryMoviesCache[catId] = state.movies;
      }
    } catch(e) {
      console.warn('Movie fetch error:', e);
    } finally {
      state.moviesLoading = false;
    }
    renderMovies(document.getElementById('tab-content'));
  }
}

function renderMovies(container) {
  const currentCat = state.movieCategories.find(c => c.id === state.selectedMovieCategory) || { name: 'Vald kategori' };
  const filtered = state.movies.filter(m => {
    const matchSearch = !state.movieSearchQuery || m.name.toLowerCase().includes(state.movieSearchQuery.toLowerCase());
    return matchSearch;
  });

  const page = state.moviePage || 1;
  const pageSize = 60;
  const displayed = filtered.slice(0, page * pageSize);
  const hasMore = filtered.length > displayed.length;

  container.innerHTML = `
    <!-- Top Nav Back Bar -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 16px 12px 16px;">
      <button class="btn-header" style="padding: 6px 14px; font-size: 13px; font-weight: 700; color: var(--primary);" onclick="switchTab('home')">
        ‹ Startsida
      </button>
      <span style="font-size: 13px; color: var(--text-dim); font-weight: 600;">${filtered.length} st i "${currentCat.name}"</span>
    </div>

    <!-- Movie Search Bar -->
    <div class="search-box">
      <span>🔍</span>
      <input type="text" class="search-input" placeholder="Sök bland filmer i denna kategori..." value="${state.movieSearchQuery || ''}" oninput="state.movieSearchQuery = this.value; state.moviePage = 1; renderMovies(document.getElementById('tab-content'))">
    </div>

    <!-- Category Dropdown Picker (All 328 categories accessible) -->
    <div style="margin: 0 16px 12px 16px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-glass); border-radius: 12px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 13px; font-weight: 700; color: var(--text-dim); white-space: nowrap;">📁 Välj Kategori (${state.movieCategories.length} st):</span>
      <select style="background: transparent; border: none; color: var(--primary); font-size: 13px; font-weight: 800; max-width: 60%; outline: none; -webkit-appearance: none; cursor: pointer; text-align: right;" onchange="state.moviePage = 1; selectMovieCategory(this.value)">
        ${state.movieCategories.map(cat => `<option value="${cat.id}" ${state.selectedMovieCategory === cat.id ? 'selected' : ''} style="background: #1C1C1E; color: #fff;">${cat.name}</option>`).join('')}
      </select>
      <span style="font-size: 11px; color: var(--primary); margin-left: 6px;">▼</span>
    </div>

    <!-- Category Pills (First 35 categories) -->
    <div class="filter-bar">
      ${state.movieCategories.slice(0, 35).map(cat => `
        <button class="filter-pill ${state.selectedMovieCategory === cat.id ? 'active' : ''}" onclick="state.moviePage = 1; selectMovieCategory('${cat.id}')">
          ${cat.name}
        </button>
      `).join('')}
    </div>

    <!-- Loading Spinner or Content Grid -->
    ${state.moviesLoading ? `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="width: 44px; height: 44px; border: 3px solid rgba(10,132,255,0.2); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px auto;"></div>
        <div style="font-weight: 700;">Hämtar filmer...</div>
      </div>
    ` : filtered.length === 0 ? `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 40px; margin-bottom: 12px;">🎬</div>
        <div>Inga filmer hittades i denna kategori. Välj en annan kategori i rullistan ovanför.</div>
      </div>
    ` : `
      <div class="catalog-grid">
        ${displayed.map(m => `
          <div class="movie-poster-card" onclick="openMovieModal('${m.id}')">
            <div class="movie-poster-box" style="width: 100%; height: 160px;">
              ${m.poster ? `<img src="${m.poster}" class="movie-poster-img" alt="${m.name}" onerror="this.style.display='none'">` : ''}
              <span style="font-size: 32px; color: rgba(255,255,255,0.2);">🎬</span>
              ${m.rating ? `<div class="movie-rating-badge">★ ${m.rating}</div>` : ''}
            </div>
            <div class="movie-title">${m.name}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
              <span style="font-size: 11px; color: var(--text-dim);">${m.year || '2026'}</span>
              <a href="${getVlcUrl(m.url)}" class="btn-vlc-pill" style="font-size:10px; padding:2px 8px;" onclick="event.stopPropagation();">▶ VLC</a>
            </div>
          </div>
        `).join('')}
      </div>
      ${hasMore ? `
        <div style="text-align: center; padding: 24px 16px 40px 16px;">
          <button class="btn-primary" style="display: inline-block; width: auto; padding: 12px 32px;" onclick="state.moviePage = (state.moviePage || 1) + 1; renderMovies(document.getElementById('tab-content'))">
            Visa fler (${filtered.length - displayed.length} kvar)
          </button>
        </div>
      ` : ''}
    `}
  `;
}

// 4. Series View
async function selectSeriesCategory(catId) {
  state.selectedSeriesCategory = catId;
  state.seriesPage = 1;

  if (state.categorySeriesCache && state.categorySeriesCache[catId]) {
    state.series = state.categorySeriesCache[catId];
    renderSeries(document.getElementById('tab-content'));
    return;
  }
  if (state.activeAccount && state.activeAccount.type === 'xtream') {
    state.seriesLoading = true;
    renderSeries(document.getElementById('tab-content'));

    const server = cleanServerUrl(state.activeAccount.serverUrl);
    const user = state.activeAccount.username;
    const pass = state.activeAccount.password;
    const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
    const targetUrl = `${base}&action=get_series&category_id=${catId}`;
    
    try {
      const streams = await robustFetch(targetUrl, true);
      if (Array.isArray(streams)) {
        state.series = streams.map(s => ({
          id: `ser_${s.series_id}`,
          seriesId: s.series_id,
          name: s.name,
          poster: s.cover,
          categoryId: String(s.category_id || catId),
          rating: s.rating || '8.5',
          seasons: 1,
          plot: s.plot || ''
        }));
        state.categorySeriesCache[catId] = state.series;
      }
    } catch(e) {
      console.warn('Series fetch error:', e);
    } finally {
      state.seriesLoading = false;
    }
    renderSeries(document.getElementById('tab-content'));
  }
}

function renderSeries(container) {
  const currentCat = state.seriesCategories.find(c => c.id === state.selectedSeriesCategory) || { name: 'Vald kategori' };
  const filtered = state.series.filter(s => {
    const matchSearch = !state.seriesSearchQuery || s.name.toLowerCase().includes(state.seriesSearchQuery.toLowerCase());
    return matchSearch;
  });

  const page = state.seriesPage || 1;
  const pageSize = 60;
  const displayed = filtered.slice(0, page * pageSize);
  const hasMore = filtered.length > displayed.length;

  container.innerHTML = `
    <!-- Top Nav Back Bar -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 16px 12px 16px;">
      <button class="btn-header" style="padding: 6px 14px; font-size: 13px; font-weight: 700; color: var(--primary);" onclick="switchTab('home')">
        ‹ Startsida
      </button>
      <span style="font-size: 13px; color: var(--text-dim); font-weight: 600;">${filtered.length} st i "${currentCat.name}"</span>
    </div>

    <!-- Series Search Bar -->
    <div class="search-box">
      <span>🔍</span>
      <input type="text" class="search-input" placeholder="Sök bland serier i denna kategori..." value="${state.seriesSearchQuery || ''}" oninput="state.seriesSearchQuery = this.value; state.seriesPage = 1; renderSeries(document.getElementById('tab-content'))">
    </div>

    <!-- Category Dropdown Picker (All 249 categories accessible) -->
    <div style="margin: 0 16px 12px 16px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-glass); border-radius: 12px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 13px; font-weight: 700; color: var(--text-dim); white-space: nowrap;">📁 Välj Kategori (${state.seriesCategories.length} st):</span>
      <select style="background: transparent; border: none; color: var(--primary); font-size: 13px; font-weight: 800; max-width: 60%; outline: none; -webkit-appearance: none; cursor: pointer; text-align: right;" onchange="state.seriesPage = 1; selectSeriesCategory(this.value)">
        ${state.seriesCategories.map(cat => `<option value="${cat.id}" ${state.selectedSeriesCategory === cat.id ? 'selected' : ''} style="background: #1C1C1E; color: #fff;">${cat.name}</option>`).join('')}
      </select>
      <span style="font-size: 11px; color: var(--primary); margin-left: 6px;">▼</span>
    </div>

    <!-- Category Pills (First 35 categories) -->
    <div class="filter-bar">
      ${state.seriesCategories.slice(0, 35).map(cat => `
        <button class="filter-pill ${state.selectedSeriesCategory === cat.id ? 'active' : ''}" onclick="state.seriesPage = 1; selectSeriesCategory('${cat.id}')">
          ${cat.name}
        </button>
      `).join('')}
    </div>

    <!-- Content Grid -->
    ${state.seriesLoading ? `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="width: 44px; height: 44px; border: 3px solid rgba(10,132,255,0.2); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px auto;"></div>
        <div style="font-weight: 700;">Hämtar serier...</div>
      </div>
    ` : filtered.length === 0 ? `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 40px; margin-bottom: 12px;">🎞️</div>
        <div>Inga serier hittades i denna kategori. Välj en annan kategori i rullistan ovanför.</div>
      </div>
    ` : `
      <div class="catalog-grid">
        ${displayed.map(s => `
          <div class="movie-poster-card" onclick="openSeriesModal('${s.id}')">
            <div class="movie-poster-box" style="width: 100%; height: 160px;">
              ${s.poster ? `<img src="${s.poster}" class="movie-poster-img" alt="${s.name}" onerror="this.style.display='none'">` : ''}
              <span style="font-size: 32px; color: rgba(255,255,255,0.2);">📺</span>
              ${s.rating ? `<div class="movie-rating-badge">★ ${s.rating}</div>` : ''}
            </div>
            <div class="movie-title">${s.name}</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">Klicka för avsnitt</div>
          </div>
        `).join('')}
      </div>
      ${hasMore ? `
        <div style="text-align: center; padding: 24px 16px 40px 16px;">
          <button class="btn-primary" style="display: inline-block; width: auto; padding: 12px 32px;" onclick="state.seriesPage = (state.seriesPage || 1) + 1; renderSeries(document.getElementById('tab-content'))">
            Visa fler (${filtered.length - displayed.length} kvar)
          </button>
        </div>
      ` : ''}
    `}
  `;
}

// 5. Settings View
function renderSettings(container) {
  container.innerHTML = `
    <!-- Top Nav Back Bar -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 16px 12px 16px;">
      <button class="btn-header" style="padding: 6px 14px; font-size: 13px; font-weight: 700; color: var(--primary);" onclick="switchTab('home')">
        ‹ Startsida
      </button>
      <span style="font-size: 13px; color: var(--text-dim); font-weight: 600;">Inställningar</span>
    </div>

    <div style="padding: 16px;">
      <!-- Active Account Card -->
      <div class="hero-card" style="margin: 0 0 20px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted);">AKTIVT KONTO</div>
            <div style="font-size: 18px; font-weight: 800;">${state.activeAccount?.name || 'Sverige 8K'}</div>
          </div>
          <button class="btn-header" onclick="openAccountModal()">Hantera</button>
        </div>
        <div style="font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-glass); padding-top: 10px; display: flex; justify-content: space-between;">
          <span>Status: <strong style="color: #30D158;">${state.activeAccount?.status || 'Aktiv'}</strong></span>
          <span>Giltigt: ${state.activeAccount?.expDate || '2027-01-20'}</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 15px; font-weight: 800; margin-bottom: 12px;">App-information</div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-glass);">
          <span>Version</span>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 13px;">v5.0 (PWA & iOS)</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-glass);">
          <span>VLC-stöd</span>
          <span style="color: #FF9500; font-weight: 600; font-size: 13px;">Aktivt (vlc-x-callback)</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
          <span>Hårdvaruavkodning</span>
          <span style="color: #30D158; font-weight: 600; font-size: 13px;">Aktiv (Metal / WebKit)</span>
        </div>
      </div>

      <!-- Force Update Button -->
      <button class="btn-header" style="width: 100%; margin-bottom: 12px; padding: 12px;" onclick="forceUpdateApp()">
        🔄 Tvinga Uppdatering & Töm Cache
      </button>

      <!-- Demo Launch -->
      <button class="btn-primary" style="margin-bottom: 16px; background: rgba(255,255,255,0.08); border: 1px solid var(--border-glass); box-shadow: none;" onclick="launchDemo()">
        ✨ Återställ till Demo-läge
      </button>

      <div style="text-align: center; font-size: 12px; color: var(--text-dim); margin-top: 24px;">
        IPTV Neo v5.0 • Utvecklad för iPhone & iPad
      </div>
    </div>
  `;
}

function forceUpdateApp() {
  if ('caches' in window) {
    caches.keys().then(names => {
      for (const name of names) caches.delete(name);
    });
  }
  localStorage.clear();
  window.location.reload(true);
}

// Modal Management
function openAccountModal() {
  document.getElementById('account-modal').style.display = 'flex';
  renderSavedAccounts();
}

function closeModal() {
  document.getElementById('account-modal').style.display = 'none';
  document.getElementById('detail-modal').style.display = 'none';
}

function switchModalTab(type) {
  ['xtream', 'm3u', 'saved'].forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const sec = document.getElementById(`modal-sec-${t}`);
    if (btn) btn.classList.toggle('active', t === type);
    if (sec) sec.style.display = (t === type) ? 'block' : 'none';
  });
  if (type === 'saved') renderSavedAccounts();
}

function renderSavedAccounts() {
  const container = document.getElementById('saved-accounts-list');
  if (!container) return;

  if (state.accounts.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:24px; color:var(--text-dim);">Inga sparade konton ännu.</div>';
    return;
  }

  container.innerHTML = state.accounts.map(acc => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 700; font-size: 15px;">${acc.name}</div>
        <div style="font-size: 12px; color: var(--text-dim);">${acc.type.toUpperCase()} • ${acc.username || acc.serverUrl || ''}</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn-header" style="color: var(--primary);" onclick="activateAccount('${acc.id}')">Välj</button>
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
  const vlcUrl = getVlcUrl(mov.url);

  modal.querySelector('.modal-content').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 140px; height: 200px; border-radius: var(--radius-md); overflow: hidden; margin: 0 auto 16px auto; background: rgba(255,255,255,0.05);">
        ${mov.poster ? `<img src="${mov.poster}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
      </div>
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 6px;">${mov.name}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">${mov.year || '2026'} • Betyg: ★ ${mov.rating || '8.0'}</div>
      <div style="font-size: 13px; line-height: 1.5; color: var(--text-muted); margin-bottom: 24px; text-align: left;">${mov.plot || 'Film i hög kvalitet.'}</div>
      
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <a href="${vlcUrl}" class="btn-primary" style="background: linear-gradient(135deg, #FF9500 0%, #FF5E3A 100%); text-align: center; text-decoration: none; display: block; font-weight: 800; padding: 14px;">
          🟧 Öppna direkt i VLC (Rekommenderas för MKV/4K)
        </a>
        <button class="btn-primary" style="background: rgba(255,255,255,0.1); border: 1px solid var(--border-glass);" onclick="closeModal(); playMedia(state.movies.find(m => m.id === '${mov.id}'))">
          ▶ Prova i Webbläsare
        </button>
      </div>

      <button class="btn-header" style="margin: 14px auto 0 auto;" onclick="closeModal()">Stäng</button>
    </div>
  `;
  modal.style.display = 'flex';
}

async function openSeriesModal(id) {
  const ser = state.series.find(s => s.id === id);
  if (!ser) return;
  const modal = document.getElementById('detail-modal');

  modal.querySelector('.modal-content').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 6px;">${ser.name}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Betyg: ★ ${ser.rating}</div>
      <div id="series-episodes-box" style="text-align: left; margin-top: 20px;">
        <div style="text-align: center; padding: 20px;">
          <div style="width: 32px; height: 32px; border: 2px solid rgba(10,132,255,0.2); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 12px auto;"></div>
          <div style="font-size: 13px;">Hämtar avsnitt från servern...</div>
        </div>
      </div>
      <button class="btn-header" style="margin: 20px auto 0 auto;" onclick="closeModal()">Stäng</button>
    </div>
  `;
  modal.style.display = 'flex';

  // Fetch real episodes from Xtream Codes API
  if (state.activeAccount && state.activeAccount.type === 'xtream') {
    const server = cleanServerUrl(state.activeAccount.serverUrl);
    const user = state.activeAccount.username;
    const pass = state.activeAccount.password;
    const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
    
    try {
      const data = await robustFetch(`${base}&action=get_series_info&series_id=${ser.seriesId}`, true);
      const epBox = document.getElementById('series-episodes-box');
      if (!epBox) return;

      if (data && data.episodes) {
        const seasonKeys = Object.keys(data.episodes);
        if (seasonKeys.length > 0) {
          epBox.innerHTML = seasonKeys.map(sNum => {
            const epList = data.episodes[sNum] || [];
            return `
              <div style="font-size: 15px; font-weight: 800; margin: 16px 0 8px 0; color: var(--primary);">Säsong ${sNum}</div>
              ${epList.map(ep => {
                const epUrl = `${server}/series/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${ep.id}.${ep.container_extension || 'mp4'}`;
                const vlcUrl = getVlcUrl(epUrl);
                return `
                  <div class="drawer-item" style="margin-bottom: 8px; justify-content: space-between; gap: 8px;">
                    <span style="font-size: 13px; font-weight: 600; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${ep.title || 'Avsnitt ' + ep.episode_num}</span>
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <a href="${vlcUrl}" class="btn-vlc-pill" style="font-size: 10px; padding: 3px 8px;">▶ VLC</a>
                      <button class="btn-header" style="font-size: 11px; padding: 4px 10px;" onclick="closeModal(); playMedia({ name: '${ser.name} - ${ep.title}', url: '${epUrl}' })">Spela</button>
                    </div>
                  </div>
                `;
              }).join('')}
            `;
          }).join('');
          return;
        }
      }
    } catch(e) {
      console.warn('Series info fetch error:', e);
    }
  }

  // Fallback demo episodes
  const epBox = document.getElementById('series-episodes-box');
  if (epBox) {
    epBox.innerHTML = `
      <div style="font-size: 15px; font-weight: 800; margin-bottom: 10px;">Avsnitt (Säsong 1)</div>
      ${[1, 2, 3, 4, 5].map(ep => `
        <div class="drawer-item" style="margin-bottom: 8px; justify-content: space-between;" onclick="closeModal(); playMedia({ name: '${ser.name} S01E0${ep}', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', epg: 'Avsnitt ${ep}' })">
          <span>Avsnitt ${ep}</span>
          <span style="color: var(--primary);">▶ Spela</span>
        </div>
      `).join('')}
    `;
  }
}

// Initial Boot
window.addEventListener('DOMContentLoaded', async () => {
  // Service Worker Registration for PWA Standalone Mode
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg:', err));
  }

  // Pre-fill modal input fields with Sverige 8K credentials
  const nameInput = document.getElementById('xtream-name');
  const serverInput = document.getElementById('xtream-server');
  const userInput = document.getElementById('xtream-user');
  const passInput = document.getElementById('xtream-pass');
  if (nameInput) nameInput.value = DEFAULT_ACCOUNT.name;
  if (serverInput) serverInput.value = DEFAULT_ACCOUNT.serverUrl;
  if (userInput) userInput.value = DEFAULT_ACCOUNT.username;
  if (passInput) passInput.value = DEFAULT_ACCOUNT.password;

  // Make sure DEFAULT_ACCOUNT is active
  const existingIndex = state.accounts.findIndex(a => a.username === DEFAULT_ACCOUNT.username);
  if (existingIndex === -1) {
    state.accounts.unshift(DEFAULT_ACCOUNT);
    state.activeAccount = DEFAULT_ACCOUNT;
    saveAccounts();
  } else {
    state.accounts[existingIndex].serverUrl = DEFAULT_ACCOUNT.serverUrl;
    state.accounts[existingIndex].password = DEFAULT_ACCOUNT.password;
    state.accounts[existingIndex].name = DEFAULT_ACCOUNT.name;
    state.activeAccount = state.accounts[existingIndex];
    saveAccounts();
  }

  // Auto-connect to Sverige 8K
  renderLoadingHome('Ansluter till Sverige 8K...');
  try {
    await loadXtreamAccount(state.activeAccount, false);
  } catch (err) {
    console.warn('Auto-connect error:', err);
    launchDemo();
    const banner = document.getElementById('tab-content');
    if (banner) {
      const alertDiv = document.createElement('div');
      alertDiv.style.cssText = 'background: rgba(255,55,95,0.2); border: 1px solid #FF375F; color: #FF6987; padding: 12px; border-radius: 12px; margin: 12px; font-size: 13px; font-weight: 600; text-align: center;';
      alertDiv.innerHTML = '⚠️ Kunde inte ansluta direkt till servern: ' + err.message + '. Startade demo-läge.';
      banner.insertBefore(alertDiv, banner.firstChild);
    }
  }
});
