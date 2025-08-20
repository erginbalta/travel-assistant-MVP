import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users } from 'lucide-react-native';

export default function TripPlanningScreen() {
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

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedTripType, setSelectedTripType] = useState('');

  const countries = ['Türkiye', 'Fransa', 'İtalya', 'İspanya', 'Yunanistan'];
  const cities = {
    'Türkiye': ['İstanbul', 'Antalya', 'Kapadokya', 'İzmir', 'Bodrum'],
    'Fransa': ['Paris', 'Nice', 'Lyon', 'Cannes'],
    'İtalya': ['Roma', 'Milano', 'Venedik', 'Floransa'],
    'İspanya': ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'],
    'Yunanistan': ['Atina', 'Santorini', 'Mykonos', 'Selanik'],
  };

  const tripTypes = [
    { id: 'food', title: 'Yeme İçme', emoji: '🍽️' },
    { id: 'culture', title: 'Kültürel', emoji: '🏛️' },
    { id: 'social', title: 'Sosyal', emoji: '🎉' },
    { id: 'city', title: 'Şehir Gezmesi', emoji: '🏙️' },
    { id: 'general', title: 'Genel', emoji: '🌍' },
  ];

  const budgetRanges = [
    '₺1,000 - ₺2,500',
    '₺2,500 - ₺5,000',
    '₺5,000 - ₺10,000',
    '₺10,000+',
  ];

  const canCreateTrip = selectedCountry && selectedCity && days && budget && selectedTripType;

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
        <Text style={[styles.title, { color: colors.text }]}>Tur Planla</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Country Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Ülke Seçin
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.optionChip,
                  { backgroundColor: selectedCountry === country ? colors.primary : colors.surface }
                ]}
                onPress={() => {
                  setSelectedCountry(country);
                  setSelectedCity('');
                }}
              >
                <Text style={[
                  styles.optionText,
                  { color: selectedCountry === country ? 'white' : colors.text }
                ]}>
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* City Selection */}
        {selectedCountry && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Şehir Seçin
            </Text>
            <View style={styles.optionGrid}>
              {cities[selectedCountry]?.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.gridOption,
                    { 
                      backgroundColor: selectedCity === city ? colors.primary : colors.cardBackground,
                      borderColor: colors.surface,
                    }
                  ]}
                  onPress={() => setSelectedCity(city)}
                >
                  <MapPin size={20} color={selectedCity === city ? 'white' : colors.primary} />
                  <Text style={[
                    styles.gridOptionText,
                    { color: selectedCity === city ? 'white' : colors.text }
                  ]}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Days */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Kaç Gün?
          </Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
            <Calendar size={20} color={colors.primary} />
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              placeholder="Gün sayısını girin"
              placeholderTextColor={colors.secondaryText}
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Bütçe Aralığı
          </Text>
          <View style={styles.budgetOptions}>
            {budgetRanges.map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.budgetOption,
                  { 
                    backgroundColor: budget === range ? colors.primary : colors.cardBackground,
                    borderColor: colors.surface,
                  }
                ]}
                onPress={() => setBudget(range)}
              >
                <DollarSign size={18} color={budget === range ? 'white' : colors.primary} />
                <Text style={[
                  styles.budgetText,
                  { color: budget === range ? 'white' : colors.text }
                ]}>
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trip Type */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tur Tipi
          </Text>
          <View style={styles.tripTypeGrid}>
            {tripTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.tripTypeOption,
                  { 
                    backgroundColor: selectedTripType === type.id ? colors.primary : colors.cardBackground,
                    borderColor: colors.surface,
                  }
                ]}
                onPress={() => setSelectedTripType(type.id)}
              >
                <Text style={styles.tripEmoji}>{type.emoji}</Text>
                <Text style={[
                  styles.tripTypeText,
                  { color: selectedTripType === type.id ? 'white' : colors.text }
                ]}>
                  {type.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Create Trip Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            { 
              backgroundColor: canCreateTrip ? colors.primary : colors.surface,
              opacity: canCreateTrip ? 1 : 0.5,
            }
          ]}
          onPress={() => {
            if (canCreateTrip) {
              router.push('/place-selection');
            }
          }}
          disabled={!canCreateTrip}
        >
          <Text style={[
            styles.createButtonText,
            { color: canCreateTrip ? 'white' : colors.secondaryText }
          ]}>
            AI Tur Planını Oluştur
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 120,
  },
  gridOptionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  budgetOptions: {
    gap: 12,
  },
  budgetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  budgetText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  tripTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tripTypeOption: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
  },
  createButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});