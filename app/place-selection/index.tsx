import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Image,
  Dimensions,
  Animated,
  PanGestureHandler,
  State,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, X, Star, MapPin, Clock } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = height * 0.7;

export default function PlaceSelectionScreen() {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPlaces, setLikedPlaces] = useState([]);

  const places = [
    {
      id: 1,
      name: 'Galata Kulesi',
      type: 'Tarihi Mekan',
      rating: 4.6,
      duration: '1-2 saat',
      description: 'İstanbul\'un panoramik manzarasını görebileceğiniz tarihi kule.',
      image: 'https://images.pexels.com/photos/1413414/pexels-photo-1413414.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Tarihi Mekanlar',
    },
    {
      id: 2,
      name: 'Karaköy Lokantası',
      type: 'Restoran',
      rating: 4.7,
      duration: '1-1.5 saat',
      description: 'Modern Osmanlı mutfağının en iyi örneklerinden biri.',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Restoranlar',
    },
    {
      id: 3,
      name: 'İstiklal Caddesi',
      type: 'Popüler Sokak',
      rating: 4.4,
      duration: '2-3 saat',
      description: 'Alışveriş, yeme-içme ve eğlence mekanlarının kalbi.',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Popüler Sokaklar',
    },
    {
      id: 4,
      name: 'Minimalist Café',
      type: 'Kafe',
      rating: 4.5,
      duration: '1 saat',
      description: 'Sakin atmosferde kaliteli kahve keyfi.',
      image: 'https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kafeler',
    },
    {
      id: 5,
      name: 'Rooftop Bar',
      type: 'Bar',
      rating: 4.3,
      duration: '2-3 saat',
      description: 'Şehir manzaralı çatı barında unutulmaz bir gece.',
      image: 'https://images.pexels.com/photos/681847/pexels-photo-681847.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Bar & Eğlence',
    },
  ];

  const currentPlace = places[currentIndex];

  const handleLike = () => {
    if (currentPlace) {
      setLikedPlaces([...likedPlaces, currentPlace]);
      nextCard();
    }
  };

  const handlePass = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < places.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Mekan seçimi tamamlandı, plan ekranına git
      router.push('/trip-plan');
    }
  };

  if (!currentPlace) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.completedContainer}>
          <Text style={[styles.completedTitle, { color: colors.text }]}>
            Harika! Mekan seçiminiz tamamlandı.
          </Text>
          <Text style={[styles.completedSubtitle, { color: colors.secondaryText }]}>
            {likedPlaces.length} mekan seçtiniz
          </Text>
          <TouchableOpacity
            style={[styles.createPlanButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/trip-plan')}
          >
            <Text style={styles.createPlanText}>Plan Oluştur</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Mekan Seçimi</Text>
          <Text style={[styles.counter, { color: colors.secondaryText }]}>
            {currentIndex + 1}/{places.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressContainer, { backgroundColor: colors.surface }]}>
          <View 
            style={[
              styles.progressBar, 
              { 
                backgroundColor: colors.primary,
                width: `${((currentIndex + 1) / places.length) * 100}%`,
              }
            ]} 
          />
        </View>

        {/* Card Stack */}
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.cardShadow, { backgroundColor: colors.cardBackground }]}>
            <Image source={{ uri: currentPlace.image }} style={styles.cardImage} />
            
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.placeInfo}>
                  <Text style={[styles.placeName, { color: colors.text }]}>
                    {currentPlace.name}
                  </Text>
                  <Text style={[styles.placeType, { color: colors.secondaryText }]}>
                    {currentPlace.type}
                  </Text>
                </View>
                <View style={styles.rating}>
                  <Star size={18} color="#FFD700" fill="#FFD700" />
                  <Text style={[styles.ratingText, { color: colors.text }]}>
                    {currentPlace.rating}
                  </Text>
                </View>
              </View>

              <Text style={[styles.description, { color: colors.secondaryText }]}>
                {currentPlace.description}
              </Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                  <Clock size={16} color={colors.primary} />
                  <Text style={[styles.detailText, { color: colors.secondaryText }]}>
                    {currentPlace.duration}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <MapPin size={16} color={colors.primary} />
                  <Text style={[styles.detailText, { color: colors.secondaryText }]}>
                    {currentPlace.category}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.passButton]}
            onPress={handlePass}
          >
            <X size={28} color="#FF3B30" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.likeButton]}
            onPress={handleLike}
          >
            <Heart size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Liked Count */}
        <View style={styles.likedContainer}>
          <Text style={[styles.likedText, { color: colors.secondaryText }]}>
            {likedPlaces.length} mekan beğenildi
          </Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    height: 4,
    marginHorizontal: 20,
    borderRadius: 2,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardImage: {
    width: '100%',
    height: '60%',
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 6,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 40,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  passButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  likeButton: {
    backgroundColor: '#34C759',
  },
  likedContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  likedText: {
    fontSize: 14,
  },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  completedSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  createPlanButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
  },
  createPlanText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});