import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Film } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { VodStream } from '../types/iptv';

interface MovieCardProps {
  movie: VodStream;
  onPress: (movie: VodStream) => void;
  width?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress, width = 140 }) => {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(movie);
  };

  const height = width * 1.5;

  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={[styles.posterContainer, { width, height }]}>
        {movie.stream_icon && !imageError ? (
          <Image
            source={{ uri: movie.stream_icon }}
            style={styles.poster}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.placeholder}>
            <Film size={32} color={colors.textSecondary} />
          </View>
        )}

        {/* Rating Badge */}
        {!!movie.rating && (
          <View style={styles.ratingBadge}>
            <Star size={10} color="#000000" fill="#000000" />
            <Text style={styles.ratingText}>
              {typeof movie.rating === 'number' ? movie.rating.toFixed(1) : movie.rating}
            </Text>
          </View>
        )}

        {/* Subtle Bottom Gradient */}
        <LinearGradient
          colors={['transparent', 'rgba(7, 9, 14, 0.9)']}
          style={styles.gradient}
        />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {movie.name}
      </Text>
      <Text style={styles.subtext} numberOfLines={1}>
        {movie.added ? movie.added.split('-')[0] : 'Film'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 14,
    marginBottom: 8,
  },
  posterContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceLight,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.ratingBadge,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000000',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  subtext: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
