import {
  UserAccount,
  LiveCategory,
  LiveStream,
  VodCategory,
  VodStream,
  VodInfo,
  SeriesCategory,
  SeriesItem,
  SeriesInfo,
  EpgProgram,
} from '../types/iptv';

export class XtreamApiClient {
  private serverUrl: string;
  private username?: string;
  private password?: string;

  constructor(serverUrl: string, username?: string, password?: string) {
    // Normalize serverUrl
    let clean = serverUrl.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'http://' + clean;
    }
    this.serverUrl = clean.replace(/\/+$/, '');
    this.username = username?.trim();
    this.password = password?.trim();
  }

  private getBaseUrl(): string {
    return `${this.serverUrl}/player_api.php?username=${encodeURIComponent(
      this.username || ''
    )}&password=${encodeURIComponent(this.password || '')}`;
  }

  async authenticate(): Promise<{ success: boolean; user_info?: any; server_info?: any; error?: string }> {
    try {
      const response = await fetch(this.getBaseUrl());
      if (!response.ok) {
        return { success: false, error: `Server svarade med status ${response.status}` };
      }
      const data = await response.json();
      if (data && data.user_info && data.user_info.auth === 1) {
        return {
          success: true,
          user_info: data.user_info,
          server_info: data.server_info,
        };
      } else {
        return { success: false, error: 'Felaktigt användarnamn eller lösenord' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Kunde inte ansluta till servern' };
    }
  }

  async getLiveCategories(): Promise<LiveCategory[]> {
    try {
      const res = await fetch(`${this.getBaseUrl()}&action=get_live_categories`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async getLiveStreams(categoryId?: string): Promise<LiveStream[]> {
    try {
      let url = `${this.getBaseUrl()}&action=get_live_streams`;
      if (categoryId && categoryId !== 'all') {
        url += `&category_id=${categoryId}`;
      }
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async getVodCategories(): Promise<VodCategory[]> {
    try {
      const res = await fetch(`${this.getBaseUrl()}&action=get_vod_categories`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async getVodStreams(categoryId?: string): Promise<VodStream[]> {
    try {
      let url = `${this.getBaseUrl()}&action=get_vod_streams`;
      if (categoryId && categoryId !== 'all') {
        url += `&category_id=${categoryId}`;
      }
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async getVodInfo(vodId: number | string): Promise<VodInfo | null> {
    try {
      const res = await fetch(`${this.getBaseUrl()}&action=get_vod_info&vod_id=${vodId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  async getSeriesCategories(): Promise<SeriesCategory[]> {
    try {
      const res = await fetch(`${this.getBaseUrl()}&action=get_series_categories`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async getSeries(categoryId?: string): Promise<SeriesItem[]> {
    try {
      let url = `${this.getBaseUrl()}&action=get_series`;
      if (categoryId && categoryId !== 'all') {
        url += `&category_id=${categoryId}`;
      }
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  async getSeriesInfo(seriesId: number | string): Promise<SeriesInfo | null> {
    try {
      const res = await fetch(`${this.getBaseUrl()}&action=get_series_info&series_id=${seriesId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  async getShortEpg(streamId: number | string, limit = 4): Promise<EpgProgram[]> {
    try {
      const res = await fetch(`${this.getBaseUrl()}&action=get_short_epg&stream_id=${streamId}&limit=${limit}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data?.epg_listings || [];
    } catch {
      return [];
    }
  }

  // Stream URL generators
  getLiveStreamUrl(streamId: number | string, format: 'm3u8' | 'ts' = 'm3u8'): string {
    return `${this.serverUrl}/live/${encodeURIComponent(this.username || '')}/${encodeURIComponent(
      this.password || ''
    )}/${streamId}.${format}`;
  }

  getVodStreamUrl(streamId: number | string, extension = 'mp4'): string {
    return `${this.serverUrl}/movie/${encodeURIComponent(this.username || '')}/${encodeURIComponent(
      this.password || ''
    )}/${streamId}.${extension}`;
  }

  getEpisodeStreamUrl(episodeId: number | string, extension = 'mp4'): string {
    return `${this.serverUrl}/series/${encodeURIComponent(this.username || '')}/${encodeURIComponent(
      this.password || ''
    )}/${episodeId}.${extension}`;
  }
}
