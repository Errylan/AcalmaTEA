import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Importe as 4 telas que você quer nas abas
import HomeScreen from '../screens/HomeScreen';
import MoodDiaryScreen from '../screens/MoodDiaryScreen';
import RewardsScreen from '../screens/RewardsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets(); // Pega o espaçamento seguro

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtleText,
        // 1. Mostrar os textos (labels)
        tabBarShowLabel: true,
        // 2. Estilo para os textos
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho de letra bom para abas
          marginBottom: 5, // Desce um pouco o texto
        },

        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.borderColor,
          // Altura da barra + o espaço seguro da barra de gestos
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          // Removemos o paddingTop para dar espaço ao texto
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          // 3. Ícones um pouco menores para caber com o texto
          let iconSize = 24;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MoodDiaryTab') {
            iconName = focused ? 'happy' : 'happy-outline';
          } else if (route.name === 'RewardsTab') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      {/* 4. Usar 'tabBarLabel' para definir os nomes curtos */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: t('tab_home') }}
      />
      <Tab.Screen
        name="MoodDiaryTab"
        component={MoodDiaryScreen}
        options={{ tabBarLabel: t('tab_diary') }}
      />
      <Tab.Screen
        name="RewardsTab"
        component={RewardsScreen}
        options={{ tabBarLabel: t('tab_rewards') }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: t('tab_settings') }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;