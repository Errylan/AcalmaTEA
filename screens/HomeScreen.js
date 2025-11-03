import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PotiAssistant from '../components/PotiAssistant';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  const menuItems = [
    { title: t('expressions'), screen: 'Expressions' },
    { title: t('find_comfort'), screen: 'Comfort' },
    { title: t('social_skills'), screen: 'SocialSkills' },
    { title: t('regulations'), screen: 'Regulation' },
  ];

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollContent}>
        <View style={style.header}>
          <Image source={require('../assets/logo.png')} style={style.logo} />
          <Text style={style.title}>{t('welcome_message')}</Text>
          <Text style={style.subtitle}>{t('main_menu')}</Text>
        </View>

        <View style={style.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.screen} 
              style={style.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={style.menuText}>{item.title}</Text>
              <Text style={style.menuArrow}>❯</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PotiAssistant />
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
});

export default HomeScreen;