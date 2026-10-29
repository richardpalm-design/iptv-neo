import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {
  Server,
  User,
  Calendar,
  Layers,
  Shield,
  Trash2,
  Tv,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { UserAccount } from '../types/iptv';

interface SettingsScreenProps {
  account: UserAccount | null;
  onOpenAccounts: () => void;
  onClearFavorites: () => void;
  onClearHistory: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  account,
  onOpenAccounts,
  onClearFavorites,
  onClearHistory,
}) => {
  const [hlsFormat, setHlsFormat] = React.useState(true);
  const [parentalLock, setParentalLock] = React.useState(false);

  const confirmClearFavorites = () => {
    Alert.alert('Rensa favoriter', 'Är du säker på att du vill ta bort alla sparade favoriter?', [
      { text: 'Avbryt', style: 'cancel' },
      {
        text: 'Rensa',
        style: 'destructive',
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onClearFavorites();
        },
      },
    ]);
  };

  const confirmClearHistory = () => {
    Alert.alert('Rensa historik', 'Vill du nollställa uppspelningshistorik och "Fortsätt titta"?', [
      { text: 'Avbryt', style: 'cancel' },
      {
        text: 'Nollställ',
        style: 'destructive',
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onClearHistory();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Account Info Card */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Aktivt Konto</Text>
      </View>

      <TouchableOpacity style={styles.accountCard} onPress={onOpenAccounts} activeOpacity={0.8}>
        {account ? (
          <>
            <View style={styles.accountTop}>
              <View style={styles.accountBadge}>
                <Server size={20} color="#FFFFFF" />
              </View>
              <View style={styles.accountTitleCol}>
                <Text style={styles.accountName}>{account.name}</Text>
                <View style={styles.statusPill}>
                  <CheckCircle2 size={12} color={colors.accentGreen} />
                  <Text style={styles.statusText}>{account.status || 'Aktiv'}</Text>
                </View>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </View>

            <View style={styles.accountDivider} />

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Protokoll</Text>
                <Text style={styles.infoVal}>{account.type === 'xtream' ? 'Xtream API' : 'M3U'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Utgår</Text>
                <Text style={styles.infoVal}>{account.expiresAt || 'Obegränsat'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Anslutningar</Text>
                <Text style={styles.infoVal}>
                  {account.activeCons || '1'} / {account.maxCons || '3'}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.noAccountBox}>
            <Text style={styles.noAccountTitle}>Inget konto anslutet</Text>
            <Text style={styles.noAccountSub}>Klicka för att lägga till Xtream API eller M3U.</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Playback Settings */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Uppspelning & Ström</Text>
      </View>

      <View style={styles.cardGroup}>
        <View style={styles.cardRow}>
          <View style={styles.rowLabelCol}>
            <Text style={styles.rowLabel}>Föredra HLS (.m3u8)</Text>
            <Text style={styles.rowSub}>Rekommenderat för stabilast streaming på iPhone</Text>
          </View>
          <Switch
            value={hlsFormat}
            onValueChange={(val) => {
              Haptics.selectionAsync();
              setHlsFormat(val);
            }}
            trackColor={{ false: colors.surfaceLight, true: colors.primary }}
          />
        </View>

        <View style={styles.rowDivider} />

        <View style={styles.cardRow}>
          <View style={styles.rowLabelCol}>
            <Text style={styles.rowLabel}>Föräldrakontroll</Text>
            <Text style={styles.rowSub}>Lås 18+ kanaler med PIN-kod</Text>
          </View>
          <Switch
            value={parentalLock}
            onValueChange={(val) => {
              Haptics.selectionAsync();
              setParentalLock(val);
            }}
            trackColor={{ false: colors.surfaceLight, true: colors.primary }}
          />
        </View>
      </View>

      {/* Storage & Data */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Data & Rensa</Text>
      </View>

      <View style={styles.cardGroup}>
        <TouchableOpacity style={styles.actionRow} onPress={confirmClearFavorites}>
          <Trash2 size={18} color={colors.accentRed} />
          <Text style={styles.actionTextDanger}>Rensa alla favoriter</Text>
        </TouchableOpacity>

        <View style={styles.rowDivider} />

        <TouchableOpacity style={styles.actionRow} onPress={confirmClearHistory}>
          <Trash2 size={18} color={colors.accentRed} />
          <Text style={styles.actionTextDanger}>Nollställ "Fortsätt titta"</Text>
        </TouchableOpacity>
      </View>

      {/* About App */}
      <View style={styles.aboutBox}>
        <Tv size={28} color={colors.primary} />
        <Text style={styles.appName}>IPTV NEO</Text>
        <Text style={styles.appVer}>Version 1.0.0 (iOS Edition)</Text>
        <Text style={styles.appDesc}>
          Byggd med React Native & Expo. Designad för elegans, snabbhet och högsta videokvalitet.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  sectionHeader: {
    marginBottom: 8,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accountCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  accountTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountTitleCol: {
    flex: 1,
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusText: {
    color: colors.accentGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  accountDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 14,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 3,
  },
  infoVal: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  noAccountBox: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  noAccountTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  noAccountSub: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  cardGroup: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLabelCol: {
    flex: 1,
    marginRight: 12,
  },
  rowLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  rowSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  actionTextDanger: {
    color: colors.accentRed,
    fontSize: 15,
    fontWeight: '600',
  },
  aboutBox: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  appVer: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  appDesc: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 260,
    lineHeight: 16,
  },
});
