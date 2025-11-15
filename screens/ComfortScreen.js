// screens/ComfortScreen.js
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. IMPORTAR O useNetInfo E OS DADOS LOCAIS
import { useNetInfo } from '@react-native-community/netinfo';
import { mockMotivation, mockBible } from '../constants/data';
import i18nInstance from '../services/i18n';

// 2. DEFINIR O URL DA API E AS CHAVES DO CACHE
const API_URL = 'https://acalmatea-api.vercel.app/api/comfort'; // MUDE PARA O SEU URL
const CACHE_KEY_MOTIVATION = 'cached_comfort_motivation_';
const CACHE_KEY_BIBLE = 'cached_comfort_bible_';

// 3. FUNÇÃO PARA PROCESSAR OS DADOS "DE FÁBRICA" (OFFLINE)
const getFactoryData = (keys, lang) => {
  const translations = i18nInstance.getResourceBundle(lang, 'translation');
  if (!translations) return [];
  
  return keys.map(key => translations[key] || `[${key}]`);
};

const { height } = Dimensions.get('window');
const getRandomItem = (arr = []) => arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : '';

const ComfortScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);

  const [isLoading, setIsLoading] = useState(true);
  const [motivationItems, setMotivationItems] = useState([]);
  const [bibleItems, setBibleItems] = useState([]);
  const [tab, setTab] = useState('motivation');
  const [currentItem, setCurrentItem] = useState('');

  // 4. CHAMAR O HOOK useNetInfo
  const netInfo = useNetInfo();
  const currentLang = i18n.language;

  // 5. FUNÇÃO "OFFLINE-FIRST" PARA CARREGAR OS DADOS
  useEffect(() => {
    const loadAndCacheData = async (type, dataKeys, cacheKeyBase, setter) => {
      const cacheKey = `${cacheKeyBase}${currentLang}`;
      let initialData = [];

      // 1. Tentar carregar do Cache
      try {
        const cachedDataString = await AsyncStorage.getItem(cacheKey);
        if (cachedDataString) {
          initialData = JSON.parse(cachedDataString);
        }
      } catch (e) { console.error(`Erro ao ler cache de ${type}:`, e); }

      // 2. Se falhar, usar dados de fábrica
      if (initialData.length === 0) {
        initialData = getFactoryData(dataKeys, currentLang);
      }
      
      // 3. Mostrar dados offline
      setter(initialData);

      // 4. Tentar atualizar em segundo plano SÓ SE ESTIVER ONLINE
      if (netInfo.isConnected === false) {
        console.log(`(Comfort) Rede offline. Não vou buscar atualizações de ${type}.`);
        return; // Sai da função
      }

      try {
        console.log(`(Comfort) Rede online. Tentando buscar atualizações de ${type}...`);
        const response = await fetch(`${API_URL}?lang=${currentLang}&type=${type}`);
        if (!response.ok) throw new Error('Falha na rede');
        
        const newData = await response.json();
        
        if (JSON.stringify(newData) !== JSON.stringify(initialData)) {
          // ADICIONE ESTE CONSOLE.LOG
          console.log(`(Comfort) Novos dados de ${type} encontrados! Atualizando...`);
          setter(newData); 
          await AsyncStorage.setItem(cacheKey, JSON.stringify(newData));
        } else {
          // E ADICIONE ESTA LINHA QUE FALTAVA
          console.log(`(Comfort) Dados de ${type} já estão atualizados.`);
        }
      } catch (e) {
        console.log(`Não foi possível buscar atualizações de ${type}.`);
      }
    };

    const loadAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadAndCacheData('motivation', mockMotivation, CACHE_KEY_MOTIVATION, setMotivationItems),
        loadAndCacheData('bible', mockBible, CACHE_KEY_BIBLE, setBibleItems)
      ]);
      setIsLoading(false);
    };

    // 6. ADICIONAR netInfo.isConnected ao array de dependências
    // Agora, isto corre quando o idioma muda OU quando a rede muda de offline para online
    loadAllData();
  }, [currentLang, netInfo.isConnected]); 

  // dataMap agora usa os estados
  const dataMap = useMemo(() => ({
    motivation: motivationItems,
    bible: bibleItems,
  }), [motivationItems, bibleItems]);

  // Iniciar o primeiro item quando os dados estiverem prontos
  useEffect(() => {
    if (!isLoading) {
      setCurrentItem(getRandomItem(dataMap[tab]));
    }
  }, [isLoading, dataMap, tab]);

  // Funções de 'showNext' e 'selectTab'
  const showNext = useCallback(() => {
    setCurrentItem(getRandomItem(dataMap[tab]));
  }, [tab, dataMap]);

  const selectTab = (selectedTab) => {
    setTab(selectedTab);
    setCurrentItem(getRandomItem(dataMap[selectedTab]));
  };

  return (
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

      <View style={style.contentContainer}>
        <View style={[style.card, { backgroundColor: theme.accent }]}>
          <ScrollView contentContainerStyle={style.cardScrollView}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#333333" />
            ) : (
              // 7. CORREÇÃO: 'currentItem' já está traduzido
              // Usamos 'currentLang' na key para forçar o refresh quando o idioma muda
              <Text key={currentLang + currentItem} style={style.cardText}>
                {currentItem}
              </Text>
            )}
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity style={style.nextButton} onPress={showNext} disabled={isLoading}>
        <Text style={style.nextButtonText}>{t('next')} ❯</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// ... (Cole os seus estilos originais aqui)
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, 
  },
  card: {
    width: '100%',
    maxHeight: height * 0.5, 
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardScrollView: {
    flexGrow: 1,
    padding: 25,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 22,
    color: '#333333',
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
    marginBottom: 90, 
  },
  nextButtonText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComfortScreen;