import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Importar
import { mockRegulations } from '../constants/data';

const AccordionItem = ({ item, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const style = styles(theme);
  const { t, i18n } = useTranslation(); // Inicializar
  const langKey = i18n.language; // Para forçar re-renderização na troca de idioma

  // --- LÓGICA HÍBRIDA ---
  const title = item.titleKey ? t(item.titleKey) : item.title;
  const description = item.descKey ? t(item.descKey) : item.description;
  const steps = item.stepKeys 
    ? item.stepKeys.map(key => t(key)) // Traduz as chaves
    : item.steps; // Usa o array de texto antigo
  // --- FIM DA LÓGICA HÍBRIDA ---

  return (
    // Adicionar key para forçar re-renderização
    <View style={style.card} key={langKey + title}> 
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={style.cardHeader}>
          <Text style={style.cardTitle}>{title}</Text>
          <Text style={style.cardToggle}>{expanded ? '−' : '+'}</Text>
        </View>
        <Text style={style.cardDescription}>{description}</Text>
      </TouchableOpacity>
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
  const style = styles(theme);

  return (
    <View style={style.container}>
      <FlatList
        data={mockRegulations}
        renderItem={({ item }) => <AccordionItem item={item} theme={theme} />}
        // Usar titleKey (novo) ou title (antigo) como chave
        keyExtractor={(item) => item.titleKey || item.title}
        contentContainerStyle={style.list}
      />
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  // ... (estilos permanecem os mesmos)
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  list: {
    padding: 10,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    flex: 1,
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