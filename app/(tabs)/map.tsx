import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, MapPin, Clock, Star } from 'lucide-react-native';

export default function MapScreen() {
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

  const [selectedDay, setSelectedDay] = useState(1);
  const [showDayPicker, setShowDayPicker] = useState(false);

  const days = [1, 2, 3, 4, 5];
  
  const dayPlaces = {
    1: [
      { id: 1, name: 'Ayasofya', type: 'Tarihi Mekan', time: '09:00', duration: '2 saat', rating: 4.8 },
      { id: 2, name: 'Sultanahmet Camii', type: 'Tarihi Mekan', time: '11:30', duration: '1 saat', rating: 4.9 },
      { id: 3, name: 'Lokma Café', type: 'Kafe', time: '13:00', duration: '1 saat', rating: 4.5 },
      { id: 4, name: 'Kapalıçarşı', type: 'Alışveriş', time: '15:00', duration: '2 saat', rating: 4.3 },
    ],
    2: [
      { id: 5, name: 'Galata Kulesi', type: 'Tarihi Mekan', time: '10:00', duration: '1.5 saat', rating: 4.6 },
      { id: 6, name: 'İstiklal Caddesi', type: 'Popüler Sokak', time: '12:00', duration: '2 saat', rating: 4.4 },
      { id: 7, name: 'Karaköy Lokantası', type: 'Restoran', time: '14:30', duration: '1.5 saat', rating: 4.7 },
    ],
  };

  const currentPlaces = dayPlaces[selectedDay] || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Tur Haritası</Text>
        <TouchableOpacity
          style={[styles.daySelector, { backgroundColor: colors.surface }]}
          onPress={() => setShowDayPicker(!showDayPicker)}
        >
          <Text style={[styles.daySelectorText, { color: colors.text }]}>
            {selectedDay}. Gün
          </Text>
          <ChevronDown size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Day Picker */}
      {showDayPicker && (
        <View style={[styles.dayPicker, { backgroundColor: colors.cardBackground }]}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayOption,
                selectedDay === day && { backgroundColor: colors.primary }
              ]}
              onPress={() => {
                setSelectedDay(day);
                setShowDayPicker(false);
              }}
            >
              <Text style={[
                styles.dayOptionText,
                { color: selectedDay === day ? 'white' : colors.text }
              ]}>
                {day}. Gün
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Map Placeholder */}
      <View style={[styles.mapContainer, { backgroundColor: colors.surface }]}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color={colors.primary} />
          <Text style={[styles.mapPlaceholderText, { color: colors.secondaryText }]}>
            Harita burada görünecek
          </Text>
          <Text style={[styles.mapSubtext, { color: colors.secondaryText }]}>
            {selectedDay}. gün için {currentPlaces.length} mekan
          </Text>
        </View>
      </View>

      {/* Places List */}
      <ScrollView style={styles.placesList} showsVerticalScrollIndicator={false}>
        <Text style={[styles.placesTitle, { color: colors.text }]}>
          {selectedDay}. Gün Programı
        </Text>
        
        {currentPlaces.map((place, index) => (
          <View key={place.id} style={[styles.placeCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.placeHeader}>
              <View style={styles.placeInfo}>
                <Text style={[styles.placeName, { color: colors.text }]}>
                  {place.name}
                </Text>
                <Text style={[styles.placeType, { color: colors.secondaryText }]}>
                  {place.type}
                </Text>
              </View>
              <View style={styles.placeRating}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={[styles.ratingText, { color: colors.text }]}>
                  {place.rating}
                </Text>
              </View>
            </View>
            
            <View style={styles.placeDetails}>
              <View style={styles.timeInfo}>
                <Clock size={16} color={colors.secondaryText} />
                <Text style={[styles.timeText, { color: colors.secondaryText }]}>
                  {place.time} ({place.duration})
                </Text>
              </View>
            </View>

            {index < currentPlaces.length - 1 && (
              <View style={styles.routeLine}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <View style={[styles.line, { backgroundColor: colors.surface }]} />
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
  daySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  daySelectorText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  dayPicker: {
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dayOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  dayOptionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  placesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  placesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 14,
  },
  placeRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  placeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    marginLeft: 6,
  },
  routeLine: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: 20 }],
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    width: 2,
    height: 20,
    marginVertical: 4,
  },
});