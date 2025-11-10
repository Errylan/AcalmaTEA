import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SocialSkillsMenuScreen from '../screens/SocialSkillsMenuScreen';
import ChallengeListScreen from '../screens/ChallengeListScreen';
import ChallengeDetailScreen from '../screens/ChallengeDetailScreen';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // 1. Importar o hook

const Stack = createStackNavigator();

const SocialSkillsNavigator = () => {
  const { theme } = useTheme();
  const { t } = useTranslation(); // 2. Inicializar o 't'

  return (
    <Stack.Navigator
      screenOptions={{
        // 3. Deixei o estilo do header consistente com o seu App.js
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: '#FFFFFF', // Cor do texto e da seta
        headerTitleStyle: { color: '#FFFFFF' },
      }}>
      <Stack.Screen 
        name="SocialSkillsMenu" 
        component={SocialSkillsMenuScreen} 
        // 4. Usar a chave de tradução
        options={{ title: t('app_title_social_menu') }} 
      />
      <Stack.Screen
        name="ChallengeList"
        component={ChallengeListScreen}
        // 5. Usar a chave de tradução para o fallback
        options={({ route }) => ({ 
          title: route?.params?.title ?? t('app_title_challenge_list') 
        })}
      />
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        // 6. Usar a chave de tradução
        options={{ title: t('app_title_challenge_detail') }}
      />
    </Stack.Navigator>
  );
};

export default SocialSkillsNavigator;