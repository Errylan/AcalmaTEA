// components/PotiAssistant.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, Easing } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

// --- SEU URL DA API AQUI ---
const API_URL = 'https://acalmatea-api.vercel.app/api/tips'; 
const CACHE_KEY = 'cached_poti_tips';

// Mapeamento antigo (Fallback para offline)
const FACTORY_TIPS = {
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

const specialPositionScreens = [];

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
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { equippedItems } = useUser();
  const style = styles(theme);

  // --- ESTADOS DA API ---
  const [allTips, setAllTips] = useState([]);
  const [currentTipText, setCurrentTipText] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  const netInfo = useNetInfo();
  const timerRef = useRef(null);

  // --- ANIMAÇÕES ---
  const popAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const activeColorKey = equippedItems.color; 
  const activeColorTint = activeColorKey ? COLOR_TINTS[activeColorKey] : null;

  const activeAccessoryKey = equippedItems.accessory;
  const activeAccessoryEmoji = activeAccessoryKey ? ACCESSORY_EMOJIS[activeAccessoryKey] : null;

  // --- EFEITOS ---

  // 1. Carregar Dicas da API
  useEffect(() => {
    const loadTips = async () => {
      let dataToUse = [];
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) dataToUse = JSON.parse(cached);
      } catch (e) {}

      // Se não houver cache ou API, converte o mapa antigo para o formato novo
      if (!dataToUse.length) {
        dataToUse = Object.keys(FACTORY_TIPS).map(screenKey => ({
          screen: screenKey,
          text: t(FACTORY_TIPS[screenKey]) // Traduz a chave antiga
        }));
      }
      setAllTips(dataToUse);

      if (netInfo.isConnected === false) return;

      try {
        const response = await fetch(`${API_URL}?lang=${i18n.language}`);
        const newData = await response.json();
        if (JSON.stringify(newData) !== JSON.stringify(dataToUse)) {
          setAllTips(newData);
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        }
      } catch (e) { console.log('Erro Poti API'); }
    };
    loadTips();
  }, [i18n.language, netInfo.isConnected]);

  // Função Auxiliar para escolher dica
  const pickRandomTip = () => {
    const tipsForScreen = allTips.filter(tip => tip.screen === activeScreen);
    
    if (tipsForScreen.length > 0) {
      const randomTip = tipsForScreen[Math.floor(Math.random() * tipsForScreen.length)];
      setCurrentTipText(randomTip.text);
    } else {
      // Fallback se não houver dicas na API para esta tela
      const fallbackKey = FACTORY_TIPS[activeScreen] || 'poti_Home';
      setCurrentTipText(t(fallbackKey));
    }
  };

  // 2. Escolher Dica Inicial (quando muda de tela)
  useEffect(() => {
    // Animação de entrada
    popAnim.setValue(0); 
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Escolhe uma dica inicial
    pickRandomTip();
    setShowBubble(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowBubble(false), 5000);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [popAnim, activeScreen, allTips]);

  // 3. Animação de Flutuar (Loop Infinito)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 2000, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
      ])
    ).start();
  }, [floatAnim]);

  // --- INTERAÇÃO (MUDANÇA AQUI) ---
  const handlePress = () => {
    // 1. Sempre sorteia uma nova frase!
    pickRandomTip();
    
    // 2. Garante que o balão aparece
    setShowBubble(true);

    // 3. Reinicia o timer de 5 segundos
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowBubble(false), 5000);
  };

  // --- POSICIONAMENTO ---
  const useSpecialPosition = specialPositionScreens.includes(activeScreen);
  const isTabScreen = ['HomeTab', 'MoodDiaryTab', 'RewardsTab', 'SettingsTab'].includes(activeScreen);
  const bottomPadding = insets.bottom + (isTabScreen ? 80 : 20);

  const containerStyle = [
    style.container, 
    useSpecialPosition 
      ? style.containerTopRight
      : [
          style.containerBottomLeft, 
          { bottom: bottomPadding }
        ],
    { 
      opacity: popAnim, 
      transform: [
        { scale: popAnim },
        { translateY: floatAnim } // Flutuação
      ] 
    }
  ];

  return (
    <Animated.View style={containerStyle}>
      
      <TouchableOpacity 
        onPress={handlePress} 
        activeOpacity={0.9} 
        style={{ flexDirection: 'row', alignItems: 'flex-end' }}
      >
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
        
        {showBubble && (
          <View style={style.bubble}>
            <Text style={style.bubbleText}>{currentTipText}</Text>
          </View>
        )}

      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
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