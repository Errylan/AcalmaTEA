// screens/ChallengeListScreen.js
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  View
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. IMPORTAR DADOS LOCAIS
import { mockChallenges } from '../constants/data';
import i18nInstance from '../services/i18n';

// 2. DEFINIR API E CACHE
const API_URL = 'https://acalmatea-api.vercel.app/api/challenges'; // MUDE PARA O SEU URL
const CACHE_KEY_PREFIX = 'cached_all_challenges_';

// 3. FUNÇÃO DE DADOS "DE FÁBRICA" (OFFLINE)
const getFactoryData = (lang) => {
  const translations = i18nInstance.getResourceBundle(lang, 'translation');
  if (!translations) return {};

  const t = (key) => translations[key] || '...';
  const allChallenges = {};

  for (const [category, challengesRaw] of Object.entries(mockChallenges)) {
    allChallenges[category] = challengesRaw.map(item => ({
      id: item.titleKey,
      title: t(item.titleKey),
      objective: t(item.objKey),
      steps: item.stepKeys.map(stepKey => t(stepKey)),
      extra: item.extraKey ? t(item.extraKey) : null,
      category: category,
    }));
  }
  return allChallenges;
};

// Componentes de Emojis e Lista Vazia (não mudam)
const STATUS_EMOJI = { 'easy': '😊', 'medium': '😐', 'hard': '😟' };

const EmptyList = ({ textKey, t }) => {
  const style = styles(useTheme().theme);
  return (
    <Text style={style.emptyText}>
      {t(textKey)}
    </Text>
  );
};


const ChallengeListScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);
  const { categoryKey } = route.params; // ex: "basic" ou "favorites"
  
  const { isFavorite, getChallengeCompletion } = useUser();
  
  // 4. ESTADOS PARA OS DADOS
  const [isLoading, setIsLoading] = useState(true);
  const [allChallenges, setAllChallenges] = useState({}); // Guarda { basic: [...], ... }

  const currentLang = i18n.language;
  const CACHE_KEY = `${CACHE_KEY_PREFIX}${currentLang}`;

  // 5. LÓGICA "OFFLINE-FIRST"
  useEffect(() => {
    const loadData = async () => {
      let initialData = {};
      setIsLoading(true);

      // 1. Tentar Cache
      try {
        const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedDataString) {
          initialData = JSON.parse(cachedDataString);
        }
      } catch (e) { console.error("Erro ao ler cache de desafios:", e); }

      // 2. Se falhar, usar dados de fábrica
      if (Object.keys(initialData).length === 0) {
        initialData = getFactoryData(currentLang);
      }

      // 3. Mostrar dados offline
      setAllChallenges(initialData);
      setIsLoading(false);

      // 4. Tentar atualizar em segundo plano
      try {
        const response = await fetch(`${API_URL}?lang=${currentLang}`);
        if (!response.ok) throw new Error('Falha na rede');
        
        const newData = await response.json();
        
        if (JSON.stringify(newData) !== JSON.stringify(initialData)) {
          setAllChallenges(newData);
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        }
      } catch (e) {
        console.log("Não foi possível buscar atualizações de desafios.");
      }
    };

    loadData();
  }, [currentLang, CACHE_KEY]);

  // 6. LÓGICA DE FILTRAGEM (useMemo)
  const challenges = useMemo(() => {
    const allItems = Object.values(allChallenges).flat(); // Junta todos os desafios num só array

    if (categoryKey === 'favorites') {
      // Filtra todos os itens que estão marcados como favoritos
      return allItems.filter(challenge => isFavorite(challenge.id));
    }
    
    // Se não for favoritos, filtra por categoria
    return allItems.filter(challenge => challenge.category === categoryKey);
    
  }, [categoryKey, isFavorite, allChallenges]);
  
  // 7. RENDER ITEM (Simplificado)
  const renderItem = ({ item }) => {
    const completionStatus = getChallengeCompletion(item.id); // Usa item.id

    return (
      <TouchableOpacity 
        style={style.menuItem}
        // Passa o 'item' JÁ TRADUZIDO para o ecrã de detalhe
        onPress={() => navigation.navigate('ChallengeDetail', { challenge: item })}
      >
        {/* Mostra o título já traduzido */}
        <Text style={style.menuText}>{item.title}</Text>
        
        {completionStatus ? (
          <Text style={style.emojiText}>{STATUS_EMOJI[completionStatus] || '✅'}</Text>
        ) : (
          <Text style={style.menuArrow}>❯</Text>
        )}
      </TouchableOpacity>
    );
  };

  // 8. RENDERIZAÇÃO FINAL (com Loading)
  return (
    <SafeAreaView style={style.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }}/>
      ) : (
        <FlatList
          data={challenges}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={style.list}
          ListEmptyComponent={
            <EmptyList 
              t={t}
              textKey={categoryKey === 'favorites' ? "favorites_empty_cha" : "favorites_empty_generic"} 
            />
          } 
        />
      )}
    </SafeAreaView>
  );
};


const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  list: {
    padding: 10,
    minHeight: '100%', 
    paddingBottom: 140, 
  },
  emptyText: {
    fontSize: 14,
    color: theme.subtleText,
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: theme.card,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
    flex: 1, 
  },
  menuArrow: {
    fontSize: 16,
    color: theme.primary,
  },
  emojiText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default ChallengeListScreen;