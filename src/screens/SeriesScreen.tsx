import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import { Search, X, Play, Star, Clapperboard, Film } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { SeriesItem, SeriesCategory, SeriesInfo, SeriesEpisode } from '../types/iptv';
import { SeriesCard } from '../components/SeriesCard';
import { DEMO_SERIES_INFO_301 } from '../components/DemoData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POSTER_WIDTH = (SCREEN_WIDTH - 48) / 3;

interface SeriesScreenProps {
  categories: SeriesCategory[];
  seriesList: SeriesItem[];
  onPlayEpisode: (series: SeriesItem, episode: SeriesEpisode) => void;
}

export const SeriesScreen: React.FC<SeriesScreenProps> = ({
  categories,
  seriesList,
  onPlayEpisode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeries, setSelectedSeries] = useState<SeriesItem | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  const filteredSeries = useMemo(() => {
    return seriesList.filter((s) => {
      const catMatch =
        selectedCategory === 'all' || String(s.category_id) === String(selectedCategory);
      const searchMatch =
        !searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [seriesList, selectedCategory, searchQuery]);

  // In demo or live, fallback to standard episode list
  const currentSeriesInfo: SeriesInfo = DEMO_SERIES_INFO_301;
  const currentEpisodes = currentSeriesInfo.episodes[String(selectedSeason)] || currentSeriesInfo.episodes['1'] || [];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök bland serier..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories Horizontal Pills */}
      <View style={styles.categoryScrollWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          <TouchableOpacity
            style={[styles.catPill, selectedCategory === 'all' && styles.catPillActive]}
            onPress={() => {
              Haptics.selectionAsync();
              setSelectedCategory('all');
            }}
          >
            <Text style={[styles.catPillText, selectedCategory === 'all' && styles.catPillTextActive]}>
              Alla ({seriesList.length})
            </Text>
          </TouchableOpacity>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.category_id;
            return (
              <TouchableOpacity
                key={cat.category_id}
                style={[styles.catPill, isSelected && styles.catPillActive]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedCategory(cat.category_id);
                }}
              >
                <Text style={[styles.catPillText, isSelected && styles.catPillTextActive]}>
                  {cat.category_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Series Grid */}
      <FlatList
        data={filteredSeries}
        keyExtractor={(item) => String(item.series_id)}
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.columnWrapper}
        initialNumToRender={18}
        renderItem={({ item }) => (
          <SeriesCard
            series={item}
            onPress={(s) => setSelectedSeries(s)}
            width={POSTER_WIDTH}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Inga serier hittades</Text>
            <Text style={styles.emptySub}>Försök med en annan sökning eller byt kategori.</Text>
          </View>
        }
      />

      {/* Series Details Modal */}
      {selectedSeries && (
        <Modal visible={!!selectedSeries} animationType="slide" transparent>
          <View style={styles.detailBackdrop}>
            <View style={styles.detailSheet}>
              {/* Backdrop / Poster */}
              <View style={styles.detailPosterContainer}>
                <Image
                  source={{ uri: selectedSeries.cover }}
                  style={styles.detailBackdropImg}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(15, 19, 28, 0.8)', colors.surface]}
                  style={styles.detailGradient}
                />
                <TouchableOpacity
                  style={styles.detailCloseBtn}
                  onPress={() => setSelectedSeries(null)}
                >
                  <X size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.detailBody} showsVerticalScrollIndicator={false}>
                <Text style={styles.detailTitle}>{selectedSeries.name}</Text>

                <View style={styles.detailMetaRow}>
                  <View style={styles.ratingBadge}>
                    <Star size={12} color="#000000" fill="#000000" />
                    <Text style={styles.ratingText}>
                      {typeof selectedSeries.rating === 'number'
                        ? selectedSeries.rating.toFixed(1)
                        : selectedSeries.rating || '8.8'}
                    </Text>
                  </View>
                  <Text style={styles.metaGenre}>{selectedSeries.genre || 'Drama, Sci-Fi'}</Text>
                </View>

                <Text style={styles.plotText}>
                  {selectedSeries.plot ||
                    'En spännande serie med högupplösta säsonger och avsnitt tillgängliga för omedelbar streaming.'}
                </Text>

                {/* Season Tabs */}
                <Text style={styles.seasonHeader}>Välj Säsong</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.seasonList}>
                  {currentSeriesInfo.seasons.map((season) => {
                    const isSelected = selectedSeason === season.season_number;
                    return (
                      <TouchableOpacity
                        key={season.season_number}
                        style={[styles.seasonChip, isSelected && styles.seasonChipActive]}
                        onPress={() => {
                          Haptics.selectionAsync();
                          setSelectedSeason(season.season_number);
                        }}
                      >
                        <Text style={[styles.seasonChipText, isSelected && styles.seasonChipTextActive]}>
                          {season.name} ({season.episode_count} avsnitt)
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* Episodes List */}
                <Text style={styles.episodesHeader}>Avsnitt</Text>
                {currentEpisodes.map((ep) => (
                  <TouchableOpacity
                    key={ep.id}
                    style={styles.episodeCard}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      const s = selectedSeries;
                      setSelectedSeries(null);
                      onPlayEpisode(s, ep);
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={styles.episodeThumbContainer}>
                      <Image
                        source={{ uri: ep.info.movie_image || selectedSeries.cover }}
                        style={styles.episodeThumb}
                      />
                      <View style={styles.episodePlayOverlay}>
                        <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
                      </View>
                    </View>

                    <View style={styles.episodeInfo}>
                      <Text style={styles.episodeTitle} numberOfLines={1}>
                        {ep.episode_num}. {ep.title}
                      </Text>
                      <Text style={styles.episodeDuration}>{ep.info.duration || '45 min'}</Text>
                      <Text style={styles.episodePlot} numberOfLines={2}>
                        {ep.info.plot || 'Se detta spännande avsnitt i full HD.'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  categoryScrollWrapper: {
    height: 46,
  },
  categoryList: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  catPill: {
    backgroundColor: colors.surfaceCard,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catPillText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  catPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 110,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySub: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  detailBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  detailSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
    overflow: 'hidden',
  },
  detailPosterContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  detailBackdropImg: {
    width: '100%',
    height: '100%',
  },
  detailGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
  },
  detailCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBody: {
    padding: 20,
  },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  detailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.ratingBadge,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '800',
  },
  metaGenre: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  plotText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },
  seasonHeader: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  seasonList: {
    marginBottom: 20,
  },
  seasonChip: {
    backgroundColor: colors.surfaceCard,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  seasonChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  seasonChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  seasonChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  episodesHeader: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  episodeCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceCard,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  episodeThumbContainer: {
    width: 90,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceLight,
  },
  episodeThumb: {
    width: '100%',
    height: '100%',
  },
  episodePlayOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  episodeTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  episodeDuration: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 3,
  },
  episodePlot: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
});
