import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Tv, User, PlusCircle, Search } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { UserAccount } from '../types/iptv';

interface HeaderProps {
  account: UserAccount | null;
  onOpenAccounts: () => void;
  onSearchPress?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ account, onOpenAccounts, onSearchPress, title }) => {
  return (
    <View style={styles.container}>
      <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
        <View style={styles.content}>
          {/* Logo & Brand */}
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Tv size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.brandText}>
                IPTV <Text style={styles.brandAccent}>NEO</Text>
              </Text>
              {account ? (
                <View style={styles.accountPill}>
                  <View style={styles.statusDot} />
                  <Text style={styles.accountName} numberOfLines={1}>
                    {account.name}
                  </Text>
                </View>
              ) : (
                <Text style={styles.noAccountText}>Inget konto anslutet</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            {onSearchPress && (
              <TouchableOpacity style={styles.iconButton} onPress={onSearchPress} activeOpacity={0.7}>
                <Search size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.profileButton} onPress={onOpenAccounts} activeOpacity={0.7}>
              {account ? (
                <User size={18} color="#FFFFFF" />
              ) : (
                <PlusCircle size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  blurContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
    paddingTop: 54, // Safe Area offset for iPhone notch/Dynamic Island
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  brandAccent: {
    color: colors.primary,
  },
  accountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentGreen,
  },
  accountName: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    maxWidth: 160,
  },
  noAccountText: {
    fontSize: 12,
    color: colors.accentGold,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
});
