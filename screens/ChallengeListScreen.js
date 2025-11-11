import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockChallenges } from '../constants/data';
import { useUser } from '../context/UserDataContext'; 

// --- MUDANÇA: Mapeamento de Status para Emoji ---
const STATUS_EMOJI = {
  'easy': '😊',
  'medium': '😐',
  'hard': '😟',
};
// --- FIM DA MUDANÇA ---

const ChallengeListScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  const { categoryKey } = route.params;
  
  // --- MUDANÇA: Pegar getChallengeCompletion ---
  const { isFavorite, getChallengeCompletion } = useUser();
  // --- FIM DA MUDANÇA ---

  const challenges = useMemo(() => {
    if (categoryKey === 'favorites') {
      const allChallenges = Object.values(mockChallenges).flat();
      return allChallenges.filter(challenge => isFavorite(challenge.titleKey));
    }
    return mockChallenges[categoryKey] || [];
  }, [categoryKey, isFavorite]);
  

  const EmptyList = () => (
    <Text style={style.emptyText}>
      {categoryKey === 'favorites' 
        ? t('favorites_empty_cha') 
        : t('favorites_empty_generic')}
    </Text>
  );

  const renderItem = ({ item }) => {
    // --- MUDANÇA: Verificar status de conclusão ---
    const completionStatus = getChallengeCompletion(item.titleKey);
    // --- FIM DA MUDANÇA ---

    return (
      <TouchableOpacity 
        style={style.menuItem}
        onPress={() => navigation.navigate('ChallengeDetail', { challenge: item })}
      >
        <Text style={style.menuText}>{item.titleKey ? t(item.titleKey) : item.title}</Text>
        
        {/* --- MUDANÇA: Mostrar Emoji ou Seta --- */}
        {completionStatus ? (
          <Text style={style.emojiText}>{STATUS_EMOJI[completionStatus] || '✅'}</Text>
        ) : (
          <Text style={style.menuArrow}>❯</Text>
        )}
        {/* --- FIM DA MUDANÇA --- */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(item) => item.titleKey || item.title}
        contentContainerStyle={style.list}
        ListEmptyComponent={<EmptyList />} 
      />
    </View>
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
    flex: 1, // --- MUDANÇA: Para o texto não empurrar o emoji ---
  },
  menuArrow: {
    fontSize: 16,
    color: theme.primary,
  },
  // --- MUDANÇA: Estilo do Emoji ---
  emojiText: {
    fontSize: 20,
    marginLeft: 10,
  },
  // --- FIM DA MUDANÇA ---
});

export default ChallengeListScreen;