import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Search, Heart, X, SlidersHorizontal } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { LiveStream, LiveCategory } from '../types/iptv';
import { ChannelCard } from '../components/ChannelCard';

interface LiveTVScreenProps {
  categories: LiveCategory[];
  channels: LiveStream[];
  favorites: string[];
  onPlayChannel: (channel: LiveStream, channelList: LiveStream[]) => void;
  onToggleFavorite: (channel: LiveStream) => void;
}

export const LiveTVScreen: React.FC<LiveTVScreenProps> = ({
  categories,
  channels,
  favorites,
  onPlayChannel,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Filter channels
  const filteredChannels = useMemo(() => {
    return channels.filter((ch) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'all' || String(ch.category_id) === String(selectedCategory);

      // Search match
      const searchMatch =
        !searchQuery.trim() ||
        ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(ch.num).includes(searchQuery.trim());

      // Favorites match
      const favMatch = !onlyFavorites || favorites.includes(String(ch.stream_id));

      return categoryMatch && searchMatch && favMatch;
    });
  }, [channels, selectedCategory, searchQuery, onlyFavorites, favorites]);

  return (
    <View style={styles.container}>
      {/* Search & Favorites Filter Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök kanal eller nummer..."
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

        <TouchableOpacity
          style={[styles.favFilterBtn, onlyFavorites && styles.favFilterBtnActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setOnlyFavorites((prev) => !prev);
          }}
        >
          <Heart
            size={18}
            color={onlyFavorites ? '#FFFFFF' : colors.textSecondary}
            fill={onlyFavorites ? '#FFFFFF' : 'transparent'}
          />
        </TouchableOpacity>
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
              Alla ({channels.length})
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

      {/* Channels List */}
      <FlatList
        data={filteredChannels}
        keyExtractor={(item) => String(item.stream_id)}
        contentContainerStyle={styles.listContent}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
        renderItem={({ item }) => (
          <ChannelCard
            channel={item}
            isFavorite={favorites.includes(String(item.stream_id))}
            onPress={(ch) => onPlayChannel(ch, filteredChannels)}
            onToggleFavorite={onToggleFavorite}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Inga kanaler hittades</Text>
            <Text style={styles.emptySub}>
              {onlyFavorites
                ? 'Du har inga sparade favoriter i denna kategori ännu.'
                : 'Prova att söka på något annat eller byt kategori.'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  searchBox: {
    flex: 1,
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
  favFilterBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  favFilterBtnActive: {
    backgroundColor: colors.accentRed,
    borderColor: colors.accentRed,
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
  listContent: {
    paddingTop: 6,
    paddingBottom: 110,
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
    lineHeight: 18,
  },
});
