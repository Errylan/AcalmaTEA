// screens/RegulationScreen.js
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  View,
  ActivityIndicator // Importar ActivityIndicator
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. IMPORTAR O useNetInfo E OS DADOS LOCAIS
import { useNetInfo } from '@react-native-community/netinfo';
import { mockRegulations } from '../constants/data';
import i18nInstance from '../services/i18n';

// 2. DEFINIR O URL DA API E A CHAVE DO CACHE
const API_URL = 'https://acalmatea-api.vercel.app/api/regulations'; // MUDE PARA O SEU URL
const CACHE_KEY_PREFIX = 'cached_regulations_';

// 3. FUNÇÃO PARA PROCESSAR OS DADOS "DE FÁBRICA" (OFFLINE)
const getFactoryData = (lang) => {
  const translations = i18nInstance.getResourceBundle(lang, 'translation');
  if (!translations) return [];

  const t = (key) => translations[key] || `[${key}]`;

  return mockRegulations.map(item => {
    return {
      id: item.titleKey, // Usamos a titleKey como ID
      title: t(item.titleKey),
      description: t(item.descKey),
      steps: item.stepKeys.map(stepKey => t(stepKey)), // Traduz o array de passos
    };
  });
};

// --- Componente AccordionItem Atualizado ---
// Agora ele recebe os dados já traduzidos (item.title, item.description, etc.)
const AccordionItem = ({ item, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const style = styles(theme);
  const { isFavorite, toggleFavorite } = useUser();
  
  // Usamos item.id (que definimos como sendo a titleKey original) para o favorito
  const favorite = isFavorite(item.id); 

  return (
    <View style={style.card}> 
      <View style={style.cardHeader}>
        <TouchableOpacity 
          onPress={() => toggleFavorite(item.id)} // Usa o item.id
          style={style.starButton}
        >
          <Text style={style.starText}>{favorite ? '★' : '☆'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={style.titleContainer}>
          {/* Usa os dados diretos, sem o t() */}
          <Text style={style.cardTitle}>{item.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={style.cardToggle}>{expanded ? '−' : '+'}</Text>
        </TouchableOpacity>
      </View>

      {/* Usa os dados diretos, sem o t() */}
      <Text style={style.cardDescription}>{item.description}</Text>
      
      {expanded && (
        <View style={style.cardContent}>
          {/* O 'steps' já é um array de strings traduzidas */}
          {item.steps.map((step, index) => (
            <Text key={index} style={style.cardStep}>
              {step}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

// --- Ecrã Principal Atualizado ---
const RegulationScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);
  
  const { favorites } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [allRegulations, setAllRegulations] = useState([]);

  // 4. CHAMAR O HOOK useNetInfo
  const netInfo = useNetInfo();
  const currentLang = i18n.language;
  const CACHE_KEY = `${CACHE_KEY_PREFIX}${currentLang}`;

  // 5. LÓGICA PARA CARREGAR OS DADOS (OFFLINE-FIRST)
  useEffect(() => {
    const loadData = async () => {
      let initialData = [];
      setIsLoading(true);

      // 1. Tentar carregar do Cache
      try {
        const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedDataString) {
          initialData = JSON.parse(cachedDataString);
        }
      } catch (e) {
        console.error("Erro ao ler cache de regulações:", e);
      }

      // 2. Se falhar, usar dados de fábrica
      if (initialData.length === 0) {
        initialData = getFactoryData(currentLang);
      }

      // 3. Mostrar dados offline
      setAllRegulations(initialData);
      setIsLoading(false);

      // 4. Tentar atualizar em segundo plano
      if (netInfo.isConnected === false) {
        console.log("(Regulations) Rede offline. Não vou buscar atualizações.");
        return; // Sai da função
      }

      try {
        console.log("(Regulations) Rede online. Tentando buscar atualizações...");
        const response = await fetch(`${API_URL}?lang=${currentLang}`);
        if (!response.ok) throw new Error('Falha na rede');
        
        const newData = await response.json();
        
        if (JSON.stringify(newData) !== JSON.stringify(initialData)) {
          console.log("(Regulations) Novos dados encontrados! Atualizando...");
          setAllRegulations(newData);
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        } else {
          console.log("(Regulations) Dados de regulações já estão atualizados.");
        }
      } catch (e) {
        console.log("Não foi possível buscar atualizações de regulações.", e);
      }
    };

    // 6. ADICIONAR netInfo.isConnected ao array de dependências
    loadData();
  }, [currentLang, CACHE_KEY, netInfo.isConnected]);

  // 7. ATUALIZAR useMemo PARA USAR OS DADOS DO ESTADO
  const favoriteItems = useMemo(() => {
    // Agora filtramos por item.id (que é a nossa antiga titleKey)
    return allRegulations.filter(item => favorites.includes(item.id));
  }, [favorites, allRegulations]);
  
  const EmptyList = ({ textKey }) => (
    <Text style={style.emptyText}>{t(textKey)}</Text>
  );

  // 8. ADICIONAR O ActivityIndicator
  if (isLoading) {
    return (
      <SafeAreaView style={[style.container, style.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={favoriteItems}
        renderItem={({ item }) => <AccordionItem item={item} theme={theme} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={style.list}
        ListHeaderComponent={
          <Text style={style.listHeader}>{t('favorites_title')}</Text>
        }
        ListEmptyComponent={<EmptyList textKey="favorites_empty_reg" />}
        ListFooterComponent={
          <FlatList
            data={allRegulations} // Usar os dados do estado
            renderItem={({ item }) => <AccordionItem item={item} theme={theme} />}
            keyExtractor={(item) => `all-${item.id}`} // Usar item.id
            ListHeaderComponent={
              <Text style={style.listHeader}>{t('all_exercises')}</Text>
            }
          />
        }
      />
    </SafeAreaView>
  );
};

// ... (Cole os seus estilos originais aqui)
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  // Adicione este estilo para o loading
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
    paddingBottom: 140,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: theme.subtleText,
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starButton: {
    paddingHorizontal: 10,
  },
  starText: {
    fontSize: 24,
    color: theme.accent, 
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  cardToggle: {
    fontSize: 24,
    color: theme.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.subtleText,
    marginTop: 5,
    marginBottom: 10,
  },
  cardContent: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.borderColor,
    paddingTop: 10,
  },
  cardStep: {
    fontSize: 15,
    color: theme.text,
    marginBottom: 5,
    lineHeight: 22,
  },
});

export default RegulationScreen;