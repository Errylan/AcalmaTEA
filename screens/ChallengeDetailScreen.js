// screens/ChallengeDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ChallengeDetailScreen = ({ route }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);
  const { challenge } = route.params;

  const langKey = i18n.language; 

  const title = challenge.titleKey ? t(challenge.titleKey) : challenge.title;
  const objective = challenge.objKey ? t(challenge.objKey) : challenge.objective;
  const steps = challenge.stepKeys 
    ? challenge.stepKeys.map(key => t(key)) 
    : challenge.steps; 
  const extra = challenge.extraKey ? t(challenge.extraKey) : challenge.extra;

  return (
    <ScrollView 
      style={style.container} 
      key={langKey + title}
      // ADICIONADO: Espaço no final para o Poti não cobrir o conteúdo
      contentContainerStyle={{ paddingBottom: 140 }} 
    >
      <View style={[style.card, { backgroundColor: theme.accent }]}>
        <Text style={style.title}>{t('challenge_title')}</Text>
        <Text style={style.subtitle}>{title}</Text>

        <View style={style.divider} />

        <Text style={style.label}>{t('objective')}:</Text>
        <Text style={style.text}>{objective}</Text>

        <View style={style.divider} />

        <Text style={style.label}>{t('instructions')}:</Text>
        {steps.map((step, index) => (
          <Text key={index} style={style.stepText}>
            <Text style={{fontWeight: 'bold'}}>{t('challenge_step', { num: index + 1 })}</Text>
            {step}
          </Text>
        ))}
        
        {extra && (
          <>
            <View style={style.divider} />
            <Text style={style.label}>{t('extra_tip')}:</Text>
            <Text style={style.text}>{extra}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333', 
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.2)',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#333', 
    lineHeight: 22,
  },
  stepText: {
    fontSize: 15,
    color: '#333', 
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default ChallengeDetailScreen;