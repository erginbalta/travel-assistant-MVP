import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, MapPin, Calendar, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  
  const colors = {
    background: isDark ? '#000000' : '#FFFFFF',
    cardBackground: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    secondaryText: isDark ? '#8E8E93' : '#6D6D70',
    primary: '#007AFF',
    surface: isDark ? '#2C2C2E' : '#F2F2F7',
  };

  const [recentTrips] = useState([
    {
      id: 1,
      city: 'İstanbul',
      country: 'Türkiye',
      days: 3,
      budget: '₺2,500',
      image: 'https://images.pexels.com/photos/1413414/pexels-photo-1413414.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      city: 'Paris',
      country: 'Fransa',
      days: 5,
      budget: '€800',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.secondaryText }]}>
              Hoş geldiniz
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Yeni bir macera planlayın
            </Text>
          </View>
        </View>

        {/* Create New Trip Button */}
        <TouchableOpacity
          style={[styles.createTripButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/trip-planning')}
          activeOpacity={0.8}
        >
          <Plus size={24} color="white" />
          <Text style={styles.createTripText}>Yeni Tur Planla</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Hızlı İşlemler
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
              <MapPin size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Yakınımdaki</Text>
              <Text style={[styles.actionText, { color: colors.text }]}>Mekanlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
              <Calendar size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Son Dakika</Text>
              <Text style={[styles.actionText, { color: colors.text }]}>Planları</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
              <DollarSign size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Bütçe</Text>
              <Text style={[styles.actionText, { color: colors.text }]}>Hesaplama</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Son Tur Planlarım
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentTrips.map((trip) => (
              <TouchableOpacity 
                key={trip.id} 
                style={[styles.tripCard, { backgroundColor: colors.cardBackground }]}
              >
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                <View style={styles.tripInfo}>
                  <Text style={[styles.tripCity, { color: colors.text }]}>
                    {trip.city}
                  </Text>
                  <Text style={[styles.tripCountry, { color: colors.secondaryText }]}>
                    {trip.country}
                  </Text>
                  <View style={styles.tripDetails}>
                    <Text style={[styles.tripDetail, { color: colors.secondaryText }]}>
                      {trip.days} gün
                    </Text>
                    <Text style={[styles.tripDetail, { color: colors.secondaryText }]}>
                      {trip.budget}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Destinations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Popüler Destinasyonlar
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { name: 'Kapadokya', image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Antalya', image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Bodrum', image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600' },
            ].map((destination, index) => (
              <TouchableOpacity key={index} style={styles.destinationCard}>
                <Image source={{ uri: destination.image }} style={styles.destinationImage} />
                <View style={styles.destinationOverlay}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  createTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  createTripText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  tripCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  tripImage: {
    width: '100%',
    height: 120,
  },
  tripInfo: {
    padding: 16,
  },
  tripCity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tripCountry: {
    fontSize: 14,
    marginBottom: 8,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripDetail: {
    fontSize: 12,
  },
  destinationCard: {
    width: 140,
    height: 100,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  destinationName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});