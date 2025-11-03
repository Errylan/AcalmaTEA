// screens/ExpressionsScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockExpressions } from '../constants/data';

const ExpressionsScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    console.log('ExpressionsScreen montado');
    console.log('mockExpressions disponível:', !!mockExpressions);
    console.log('Total de expressões inicial:', mockExpressions?.length);
  }, []);

  const filteredData = useMemo(() => {
    console.log('Total de expressões:', mockExpressions?.length);
    if (!search) return mockExpressions;
    const lowerSearch = search.toLowerCase();
    const filtered = mockExpressions.filter(
      (item) =>
        item.term.toLowerCase().includes(lowerSearch) ||
        item.meaning.toLowerCase().includes(lowerSearch)
    );
    console.log('Expressões filtradas:', filtered.length);
    return filtered;
  }, [search]);

  const renderItem = ({ item }) => (
    <View style={style.card}>
      <Text style={style.term}>{item.term}</Text>
      <Text style={style.meaning}><Text style={style.label}>Significado: </Text>{item.meaning}</Text>
      <Text style={style.example}><Text style={style.label}>Exemplo: </Text>{item.example}</Text>
    </View>
  );

  return (
    <View style={style.container}>
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
        keyExtractor={(item) => item.term}
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
    paddingBottom: 10,
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