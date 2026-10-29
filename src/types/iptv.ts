export interface UserAccount {
  id: string;
  name: string;
  type: 'xtream' | 'm3u';
  serverUrl: string;
  username?: string;
  password?: string;
  m3uUrl?: string;
  expiresAt?: string;
  status?: string;
  activeCons?: string;
  maxCons?: string;
  createdAt: number;
}

export interface LiveCategory {
  category_id: string;
  category_name: string;
  parent_id?: number;
}

export interface LiveStream {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string;
  added: string;
  category_id: string;
  custom_sid: string;
  tv_archive: number;
  direct_source: string;
  tv_archive_duration: number;
}

export interface EpgProgram {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  start_timestamp?: number;
  stop_timestamp?: number;
}

export interface VodCategory {
  category_id: string;
  category_name: string;
  parent_id?: number;
}

export interface VodStream {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  rating: string | number;
  rating_5based?: number;
  added: string;
  category_id: string;
  container_extension: string;
  custom_sid: string;
  direct_source: string;
}

export interface VodInfo {
  info: {
    name: string;
    description?: string;
    plot?: string;
    cast?: string;
    director?: string;
    genre?: string;
    release_date?: string;
    duration_secs?: number;
    duration?: string;
    movie_image?: string;
    backdrop_path?: string[];
    rating?: string | number;
  };
  movie_data: {
    stream_id: number;
    name: string;
    container_extension: string;
  };
}

export interface SeriesCategory {
  category_id: string;
  category_name: string;
}

export interface SeriesItem {
  num: number;
  name: string;
  series_id: number;
  cover: string;
  plot?: string;
  cast?: string;
  director?: string;
  genre?: string;
  release_date?: string;
  rating?: string | number;
  category_id: string;
  backdrop_path?: string[];
}

export interface SeriesEpisode {
  id: string;
  season: number;
  episode_num: number;
  title: string;
  container_extension: string;
  info: {
    plot?: string;
    duration?: string;
    rating?: string | number;
    movie_image?: string;
  };
}

export interface SeriesInfo {
  seasons: {
    season_number: number;
    name: string;
    episode_count: number;
    cover?: string;
  }[];
  info: {
    name: string;
    plot?: string;
    cast?: string;
    director?: string;
    genre?: string;
    cover?: string;
    rating?: string | number;
    backdrop_path?: string[];
  };
  episodes: {
    [seasonNumber: string]: SeriesEpisode[];
  };
}

export interface FavoriteItem {
  id: string;
  type: 'live' | 'movie' | 'series';
  title: string;
  icon?: string;
  streamId: number;
  categoryId: string;
  extension?: string;
}

export interface WatchHistoryItem {
  id: string;
  type: 'live' | 'movie' | 'series';
  title: string;
  icon?: string;
  streamId: number;
  extension?: string;
  positionMillis: number;
  durationMillis: number;
  updatedAt: number;
  season?: number;
  episode?: number;
}
