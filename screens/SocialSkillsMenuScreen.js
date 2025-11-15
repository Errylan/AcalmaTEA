import React from 'react';
// 1. Importar SafeAreaView e remover View
import { Text, StyleSheet, TouchableOpacity, FlatList, } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockChallenges } from '../constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialSkillsMenuScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  
  const categoryKeyMap = {
    basic: 'social_basic',
    communication: 'social_communication',
    understanding: 'social_understanding',
    group: 'social_group',
    conflict: 'social_conflict',
  };

  const categories = Object.keys(mockChallenges || {}).map(key => ({
    key: key,
    title: t(categoryKeyMap[key] || key), 
  }));

  categories.unshift({
    key: 'favorites', 
    title: t('social_favorites'),
  });

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
    // 2. Substituir <View> por <SafeAreaView>
    <SafeAreaView style={style.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={style.list}
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