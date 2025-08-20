import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Moon, Bell, Globe, Circle as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = {
    background: isDark ? '#000000' : '#FFFFFF',
    cardBackground: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    secondaryText: isDark ? '#8E8E93' : '#6D6D70',
    primary: '#007AFF',
    surface: isDark ? '#2C2C2E' : '#F2F2F7',
    red: '#FF3B30',
  };

  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const menuItems = [
    {
      icon: User,
      title: 'Profil Bilgileri',
      onPress: () => {},
    },
    {
      icon: Bell,
      title: 'Bildirimler',
      rightElement: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: colors.surface, true: colors.primary }}
        />
      ),
    },
    {
      icon: Moon,
      title: 'Karanlık Mod',
      rightElement: (
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: colors.surface, true: colors.primary }}
        />
      ),
    },
    {
      icon: Globe,
      title: 'Dil Seçenekleri',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      title: 'Yardım & Destek',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profil</Text>
        <TouchableOpacity>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={[styles.profileSection, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>AY</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>
            Ahmet Yılmaz
          </Text>
          <Text style={[styles.userEmail, { color: colors.secondaryText }]}>
            ahmet.yilmaz@email.com
          </Text>
        </View>
      </View>

      {/* Statistics */}
      <View style={[styles.statsSection, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Tur Planı
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>45</Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Ziyaret Edilen
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Ülke
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.menuSection, { backgroundColor: colors.cardBackground }]}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.surface,
              },
            ]}
            onPress={item.onPress}
          >
            <View style={styles.menuLeft}>
              <item.icon size={20} color={colors.text} />
              <Text style={[styles.menuTitle, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
            <View style={styles.menuRight}>
              {item.rightElement || (
                <ChevronRight size={20} color={colors.secondaryText} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.cardBackground }]}
        onPress={handleLogout}
      >
        <LogOut size={20} color={colors.red} />
        <Text style={[styles.logoutText, { color: colors.red }]}>
          Çıkış Yap
        </Text>
      </TouchableOpacity>

      {/* Version Info */}
      <Text style={[styles.versionText, { color: colors.secondaryText }]}>
        Sürüm 1.0.0
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  statsSection: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5E7',
    marginHorizontal: 16,
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    marginLeft: 12,
  },
  menuRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});