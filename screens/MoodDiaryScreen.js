import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo'; // Importar NetInfo

// --- CONFIGURAÇÃO DA API ---
const API_URL = 'https://acalmatea-api.vercel.app/api/moods'; // <--- MUDE PARA O SEU URL REAL
const CACHE_KEY = 'cached_mood_options';

// Dados de Fábrica (Fallback para 1ª vez offline)
const FACTORY_MOODS = [
  { key: 'happy', emoji: '😊', titleKey: 'mood_happy' },
  { key: 'calm', emoji: '😌', titleKey: 'mood_calm' },
  { key: 'anxious', emoji: '😬', titleKey: 'mood_anxious' },
  { key: 'sad', emoji: '😟', titleKey: 'mood_sad' },
  { key: 'angry', emoji: '😠', titleKey: 'mood_angry' },
];

const MoodDiaryScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);
  const { moodLog, addMoodEntry } = useUser();
  const [confirmation, setConfirmation] = useState('');
  
  // Estados para os dados dinâmicos
  const [moodOptions, setMoodOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const netInfo = useNetInfo();
  const currentLang = i18n.language;

  // --- LÓGICA OFFLINE-FIRST ---
  useEffect(() => {
    const loadMoods = async () => {
      let dataToUse = [];
      setIsLoading(true);

      // 1. Tentar Cache Local
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
            dataToUse = JSON.parse(cached);
        }
      } catch (e) { console.error("Erro cache:", e); }

      // 2. Se Cache vazio, usar Fábrica (traduzindo na hora)
      if (!dataToUse.length) {
          dataToUse = FACTORY_MOODS.map(m => ({
              key: m.key,
              emoji: m.emoji,
              title: t(m.titleKey) 
          }));
      }

      setMoodOptions(dataToUse);
      setIsLoading(false);

      // 3. Se Online, buscar atualização na API
      if (netInfo.isConnected === false) return;

      try {
        const response = await fetch(`${API_URL}?lang=${currentLang}`);
        const newData = await response.json();
        
        // Se houver mudança, atualizar estado e cache
        if (JSON.stringify(newData) !== JSON.stringify(dataToUse)) {
          setMoodOptions(newData);
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        }
      } catch (e) { 
          console.log('Erro ao atualizar humores:', e); 
      }
    };
    
    loadMoods();
  }, [currentLang, netInfo.isConnected]);

  // --- FUNÇÕES DE INTERAÇÃO ---
  const handleAddMood = (mood) => {
    addMoodEntry(mood.key);
    // Feedback visual
    setConfirmation(t('mood_log_saved', { mood: mood.title }));
    setTimeout(() => setConfirmation(''), 2000);
  };

  const renderItem = ({ item }) => {
    // Procura o emoji/título correspondente na lista dinâmica
    const moodObj = moodOptions.find(m => m.key === item.emotion);
    const moodEmoji = moodObj ? moodObj.emoji : '❔';
    const moodTitle = moodObj ? moodObj.title : item.emotion;
    
    const date = new Date(item.timestamp).toLocaleString(currentLang === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    return (
      <View style={style.logItem}>
        <Text style={style.logEmoji}>{moodEmoji}</Text>
        <Text style={style.logText}>{moodTitle}</Text>
        <Text style={style.logTimestamp}>{date}</Text>
      </View>
    );
  };

  const ListHeader = () => (
    <View style={style.headerContainer}>
      <Text style={style.title}>{t('mood_log_title')}</Text>
      <Text style={style.subtitle}>{t('mood_log_subtitle')}</Text>
      
      {isLoading ? (
          <ActivityIndicator color={theme.primary} size="large" style={{ margin: 20 }} />
      ) : (
          <View style={style.moodInputContainer}>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood.key}
                style={style.moodButton}
                onPress={() => handleAddMood(mood)}
              >
                <Text style={style.moodEmoji}>{mood.emoji}</Text>
                <Text style={style.moodText}>{mood.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
      )}
      
      {confirmation ? (
        <Text style={style.confirmationText}>{confirmation}</Text>
      ) : (
        <View style={{ height: 20, marginTop: 15 }} />
      )}
      
      <Text style={style.historyTitle}>{t('mood_log_history')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={moodLog}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={
          <Text style={style.emptyText}>{t('mood_log_empty')}</Text>
        }
        contentContainerStyle={{ paddingBottom: 140 }}
      />
    </SafeAreaView>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.subtleText,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  moodInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap', // Permite que os botões quebrem linha se houver muitos
    gap: 10,          // Espaçamento moderno
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: theme.card,
    minWidth: 70,     // Garante tamanho mínimo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  moodText: {
    fontSize: 12,
    color: theme.text,
    fontWeight: '500',
  },
  confirmationText: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: 'bold',
    marginTop: 15,
    height: 20,
    textAlign: 'center',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 25,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 14,
    color: theme.subtleText,
    textAlign: 'center',
    padding: 40,
    fontStyle: 'italic',
  },
  logItem: {
    backgroundColor: theme.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  logText: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    fontWeight: '600',
  },
  logTimestamp: {
    fontSize: 12,
    color: theme.subtleText,
  },
});

export default MoodDiaryScreen;