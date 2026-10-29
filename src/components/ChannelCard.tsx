import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Play, Tv } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { LiveStream } from '../types/iptv';

interface ChannelCardProps {
  channel: LiveStream;
  isFavorite: boolean;
  onPress: (channel: LiveStream) => void;
  onToggleFavorite: (channel: LiveStream) => void;
  currentProgram?: string;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  isFavorite,
  onPress,
  onToggleFavorite,
  currentProgram,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleFavPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggleFavorite(channel);
  };

  const handleCardPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(channel);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.75}>
      {/* Channel Number */}
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{channel.num}</Text>
      </View>

      {/* Channel Logo */}
      <View style={styles.logoContainer}>
        {channel.stream_icon && !imageError ? (
          <Image
            source={{ uri: channel.stream_icon }}
            style={styles.logo}
            resizeMode="contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Tv size={20} color={colors.textSecondary} />
          </View>
        )}
      </View>

      {/* Info Column */}
      <View style={styles.infoCol}>
        <Text style={styles.channelName} numberOfLines={1}>
          {channel.name}
        </Text>
        <Text style={styles.epgText} numberOfLines={1}>
          {currentProgram || 'Direktsändning'}
        </Text>
      </View>

      {/* Right Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.favButton} onPress={handleFavPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Heart
            size={18}
            color={isFavorite ? colors.accentRed : colors.textMuted}
            fill={isFavorite ? colors.accentRed : 'transparent'}
          />
        </TouchableOpacity>

        <View style={styles.playIcon}>
          <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 4,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  numberBadge: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  logo: {
    width: 36,
    height: 36,
  },
  logoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  channelName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  epgText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '400',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  favButton: {
    padding: 4,
  },
  playIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
