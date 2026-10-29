import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Info, Flame, Tv, Film, Clapperboard, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { LiveStream, VodStream, SeriesItem } from '../types/iptv';
import { MovieCard } from '../components/MovieCard';
import { SeriesCard } from '../components/SeriesCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomeScreenProps {
  onPlayChannel: (channel: LiveStream) => void;
  onPlayMovie: (movie: VodStream) => void;
  onSelectSeries: (series: SeriesItem) => void;
  onNavigateTab: (tab: 'live' | 'movies' | 'series') => void;
  liveChannels: LiveStream[];
  movies: VodStream[];
  series: SeriesItem[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onPlayChannel,
  onPlayMovie,
  onSelectSeries,
  onNavigateTab,
  liveChannels,
  movies,
  series,
}) => {
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner (Apple TV / Netflix style) */}
      {featuredMovie && (
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: featuredMovie.stream_icon }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(7, 9, 14, 0.4)', colors.background]}
            style={styles.heroGradient}
          />

          <View style={styles.heroContent}>
            <View style={styles.featuredBadge}>
              <Sparkles size={12} color="#FFFFFF" />
              <Text style={styles.featuredBadgeText}>UTVALT JUST NU</Text>
            </View>

            <Text style={styles.heroTitle} numberOfLines={2}>
              {featuredMovie.name}
            </Text>

            <View style={styles.heroMetaRow}>
              <Text style={styles.heroMetaText}>⭐ {featuredMovie.rating || '8.9'}</Text>
              <Text style={styles.heroMetaDot}>•</Text>
              <Text style={styles.heroMetaText}>4K HDR</Text>
              <Text style={styles.heroMetaDot}>•</Text>
              <Text style={styles.heroMetaText}>Dolby Atmos</Text>
            </View>

            {/* Hero Action Buttons */}
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.heroPlayBtn}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  onPlayMovie(featuredMovie);
                }}
                activeOpacity={0.85}
              >
                <Play size={18} color="#000000" fill="#000000" />
                <Text style={styles.heroPlayText}>Spela Nu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heroInfoBtn}
                onPress={() => {
                  Haptics.selectionAsync();
                  onPlayMovie(featuredMovie);
                }}
                activeOpacity={0.8}
              >
                <Info size={18} color="#FFFFFF" />
                <Text style={styles.heroInfoText}>Mer Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Quick Navigation Cards */}
      <View style={styles.quickNavRow}>
        <TouchableOpacity
          style={[styles.quickCard, { borderColor: 'rgba(10, 132, 255, 0.3)' }]}
          onPress={() => onNavigateTab('live')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: colors.primary }]}>
            <Tv size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.quickCardTitle}>Live TV</Text>
          <Text style={styles.quickCardSub}>{liveChannels.length} kanaler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { borderColor: 'rgba(191, 90, 242, 0.3)' }]}
          onPress={() => onNavigateTab('movies')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: colors.accentPurple }]}>
            <Film size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.quickCardTitle}>Filmer</Text>
          <Text style={styles.quickCardSub}>{movies.length} titlar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { borderColor: 'rgba(255, 214, 10, 0.3)' }]}
          onPress={() => onNavigateTab('series')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: colors.accentGold }]}>
            <Clapperboard size={18} color="#000000" />
          </View>
          <Text style={styles.quickCardTitle}>Serier</Text>
          <Text style={styles.quickCardSub}>{series.length} serier</Text>
        </TouchableOpacity>
      </View>

      {/* Top Live Channels Row */}
      {liveChannels.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Tv size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Populära Livekanaler</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigateTab('live')}>
              <Text style={styles.seeAllText}>Visa alla</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {liveChannels.slice(0, 6).map((ch) => (
              <TouchableOpacity
                key={ch.stream_id}
                style={styles.liveMiniCard}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onPlayChannel(ch);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.liveMiniLogo}>
                  <Image source={{ uri: ch.stream_icon }} style={styles.logoImg} resizeMode="contain" />
                </View>
                <Text style={styles.liveMiniName} numberOfLines={1}>
                  {ch.name}
                </Text>
                <View style={styles.liveDotRow}>
                  <View style={styles.miniRedDot} />
                  <Text style={styles.liveLabel}>DIREKT</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Trending Movies Row */}
      {movies.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Flame size={18} color={colors.accentRed} />
              <Text style={styles.sectionTitle}>Trender & Nya Filmer</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigateTab('movies')}>
              <Text style={styles.seeAllText}>Visa alla</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {movies.map((m) => (
              <MovieCard key={m.stream_id} movie={m} onPress={onPlayMovie} width={135} />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Popular Series Row */}
      {series.length > 0 && (
        <View style={[styles.section, { marginBottom: 100 }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Clapperboard size={18} color={colors.accentGold} />
              <Text style={styles.sectionTitle}>Mest Sedda Serier</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigateTab('series')}>
              <Text style={styles.seeAllText}>Visa alla</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {series.map((s) => (
              <SeriesCard key={s.series_id} series={s} onPress={onSelectSeries} width={135} />
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroContainer: {
    width: SCREEN_WIDTH,
    height: 380,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 260,
  },
  heroContent: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  heroMetaText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  heroMetaDot: {
    color: colors.textMuted,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroPlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
    gap: 8,
  },
  heroPlayText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  heroInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 8,
  },
  heroInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quickNavRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 10,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.surfaceCard,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickCardTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  quickCardSub: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  section: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  horizontalList: {
    paddingLeft: 18,
    paddingRight: 6,
  },
  liveMiniCard: {
    width: 110,
    backgroundColor: colors.surfaceCard,
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  liveMiniLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoImg: {
    width: 38,
    height: 38,
  },
  liveMiniName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  liveDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  miniRedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.liveBadge,
  },
  liveLabel: {
    color: colors.liveBadge,
    fontSize: 9,
    fontWeight: '800',
  },
});
