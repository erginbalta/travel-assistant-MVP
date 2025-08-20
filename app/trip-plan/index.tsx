import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock, Plus, CreditCard as Edit3, Star } from 'lucide-react-native';

export default function TripPlanScreen() {
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
    success: '#34C759',
  };

  const [selectedDay, setSelectedDay] = useState(1);

  const tripPlan = {
    1: [
      {
        id: 1,
        name: 'Galata Kulesi',
        type: 'Tarihi Mekan',
        time: '09:00',
        duration: '1.5 saat',
        rating: 4.6,
        status: 'planned',
      },
      {
        id: 2,
        name: 'İstiklal Caddesi',
        type: 'Popüler Sokak',
        time: '11:00',
        duration: '2 saat',
        rating: 4.4,
        status: 'planned',
      },
      {
        id: 3,
        name: 'Karaköy Lokantası',
        type: 'Restoran',
        time: '13:30',
        duration: '1.5 saat',
        rating: 4.7,
        status: 'planned',
      },
    ],
    2: [
      {
        id: 4,
        name: 'Ayasofya',
        type: 'Tarihi Mekan',
        time: '09:30',
        duration: '2 saat',
        rating: 4.8,
        status: 'planned',
      },
      {
        id: 5,
        name: 'Sultanahmet Camii',
        type: 'Tarihi Mekan',
        time: '12:00',
        duration: '1 saat',
        rating: 4.9,
        status: 'planned',
      },
    ],
    3: [
      {
        id: 6,
        name: 'Boğaz Turu',
        type: 'Aktivite',
        time: '10:00',
        duration: '3 saat',
        rating: 4.5,
        status: 'planned',
      },
    ],
  };

  const days = Object.keys(tripPlan).map(Number);
  const currentDayPlan = tripPlan[selectedDay] || [];

  const getTotalDuration = (dayPlan) => {
    return dayPlan.reduce((total, item) => {
      const hours = parseFloat(item.duration.split(' ')[0]);
      return total + hours;
    }, 0);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: colors.text }]}>İstanbul Turu</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            3 Günlük Plan
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Edit3 size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayTab,
              { 
                backgroundColor: selectedDay === day ? colors.primary : colors.surface,
              }
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[
              styles.dayTabText,
              { color: selectedDay === day ? 'white' : colors.text }
            ]}>
              {day}. Gün
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Day Summary */}
      <View style={[styles.daySummary, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
            Toplam Süre
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {getTotalDuration(currentDayPlan)} saat
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
            Mekan Sayısı
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {currentDayPlan.length}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <TouchableOpacity style={styles.viewMapButton}>
          <MapPin size={16} color={colors.primary} />
          <Text style={[styles.viewMapText, { color: colors.primary }]}>
            Haritada Gör
          </Text>
        </TouchableOpacity>
      </View>

      {/* Plan Timeline */}
      <ScrollView style={styles.timeline} showsVerticalScrollIndicator={false}>
        {currentDayPlan.map((item, index) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.timelineLeftColumn}>
              <Text style={[styles.timeText, { color: colors.text }]}>
                {item.time}
              </Text>
              <View style={styles.timelineDot}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                {index < currentDayPlan.length - 1 && (
                  <View style={[styles.line, { backgroundColor: colors.surface }]} />
                )}
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.planCard, { backgroundColor: colors.cardBackground }]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={[styles.placeName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.placeType, { color: colors.secondaryText }]}>
                    {item.type}
                  </Text>
                </View>
                <View style={styles.rating}>
                  <Star size={14} color="#FFD700" fill="#FFD700" />
                  <Text style={[styles.ratingText, { color: colors.text }]}>
                    {item.rating}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.duration}>
                  <Clock size={14} color={colors.secondaryText} />
                  <Text style={[styles.durationText, { color: colors.secondaryText }]}>
                    {item.duration}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editPlaceButton}>
                  <Edit3 size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add New Place Button */}
        <TouchableOpacity 
          style={[styles.addPlaceButton, { backgroundColor: colors.surface }]}
        >
          <Plus size={20} color={colors.primary} />
          <Text style={[styles.addPlaceText, { color: colors.primary }]}>
            Mekan Ekle
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Taslak Olarak Kaydet
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton, { backgroundColor: colors.success }]}
          onPress={() => {
            router.push('/(tabs)/map');
          }}
        >
          <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
            Planı Onayla
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  editButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelector: {
    maxHeight: 60,
  },
  daySelectorContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  dayTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  dayTabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  daySummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E5E7',
    marginHorizontal: 16,
  },
  viewMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  viewMapText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  timeline: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeftColumn: {
    width: 80,
    alignItems: 'center',
    paddingTop: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  timelineDot: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 8,
  },
  planCard: {
    flex: 1,
    marginLeft: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  editPlaceButton: {
    padding: 4,
  },
  addPlaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
    marginLeft: 96,
  },
  addPlaceText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    shadowOpacity: 0.3,
  },
  primaryButtonText: {
    color: 'white',
  },
});