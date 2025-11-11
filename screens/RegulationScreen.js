import React, { useState, useMemo } from 'react'; // --- MUDANÇA ---
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { mockRegulations } from '../constants/data';
import { useUser } from '../context/UserDataContext'; // --- MUDANÇA ---

// --- MUDANÇA: AccordionItem agora recebe props do Contexto ---
const AccordionItem = ({ item, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const style = styles(theme);
  const { t, i18n } = useTranslation();
  const langKey = i18n.language; 
  
  // Pegar funções do contexto
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
        {/* Botão de Favorito (Estrela) */}
        <TouchableOpacity 
          onPress={() => toggleFavorite(item.titleKey)}
          style={style.starButton}
        >
          <Text style={style.starText}>{favorite ? '★' : '☆'}</Text>
        </TouchableOpacity>

        {/* Título (agora dentro de um Touchable) */}
        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={style.titleContainer}>
          <Text style={style.cardTitle}>{title}</Text>
        </TouchableOpacity>

        {/* Botão de Expandir (+) */}
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
// --- FIM DA MUDANÇA ---

const RegulationScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);
  
  // --- MUDANÇA: Pegar favoritos e criar lista ---
  const { favorites } = useUser();
  
  const favoriteItems = useMemo(() => {
    // Filtra a lista completa de regulações
    return mockRegulations.filter(item => favorites.includes(item.titleKey));
  }, [favorites]); // Recalcula apenas quando os favoritos mudam
  // --- FIM DA MUDANÇA ---

  // Componente para lista vazia
  const EmptyList = ({ textKey }) => (
    <Text style={style.emptyText}>{t(textKey)}</Text>
  );

  return (
    <View style={style.container}>
      {/* --- MUDANÇA: Duas FlatLists. Uma para Favoritos, outra para Todos --- */}
      <FlatList
        data={favoriteItems}
        renderItem={({ item }) => <AccordionItem item={item} theme={theme} />}
        keyExtractor={(item) => item.titleKey || item.title}
        contentContainerStyle={style.list}
        ListHeaderComponent={
          <Text style={style.listHeader}>{t('favorites_title')}</Text>
        }
        ListEmptyComponent={<EmptyList textKey="favorites_empty_reg" />}
        // A "lista principal" agora é uma combinação
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
      {/* --- FIM DA MUDANÇA --- */}
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
  // --- MUDANÇA: Novos Estilos ---
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
  // --- FIM DA MUDANÇA ---
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
  // --- MUDANÇA: Estilos do Botão de Estrela ---
  starButton: {
    paddingHorizontal: 10,
  },
  starText: {
    fontSize: 24,
    color: theme.accent, // Cor Amarela
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  // --- FIM DA MUDANÇA ---
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    flex: 1, // Removido para caber a estrela
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