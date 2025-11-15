import React, { useState, useMemo } from 'react';
// 1. Importar SafeAreaView e remover View
import { Text, StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockRegulations } from '../constants/data';
import { useUser } from '../context/UserDataContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccordionItem = ({ item, theme }) => {
  // ... (Código do AccordionItem não muda)
  const [expanded, setExpanded] = useState(false);
  const style = styles(theme);
  const { t, i18n } = useTranslation();
  const langKey = i18n.language; 
  
  const { isFavorite, toggleFavorite } = useUser();
  const favorite = isFavorite(item.titleKey);

  const title = item.titleKey ? t(item.titleKey) : item.title;
  const description = item.descKey ? t(item.descKey) : item.description;
  const steps = item.stepKeys 
    ? item.stepKeys.map(key => t(key)) 
    : item.steps; 

  return (
    <View style={style.card} key={langKey + title}> 
      <View style={style.cardHeader}>
        <TouchableOpacity 
          onPress={() => toggleFavorite(item.titleKey)}
          style={style.starButton}
        >
          <Text style={style.starText}>{favorite ? '★' : '☆'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={style.titleContainer}>
          <Text style={style.cardTitle}>{title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={style.cardToggle}>{expanded ? '−' : '+'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={style.cardDescription}>{description}</Text>
      
      {expanded && (
        <View style={style.cardContent}>
          {steps.map((step, index) => (
            <Text key={index} style={style.cardStep}>
              {step}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const RegulationScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  
  const { favorites } = useUser();
  
  const favoriteItems = useMemo(() => {
    return mockRegulations.filter(item => favorites.includes(item.titleKey));
  }, [favorites]);
  
  const EmptyList = ({ textKey }) => (
    <Text style={style.emptyText}>{t(textKey)}</Text>
  );

  return (
    // 2. Substituir <View> por <SafeAreaView>
    <SafeAreaView style={style.container}>
      <FlatList
        data={favoriteItems}
        renderItem={({ item }) => <AccordionItem item={item} theme={theme} />}
        keyExtractor={(item) => item.titleKey || item.title}
        contentContainerStyle={style.list}
        ListHeaderComponent={
          <Text style={style.listHeader}>{t('favorites_title')}</Text>
        }
        ListEmptyComponent={<EmptyList textKey="favorites_empty_reg" />}
        ListFooterComponent={
          <FlatList
            data={mockRegulations}
            renderItem={({ item }) => <AccordionItem item={item} theme={theme} />}
            keyExtractor={(item) => `all-${item.titleKey || item.title}`}
            contentContainerStyle={style.list}
            ListHeaderComponent={
              <Text style={style.listHeader}>{t('all_exercises')}</Text>
            }
          />
        }
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