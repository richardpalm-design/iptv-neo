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
import { Search, X, Play, Star, Calendar, Clock, Film } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { VodStream, VodCategory } from '../types/iptv';
import { MovieCard } from '../components/MovieCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POSTER_WIDTH = (SCREEN_WIDTH - 48) / 3;

interface MoviesScreenProps {
  categories: VodCategory[];
  movies: VodStream[];
  onPlayMovie: (movie: VodStream) => void;
}

export const MoviesScreen: React.FC<MoviesScreenProps> = ({
  categories,
  movies,
  onPlayMovie,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<VodStream | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const catMatch =
        selectedCategory === 'all' || String(m.category_id) === String(selectedCategory);
      const searchMatch =
        !searchQuery.trim() || m.name.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [movies, selectedCategory, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök bland filmer..."
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
              Alla ({movies.length})
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

      {/* Movies 3-Column Grid */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => String(item.stream_id)}
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.columnWrapper}
        initialNumToRender={18}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={(m) => setSelectedMovie(m)}
            width={POSTER_WIDTH}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Inga filmer hittades</Text>
            <Text style={styles.emptySub}>Försök med en annan sökning eller byt kategori.</Text>
          </View>
        }
      />

      {/* Movie Details Modal */}
      {selectedMovie && (
        <Modal visible={!!selectedMovie} animationType="slide" transparent>
          <View style={styles.detailBackdrop}>
            <View style={styles.detailSheet}>
              {/* Backdrop / Poster Image */}
              <View style={styles.detailPosterContainer}>
                <Image
                  source={{ uri: selectedMovie.stream_icon }}
                  style={styles.detailBackdropImg}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(15, 19, 28, 0.8)', colors.surface]}
                  style={styles.detailGradient}
                />
                <TouchableOpacity
                  style={styles.detailCloseBtn}
                  onPress={() => setSelectedMovie(null)}
                >
                  <X size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Info Body */}
              <ScrollView style={styles.detailBody} showsVerticalScrollIndicator={false}>
                <Text style={styles.detailTitle}>{selectedMovie.name}</Text>

                <View style={styles.detailMetaRow}>
                  <View style={styles.ratingBadge}>
                    <Star size={12} color="#000000" fill="#000000" />
                    <Text style={styles.ratingText}>
                      {typeof selectedMovie.rating === 'number'
                        ? selectedMovie.rating.toFixed(1)
                        : selectedMovie.rating || '8.5'}
                    </Text>
                  </View>
                  <Text style={styles.metaYear}>
                    {selectedMovie.added ? selectedMovie.added.split('-')[0] : '2025'}
                  </Text>
                  <Text style={styles.metaResolution}>4K UHD</Text>
                </View>

                {/* Big Play Button */}
                <TouchableOpacity
                  style={styles.playNowBtn}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    const movieToPlay = selectedMovie;
                    setSelectedMovie(null);
                    onPlayMovie(movieToPlay);
                  }}
                  activeOpacity={0.85}
                >
                  <Play size={20} color="#000000" fill="#000000" />
                  <Text style={styles.playNowText}>Spela Film</Text>
                </TouchableOpacity>

                <Text style={styles.synopsisHeader}>Handling</Text>
                <Text style={styles.synopsisText}>
                  En fantastisk filmupplevelse streamad i högsta tillgängliga upplösning direkt från din IPTV-tjänst med flerkanalsljud och textning.
                </Text>
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
    height: '80%',
    overflow: 'hidden',
  },
  detailPosterContainer: {
    width: '100%',
    height: 220,
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
    height: 140,
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
    marginBottom: 10,
  },
  detailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
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
  metaYear: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  metaResolution: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  playNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
    marginBottom: 20,
  },
  playNowText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  synopsisHeader: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  synopsisText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
