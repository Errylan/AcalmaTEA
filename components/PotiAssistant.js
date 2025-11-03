import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const PotiAssistant = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const popAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, [popAnim]);

  const style = styles(theme);

  return (
    <Animated.View 
      style={[
        style.container,
        { 
          opacity: popAnim, 
          transform: [{ scale: popAnim }] 
        }
      ]}
    >
      <View style={style.bubble}>
        <Text style={style.bubbleText}>{t('poti_greeting')}</Text>
      </View>
      <Text style={style.character}>👦</Text>
    </Animated.View>
  );
};


const styles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  character: {
    fontSize: 60,
    marginTop: -10,
  },
  bubble: {
    backgroundColor: theme.card,
    padding: 12,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 200,
  },
  bubbleText: {
    color: theme.text,
    fontSize: 14,
  },
});

export default PotiAssistant;