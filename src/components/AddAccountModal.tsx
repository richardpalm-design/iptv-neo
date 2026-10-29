import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Server, Link, Sparkles, Check, Trash2, KeyRound, User, Globe } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { UserAccount } from '../types/iptv';
import { XtreamApiClient } from '../services/xtreamApi';
import { DEMO_ACCOUNT } from './DemoData';

interface AddAccountModalProps {
  visible: boolean;
  onClose: () => void;
  accounts: UserAccount[];
  activeAccountId: string | null;
  onSelectAccount: (account: UserAccount) => void;
  onSaveAccount: (account: UserAccount) => void;
  onDeleteAccount: (id: string) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  visible,
  onClose,
  accounts,
  activeAccountId,
  onSelectAccount,
  onSaveAccount,
  onDeleteAccount,
}) => {
  const [tab, setTab] = useState<'xtream' | 'm3u'>('xtream');
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [m3uUrl, setM3uUrl] = useState('');

  const handleDemoStart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSaveAccount(DEMO_ACCOUNT);
    onClose();
  };

  const handleConnectXtream = async () => {
    if (!serverUrl || !username || !password) {
      Alert.alert('Fyll i alla fält', 'Server-URL, användarnamn och lösenord krävs.');
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const client = new XtreamApiClient(serverUrl, username, password);
    const authResult = await client.authenticate();

    setLoading(false);

    if (authResult.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const newAcc: UserAccount = {
        id: `acc_${Date.now()}`,
        name: name.trim() || 'Min IPTV',
        type: 'xtream',
        serverUrl,
        username,
        password,
        expiresAt: authResult.user_info?.exp_date
          ? new Date(Number(authResult.user_info.exp_date) * 1000).toLocaleDateString()
          : undefined,
        status: authResult.user_info?.status || 'Aktiv',
        activeCons: String(authResult.user_info?.active_cons || 0),
        maxCons: String(authResult.user_info?.max_connections || 1),
        createdAt: Date.now(),
      };
      onSaveAccount(newAcc);
      onClose();
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Kunde inte ansluta', authResult.error || 'Kontrollera dina uppgifter.');
    }
  };

  const handleConnectM3U = () => {
    if (!m3uUrl) {
      Alert.alert('Fyll i länk', 'En giltig M3U- eller M3U8-länk krävs.');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newAcc: UserAccount = {
      id: `acc_m3u_${Date.now()}`,
      name: name.trim() || 'Min Spellista (M3U)',
      type: 'm3u',
      serverUrl: m3uUrl,
      m3uUrl,
      status: 'Aktiv',
      createdAt: Date.now(),
    };
    onSaveAccount(newAcc);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <BlurView intensity={70} tint="dark" style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Konton & Spellistor</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                Haptics.selectionAsync();
                onClose();
              }}
            >
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            {/* Quick Demo Mode Banner */}
            <TouchableOpacity style={styles.demoCard} onPress={handleDemoStart} activeOpacity={0.8}>
              <View style={styles.demoIcon}>
                <Sparkles size={20} color="#FFFFFF" />
              </View>
              <View style={styles.demoContent}>
                <Text style={styles.demoTitle}>Snabbstart med Demoläge</Text>
                <Text style={styles.demoSub}>
                  Testa appens alla funktioner, Live TV, filmer och spelaren direkt med öppna strömmar.
                </Text>
              </View>
            </TouchableOpacity>

            {/* Saved Accounts List */}
            {accounts.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sparade Konton</Text>
                {accounts.map((acc) => {
                  const isActive = acc.id === activeAccountId;
                  return (
                    <TouchableOpacity
                      key={acc.id}
                      style={[styles.accountItem, isActive && styles.accountItemActive]}
                      onPress={() => {
                        Haptics.selectionAsync();
                        onSelectAccount(acc);
                        onClose();
                      }}
                    >
                      <View style={styles.accountIcon}>
                        {acc.type === 'xtream' ? (
                          <Server size={18} color={isActive ? '#FFFFFF' : colors.primary} />
                        ) : (
                          <Link size={18} color={isActive ? '#FFFFFF' : colors.accentPurple} />
                        )}
                      </View>
                      <View style={styles.accountDetails}>
                        <Text style={styles.accountItemName}>{acc.name}</Text>
                        <Text style={styles.accountItemSub}>
                          {acc.type === 'xtream' ? acc.serverUrl : 'M3U Spellista'}
                          {acc.expiresAt ? ` • Utgår: ${acc.expiresAt}` : ''}
                        </Text>
                      </View>
                      {isActive && (
                        <View style={styles.activeCheck}>
                          <Check size={16} color="#FFFFFF" />
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          onDeleteAccount(acc.id);
                        }}
                      >
                        <Trash2 size={16} color={colors.textMuted} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Add New Account Form */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lägg till nytt konto</Text>

              {/* Tab Selector */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, tab === 'xtream' && styles.activeTab]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setTab('xtream');
                  }}
                >
                  <Server size={16} color={tab === 'xtream' ? '#FFFFFF' : colors.textSecondary} />
                  <Text style={[styles.tabText, tab === 'xtream' && styles.activeTabText]}>
                    Xtream Codes API
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tab, tab === 'm3u' && styles.activeTab]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setTab('m3u');
                  }}
                >
                  <Link size={16} color={tab === 'm3u' ? '#FFFFFF' : colors.textSecondary} />
                  <Text style={[styles.tabText, tab === 'm3u' && styles.activeTabText]}>
                    M3U Länk
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form Input Fields */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Kontonamn (Valfritt)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="t.ex. Vardagsrum, Nordic IPTV"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {tab === 'xtream' ? (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Server-URL</Text>
                    <View style={styles.inputRow}>
                      <Globe size={18} color={colors.textMuted} style={styles.fieldIcon} />
                      <TextInput
                        style={styles.inputWithIcon}
                        placeholder="http://iptv-server.com:8080"
                        placeholderTextColor={colors.textMuted}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={serverUrl}
                        onChangeText={setServerUrl}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Användarnamn</Text>
                    <View style={styles.inputRow}>
                      <User size={18} color={colors.textMuted} style={styles.fieldIcon} />
                      <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Ditt användarnamn"
                        placeholderTextColor={colors.textMuted}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={username}
                        onChangeText={setUsername}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Lösenord</Text>
                    <View style={styles.inputRow}>
                      <KeyRound size={18} color={colors.textMuted} style={styles.fieldIcon} />
                      <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Ditt lösenord"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleConnectXtream}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={styles.submitButtonText}>Anslut med Xtream API</Text>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>M3U / M3U8 URL</Text>
                    <View style={styles.inputRow}>
                      <Link size={18} color={colors.textMuted} style={styles.fieldIcon} />
                      <TextInput
                        style={styles.inputWithIcon}
                        placeholder="https://provider.com/playlist.m3u8"
                        placeholderTextColor={colors.textMuted}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={m3uUrl}
                        onChangeText={setM3uUrl}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleConnectM3U}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.submitButtonText}>Ladda M3U Spellista</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: colors.glassBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBody: {
    padding: 20,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(10, 132, 255, 0.35)',
    gap: 12,
  },
  demoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoContent: {
    flex: 1,
  },
  demoTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  demoSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accountItemActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
  },
  accountIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
  },
  accountItemName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  accountItemSub: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  activeCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  deleteBtn: {
    padding: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceCard,
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  fieldIcon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
