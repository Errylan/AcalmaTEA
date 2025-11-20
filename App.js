// App.js

import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UserDataProvider } from './context/UserDataContext';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './services/i18n';
import { StatusBar } from 'expo-status-bar';
// REMOVIDO: import * as NavigationBar from 'expo-navigation-bar';

import MainTabNavigator from './navigation/MainTabNavigator';

// Importar TODAS as telas da gaveta
import ExpressionsScreen from './screens/ExpressionsScreen';
import ComfortScreen from './screens/ComfortScreen';
import RegulationScreen from './screens/RegulationScreen';
import SocialSkillsNavigator from './navigation/SocialSkillsNavigator';
import MoodDiaryScreen from './screens/MoodDiaryScreen';
import RewardsScreen from './screens/RewardsScreen';
import SettingsScreen from './screens/SettingsScreen';

import PotiAssistant from './components/PotiAssistant';
import 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const getActiveRouteName = (state) => {
  if (!state) {
    return 'Home';
  }
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

const AppContent = () => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [routeName, setRouteName] = useState('Home');
  const navigationRef = useNavigationContainerRef();

  // REMOVIDO: O useEffect que chamava 'NavigationBar' foi removido
  // para acabar com o WARN.

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        translucent={true}
        backgroundColor="transparent"
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          setRouteName(getActiveRouteName(navigationRef.current.getRootState()));
        }}
        onStateChange={(state) => {
          const newRouteName = getActiveRouteName(state);
          setRouteName(newRouteName);
        }}
      >
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: { backgroundColor: theme.card },
            drawerActiveTintColor: theme.primary,
            drawerInactiveTintColor: theme.text,
            headerStyle: { backgroundColor: theme.primary },
            headerTintColor: '#FFFFFF',
          }}>

          {/* 1. Tela "Home" aponta para o seu NAVEGADOR DE ABAS */}
          <Drawer.Screen
            name="Home"
            component={MainTabNavigator}
            options={{ title: t('app_title_home') }}
          />

          {/* 2. ADICIONADAS DE VOLTA (como você pediu) */}
          <Drawer.Screen
            name="MoodDiary"
            component={MoodDiaryScreen}
            options={{ title: t('app_title_mood_diary') }}
          />
          <Drawer.Screen
            name="Rewards"
            component={RewardsScreen}
            options={{ title: t('app_title_rewards') }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: t('app_title_settings') }}
          />

          {/* 3. O resto das telas */}
          <Drawer.Screen name="Expressions" component={ExpressionsScreen} options={{ title: t('app_title_expressions') }} />
          <Drawer.Screen name="Comfort" component={ComfortScreen} options={{ title: t('app_title_comfort') }} />
          <Drawer.Screen name="SocialSkills" component={SocialSkillsNavigator} options={{ title: t('app_title_social_nav') }} />
          <Drawer.Screen name="Regulation" component={RegulationScreen} options={{ title: t('app_title_regulation') }} />

        </Drawer.Navigator>
      </NavigationContainer>

      <PotiAssistant activeScreen={routeName} />
    </View>
  );
};

// ... (Resto do componente App, SplashScreen, Onboarding, etc. não muda) ...
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('hasOnboarded');
        if (value !== null) {
          setHasOnboarded(true);
        }
      } catch (e) {
        console.log('Failed to load onboarding status.', e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      }
    };
    checkOnboarding();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasOnboarded', 'true');
      setHasOnboarded(true);
    } catch (e) {
      console.log('Failed to save onboarding status.', e);
    }
  };

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <UserDataProvider>
            {isLoading ? (
              <SplashScreen />
            ) : !hasOnboarded ? (
              <OnboardingScreen onComplete={handleOnboardingComplete} />
            ) : (
              <AppContent />
            )}
          </UserDataProvider>
        </ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;