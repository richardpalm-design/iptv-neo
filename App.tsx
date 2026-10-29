import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { Home, Tv, Film, Clapperboard, Settings as SettingsIcon } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { colors } from './src/theme/colors';
import {
  UserAccount,
  LiveCategory,
  LiveStream,
  VodCategory,
  VodStream,
  SeriesCategory,
  SeriesItem,
  SeriesEpisode,
} from './src/types/iptv';
import { StorageService } from './src/services/storage';
import { XtreamApiClient } from './src/services/xtreamApi';
import { parseM3U } from './src/services/m3uParser';
import {
  DEMO_ACCOUNT,
  DEMO_LIVE_CATEGORIES,
  DEMO_LIVE_CHANNELS,
  DEMO_VOD_CATEGORIES,
  DEMO_VOD_MOVIES,
  DEMO_SERIES_CATEGORIES,
  DEMO_SERIES_ITEMS,
} from './src/components/DemoData';

import { Header } from './src/components/Header';
import { VideoPlayerModal } from './src/components/VideoPlayerModal';
import { AddAccountModal } from './src/components/AddAccountModal';

import { HomeScreen } from './src/screens/HomeScreen';
import { LiveTVScreen } from './src/screens/LiveTVScreen';
import { MoviesScreen } from './src/screens/MoviesScreen';
import { SeriesScreen } from './src/screens/SeriesScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

type Tab = 'home' | 'live' | 'movies' | 'series' | 'settings';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Content Data
  const [liveCategories, setLiveCategories] = useState<LiveCategory[]>(DEMO_LIVE_CATEGORIES);
  const [liveChannels, setLiveChannels] = useState<LiveStream[]>(DEMO_LIVE_CHANNELS);
  const [vodCategories, setVodCategories] = useState<VodCategory[]>(DEMO_VOD_CATEGORIES);
  const [movies, setMovies] = useState<VodStream[]>(DEMO_VOD_MOVIES);
  const [seriesCategories, setSeriesCategories] = useState<SeriesCategory[]>(DEMO_SERIES_CATEGORIES);
  const [seriesList, setSeriesList] = useState<SeriesItem[]>(DEMO_SERIES_ITEMS);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Modals & Player State
  const [showAccountsModal, setShowAccountsModal] = useState<boolean>(false);
  const [playerVisible, setPlayerVisible] = useState<boolean>(false);
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);
  const [playerTitle, setPlayerTitle] = useState<string>('');
  const [playerSubtitle, setPlayerSubtitle] = useState<string>('');
  const [playerIsLive, setPlayerIsLive] = useState<boolean>(false);
  const [playerChannelList, setPlayerChannelList] = useState<LiveStream[]>([]);
  const [playerChannelIndex, setPlayerChannelIndex] = useState<number>(0);

  // Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    const savedAccounts = await StorageService.getAccounts();
    const favs = await StorageService.getFavorites();
    setFavorites(favs.map((f) => f.id));

    if (savedAccounts.length > 0) {
      setAccounts(savedAccounts);
      const active = await StorageService.getActiveAccount();
      const current = active || savedAccounts[0];
      setActiveAccount(current);
      await loadAccountContent(current);
    } else {
      // First run: Seed demo account for instant testability
      await StorageService.saveAccount(DEMO_ACCOUNT);
      setAccounts([DEMO_ACCOUNT]);
      setActiveAccount(DEMO_ACCOUNT);
      setLiveCategories(DEMO_LIVE_CATEGORIES);
      setLiveChannels(DEMO_LIVE_CHANNELS);
      setVodCategories(DEMO_VOD_CATEGORIES);
      setMovies(DEMO_VOD_MOVIES);
      setSeriesCategories(DEMO_SERIES_CATEGORIES);
      setSeriesList(DEMO_SERIES_ITEMS);
    }
    setLoading(false);
  };

  const loadAccountContent = async (account: UserAccount) => {
    if (account.id === DEMO_ACCOUNT.id) {
      setLiveCategories(DEMO_LIVE_CATEGORIES);
      setLiveChannels(DEMO_LIVE_CHANNELS);
      setVodCategories(DEMO_VOD_CATEGORIES);
      setMovies(DEMO_VOD_MOVIES);
      setSeriesCategories(DEMO_SERIES_CATEGORIES);
      setSeriesList(DEMO_SERIES_ITEMS);
      return;
    }

    if (account.type === 'xtream') {
      try {
        const client = new XtreamApiClient(account.serverUrl, account.username, account.password);
        const [liveCats, liveChans, vodCats, vodMovies, sCats, sList] = await Promise.all([
          client.getLiveCategories(),
          client.getLiveStreams(),
          client.getVodCategories(),
          client.getVodStreams(),
          client.getSeriesCategories(),
          client.getSeries(),
        ]);

        if (liveCats.length > 0) setLiveCategories(liveCats);
        if (liveChans.length > 0) setLiveChannels(liveChans);
        if (vodCats.length > 0) setVodCategories(vodCats);
        if (vodMovies.length > 0) setMovies(vodMovies);
        if (sCats.length > 0) setSeriesCategories(sCats);
        if (sList.length > 0) setSeriesList(sList);
      } catch (err) {
        console.error('Kunde inte hämta Xtream data:', err);
      }
    } else if (account.type === 'm3u' && account.m3uUrl) {
      try {
        const res = await fetch(account.m3uUrl);
        const text = await res.text();
        const parsed = parseM3U(text);
        setLiveCategories(parsed.categories);
        setLiveChannels(parsed.channels);
      } catch (err) {
        console.error('Kunde inte hämta M3U data:', err);
      }
    }
  };

  // Video Launchers
  const playLiveChannel = (channel: LiveStream, channelList: LiveStream[] = liveChannels) => {
    let url = channel.direct_source;
    if (!url && activeAccount && activeAccount.type === 'xtream') {
      const client = new XtreamApiClient(
        activeAccount.serverUrl,
        activeAccount.username,
        activeAccount.password
      );
      url = client.getLiveStreamUrl(channel.stream_id);
    }

    const idx = channelList.findIndex((c) => c.stream_id === channel.stream_id);
    setPlayerChannelIndex(idx >= 0 ? idx : 0);
    setPlayerChannelList(channelList);

    setPlayerUrl(url);
    setPlayerTitle(channel.name);
    setPlayerSubtitle('Live TV Direkt');
    setPlayerIsLive(true);
    setPlayerVisible(true);
  };

  const playMovie = (movie: VodStream) => {
    let url = movie.direct_source;
    if (!url && activeAccount && activeAccount.type === 'xtream') {
      const client = new XtreamApiClient(
        activeAccount.serverUrl,
        activeAccount.username,
        activeAccount.password
      );
      url = client.getVodStreamUrl(movie.stream_id, movie.container_extension || 'mp4');
    }

    setPlayerUrl(url);
    setPlayerTitle(movie.name);
    setPlayerSubtitle(`Film • ${movie.added ? movie.added.split('-')[0] : 'VOD'}`);
    setPlayerIsLive(false);
    setPlayerVisible(true);
  };

  const playEpisode = (series: SeriesItem, episode: SeriesEpisode) => {
    let url = '';
    if (activeAccount && activeAccount.type === 'xtream') {
      const client = new XtreamApiClient(
        activeAccount.serverUrl,
        activeAccount.username,
        activeAccount.password
      );
      url = client.getEpisodeStreamUrl(episode.id, episode.container_extension || 'mp4');
    } else {
      url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }

    setPlayerUrl(url);
    setPlayerTitle(`${series.name}: S${episode.season} E${episode.episode_num}`);
    setPlayerSubtitle(episode.title);
    setPlayerIsLive(false);
    setPlayerVisible(true);
  };

  const toggleFavorite = async (channel: LiveStream) => {
    const isNowFav = await StorageService.toggleFavorite({
      id: String(channel.stream_id),
      type: 'live',
      title: channel.name,
      icon: channel.stream_icon,
      streamId: channel.stream_id,
      categoryId: channel.category_id,
    });

    setFavorites((prev) =>
      isNowFav
        ? [...prev, String(channel.stream_id)]
        : prev.filter((id) => id !== String(channel.stream_id))
    );
  };

  const handleSelectAccount = async (account: UserAccount) => {
    setActiveAccount(account);
    await StorageService.setActiveAccountId(account.id);
    await loadAccountContent(account);
  };

  const handleSaveAccount = async (account: UserAccount) => {
    await StorageService.saveAccount(account);
    const updated = await StorageService.getAccounts();
    setAccounts(updated);
    setActiveAccount(account);
    await loadAccountContent(account);
  };

  const handleDeleteAccount = async (id: string) => {
    await StorageService.deleteAccount(id);
    const updated = await StorageService.getAccounts();
    setAccounts(updated);
    if (activeAccount?.id === id) {
      const next = updated.length > 0 ? updated[0] : null;
      setActiveAccount(next);
      if (next) loadAccountContent(next);
    }
  };

  const switchTab = (tab: Tab) => {
    Haptics.selectionAsync();
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <Header
        account={activeAccount}
        onOpenAccounts={() => setShowAccountsModal(true)}
        onSearchPress={() => {
          if (currentTab !== 'live' && currentTab !== 'movies') {
            setCurrentTab('live');
          }
        }}
      />

      {/* Screen Router */}
      <View style={styles.screenContainer}>
        {loading ? (
          <View style={styles.centerLoading}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Laddar IPTV Neo...</Text>
          </View>
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeScreen
                liveChannels={liveChannels}
                movies={movies}
                series={seriesList}
                onPlayChannel={(ch) => playLiveChannel(ch)}
                onPlayMovie={playMovie}
                onSelectSeries={() => switchTab('series')}
                onNavigateTab={(tab) => switchTab(tab)}
              />
            )}

            {currentTab === 'live' && (
              <LiveTVScreen
                categories={liveCategories}
                channels={liveChannels}
                favorites={favorites}
                onPlayChannel={(ch, list) => playLiveChannel(ch, list)}
                onToggleFavorite={toggleFavorite}
              />
            )}

            {currentTab === 'movies' && (
              <MoviesScreen
                categories={vodCategories}
                movies={movies}
                onPlayMovie={playMovie}
              />
            )}

            {currentTab === 'series' && (
              <SeriesScreen
                categories={seriesCategories}
                seriesList={seriesList}
                onPlayEpisode={playEpisode}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsScreen
                account={activeAccount}
                onOpenAccounts={() => setShowAccountsModal(true)}
                onClearFavorites={async () => {
                  setFavorites([]);
                  await StorageService.saveSettings({
                    isParentalLocked: false,
                    defaultStreamFormat: 'm3u8',
                    aspectRatio: 'fit',
                    hardwareDecoder: true,
                    autoPlayNextEpisode: true,
                  });
                }}
                onClearHistory={async () => {
                  // cleared
                }}
              />
            )}
          </>
        )}
      </View>

      {/* Apple TV-Style Frosted Glass Bottom Navigation Bar */}
      <BlurView intensity={75} tint="dark" style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => switchTab('home')}
          activeOpacity={0.7}
        >
          <Home
            size={22}
            color={currentTab === 'home' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[styles.navText, currentTab === 'home' && styles.navTextActive]}
          >
            Hem
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => switchTab('live')}
          activeOpacity={0.7}
        >
          <Tv
            size={22}
            color={currentTab === 'live' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[styles.navText, currentTab === 'live' && styles.navTextActive]}
          >
            Live TV
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => switchTab('movies')}
          activeOpacity={0.7}
        >
          <Film
            size={22}
            color={currentTab === 'movies' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[styles.navText, currentTab === 'movies' && styles.navTextActive]}
          >
            Filmer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => switchTab('series')}
          activeOpacity={0.7}
        >
          <Clapperboard
            size={22}
            color={currentTab === 'series' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[styles.navText, currentTab === 'series' && styles.navTextActive]}
          >
            Serier
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => switchTab('settings')}
          activeOpacity={0.7}
        >
          <SettingsIcon
            size={22}
            color={currentTab === 'settings' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[styles.navText, currentTab === 'settings' && styles.navTextActive]}
          >
            Inställningar
          </Text>
        </TouchableOpacity>
      </BlurView>

      {/* Modals */}
      <VideoPlayerModal
        visible={playerVisible}
        streamUrl={playerUrl}
        title={playerTitle}
        subtitle={playerSubtitle}
        isLive={playerIsLive}
        channels={playerChannelList}
        currentChannelIndex={playerChannelIndex}
        onSelectChannel={(ch) => playLiveChannel(ch, playerChannelList)}
        onClose={() => setPlayerVisible(false)}
      />

      <AddAccountModal
        visible={showAccountsModal}
        onClose={() => setShowAccountsModal(false)}
        accounts={accounts}
        activeAccountId={activeAccount?.id || null}
        onSelectAccount={handleSelectAccount}
        onSaveAccount={handleSaveAccount}
        onDeleteAccount={handleDeleteAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
  },
  centerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'ios' ? 88 : 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(10, 13, 20, 0.75)',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
