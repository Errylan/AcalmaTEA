import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { mockRegulations } from '../constants/data';

const AccordionItem = ({ item, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const style = styles(theme);

  return (
    <View style={style.card}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={style.cardHeader}>
          <Text style={style.cardTitle}>{item.title}</Text>
          <Text style={style.cardToggle}>{expanded ? '−' : '+'}</Text>
        </View>
        <Text style={style.cardDescription}>{item.description}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={style.cardContent}>
          {item.steps.map((step, index) => (
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
        keyExtractor={(item) => item.title}
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