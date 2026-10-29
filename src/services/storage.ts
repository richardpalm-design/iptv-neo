import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAccount, FavoriteItem, WatchHistoryItem } from '../types/iptv';

const STORAGE_KEYS = {
  ACCOUNTS: '@iptv_accounts_v1',
  ACTIVE_ACCOUNT_ID: '@iptv_active_account_id_v1',
  FAVORITES: '@iptv_favorites_v1',
  WATCH_HISTORY: '@iptv_watch_history_v1',
  SETTINGS: '@iptv_settings_v1',
};

export interface AppSettings {
  parentalPin?: string;
  isParentalLocked: boolean;
  defaultStreamFormat: 'm3u8' | 'ts';
  aspectRatio: 'fit' | 'fill' | '16:9';
  hardwareDecoder: boolean;
  autoPlayNextEpisode: boolean;
}

export const StorageService = {
  // Accounts
  async getAccounts(): Promise<UserAccount[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async saveAccount(account: UserAccount): Promise<void> {
    const accounts = await this.getAccounts();
    const existingIndex = accounts.findIndex((a) => a.id === account.id);
    if (existingIndex >= 0) {
      accounts[existingIndex] = account;
    } else {
      accounts.push(account);
    }
    await AsyncStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    await this.setActiveAccountId(account.id);
  },

  async deleteAccount(id: string): Promise<void> {
    const accounts = (await this.getAccounts()).filter((a) => a.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    const activeId = await this.getActiveAccountId();
    if (activeId === id) {
      await this.setActiveAccountId(accounts.length > 0 ? accounts[0].id : null);
    }
  },

  async getActiveAccountId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID);
    } catch {
      return null;
    }
  },

  async setActiveAccountId(id: string | null): Promise<void> {
    if (id) {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID, id);
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.ACTIVE_ACCOUNT_ID);
    }
  },

  async getActiveAccount(): Promise<UserAccount | null> {
    const activeId = await this.getActiveAccountId();
    if (!activeId) return null;
    const accounts = await this.getAccounts();
    return accounts.find((a) => a.id === activeId) || null;
  },

  // Favorites
  async getFavorites(): Promise<FavoriteItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async toggleFavorite(item: FavoriteItem): Promise<boolean> {
    const favorites = await this.getFavorites();
    const index = favorites.findIndex((f) => f.id === item.id);
    let isNowFav = false;
    if (index >= 0) {
      favorites.splice(index, 1);
      isNowFav = false;
    } else {
      favorites.push(item);
      isNowFav = true;
    }
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return isNowFav;
  },

  async isFavorite(id: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some((f) => f.id === id);
  },

  // Watch History & Continue Watching
  async getWatchHistory(): Promise<WatchHistoryItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WATCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async saveWatchProgress(item: WatchHistoryItem): Promise<void> {
    const history = await this.getWatchHistory();
    const index = history.findIndex((h) => h.id === item.id);
    if (index >= 0) {
      history[index] = item;
    } else {
      history.unshift(item);
    }
    // Limit to latest 30 items
    const trimmed = history.slice(0, 30);
    await AsyncStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify(trimmed));
  },

  // Settings
  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch {}
    return {
      isParentalLocked: false,
      defaultStreamFormat: 'm3u8',
      aspectRatio: 'fit',
      hardwareDecoder: true,
      autoPlayNextEpisode: true,
    };
  },

  async saveSettings(settings: AppSettings): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },
};
