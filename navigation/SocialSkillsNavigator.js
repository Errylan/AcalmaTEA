import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SocialSkillsMenuScreen from '../screens/SocialSkillsMenuScreen';
import ChallengeListScreen from '../screens/ChallengeListScreen';
import ChallengeDetailScreen from '../screens/ChallengeDetailScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator();

const SocialSkillsNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text },
      }}>
      <Stack.Screen 
        name="SocialSkillsMenu" 
        component={SocialSkillsMenuScreen} 
        options={{ title: 'Habilidades Sociais' }} 
      />
      <Stack.Screen
        name="ChallengeList"
        component={ChallengeListScreen}
        options={({ route }) => ({ title: route?.params?.title ?? 'Desafios' })}
      />
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        options={({ route }) => ({ title: route?.params?.challenge?.title ?? 'Detalhe' })}
      />
    </Stack.Navigator>
  );
};

export default SocialSkillsNavigator;