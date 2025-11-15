import React, { useState, useCallback, useMemo } from 'react';
// 1. IMPORTAR O 'SafeAreaView' E O 'ScrollView'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockMotivation, mockBible } from '../constants/data';
import{ SafeAreaView } from 'react-native-safe-area-context';

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
    // 2. USAR O 'SafeAreaView' COMO CONTAINER PRINCIPAL
    <SafeAreaView style={style.container}>
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

      {/* Este View faz o cartão crescer e empurrar o botão para baixo */}
      <View style={style.contentContainer}>
        <View style={[style.card, { backgroundColor: theme.accent }]}>
          {/* 3. ADICIONAR O 'ScrollView' AQUI DENTRO DO CARTÃO */}
          <ScrollView contentContainerStyle={style.cardScrollView}>
            <Text key={currentLanguage + currentItem} style={style.cardText}>
              {t(currentItem)}
            </Text>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity style={style.nextButton} onPress={showNext}>
        {/* Seta corrigida */}
        <Text style={style.nextButtonText}>{t('next')} ❯</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// 4. ESTILOS ATUALIZADOS
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1, // <--- Essencial
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingTop: 20,
    // Reduzido para dar espaço ao Poti na parte de baixo
    paddingBottom: 20, 
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
    flex: 1, // <--- Faz este container crescer e ocupar o espaço
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, 
  },
  card: {
    width: '100%',
    // O cartão vai crescer, mas limitamos a altura máxima
    maxHeight: height * 0.5, 
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // O padding foi movido para o ScrollView
  },
  // NOVO: Estilo para o ScrollView de dentro do cartão
  cardScrollView: {
    flexGrow: 1, // Garante que o scroll preenche
    padding: 25, // O padding do cartão está aqui
    justifyContent: 'center', // Centraliza textos curtos
  },
  cardText: {
    fontSize: 22,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '500',
  },
  nextButton: {
    alignSelf: 'flex-end', // <--- Manda o botão para a DIREITA
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: theme.card,
    // Esta margem "sobe" o botão, deixando espaço para o Poti
    marginBottom: 90, 
  },
  nextButtonText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComfortScreen;