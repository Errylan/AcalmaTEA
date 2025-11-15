// screens/ExpressionsScreen.js
import React, { useState, useMemo } from 'react';
// 1. Importar SafeAreaView e remover View
import { Text, StyleSheet, FlatList, TextInput,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockExpressions } from '../constants/data';

const ExpressionsScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(); 
  const style = styles(theme);
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search) return mockExpressions;
    const lowerSearch = search.toLowerCase();
    
    const filtered = mockExpressions.filter(
      (item) =>
        t(item.termKey).toLowerCase().includes(lowerSearch) ||
        t(item.meaningKey).toLowerCase().includes(lowerSearch)
    );
    return filtered;
  }, [search, i18n.language, t]); 

  const renderItem = ({ item }) => (
    <View style={style.card}>
      <Text style={style.term}>{t(item.termKey)}</Text>
      <Text style={style.meaning}><Text style={style.label}>{t('expressions_meaning')}</Text>{t(item.meaningKey)}</Text>
      <Text style={style.example}><Text style={style.label}>{t('expressions_example')}</Text>{t(item.exampleKey)}</Text>
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
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.termKey}
        // A MUDANÇA ESTÁ AQUI
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