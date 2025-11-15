import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  'HomeTab': 'poti_Home',
  'MoodDiaryTab': 'poti_MoodDiary',
  'RewardsTab': 'poti_Rewards',
  'SettingsTab': 'poti_Settings',
  'MoodDiary': 'poti_MoodDiary',
  'Rewards': 'poti_Rewards',
  'Settings': 'poti_Settings',
};

const specialPositionScreens = [ 
  // 'ChallengeDetail' 
];

const COLOR_TINTS = {
  'cor_vermelha': '#FF6347',
  'cor_verde': '#90EE90',
  'cor_roxa': '#BA55D3',
};

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
  'cor_arcoiris': '🌈', 
  'cor_dourada': '✨', 
};

const PotiAssistant = ({ activeScreen }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const popAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  
 // 1. Obter 'equippedItems' em vez de 'unlockedItems'
  const { equippedItems } = useUser();
  const style = styles(theme);

  const activeColorKey = equippedItems.color; 
  const activeColorTint = activeColorKey ? COLOR_TINTS[activeColorKey] : null;


  const activeAccessoryKey = equippedItems.accessory;
  const activeAccessoryEmoji = activeAccessoryKey ? ACCESSORY_EMOJIS[activeAccessoryKey] : null;

  useEffect(() => {
    popAnim.setValue(0); 
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, [popAnim, activeScreen]); 

  const textKey = screenToTextKey[activeScreen] || 'poti_Home'; 

  const useSpecialPosition = specialPositionScreens.includes(activeScreen);

  // --- MUDANÇA: LÓGICA DA POSIÇÃO DO POTI ---
  // 1. Verifica se a tela atual é uma das que está nas ABAS
  const isTabScreen = ['HomeTab', 'MoodDiaryTab', 'RewardsTab', 'SettingsTab'].includes(activeScreen);

  // 2. Define o espaçamento de baixo
  // Se for uma tela de aba, sobe 80 (60 da aba + 20 de margem)
  // Se for uma tela normal (ex: Expressions), sobe 20 (para ficar acima da barra de gestos)
  const bottomPadding = insets.bottom + (isTabScreen ? 80 : 20);
  // --- FIM DA MUDANÇA ---

  const containerStyle = [
    style.container, 
    useSpecialPosition 
      ? style.containerTopRight
      : [
          style.containerBottomLeft, 
          // 3. Aplica o espaçamento calculado
          { bottom: bottomPadding }
        ],
    { 
      opacity: popAnim, 
      transform: [{ scale: popAnim }] 
    }
  ];

  return (
    <Animated.View style={containerStyle}>
      <View style={style.potiImageContainer}> 
        <Image 
          source={require('../assets/poti-avatar.png')} 
          style={[
            style.characterImage,
            activeColorTint ? { tintColor: activeColorTint } : {}
          ]} 
        />
        {activeAccessoryEmoji && (
          <Text style={style.accessoryEmoji}>{activeAccessoryEmoji}</Text>
        )}
      </View>
      
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
    fontSize: 50,
    position: 'absolute',
    textAlign: 'center',
  },
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