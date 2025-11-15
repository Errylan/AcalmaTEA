import React, { useMemo } from 'react';
// 1. Importar SafeAreaView e remover View
import { Text, StyleSheet, TouchableOpacity, FlatList, } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockChallenges } from '../constants/data';
import { useUser } from '../context/UserDataContext';
import { SafeAreaView } from 'react-native-safe-area-context';


const STATUS_EMOJI = {
  'easy': '😊',
  'medium': '😐',
  'hard': '😟',
};

const ChallengeListScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  const { categoryKey } = route.params;
  
  const { isFavorite, getChallengeCompletion } = useUser();

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
    const completionStatus = getChallengeCompletion(item.titleKey);

    return (
      <TouchableOpacity 
        style={style.menuItem}
        onPress={() => navigation.navigate('ChallengeDetail', { challenge: item })}
      >
        <Text style={style.menuText}>{item.titleKey ? t(item.titleKey) : item.title}</Text>
        
        {completionStatus ? (
          <Text style={style.emojiText}>{STATUS_EMOJI[completionStatus] || '✅'}</Text>
        ) : (
          <Text style={style.menuArrow}>❯</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    // 2. Substituir <View> por <SafeAreaView>
    <SafeAreaView style={style.container}>
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(item) => item.titleKey || item.title}
        contentContainerStyle={style.list}
        ListEmptyComponent={<EmptyList />} 
      />
    </SafeAreaView>
  );
};


const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1, // <--- Esta linha é importante
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