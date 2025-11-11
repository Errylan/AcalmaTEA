// App.js

import React, { useState, useRef, useEffect } from 'react'; 
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; 
import { ThemeProvider, useTheme } from './context/ThemeContext';
// --- MUDANÇA: Importar o UserDataProvider ---
import { UserDataProvider } from './context/UserDataContext';
// --- FIM DA MUDANÇA ---
import { I18nextProvider, useTranslation } from 'react-i18next'; 
import i18n from './services/i18n';
import HomeScreen from './screens/HomeScreen';
import ExpressionsScreen from './screens/ExpressionsScreen';
import ComfortScreen from './screens/ComfortScreen';
import RegulationScreen from './screens/RegulationScreen';
import SettingsScreen from './screens/SettingsScreen';
import SocialSkillsNavigator from './navigation/SocialSkillsNavigator';
import PotiAssistant from './components/PotiAssistant';
import 'react-native-gesture-handler'; 

// --- MUDANÇA: IMPORTAR O QUE PRECISAMOS ---
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen'; // Importar Onboarding
import RewardsScreen from './screens/RewardsScreen'; // Importar Recompensas
import MoodDiaryScreen from './screens/MoodDiaryScreen'; // <<< IMPORTAR DIÁRIO DE HUMOR
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
// --- FIM DA MUDANÇA ---

const Drawer = createDrawerNavigator();

const getActiveRouteName = (state) => {
  // ... (código existente sem alteração)
  if (!state) {
    return 'Home'; // Padrão
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

// --- O SEU AppContent (O APP PRINCIPAL) FICA INTOCADO ---
const AppContent = () => {
  const { theme } = useTheme();
  const { t } = useTranslation(); 
  const [routeName, setRouteName] = useState('Home');
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      edges={['top', 'left', 'right']}
    > 
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
          
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: t('app_title_home') }} />
          
          {/* --- MUDANÇA: TELA DE DIÁRIO DE HUMOR ADICIONADA --- */}
          <Drawer.Screen 
            name="MoodDiary" 
            component={MoodDiaryScreen} 
            options={{ title: t('app_title_mood_diary') }} // Nova chave de tradução
          />
          {/* --- FIM DA MUDANÇA --- */}

          <Drawer.Screen name="Expressions" component={ExpressionsScreen} options={{ title: t('app_title_expressions') }} />
          <Drawer.Screen name="Comfort" component={ComfortScreen} options={{ title: t('app_title_comfort') }} />
          <Drawer.Screen name="SocialSkills" component={SocialSkillsNavigator} options={{ title: t('app_title_social_nav') }} />
          <Drawer.Screen name="Regulation" component={RegulationScreen} options={{ title: t('app_title_regulation') }} />
          
          <Drawer.Screen 
            name="Rewards" 
            component={RewardsScreen} 
            options={{ title: t('app_title_rewards') }} 
          />
          
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: t('app_title_settings') }} />
        </Drawer.Navigator>
      </NavigationContainer>
      
      <PotiAssistant activeScreen={routeName} />
    </SafeAreaView> 
  );
};

// --- O App FOI MODIFICADO PARA CONTROLAR O SPLASH E ONBOARDING ---
const App = () => {
  // ... (toda a sua lógica de isLoading/hasOnboarded continua a mesma)
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
  // ... (fim da lógica que não mudou)

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