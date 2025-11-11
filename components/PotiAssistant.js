import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// --- MUDANÇA: Importar o useUser ---
import { useUser } from '../context/UserDataContext';

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
  // --- MUDANÇA: Adicionar as novas telas ---
  'MoodDiary': 'poti_MoodDiary',
  'Rewards': 'poti_Rewards',
  // --- FIM DA MUDANÇA ---
};

const specialPositionScreens = [ 
  // 'ChallengeDetail' 
];

// --- Lista de Cores (Chave do item e o valor da cor) ---
const COLOR_TINTS = {
  'cor_vermelha': '#FF6347', // Tomato
  'cor_verde': '#90EE90',   // LightGreen
  'cor_roxa': '#BA55D3',    // MediumOrchid
};

// --- Lista de Acessórios (Chave do item e o Emoji) ---
const ACCESSORY_EMOJIS = {
  'oculos_sol': '🕶️',
  'laco': '🎀',
  'oculos_grau': '🤓',
  'bigode': '🥸',
  'fones': '🎧',
  'chapeu_mago': '🧙',
  'coroa': '👑',
  'cartola': '🎩',
  'chapeu_detetive': '🕵️',
  'aureola': '😇',
  'cor_arcoiris': '🌈', // Cor especial tratada como emoji
  'cor_dourada': '✨', // Cor especial tratada como emoji
};

const PotiAssistant = ({ activeScreen }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const popAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  
  // --- MUDANÇA: Pegar os itens do usuário ---
  const { unlockedItems } = useUser();
  const style = styles(theme);

  // --- MUDANÇA: Lógica para encontrar o item de Cor ---
  // Encontra a *última* cor comprada para aplicar o tint
  const activeColorKey = [...unlockedItems].reverse().find(item => COLOR_TINTS[item]);
  const activeColorTint = activeColorKey ? COLOR_TINTS[activeColorKey] : null;

  // --- MUDANÇA: Lógica para encontrar o Acessório (não-cor) ---
  // Encontra o *último* acessório comprado para exibir
  const activeAccessoryKey = [...unlockedItems].reverse().find(item => ACCESSORY_EMOJIS[item]);
  const activeAccessoryEmoji = activeAccessoryKey ? ACCESSORY_EMOJIS[activeAccessoryKey] : null;
  // --- FIM DA MUDANÇA ---

  useEffect(() => {
    popAnim.setValue(0); 
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, [popAnim, activeScreen]); 

  // --- MUDANÇA: Adicionado 'poti_default' como fallback ---
  const textKey = screenToTextKey[activeScreen] || 'poti_default';
  // --- FIM DA MUDANÇA ---

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
    <Animated.View style={containerStyle}>
      {/* 1. Container para o Poti e seus acessórios */}
      <View style={style.potiImageContainer}> 
        
        {/* 2. Imagem Base (O Poti) */}
        <Image 
          source={require('../assets/poti-avatar.png')} 
          style={[
            style.characterImage,
            // Aplica a cor (tintColor) se uma for encontrada
            activeColorTint ? { tintColor: activeColorTint } : {}
          ]} 
        />
        
        {/* 3. Camada de Acessório (Emoji) */}
        {activeAccessoryEmoji && (
          <Text style={style.accessoryEmoji}>{activeAccessoryEmoji}</Text>
        )}
      </View>
      
      {/* 4. O Balão de Fala */}
      <View style={style.bubble}>
        <Text style={style.bubbleText}>{t(textKey)}</Text>
      </View>
    </Animated.View>
  );
};


const styles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    zIndex: 10, 
  },
  containerBottomLeft: { 
    left: 20, 
  },
  containerTopRight: {
    top: 20,
    right: 20,
  },
  // --- MUDANÇA: Estilos para Acessórios ---
  potiImageContainer: {
    width: 80, 
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain',
  },
  accessoryEmoji: {
    fontSize: 50, // Tamanho do Emoji (ajuste conforme necessário)
    position: 'absolute',
    // O posicionamento "centralizado" funciona bem para a maioria
    textAlign: 'center',
    // Ajustes finos (descomente e ajuste se o emoji ficar torto)
    // top: -10, 
    // left: 5,
  },
  // --- FIM DA MUDANÇA ---
  bubble: {
    backgroundColor: theme.card,
    padding: 12,
    borderRadius: 15,
    borderBottomLeftRadius: 0, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 200,
    marginLeft: 8, 
    marginBottom: 10,
  },
  bubbleText: {
    color: theme.text,
    fontSize: 14,
  },
});

export default PotiAssistant;