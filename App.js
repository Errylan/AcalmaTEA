import React, { useState, useRef } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native'; 
import { ThemeProvider, useTheme } from './context/ThemeContext';
// 1. Importar o hook 'useTranslation'
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

const Drawer = createDrawerNavigator();

const getActiveRouteName = (state) => {
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

const AppContent = () => {
  const { theme } = useTheme();
  // 2. Inicializar o hook 't'
  const { t } = useTranslation(); 
  const [routeName, setRouteName] = useState('Home');
  const navigationRef = useNavigationContainerRef();

  return (
    <View style={styles.container}>
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
          
          {/* 3. Mudar todas as chamadas de 'i18n.t(...)' para apenas 't(...)' */}
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: t('app_title_home') }} />
          <Drawer.Screen name="Expressions" component={ExpressionsScreen} options={{ title: t('app_title_expressions') }} />
          <Drawer.Screen name="Comfort" component={ComfortScreen} options={{ title: t('app_title_comfort') }} />
          <Drawer.Screen name="SocialSkills" component={SocialSkillsNavigator} options={{ title: t('app_title_social_nav') }} />
          <Drawer.Screen name="Regulation" component={RegulationScreen} options={{ title: t('app_title_regulation') }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: t('app_title_settings') }} />
        </Drawer.Navigator>
      </NavigationContainer>
      
      <PotiAssistant activeScreen={routeName} />
    </View>
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