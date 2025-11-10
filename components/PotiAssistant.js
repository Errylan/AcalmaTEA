import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenToTextKey = {
// ... (sem alterações aqui) ...
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

const specialPositionScreens = [ 
  // 'ChallengeDetail' // REMOVIDO: Para que o Poti vá para o canto inferior
];

const PotiAssistant = ({ activeScreen }) => {
// ... (sem alterações na lógica do componente) ...
  const { theme } = useTheme();
  const { t } = useTranslation();
  const popAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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

  const useSpecialPosition = specialPositionScreens.includes(activeScreen);

  const containerStyle = [
    style.container, 
    useSpecialPosition 
      ? style.containerTopRight
      : [
          style.containerBottomLeft, 
          { bottom: insets.bottom + 20 }
        ],
    { 
      opacity: popAnim, 
      transform: [{ scale: popAnim }] 
    }
  ];

  return (
    <Animated.View 
      style={containerStyle}
    >
      {/* --- ALTERAÇÃO: Imagem vem PRIMEIRO --- */}
      <Image 
        source={require('../assets/poti-avatar.png')} // Caminho para a imagem
        style={style.characterImage} // Usamos o novo estilo
      />

      {/* --- ALTERAÇÃO: Balão vem DEPOIS --- */}
      <View style={style.bubble}>
        <Text style={style.bubbleText}>{t(textKey)}</Text>
      </View>
    </Animated.View>
  );
};


const styles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    // --- ALTERAÇÕES ---
    flexDirection: 'row', // 1. Faz os itens ficarem lado a lado
    alignItems: 'flex-end', // 2. Alinha os itens em baixo (imagem e balão)
    // --- FIM ---
    zIndex: 10, 
  },
  containerBottomLeft: { 
    left: 20, 
  },
  containerTopRight: {
    top: 20,
    right: 20,
  },
  characterImage: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain',
    // marginTop: -10, // 3. Removemos o margin negativo
  },
  bubble: {
    backgroundColor: theme.card,
    padding: 12,
    borderRadius: 15,
    borderBottomLeftRadius: 0, // 4. O "rabicho" aponta para a esquerda (para a imagem)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 200,
    // 5. Adiciona espaço entre a imagem e o balão
    marginLeft: 8, 
    // 6. Levanta o balão um pouco para o "rabicho" apontar para o Poti
    marginBottom: 10,
  },
  bubbleText: {
    color: theme.text,
    fontSize: 14,
  },
});

export default PotiAssistant;