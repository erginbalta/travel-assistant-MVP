import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, ChevronDown, Check, X } from 'lucide-react-native';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [budget, setBudget] = useState('');
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const toggleTripType = (typeId: string) => {
    setSelectedTripTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate) {
      setStartDate(formatDate(date));
      setEndDate('');
      setDays(1);
    } else if (!endDate) {
      const start = new Date(startDate.split('.').reverse().join('-'));
      if (date >= start) {
        setEndDate(formatDate(date));
        setDays(calculateDays(start, date));
      } else {
        setStartDate(formatDate(date));
        setEndDate('');
        setDays(1);
      }
    } else {
      setStartDate(formatDate(date));
      setEndDate('');
      setDays(1);
    }
  };

  const canCreateTrip = selectedCountry && selectedCity && days > 0 && budget && selectedTripTypes.length > 0;

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
          <TouchableOpacity
            style={[styles.dropdownButton, { backgroundColor: colors.cardBackground, borderColor: colors.surface }]}
            onPress={() => setShowCountryDropdown(!showCountryDropdown)}
          >
            <Text style={[
              styles.dropdownButtonText,
              { color: selectedCountry ? colors.text : colors.secondaryText }
            ]}>
              {selectedCountry || 'Ülke seçin'}
            </Text>
            <ChevronDown 
              size={20} 
              color={colors.secondaryText}
              style={[
                styles.dropdownIcon,
                showCountryDropdown && styles.dropdownIconRotated
              ]}
            />
          </TouchableOpacity>
          
          {showCountryDropdown && (
            <View style={[styles.dropdown, { backgroundColor: colors.cardBackground, borderColor: colors.surface }]}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.dropdownOption,
                    selectedCountry === country && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => {
                    setSelectedCountry(country);
                    setSelectedCity('');
                    setShowCountryDropdown(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownOptionText,
                    { color: selectedCountry === country ? 'white' : colors.text }
                  ]}>
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* City Selection */}
        {selectedCountry && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Şehir Seçin
            </Text>
            <View style={styles.optionGrid}>
              {cities[selectedCountry as keyof typeof cities] && cities[selectedCountry as keyof typeof cities].map((city) => (
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
              )) || null}
            </View>
          </View>
        )}

        {/* Days */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tarih Seçin
          </Text>
          <TouchableOpacity 
            style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}
            onPress={() => setShowCalendar(true)}
          >
            <Calendar size={20} color={colors.primary} />
            <Text style={[
              styles.textInput, 
              { color: startDate ? colors.text : colors.secondaryText }
            ]}>
              {startDate && endDate 
                ? `${startDate} - ${endDate} (${days} gün)`
                : startDate 
                  ? `${startDate} - Bitiş tarihi seçin`
                  : 'Başlangıç tarihi seçin'
              }
            </Text>
          </TouchableOpacity>
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
            Tur Tipleri (Çoklu seçim yapabilirsiniz)
          </Text>
          <View style={styles.tripTypeGrid}>
            {tripTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.tripTypeOption,
                  { 
                    backgroundColor: selectedTripTypes.includes(type.id) ? colors.primary : colors.cardBackground,
                    borderColor: colors.surface,
                  }
                ]}
                onPress={() => toggleTripType(type.id)}
              >
                {selectedTripTypes.includes(type.id) && (
                  <View style={styles.checkIcon}>
                    <Check size={16} color="white" />
                  </View>
                )}
                <Text style={styles.tripEmoji}>{type.emoji}</Text>
                <Text style={[
                  styles.tripTypeText,
                  { color: selectedTripTypes.includes(type.id) ? 'white' : colors.text }
                ]}>
                  {type.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Tarih Seçin
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.calendarContainer}>
            <View style={styles.calendarGrid}>
              {generateCalendarDays().map((date, index) => {
                const dateStr = formatDate(date);
                const isSelected = dateStr === startDate || dateStr === endDate;
                const isInRange = startDate && endDate && 
                  date >= new Date(startDate.split('.').reverse().join('-')) && 
                  date <= new Date(endDate.split('.').reverse().join('-'));
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      { 
                        backgroundColor: isSelected 
                          ? colors.primary 
                          : isInRange 
                            ? colors.surface 
                            : colors.cardBackground,
                        borderColor: colors.surface,
                      }
                    ]}
                    onPress={() => handleDateSelect(date)}
                  >
                    <Text style={[
                      styles.calendarDayText,
                      { color: isSelected ? 'white' : colors.text }
                    ]}>
                      {date.getDate()}
                    </Text>
                    <Text style={[
                      styles.calendarMonthText,
                      { color: isSelected ? 'white' : colors.secondaryText }
                    ]}>
                      {date.toLocaleDateString('tr-TR', { month: 'short' })}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          
          {/* Confirm Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                { 
                  backgroundColor: startDate && endDate ? colors.primary : colors.surface,
                  opacity: startDate && endDate ? 1 : 0.5,
                }
              ]}
              onPress={() => {
                if (startDate && endDate) {
                  setShowCalendar(false);
                }
              }}
              disabled={!startDate || !endDate}
            >
              <Text style={[
                styles.confirmButtonText,
                { color: startDate && endDate ? 'white' : colors.secondaryText }
              ]}>
                Tamam
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

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
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownIcon: {
    transform: [{ rotate: '0deg' }],
  },
  dropdownIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdown: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownOptionText: {
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
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
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
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 20,
  },
  calendarDay: {
    width: '13%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  calendarDayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarMonthText: {
    fontSize: 10,
    marginTop: 2,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});