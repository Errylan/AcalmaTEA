import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { mockChallenges } from '../constants/data';

const ChallengeListScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const style = styles(theme);
  const { categoryKey } = route.params;
  const challenges = mockChallenges[categoryKey] || [];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={style.menuItem}
      onPress={() => navigation.navigate('ChallengeDetail', { challenge: item })}
    >
      <Text style={style.menuText}>{item.title}</Text>
      <Text style={style.menuArrow}>❯</Text>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <FlatList
        data={challenges}
        renderItem={renderItem}
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

export default ChallengeListScreen;