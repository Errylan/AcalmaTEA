import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockMotivation, mockBible } from '../constants/data';

const { height } = Dimensions.get('window');

const getRandomItem = (arr = []) => arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : '';

const ComfortScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);

  const dataMap = useMemo(() => ({
    motivation: mockMotivation,
    bible: mockBible,
  }), []);

  const [tab, setTab] = useState('motivation');
  
  const [currentItem, setCurrentItem] = useState(() => getRandomItem(dataMap.motivation));

  const showNext = useCallback(() => {
    if (tab === 'motivation') {
      setCurrentItem(getRandomItem(dataMap.motivation));
    } else {
      setCurrentItem(getRandomItem(dataMap.bible));
    }
  }, [tab, dataMap]);

  const selectTab = (selectedTab) => {
    setTab(selectedTab);
    if (selectedTab === 'motivation') {
      setCurrentItem(getRandomItem(dataMap.motivation));
    } else {
      setCurrentItem(getRandomItem(dataMap.bible));
    }
  };

  const currentLanguage = i18n.language;

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
          <Text key={currentLanguage + currentItem} style={style.cardText}>
            {t(currentItem)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={style.nextButton} onPress={showNext}>
        {/* ALTERADO: Seta agora aponta para a esquerda */}
        <Text style={style.nextButtonText}>❮ {t('next')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120, 
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
    color: '#333333',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '500',
  },
  nextButton: {
    // ALTERADO: de 'flex-end' para 'flex-start'
    alignSelf: 'flex-start',
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