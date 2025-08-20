import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Star, MapPin } from 'lucide-react-native';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = {
    background: isDark ? '#000000' : '#FFFFFF',
    cardBackground: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    secondaryText: isDark ? '#8E8E93' : '#6D6D70',
    primary: '#007AFF',
    surface: isDark ? '#2C2C2E' : '#F2F2F7',
  };

  const [activeTab, setActiveTab] = useState('places');

  const favoritePlaces = [
    {
      id: 1,
      name: 'Galata Kulesi',
      type: 'Tarihi Mekan',
      city: 'İstanbul',
      country: 'Türkiye',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1413414/pexels-photo-1413414.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Karaköy Lokantası',
      type: 'Restoran',
      city: 'İstanbul',
      country: 'Türkiye',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Eiffel Kulesi',
      type: 'Tarihi Mekan',
      city: 'Paris',
      country: 'Fransa',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const favoriteCountries = [
    {
      id: 1,
      name: 'Türkiye',
      placesCount: 8,
      image: 'https://images.pexels.com/photos/1413414/pexels-photo-1413414.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Fransa',
      placesCount: 5,
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'İtalya',
      placesCount: 3,
      image: 'https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favorilerim</Text>
      </View>

      {/* Tab Selector */}
      <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'places' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setActiveTab('places')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'places' ? 'white' : colors.text }
          ]}>
            Mekanlar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'countries' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setActiveTab('countries')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'countries' ? 'white' : colors.text }
          ]}>
            Ülkeler
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'places' ? (
          /* Favorite Places */
          <View>
            {favoritePlaces.map((place) => (
              <TouchableOpacity 
                key={place.id} 
                style={[styles.placeCard, { backgroundColor: colors.cardBackground }]}
              >
                <Image source={{ uri: place.image }} style={styles.placeImage} />
                <View style={styles.placeInfo}>
                  <View style={styles.placeHeader}>
                    <View style={styles.placeDetails}>
                      <Text style={[styles.placeName, { color: colors.text }]}>
                        {place.name}
                      </Text>
                      <Text style={[styles.placeType, { color: colors.secondaryText }]}>
                        {place.type}
                      </Text>
                      <View style={styles.location}>
                        <MapPin size={14} color={colors.secondaryText} />
                        <Text style={[styles.locationText, { color: colors.secondaryText }]}>
                          {place.city}, {place.country}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.actions}>
                      <TouchableOpacity style={styles.favoriteButton}>
                        <Heart size={20} color="#FF3B30" fill="#FF3B30" />
                      </TouchableOpacity>
                      <View style={styles.rating}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text style={[styles.ratingText, { color: colors.text }]}>
                          {place.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Favorite Countries */
          <View>
            {favoriteCountries.map((country) => (
              <TouchableOpacity 
                key={country.id} 
                style={[styles.countryCard, { backgroundColor: colors.cardBackground }]}
              >
                <Image source={{ uri: country.image }} style={styles.countryImage} />
                <View style={styles.countryOverlay}>
                  <Text style={styles.countryName}>{country.name}</Text>
                  <Text style={styles.countryPlaces}>
                    {country.placesCount} favori mekan
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  placeCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeImage: {
    width: 100,
    height: 100,
  },
  placeInfo: {
    flex: 1,
    padding: 16,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 14,
    marginBottom: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  actions: {
    alignItems: 'flex-end',
  },
  favoriteButton: {
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  countryCard: {
    height: 120,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  countryImage: {
    width: '100%',
    height: '100%',
  },
  countryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  countryName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  countryPlaces: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
});