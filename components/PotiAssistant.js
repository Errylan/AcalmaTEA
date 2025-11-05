import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const screenToTextKey = {
  'Home': 'poti_Home',
  'Expressions': 'poti_Expressions',
  'Comfort': 'poti_Comfort',
  'SocialSkills': 'poti_SocialSkills',
  'SocialSkillsMenu': 'poti_SocialSkillsMenu',
  'ChallengeList': 'poti_ChallengeList',
  'ChallengeDetail': 'poti_ChallengeDetail',
  'Regulation': 'poti_Regulation',
  'Settings': 'poti_Settings',
};

// 1. Lista das telas onde o Poti deve ficar NO TOPO
const specialPositionScreens = [ 
  'ChallengeDetail'
];

const PotiAssistant = ({ activeScreen }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const popAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    popAnim.setValue(0); 
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, [popAnim, activeScreen]); 

  const style = styles(theme);

  const textKey = screenToTextKey[activeScreen] || 'poti_default';

  // 2. Lógica para decidir o estilo de posicionamento
  const useSpecialPosition = specialPositionScreens.includes(activeScreen);

  // 3. Combina os estilos
  const containerStyle = [
    style.container, // Estilo base (position: 'absolute', etc.)
    useSpecialPosition 
      ? style.containerTopRight // Posição NO TOPO
      : style.containerBottomRight, // Posição PADRÃO (embaixo)
    { 
      opacity: popAnim, 
      transform: [{ scale: popAnim }] 
    }
  ];

  return (
    // 4. Usa o 'containerStyle' dinâmico
    <Animated.View 
      style={containerStyle}
    >
      <View style={style.bubble}>
        <Text style={style.bubbleText}>{t(textKey)}</Text>
      </View>
      <Text style={style.character}>👦</Text>
    </Animated.View>
  );
};


const styles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-end',
    zIndex: 10, // Garante que ele fique por cima
  },
  // 5. Estilo para a posição PADRÃO (embaixo)
  containerBottomRight: {
    bottom: 20,
    right: 20,
  },
  // 6. Estilo para a posição ESPECIAL (em cima)
  containerTopRight: {
    top: 20,
    right: 20,
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