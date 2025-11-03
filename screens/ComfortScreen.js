import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockMotivation, mockBible } from '../constants/data';

const { height } = Dimensions.get('window');

const getRandomItem = (arr = []) => arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : '';

const ComfortScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  const [tab, setTab] = useState('motivation');
  const [currentItem, setCurrentItem] = useState(getRandomItem(mockMotivation));

  const showNext = useCallback(() => {
    if (tab === 'motivation') {
      setCurrentItem(getRandomItem(mockMotivation));
    } else {
      setCurrentItem(getRandomItem(mockBible));
    }
  }, [tab]);

  const selectTab = (selectedTab) => {
    setTab(selectedTab);
    if (selectedTab === 'motivation') {
      setCurrentItem(getRandomItem(mockMotivation));
    } else {
      setCurrentItem(getRandomItem(mockBible));
    }
  };

  return (
    <View style={style.container}>
      <View style={style.tabContainer}>
        <TouchableOpacity
          style={[style.tab, tab === 'motivation' && style.tabActive]}
          onPress={() => selectTab('motivation')}>
          <Text style={[style.tabText, tab === 'motivation' && style.tabTextActive]}>
            {t('motivation')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.tab, tab === 'bible' && style.tabActive]}
          onPress={() => selectTab('bible')}>
          <Text style={[style.tabText, tab === 'bible' && style.tabTextActive]}>
            {t('bible')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={style.contentContainer}>
        <View style={[style.card, { backgroundColor: theme.accent }]}>
          <Text style={style.cardText}>{currentItem}</Text>
        </View>
      </View>

      <TouchableOpacity style={style.nextButton} onPress={showNext}>
        <Text style={style.nextButtonText}>{t('next')} ❯</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'space-between',
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: theme.card,
    marginHorizontal: 5,
  },
  tabActive: {
    backgroundColor: theme.primary,
  },
  tabText: {
    color: theme.text,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    minHeight: height * 0.4,
    borderRadius: 20,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 22,
    color: '#333333', // Texto escuro no cartão amarelo
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '500',
  },
  nextButton: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: theme.card,
  },
  nextButtonText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComfortScreen;