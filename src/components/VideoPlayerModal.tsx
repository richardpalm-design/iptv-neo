import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import { useVideoPlayer, VideoView, VideoContentFit } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import { BlurView } from 'expo-blur';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  X,
  Maximize2,
  Tv,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { LiveStream } from '../types/iptv';

interface VideoPlayerModalProps {
  visible: boolean;
  streamUrl: string | null;
  title: string;
  subtitle?: string;
  isLive?: boolean;
  onClose: () => void;
  channels?: LiveStream[];
  currentChannelIndex?: number;
  onSelectChannel?: (channel: LiveStream) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  visible,
  streamUrl,
  title,
  subtitle,
  isLive = false,
  onClose,
  channels = [],
  currentChannelIndex = 0,
  onSelectChannel,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resizeMode, setResizeMode] = useState<VideoContentFit>('contain');
  const [showChannelDrawer, setShowChannelDrawer] = useState(false);

  const controlsTimeoutRef = useRef<any>(null);

  // Modern expo-video player instance
  const player = useVideoPlayer(streamUrl || '', (p) => {
    p.loop = false;
    p.play();
  });

  // Handle stream url changes
  useEffect(() => {
    if (streamUrl && player) {
      setIsLoading(true);
      player.replace(streamUrl);
      player.play();
    }
  }, [streamUrl, player]);

  // Player listeners
  useEffect(() => {
    if (!player) return;

    const statusSub = player.addListener('statusChange', ({ status }) => {
      setIsLoading(status === 'loading');
    });

    const playingSub = player.addListener('playingChange', ({ isPlaying: playing }) => {
      setIsPlaying(playing);
    });

    const timeSub = player.addListener('timeUpdate', ({ currentTime: time }) => {
      setCurrentTime(time);
      setDuration(player.duration || 0);
    });

    return () => {
      statusSub?.remove?.();
      playingSub?.remove?.();
      timeSub?.remove?.();
    };
  }, [player]);

  // Screen orientation management
  useEffect(() => {
    if (visible) {
      ScreenOrientation.unlockAsync();
      resetControlsTimer();
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      if (player) {
        player.pause();
      }
    }
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [visible, player]);

  const resetControlsTimer = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      setShowChannelDrawer(false);
    }, 4500);
  };

  const toggleControls = () => {
    Haptics.selectionAsync();
    setShowControls((prev) => {
      if (!prev) resetControlsTimer();
      return !prev;
    });
  };

  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!player) return;
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
    resetControlsTimer();
  };

  const handleSeek = (seconds: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!player || isLive) return;
    player.seekBy(seconds);
    resetControlsTimer();
  };

  const toggleAspectRatio = () => {
    Haptics.selectionAsync();
    if (resizeMode === 'contain') {
      setResizeMode('cover');
    } else if (resizeMode === 'cover') {
      setResizeMode('fill');
    } else {
      setResizeMode('contain');
    }
    resetControlsTimer();
  };

  const formatTime = (seconds: number) => {
    const totalSecs = Math.floor(seconds);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" supportedOrientations={['portrait', 'landscape']} statusBarTranslucent>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={toggleControls}>
          <View style={styles.videoWrapper}>
            {player ? (
              <VideoView
                style={styles.video}
                player={player}
                contentFit={resizeMode}
                nativeControls={false}
                allowsPictureInPicture
              />
            ) : null}

            {/* Loading Buffering Indicator */}
            {isLoading && (
              <View style={styles.centerLoading}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.bufferingText}>Ansluter till ström...</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* Overlay Controls */}
        {showControls && (
          <View style={styles.overlay} pointerEvents="box-none">
            {/* Top Bar */}
            <BlurView intensity={50} tint="dark" style={styles.topBar}>
              <TouchableOpacity
                style={styles.iconCircle}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  player?.pause();
                  onClose();
                }}
              >
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                  {isLive && (
                    <View style={styles.livePill}>
                      <View style={styles.liveDot} />
                      <Text style={styles.livePillText}>DIREKT</Text>
                    </View>
                  )}
                  <Text style={styles.streamTitle} numberOfLines={1}>
                    {title}
                  </Text>
                </View>
                {!!subtitle && (
                  <Text style={styles.streamSubtitle} numberOfLines={1}>
                    {subtitle}
                  </Text>
                )}
              </View>

              <View style={styles.topActions}>
                {isLive && channels.length > 0 && (
                  <TouchableOpacity
                    style={[styles.iconCircle, showChannelDrawer && styles.activeCircle]}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setShowChannelDrawer((prev) => !prev);
                    }}
                  >
                    <Tv size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.iconCircle} onPress={toggleAspectRatio}>
                  <Maximize2 size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </BlurView>

            {/* Quick Channel Drawer for Live TV */}
            {showChannelDrawer && isLive && channels.length > 0 && (
              <BlurView intensity={70} tint="dark" style={styles.channelDrawer}>
                <Text style={styles.drawerTitle}>Snabbkanalväljare</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={channels}
                  keyExtractor={(item) => String(item.stream_id)}
                  renderItem={({ item, index }) => {
                    const isCurrent = index === currentChannelIndex;
                    return (
                      <TouchableOpacity
                        style={[styles.channelChip, isCurrent && styles.activeChannelChip]}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          onSelectChannel?.(item);
                          resetControlsTimer();
                        }}
                      >
                        <Text style={[styles.channelChipNumber, isCurrent && styles.activeChipText]}>
                          {item.num}
                        </Text>
                        <Text
                          style={[styles.channelChipName, isCurrent && styles.activeChipText]}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </BlurView>
            )}

            {/* Center Play/Pause & Seek Buttons */}
            <View style={styles.centerControls} pointerEvents="box-none">
              {!isLive && (
                <TouchableOpacity style={styles.seekButton} onPress={() => handleSeek(-10)}>
                  <RotateCcw size={26} color="#FFFFFF" />
                  <Text style={styles.seekText}>10s</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
                {isPlaying ? (
                  <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
                ) : (
                  <Play size={32} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 3 }} />
                )}
              </TouchableOpacity>

              {!isLive && (
                <TouchableOpacity style={styles.seekButton} onPress={() => handleSeek(10)}>
                  <RotateCw size={26} color="#FFFFFF" />
                  <Text style={styles.seekText}>10s</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Bottom Progress Bar */}
            {!isLive && duration > 0 && (
              <BlurView intensity={50} tint="dark" style={styles.bottomBar}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${Math.min(100, (currentTime / duration) * 100)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </BlurView>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  centerLoading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bufferingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 48 : 20,
    paddingBottom: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    backgroundColor: colors.primary,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.liveBadge,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
  },
  livePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  streamTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  streamSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  playPauseButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(10, 132, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  seekButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  seekText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  channelDrawer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  channelChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    gap: 6,
  },
  activeChannelChip: {
    backgroundColor: colors.primary,
  },
  channelChipNumber: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  channelChipName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    maxWidth: 120,
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  progressBarTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
});
