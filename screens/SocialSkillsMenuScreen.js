// screens/SocialSkillsMenuScreen.js
import React, { useState, useEffect, useMemo } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. IMPORTAR DADOS LOCAIS E NETINFO
import { useNetInfo } from '@react-native-community/netinfo';
import { mockChallenges } from '../constants/data';
import i18nInstance from '../services/i18n';

// 2. DEFINIR API E CACHE
const API_URL = 'https://acalmatea-api.vercel.app/api/categories'; // MUDE PARA O SEU URL
const CACHE_KEY_PREFIX = 'cached_categories_';

// 3. MAPA DE CATEGORIAS (PARA OS DADOS DE FÁBRICA)
// Este mapa é usado para traduzir os dados locais se a API falhar
const factoryCategoryKeyMap = {
  basic: 'social_basic',
  communication: 'social_communication',
  understanding: 'social_understanding',
  group: 'social_group',
  conflict: 'social_conflict',
  // Se você adicionou 'work' no data.js local, adicione aqui também
  // work: 'social_work', 
};

// 4. FUNÇÃO DE DADOS "DE FÁBRICA" (OFFLINE)
const getFactoryData = (lang) => {
  const translations = i18nInstance.getResourceBundle(lang, 'translation');
  if (!translations) return [];

  const t = (key) => translations[key] || `[${key}]`;
  const categoryKeys = Object.keys(mockChallenges || {});

  return categoryKeys.map(key => ({
    key: key,
    title: t(factoryCategoryKeyMap[key] || key),
  }));
};

// --- Ecrã Principal ---
const SocialSkillsMenuScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);

  // 5. ESTADOS PARA OS DADOS
  const [isLoading, setIsLoading] = useState(true);
  // O 'categories' guarda APENAS as categorias dinâmicas
  const [categories, setCategories] = useState([]);

  const netInfo = useNetInfo(); // Hook do NetInfo
  const currentLang = i18n.language;
  const CACHE_KEY = `${CACHE_KEY_PREFIX}${currentLang}`;

  // 6. LÓGICA "OFFLINE-FIRST"
  useEffect(() => {
    const loadData = async () => {
      let initialData = [];
      setIsLoading(true);

      // 1. Tentar Cache
      try {
        const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedDataString) {
          initialData = JSON.parse(cachedDataString);
        }
      } catch (e) { console.error("Erro ao ler cache de categorias:", e); }

      // 2. Se falhar, usar dados de fábrica
      if (initialData.length === 0) {
        initialData = getFactoryData(currentLang);
      }

      // 3. Mostrar dados offline
      setCategories(initialData);
      setIsLoading(false);

      // 4. Tentar atualizar em segundo plano
      if (netInfo.isConnected === false) {
        console.log("(Categories) Rede offline. Não vou buscar atualizações.");
        return;
      }

      try {
        console.log("(Categories) Rede online. Tentando buscar atualizações...");
        const response = await fetch(`${API_URL}?lang=${currentLang}`);
        if (!response.ok) throw new Error('Falha na rede');
        
        const newData = await response.json();
        
        if (JSON.stringify(newData) !== JSON.stringify(initialData)) {
          console.log("(Categories) Novas categorias encontradas! Atualizando...");
          setCategories(newData);
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        } else {
          console.log("(Categories) Categorias já estão atualizadas.");
        }
      } catch (e) {
        console.log("Não foi possível buscar atualizações de categorias.", e);
      }
    };

    loadData();
  }, [currentLang, CACHE_KEY, netInfo.isConnected]);

  // 7. useMemo PARA ADICIONAR O BOTÃO "FAVORITOS"
  // O FlatList vai usar este 'menuData'
  const menuData = useMemo(() => {
    const favoritesButton = {
      key: 'favorites', 
      title: t('social_favorites'), // O 't' aqui funciona bem
    };
    // Adiciona o botão estático "Favoritos" no início da lista de categorias dinâmicas
    return [favoritesButton, ...categories];
  }, [categories, t]); // Depende do 'categories' do estado e do 't' para a tradução

  // 8. RENDER ITEM (Não muda)
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={style.menuItem}
      onPress={() => navigation.navigate('ChallengeList', { 
        categoryKey: item.key, 
        title: item.title 
      })}
    >
      <Text style={style.menuText}>{item.title}</Text>
      <Text style={style.menuArrow}>❯</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={menuData} // Usa os dados do useMemo
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={style.list}
        />
      )}
    </SafeAreaView>
  );
};

// ... (Cole os seus estilos originais aqui)
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: theme.background,
  },
  list: {
    padding: 10,
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
  },
  menuArrow: {
    fontSize: 16,
    color: theme.primary,
  },
});

export default SocialSkillsMenuScreen;