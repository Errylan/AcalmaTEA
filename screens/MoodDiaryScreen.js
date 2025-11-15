// screens/MoodDiaryScreen.js
import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext'; // 1. Importar o hook useUser

// 2. Definir as emoções que o usuário pode registrar
const MOOD_OPTIONS = [
  { key: 'happy', emoji: '😊', titleKey: 'mood_happy' },
  { key: 'calm', emoji: '😌', titleKey: 'mood_calm' },
  { key: 'anxious', emoji: '😬', titleKey: 'mood_anxious' },
  { key: 'sad', emoji: '😟', titleKey: 'mood_sad' },
  { key: 'angry', emoji: '😠', titleKey: 'mood_angry' },
];

const MoodDiaryScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  // 3. Pegar os dados e funções do Contexto
  const { moodLog, addMoodEntry } = useUser();
  
  // Estado para mostrar uma confirmação rápida
  const [confirmation, setConfirmation] = useState('');

  // 4. Função para registrar o humor
  const handleAddMood = (mood) => {
    addMoodEntry(mood.key); // Salva o 'happy', 'sad', etc.
    
    // Mostra uma mensagem de confirmação
    setConfirmation(t('mood_log_saved', { mood: t(mood.titleKey) }));
    
    // Esconde a mensagem após 2 segundos
    setTimeout(() => {
      setConfirmation('');
    }, 2000);
  };

  // 5. Componente para renderizar cada item do histórico
  const renderItem = ({ item }) => {
    // Encontra o emoji correspondente à emoção salva
    const moodEmoji = MOOD_OPTIONS.find(m => m.key === item.emotion)?.emoji || '❔';
    
    // Formata o timestamp (ex: 10/11/2025, 19:30:15)
    const date = new Date(item.timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={style.logItem}>
        <Text style={style.logEmoji}>{moodEmoji}</Text>
        <Text style={style.logText}>{t(`mood_${item.emotion}`)}</Text>
        <Text style={style.logTimestamp}>{date}</Text>
      </View>
    );
  };

  // 6. Componente do Cabeçalho (Input de Humor)
  const ListHeader = () => (
    <View style={style.headerContainer}>
      <Text style={style.title}>{t('mood_log_title')}</Text>
      <Text style={style.subtitle}>{t('mood_log_subtitle')}</Text>
      <View style={style.moodInputContainer}>
        {MOOD_OPTIONS.map((mood) => (
          <TouchableOpacity
            key={mood.key}
            style={style.moodButton}
            onPress={() => handleAddMood(mood)}
          >
            <Text style={style.moodEmoji}>{mood.emoji}</Text>
            <Text style={style.moodText}>{t(mood.titleKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Mensagem de confirmação */}
      {confirmation ? (
        <Text style={style.confirmationText}>{confirmation}</Text>
      ) : (
        <View style={{ height: 20, marginTop: 15 }} /> // Espaçamento
      )}
      
      <Text style={style.historyTitle}>{t('mood_log_history')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={moodLog} // O 'moodLog' vem do useUser()
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

// 7. Estilos
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
    justifyContent: 'space-around',
    width: '100%',
  },
  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.card,
  },
  moodEmoji: {
    fontSize: 30,
  },
  moodText: {
    fontSize: 12,
    color: theme.text,
    marginTop: 5,
  },
  confirmationText: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: 'bold',
    marginTop: 15,
    height: 20,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 20,
    alignSelf: 'flex-start',
    
  },
  emptyText: {
    fontSize: 14,
    color: theme.subtleText,
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
    marginTop: 20,
  },
  logItem: {
    backgroundColor: theme.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  logEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  logText: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
  },
  logTimestamp: {
    fontSize: 12,
    color: theme.subtleText,
  },
});

export default MoodDiaryScreen;