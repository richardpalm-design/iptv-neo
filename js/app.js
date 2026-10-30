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
    expDate: 'ObegrÃ¤nsad'
  },
  liveCategories: [
    { id: 'all', name: 'Alla kanaler' },
    { id: 'nordic', name: 'Sverige & Norden' },
    { id: 'sports', name: 'Sport & Premium' },
    { id: 'news', name: 'Nyheter & DokumentÃ¤r' },
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
      epg: 'Vetenskapens vÃ¤rld (20:00 - 21:00)'
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
    { id: 'action', name: 'Action & Ã„ventyr' },
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
      plot: 'I en futuristisk dystopi fÃ¶rsÃ¶ker en grupp forskare rÃ¤dda mÃ¤nskligheten med hjÃ¤lp av artificiell intelligens och tidsfÃ¶rskjutning.'
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
      plot: 'NÃ¤r skogens lugn stÃ¶rs av tre busiga gnagare tar en enorm skogshare saken i egna tassar i en actionfylld komedi.'
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
      plot: 'En ensam krigardotter reser genom snÃ¶klÃ¤dda berg och farliga Ã¶demarker fÃ¶r att Ã¥terfÃ¶renas med sin fÃ¶rlorade drakunge.'
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
      plot: 'Ett iskallt mysterium skakar en enslig by i norra Sverige dÃ¤r en polisinspektÃ¶r avslÃ¶jar mÃ¶rka familjehemligheter.'
    }
  ],
  series: [
    {
      id: 'ser1',
      name: 'The Quantum Horizon',
      poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
      rating: '9.1',
      seasons: 2,
      plot: 'En expedition bortom solsystemets grÃ¤nser stÃ¶ter pÃ¥ anomalier som bÃ¶jer tid och rum.'
    },
    {
      id: 'ser2',
      name: 'Stockholm Noir',
      poster: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600',
      rating: '8.7',
      seasons: 3,
      plot: 'En undre vÃ¤rld i fÃ¶rÃ¤ndring kolliderar med finanseliten i Stockholms innerstad.'
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
    url = 'https://' + url;
  }
  // Upgrading sverige8k.pro to https avoids mixed-content blocks in iOS Safari PWA
  if (url.includes('sverige8k.pro') && url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }
  return url.replace(/\/+$/, '');
}

// High-Speed Multi-Tier Proxy Fetcher (Handles HTTP on HTTPS Mixed Content & CORS)
async function robustFetch(url, isJson = true) {
  url = url.trim();

  // If server is sverige8k.pro, use https
  if (url.includes('sverige8k.pro') && url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  // Tiered endpoints:
  // 1. Direct fetch (Fastest, zero proxy delay. Servers like cf.sverige8k.pro send Access-Control-Allow-Origin: * natively!)
  // 2. Netlify Serverless Proxy
  // 3. Cloudflare Worker Proxy
  // 4. AllOrigins Proxy
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
      name: 'Cloudflare Worker',
      getUrl: u => `https://cors.eu.org/${u}`,
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
      const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout per tier

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

  throw lastError || new Error('Kunde inte ansluta till IPTV-servern. Kontrollera URL och nÃ¤tverk.');
}

// Status Box Helper for Account Modal
function showModalStatus(message, isError = false, isLoading = false) {
  const box = document.getElementById('modal-status-box');
  if (!box) return;
  box.style.display = 'block';
  box.style.background = isError ? 'rgba(255, 55, 95, 0.2)' : 'rgba(10, 132, 255, 0.2)';
  box.style.border = `1px solid ${isError ? '#FF375F' : '#0A84FF'}`;
  box.style.color = isError ? '#FF6987' : '#64D2FF';
  box.innerHTML = `${isLoading ? 'â³ ' : isError ? 'âš ï¸ ' : 'âœ… '} ${message}`;
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
        Hämtar kanallistor från <span style="color: var(--primary); font-family: monospace;">cf.sverige8k.pro</span>...
      </div>
      <button class="btn-header" style="font-size: 13px;" onclick="launchDemo()">
        ▶ Eller starta offline demo direkt
      </button>
    </div>
  `;
}

// Dedicated Xtream Codes loader used on boot and in login modal
async function loadXtreamAccount(account, updateModal = false) {
  const name = account.name || 'Sverige 8K';
  const server = cleanServerUrl(account.serverUrl);
  const user = (account.username || '').trim();
  const pass = (account.password || '').trim();

  if (!server || !user || !pass) {
    throw new Error('Server URL, Användarnamn och Lösenord krävs.');
  }

  if (updateModal) showModalStatus('Ansluter till IPTV-servern...', false, true);

  const base = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;

  // 1. Authenticate with server
  let authData = await robustFetch(base, true);
  if (typeof authData === 'string') {
    try { authData = JSON.parse(authData); } catch (e) {}
  }

  if (authData?.user_info && String(authData.user_info.auth) === '0') {
    throw new Error('Inloggningen nekades av servern (Felaktigt användarnamn eller lösenord).');
  }

  const status = authData?.user_info?.status || 'Aktiv';
  let expDate = '2027-01-20';
  if (authData?.user_info?.exp_date) {
    const expTimestamp = parseInt(authData.user_info.exp_date);
    if (!isNaN(expTimestamp) && expTimestamp > 0) {
      expDate = new Date(expTimestamp * 1000).toLocaleDateString('sv-SE');
    }
  }

  if (updateModal) showModalStatus('Inloggad! Hämtar kanallistor...', false, true);

  // 2. Fetch live streams and categories in parallel
  const [liveCats, liveStreams] = await Promise.all([
    robustFetch(`${base}&action=get_live_categories`, true).catch(err => {
      console.warn('Could not load categories:', err);
      return [];
    }),
    robustFetch(`${base}&action=get_live_streams`, true).catch(err => {
      console.warn('Could not load streams:', err);
      return [];
    })
  ]);

  const channels = (Array.isArray(liveStreams) ? liveStreams : []).map(s => ({
    id: `xtream_${s.stream_id}`,
    streamId: s.stream_id,
    name: s.name,
    logo: s.stream_icon,
    url: `${server}/live/${encodeURIComponent(user)}/${encodeURIComponent(pass)}/${s.stream_id}.m3u8`,
    categoryId: String(s.category_id || 'all'),
    epg: s.epg_channel_id ? `EPG: ${s.epg_channel_id}` : 'Livesändning'
  }));

  if (channels.length === 0) {
    throw new Error('Inloggningen lyckades men servern returnerade 0 aktiva kanaler.');
  }

  // Sort categories: Swedish/Nordic on top
  const rawCats = Array.isArray(liveCats) ? liveCats.map(c => ({ id: String(c.category_id), name: c.category_name })) : [];
  rawCats.sort((a, b) => {
    const aIsSe = a.name.startsWith('SE|') || a.name.toLowerCase().includes('sweden') || a.name.toLowerCase().includes('sverige');
    const bIsSe = b.name.startsWith('SE|') || b.name.toLowerCase().includes('sweden') || b.name.toLowerCase().includes('sverige');
    if (aIsSe && !bIsSe) return -1;
    if (!aIsSe && bIsSe) return 1;
    return 0;
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
  state.channels = channels;
  state.liveCategories = [
    { id: 'all', name: 'Alla kanaler' },
    ...rawCats
  ];

  // Set default category to Swedish HD if available
  const seCat = rawCats.find(c => c.name.startsWith('SE| SWEDEN') || c.id === '48');
  state.selectedLiveCategory = seCat ? seCat.id : 'all';
  state.channelPage = 1;

  saveAccounts();

  if (updateModal) {
    showModalStatus(`Klart! Laddade ${channels.length} kanaler.`, false, false);
    setTimeout(() => {
      closeModal();
      renderCurrentTab();
    }, 600);
  } else {
    renderCurrentTab();
  }

  // 3. Load VOD Movies in background
  robustFetch(`${base}&action=get_vod_streams`, true).then(vodStreams => {
    if (Array.isArray(vodStreams) && vodStreams.length > 0) {
      state.movies = vodStreams.map(m => ({
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
      if (state.currentTab === 'movies' || state.currentTab === 'home') {
        renderCurrentTab();
      }
    }
  }).catch(e => console.log('VOD deferred:', e));

  return true;
}

// Xtream Login Handler (Modal Form)
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

    // Option 1: File Upload (Fastest, zero network)
    if (fileInput.files && fileInput.files.length > 0) {
      showModalStatus('LÃ¤ser in fil frÃ¥n enheten...', false, true);
      const file = fileInput.files[0];
      content = await file.text();
    }
    // Option 2: Pasted Text
    else if (textInput.length > 0) {
      showModalStatus('Tolkar klistrad spellista...', false, true);
      content = textInput;
    }
    // Option 3: Download from URL via Cloudflare Worker proxy
    else if (url.length > 0) {
      showModalStatus('Laddar ner M3U-spellista via proxy...', false, true);
      content = await robustFetch(url, false);
    } else {
      throw new Error('Ange en M3U-URL, vÃ¤lj en fil eller klistra in text.');
    }

    showModalStatus('Analyserar kanaler...', false, true);
    parseM3U(content, name, url);

    showModalStatus(`Klart! Laddade ${state.channels.length} kanaler.`, false, false);
    setTimeout(() => {
      closeModal();
      renderCurrentTab();
    }, 600);
  } catch (err) {
    showModalStatus('Kunde inte lÃ¤sa spellistan: ' + err.message, true, false);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

// Robust M3U Parser
function parseM3U(content, accountName = 'M3U Spellista', sourceUrl = '') {
  if (!content) throw new Error('Spellistan Ã¤r tom.');

  content = content.replace(/^\uFEFF/, '').trim();
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const channels = [];
  const catMap = {};
  let currentName = '';
  let currentLogo = '';
  let currentGroup = 'AllmÃ¤n';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      const groupMatch = line.match(/group-title=["']?([^"',]+)["']?/i);
      currentGroup = groupMatch && groupMatch[1].trim() ? groupMatch[1].trim() : 'AllmÃ¤n';

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
        epg: 'LivesÃ¤ndning'
      });

      currentName = '';
      currentLogo = '';
      currentGroup = 'AllmÃ¤n';
    }
  }

  if (channels.length === 0) {
    throw new Error('Hittade inga giltiga strÃ¶mmar i M3U-filen. Kontrollera formatet.');
  }

  const account = {
    id: 'm3u_' + Date.now(),
    name: accountName,
    type: 'm3u',
    url: sourceUrl,
    status: 'Aktiv',
    expDate: 'ObegrÃ¤nsad'
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
  document.getElementById('hud-channel-sub').textContent = item.epg || item.plot || 'DirektsÃ¤ndning';
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
    document.getElementById('btn-play-pause').innerHTML = 'â¸';
  } else {
    videoEl.pause();
    document.getElementById('btn-play-pause').innerHTML = 'â–¶';
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
    alert('AirPlay Ã¤r tillgÃ¤ngligt via iOS Kontrollcenter.');
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
  document.getElementById('brand-account').textContent = state.activeAccount?.name || 'Demo-lÃ¤ge';

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
        <div class="hero-tag">ðŸ”¥ Utvalt Just Nu</div>
        <div class="hero-title">${hero.name}</div>
        <div class="hero-desc">${hero.plot || hero.epg || 'Se direktsÃ¤nd TV och VOD i hÃ¶gsta kvalitet.'}</div>
        <button class="btn-play-hero" onclick="playMedia(state.movies[0] || state.channels[0])">
          â–¶ Spela Nu
        </button>
      </div>
    ` : ''}

    <!-- Shortcuts -->
    <div class="shortcuts-grid">
      <div class="shortcut-card shortcut-live" onclick="switchTab('live')">
        <div class="icon">ðŸ“º</div>
        <div>
          <div class="label">Live TV</div>
          <div class="count">${state.channels.length} kanaler</div>
        </div>
      </div>
      <div class="shortcut-card shortcut-movies" onclick="switchTab('movies')">
        <div class="icon">ðŸŽ¬</div>
        <div>
          <div class="label">Filmer</div>
          <div class="count">${state.movies.length} st</div>
        </div>
      </div>
      <div class="shortcut-card shortcut-favs" onclick="state.showFavoritesOnly = true; switchTab('live');">
        <div class="icon">â­</div>
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
      <div class="section-title">PopulÃ¤ra Kanaler</div>
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
            <span style="font-size: 32px; color: rgba(255,255,255,0.2);">ðŸŽ¬</span>
            ${m.rating ? `<div class="movie-rating-badge">â˜… ${m.rating}</div>` : ''}
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
        <span style="font-size: 26px; color: var(--primary);">ðŸ“º</span>
      </div>
      <div class="channel-title">${ch.name}</div>
      <div class="channel-epg">${ch.epg || 'LivesÃ¤ndning'}</div>
    </div>
  `;
}


async function selectLiveCategory(catId) {
  state.selectedLiveCategory = catId;
  state.channelPage = 1;

  // Check cache
  if (state.categoryChannelsCache && state.categoryChannelsCache[catId]) {
    state.channels = state.categoryChannelsCache[catId];
    renderLiveTV(document.getElementById('tab-content'));
    return;
  }

  // If "all" or category not cached, fetch on demand
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

// 2. Live TV View
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
    <!-- Search Bar -->
    <div class="search-box">
      <span>🔍</span>
      <input type="text" class="search-input" placeholder="Sök bland ${state.channels.length} kanaler..." value="${state.searchQuery}" oninput="state.searchQuery = this.value; state.channelPage = 1; renderLiveTV(document.getElementById('tab-content'))">
      <span style="cursor: pointer; color: ${state.showFavoritesOnly ? '#FFD60A' : 'var(--text-dim)'}; font-size: 18px;" onclick="state.showFavoritesOnly = !state.showFavoritesOnly; state.channelPage = 1; renderLiveTV(document.getElementById('tab-content'))">★</span>
    </div>

    <!-- Category Pills -->
    <div class="filter-bar">
      ${state.liveCategories.map(cat => `
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
          <div>Inga kanaler matchade sökningen.</div>
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
            <span style="font-size: 32px; color: rgba(255,255,255,0.2);">ðŸŽ¬</span>
            ${m.rating ? `<div class="movie-rating-badge">â˜… ${m.rating}</div>` : ''}
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
            <span style="font-size: 32px; color: rgba(255,255,255,0.2);">ðŸ“º</span>
            ${s.rating ? `<div class="movie-rating-badge">â˜… ${s.rating}</div>` : ''}
          </div>
          <div class="movie-title">${s.name}</div>
          <div style="font-size: 11px; color: var(--text-dim);">${s.seasons} SÃ¤songer</div>
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
          <span>Giltigt: ${state.activeAccount?.expDate || 'ObegrÃ¤nsad'}</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 15px; font-weight: 800; margin-bottom: 12px;">App-instÃ¤llningar</div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-glass);">
          <span>Videomotor</span>
          <span style="color: var(--accent-cyan); font-weight: 600; font-size: 13px;">Apple HLS / Hls.js</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
          <span>HÃ¥rdvaruavkodning</span>
          <span style="color: #30D158; font-weight: 600; font-size: 13px;">Aktiv (Metal / WebKit)</span>
        </div>
      </div>

      <!-- Demo Launch -->
      <button class="btn-primary" style="margin-bottom: 16px; background: rgba(255,255,255,0.08); border: 1px solid var(--border-glass); box-shadow: none;" onclick="launchDemo()">
        âœ¨ Ã…terstÃ¤ll till Demo-lÃ¤ge
      </button>

      <div style="text-align: center; font-size: 12px; color: var(--text-dim); margin-top: 24px;">
        IPTV Neo PWA v1.0.0<br>Optimerad fÃ¶r Safari iOS & Standalone HemskÃ¤rm
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
    list.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">Inga sparade konton Ã¤n.</div>`;
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
        <button class="btn-header" onclick="activateAccount('${acc.id}')">VÃ¤lj</button>
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
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">${mov.year || ''} â€¢ Betyg: â˜… ${mov.rating || 'N/A'}</div>
      <div style="font-size: 13px; line-height: 1.5; color: var(--text-muted); margin-bottom: 24px;">${mov.plot || 'Ingen sammanfattning tillgÃ¤nglig.'}</div>
      <button class="btn-primary" onclick="closeModal(); playMedia(state.movies.find(m => m.id === '${mov.id}'))">
        â–¶ Spela Film Nu
      </button>
      <button class="btn-header" style="margin: 12px auto 0 auto;" onclick="closeModal()">StÃ¤ng</button>
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
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Betyg: â˜… ${ser.rating} â€¢ ${ser.seasons} SÃ¤songer</div>
      <div style="text-align: left; margin-top: 20px;">
        <div style="font-size: 15px; font-weight: 800; margin-bottom: 10px;">Avsnitt (SÃ¤song 1)</div>
        ${[1, 2, 3, 4, 5].map(ep => `
          <div class="drawer-item" style="margin-bottom: 8px; justify-content: space-between;" onclick="closeModal(); playMedia({ name: '${ser.name} S01E0${ep}', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', epg: 'Avsnitt ${ep}' })">
            <span>Avsnitt ${ep}</span>
            <span style="color: var(--primary);">â–¶ Spela</span>
          </div>
        `).join('')}
      </div>
      <button class="btn-header" style="margin: 20px auto 0 auto;" onclick="closeModal()">StÃ¤ng</button>
    </div>
  `;
  modal.style.display = 'flex';
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
      alertDiv.innerHTML = '⚠️ Kunde inte ansluta till servern: ' + err.message + '. Kontrollera nätverket eller klicka på "Byt konto".';
      banner.insertBefore(alertDiv, banner.firstChild);
    }
  }
});
