// screens/ExpressionsScreen.js
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  View, 
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. IMPORTAR O useNetInfo
import { useNetInfo } from '@react-native-community/netinfo';

// (Importações de dados locais, API_URL, CACHE_KEY_PREFIX, e getFactoryData)
// ... (tudo o que já tínhamos)
import { mockExpressions } from '../constants/data';
import i18nInstance from '../services/i18n';

const API_URL = 'https://acalmatea-api.vercel.app/api/expressions'; // Mude para o seu URL
const CACHE_KEY_PREFIX = 'cached_expressions_';

const getFactoryData = (lang) => {
  // ... (código da função getFactoryData)
  const translations = i18nInstance.getResourceBundle(lang, 'translation');
  if (!translations) {
    console.warn(`Traduções de fábrica não encontradas para: ${lang}`);
    return [];
  }
  return mockExpressions.map(item => ({
    id: item.termKey,
    term: translations[item.termKey] || '...',
    meaning: translations[item.meaningKey] || '...',
    example: translations[item.exampleKey] || '...',
  }));
};
// ... (fim do getFactoryData)


const ExpressionsScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(); 
  const style = styles(theme);
  const [search, setSearch] = useState('');
  
  const [isLoading, setIsLoading] = useState(true); 
  const [expressions, setExpressions] = useState([]);

  // 2. CHAMAR O HOOK useNetInfo
  const netInfo = useNetInfo();

  const currentLang = i18n.language;
  const CACHE_KEY = `${CACHE_KEY_PREFIX}${currentLang}`;

  useEffect(() => {
    const loadData = async () => {
      let initialData = [];
      setIsLoading(true);

      // (Passo 1: Tentar carregar do Cache)
      try {
        const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedDataString) {
          initialData = JSON.parse(cachedDataString);
        }
      } catch (e) { console.error("Erro ao ler o cache:", e); }

      // (Passo 2: Se o Cache falhar, usar dados de fábrica)
      if (initialData.length === 0) {
        initialData = getFactoryData(currentLang);
      }

      // (Passo 3: Mostrar dados offline)
      setExpressions(initialData);
      setIsLoading(false);

      // 4. VERIFICAR SE ESTAMOS OFFLINE
      // Se 'isConnected' for 'false' (sabemos que está offline), paramos aqui.
      // Se for 'true' (online) ou 'null' (ainda não sei), NÓS TENTAMOS.
      if (netInfo.isConnected === false) {
        console.log("Rede offline. Não vou buscar atualizações.");
        return; // Sai da função
      }
      
      // (Passo 5: Tentar atualizar em segundo plano)
      try {
        console.log("Rede online. Tentando buscar atualizações...");
        const response = await fetch(`${API_URL}?lang=${currentLang}`);
        if (!response.ok) throw new Error('Falha na rede');
        
        const newData = await response.json();
        
        if (JSON.stringify(newData) !== JSON.stringify(initialData)) {
          console.log("Novos dados encontrados! Atualizando...");
          setExpressions(newData); 
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData)); 
        } else {
          console.log("Dados já estão atualizados.");
        }
      } catch (e) {
        console.log("Não foi possível buscar atualizações. Usando dados offline.");
      }
    };

    loadData();
  
  // 3. ADICIONAR 'netInfo.isConnected' AO ARRAY DE DEPENDÊNCIAS
  }, [currentLang, CACHE_KEY, netInfo.isConnected]); 

  // ... (o resto do seu ficheiro: filteredData, renderItem, return, styles) ...
  // ... (não precisa de mudar mais nada)
  const filteredData = useMemo(() => {
    if (!search) return expressions;
    const lowerSearch = search.toLowerCase();
    
    return expressions.filter(
      (item) =>
        item.term.toLowerCase().includes(lowerSearch) ||
        item.meaning.toLowerCase().includes(lowerSearch)
    );
  }, [search, expressions]); 

  const renderItem = ({ item }) => (
    <View style={style.card}>
      <Text style={style.term}>{item.term}</Text>
      <Text style={style.meaning}>
        <Text style={style.label}>{t('expressions_meaning')}</Text>{item.meaning}
      </Text>
      <Text style={style.example}>
        <Text style={style.label}>{t('expressions_example')}</Text>{item.example}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={style.container}>
      <TextInput
        style={style.searchBar}
        placeholder={t('search_placeholder')}
        placeholderTextColor={theme.subtleText}
        value={search}
        onChangeText={setSearch}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={style.list}
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
  searchBar: {
    backgroundColor: theme.card,
    color: theme.text,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  term: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: theme.text,
  },
  meaning: {
    fontSize: 15,
    color: theme.subtleText,
    marginBottom: 5,
  },
  example: {
    fontSize: 15,
    color: theme.subtleText,
    fontStyle: 'italic',
  },
});

export default ExpressionsScreen;