import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import { mockChallenges } from '../constants/data';

// O objeto categoryNames foi removido.

const SocialSkillsMenuScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation(); // Inicializar o hook
  const style = styles(theme);
  
  // Mapear chaves para as chaves de tradução
  const categoryKeyMap = {
    basic: 'social_basic',
    communication: 'social_communication',
    understanding: 'social_understanding',
    group: 'social_group',
    conflict: 'social_conflict',
  };

  const categories = Object.keys(mockChallenges || {}).map(key => ({
    key: key,
    // Usar t() para obter o título traduzido
    title: t(categoryKeyMap[key] || key), 
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={style.menuItem}
      // Passar o título traduzido para a próxima tela
      onPress={() => navigation.navigate('ChallengeList', { categoryKey: item.key, title: item.title })}
    >
      <Text style={style.menuText}>{item.title}</Text>
      <Text style={style.menuArrow}>❯</Text>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={style.list}
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