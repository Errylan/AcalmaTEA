import React, { useState, useMemo, useEffect } from 'react';
import {
  Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

const API_DAILY_URL = 'https://acalmatea-api.vercel.app/api/daily'; // <--- SEU URL
const DAILY_CACHE_KEY = 'cached_daily_highlight';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyHighlight, setDailyHighlight] = useState(null);
  const netInfo = useNetInfo();
  const currentLang = i18n.language;

  // Carregar Destaque
  useEffect(() => {
    const loadDaily = async () => {
      try {
        const cached = await AsyncStorage.getItem(DAILY_CACHE_KEY);
        if (cached) setDailyHighlight(JSON.parse(cached));
      } catch (e) {}

      if (netInfo.isConnected === false) return;

      try {
        const response = await fetch(`${API_DAILY_URL}?lang=${currentLang}`);
        const newData = await response.json();
        setDailyHighlight(newData);
        await AsyncStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(newData));
      } catch (e) { console.log('Erro Daily API'); }
    };
    loadDaily();
  }, [currentLang, netInfo.isConnected]);

  const menuItems = useMemo(() => [
    { title: t('expressions'), screen: 'Expressions' },
    { title: t('find_comfort'), screen: 'Comfort' },
    { title: t('social_skills'), screen: 'SocialSkills' },
    { title: t('regulations'), screen: 'Regulation' },
  ], [t]); 

  const filteredMenuItems = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    if (!lowerQuery) return menuItems;
    return menuItems.filter(item => item.title.toLowerCase().includes(lowerQuery));
  }, [searchQuery, menuItems]);

  return (
    <View style={style.container}>
      <ScrollView 
        contentContainerStyle={style.scrollContent}
        keyboardShouldPersistTaps="handled" 
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.primary }} 
      >
        <View style={style.blueHeader}>
          <SafeAreaView edges={['top']}>
            <View style={style.headerContainer}>
              <View style={style.topRow}>
                  <Image source={require('../assets/logo.png')} style={style.logo} />
              </View>
              <Text style={style.welcomeText}>{t('welcome_message')}</Text>
              <Text style={style.subtitle}>{t('main_menu')}</Text>
            </View>
          </SafeAreaView>
        </View>

        <View style={style.mainCardSection}>
          <View style={style.mainCard}>
            
            {/* --- DESTAQUE DO DIA --- */}
            {dailyHighlight && (
              <View style={[
                style.dailyCard,
                dailyHighlight.type === 'event' && { borderLeftColor: '#FFD700', backgroundColor: theme.card === '#FFFFFF' ? '#FFFDE7' : '#423e2c' } 
              ]}>
                <View style={style.dailyHeader}>
                  <Ionicons 
                    name={dailyHighlight.type === 'event' ? "calendar" : "sparkles"} 
                    size={16} 
                    color={dailyHighlight.type === 'event' ? "#FFD700" : theme.primary} 
                  />
                  <Text style={[
                    style.dailyLabel,
                    dailyHighlight.type === 'event' && { color: '#FFD700' }
                  ]}>
                    {dailyHighlight.type === 'event' 
                      ? (t('home_daily_event_advice') || "Data Especial Ou Conselho do Dia")
                      : (t('home_daily_highlight') || "Destaque do Dia")
                    }
                  </Text>
                </View>
                <Text style={style.dailyText}>
                  {dailyHighlight.type === 'event' ? dailyHighlight.text : `"${dailyHighlight.text}"`}
                </Text>
              </View>
            )}

            <TextInput
              style={style.searchBar}
              placeholder={t('home_search_placeholder')}
              placeholderTextColor={theme.subtleText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <View style={style.menuContainer}>
              {filteredMenuItems.map((item) => (
                <TouchableOpacity
                  key={item.screen}
                  style={style.menuItem}
                  onPress={() => {
                    setSearchQuery(''); 
                    navigation.navigate(item.screen)
                  }}
                >
                  <Text style={style.menuText}>{item.title}</Text>
                  <Text style={style.menuArrow}>❯</Text>
                </TouchableOpacity>
              ))}
              {filteredMenuItems.length === 0 && (
                <Text style={style.noResultsText}>{t('home_search_no_results', { query: searchQuery })}</Text>
              )}
            </View>
          </View>
          <View style={{ height: 140 }} /> 
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  scrollContent: { paddingBottom: 0, backgroundColor: theme.background },
  blueHeader: { backgroundColor: theme.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: 60 },
  headerContainer: { alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 10 },
  topRow: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15, position: 'relative' },
  logo: { width: 130, height: 130, resizeMode: 'contain', borderRadius: 30, backgroundColor: 'white', borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  settingsButton: { position: 'absolute', right: 0, top: 10 },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  mainCardSection: { backgroundColor: theme.background, flex: 1 },
  mainCard: { backgroundColor: theme.card, borderRadius: 20, padding: 20, marginHorizontal: 20, marginTop: -40, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  
  // Estilos do Destaque
  dailyCard: { backgroundColor: theme.card, padding: 15, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: theme.primary, borderWidth: 1, borderColor: theme.borderColor },
  dailyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dailyLabel: { fontSize: 12, fontWeight: 'bold', color: theme.primary, marginLeft: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  dailyText: { fontSize: 15, color: theme.text, fontStyle: 'italic', lineHeight: 22 },

  searchBar: { width: '100%', backgroundColor: theme.background, color: theme.text, padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: theme.borderColor },
  menuContainer: { width: '100%' },
  menuItem: { backgroundColor: theme.background, paddingVertical: 18, paddingHorizontal: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'transparent' },
  menuText: { fontSize: 16, color: theme.text, fontWeight: '600' },
  menuArrow: { fontSize: 18, color: theme.primary, fontWeight: 'bold' },
  noResultsText: { color: theme.subtleText, textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default HomeScreen;