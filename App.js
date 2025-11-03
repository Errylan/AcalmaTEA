import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './services/i18n'; // Importado i18n
import HomeScreen from './screens/HomeScreen';
import ExpressionsScreen from './screens/ExpressionsScreen';
import ComfortScreen from './screens/ComfortScreen';
import RegulationScreen from './screens/RegulationScreen';
import SettingsScreen from './screens/SettingsScreen';
import SocialSkillsNavigator from './navigation/SocialSkillsNavigator';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: theme.card },
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.text,
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: '#FFFFFF',
        }}>
        {/* Títulos agora usam i18n.t() */}
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: i18n.t('app_title_home') }} />
        <Drawer.Screen name="Expressions" component={ExpressionsScreen} options={{ title: i18n.t('app_title_expressions') }} />
        <Drawer.Screen name="Comfort" component={ComfortScreen} options={{ title: i18n.t('app_title_comfort') }} />
        <Drawer.Screen name="SocialSkills" component={SocialSkillsNavigator} options={{ title: i18n.t('app_title_social_nav') }} />
        <Drawer.Screen name="Regulation" component={RegulationScreen} options={{ title: i18n.t('app_title_regulation') }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: i18n.t('app_title_settings') }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;