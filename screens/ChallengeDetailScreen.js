// screens/ChallengeDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ChallengeDetailScreen = ({ route }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  const { challenge } = route.params;

  return (
    <ScrollView style={style.container}>
      <View style={[style.card, { backgroundColor: theme.accent }]}>
        <Text style={style.title}>{t('challenge_title')}</Text>
        <Text style={style.subtitle}>{challenge.title}</Text>

        <View style={style.divider} />

        <Text style={style.label}>{t('objective')}:</Text>
        <Text style={style.text}>{challenge.objective}</Text>

        <View style={style.divider} />

        <Text style={style.label}>{t('instructions')}:</Text>
        {challenge.steps.map((step, index) => (
          <Text key={index} style={style.stepText}>
            {/* Atualizado para usar tradução com variável */}
            <Text style={{fontWeight: 'bold'}}>{t('challenge_step', { num: index + 1 })}</Text>{step}
          </Text>
        ))}

        {challenge.extra && (
          <>
            <View style={style.divider} />
            <Text style={style.label}>{t('extra_tip')}:</Text>
            <Text style={style.text}>{challenge.extra}</Text>
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