// screens/ExpressionsScreen.js
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockExpressions } from '../constants/data';

const ExpressionsScreen = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(); // Pegar o i18n para saber o idioma
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
    
    // Filtrar com base no texto traduzido
    const filtered = mockExpressions.filter(
      (item) =>
        t(item.termKey).toLowerCase().includes(lowerSearch) ||
        t(item.meaningKey).toLowerCase().includes(lowerSearch)
    );
    console.log('Expressões filtradas:', filtered.length);
    return filtered;
  }, [search, i18n.language, t]); // Adicionar i18n.language e t como dependências

  const renderItem = ({ item }) => (
    <View style={style.card}>
      {/* Usar t() para traduzir as chaves */}
      <Text style={style.term}>{t(item.termKey)}</Text>
      <Text style={style.meaning}><Text style={style.label}>{t('expressions_meaning')}</Text>{t(item.meaningKey)}</Text>
      <Text style={style.example}><Text style={style.label}>{t('expressions_example')}</Text>{t(item.exampleKey)}</Text>
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
        // Atualizar o keyExtractor para usar a chave do termo
        keyExtractor={(item) => item.termKey}
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