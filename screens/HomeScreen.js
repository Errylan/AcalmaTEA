// screens/HomeScreen.js
import React, { useState, useMemo } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  View
} from 'react-native';
// 1. Importar o SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = useMemo(() => [
    { title: t('expressions'), screen: 'Expressions' },
    { title: t('find_comfort'), screen: 'Comfort' },
    { title: t('social_skills'), screen: 'SocialSkills' },
    { title: t('regulations'), screen: 'Regulation' },
  ], [t]); 

  const filteredMenuItems = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    if (!lowerQuery) {
      return menuItems;
    }
    return menuItems.filter(item =>
      item.title.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, menuItems]);

  return (
    // 2. Substituir <View> por <SafeAreaView>
    <SafeAreaView style={style.container}>
      <ScrollView 
        contentContainerStyle={style.scrollContent}
        keyboardShouldPersistTaps="handled" 
      >
        <View style={style.header}>
          <Image source={require('../assets/logo.png')} style={style.logo} />
          <Text style={style.title}>{t('welcome_message')}</Text>
          <Text style={style.subtitle}>{t('main_menu')}</Text>
        </View>

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
            <Text style={style.noResultsText}>
              {t('home_search_no_results', { query: searchQuery })}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1, // <--- Esta linha é importante
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: theme.subtleText,
    marginTop: 8,
  },
  searchBar: {
    width: '100%',
    backgroundColor: theme.card,
    color: theme.text,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    backgroundColor: theme.card,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 16,
    color: theme.primary,
  },
  noResultsText: {
    color: theme.subtleText,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomeScreen;