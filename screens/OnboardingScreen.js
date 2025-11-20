// screens/OnboardingScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

const { width } = Dimensions.get('window');

// --- CONFIGURAÇÃO DA API ---
const API_URL = 'https://acalmatea-api.vercel.app/api/onboarding'; // <--- MUDE PARA O SEU URL REAL
const CACHE_KEY = 'cached_onboarding_slides';

// --- 1. MAPA DE IMAGENS LOCAL ---
// Relaciona as chaves que vêm da API com os ficheiros dentro do app
const LOCAL_IMAGES = {
  'img_logo': require('../assets/logo.png'),
  'img_expressions': require('../assets/Expressions.jpg'),
  'img_comfort': require('../assets/confort.jpg'),
  'img_challenges': require('../assets/challenges.jpg'),
  'img_regulation': require('../assets/regulation.jpg'),
  'img_rewards': require('../assets/rewards.jpg'),
  'img_mood': require('../assets/mood.jpg'),
  'img_settings': require('../assets/settings.jpg'),
  'img_avatar': require('../assets/avatar.jpg'),
  'img_home': require('../assets/Homescreen.jpg'),
};

// Dados de Fábrica (Fallback para 1ª vez offline)
const FACTORY_SLIDES = [
  { id: '1', imageKey: 'img_logo', titleKey: 'onboarding_title_1', descKey: 'onboarding_desc_1' },
  { id: '2', imageKey: 'img_expressions', titleKey: 'onboarding_title_2', descKey: 'onboarding_desc_2' },
  { id: '3', imageKey: 'img_comfort', titleKey: 'onboarding_title_3', descKey: 'onboarding_desc_3' },
  { id: '4', imageKey: 'img_challenges', titleKey: 'onboarding_title_4', descKey: 'onboarding_desc_4' },
  { id: '5', imageKey: 'img_regulation', titleKey: 'onboarding_title_5', descKey: 'onboarding_desc_5' },
  { id: '6', imageKey: 'img_rewards', titleKey: 'onboarding_title_6', descKey: 'onboarding_desc_6' },
  { id: '7', imageKey: 'img_mood', titleKey: 'onboarding_title_7', descKey: 'onboarding_desc_7' },
  { id: '8', imageKey: 'img_settings', titleKey: 'onboarding_title_8', descKey: 'onboarding_desc_8' },
  { id: '9', imageKey: 'img_avatar', titleKey: 'onboarding_title_9', descKey: 'onboarding_desc_9' },
  { id: '10', imageKey: 'img_home', titleKey: 'onboarding_title_10', descKey: 'onboarding_desc_10' },
];

const OnboardingScreen = ({ onComplete }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(); 
  const style = styles(theme);
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);
  
  // Estados para os dados
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const netInfo = useNetInfo();

  // --- 2. CARREGAR DADOS (Offline-First) ---
  useEffect(() => {
    const loadSlides = async () => {
      let dataToUse = [];
      setIsLoading(true);

      // Tentar Cache
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) dataToUse = JSON.parse(cached);
      } catch (e) {}

      // Fallback de Fábrica (se cache vazio)
      if (!dataToUse.length) {
        dataToUse = FACTORY_SLIDES.map(item => ({
          id: item.id,
          imageKey: item.imageKey,
          title: t(item.titleKey), // Traduz localmente usando as chaves
          description: t(item.descKey)
        }));
      }
      setSlides(dataToUse);
      setIsLoading(false);

      // Tentar API (se online)
      if (netInfo.isConnected === false) return;

      try {
        const response = await fetch(`${API_URL}?lang=${i18n.language}`);
        const newData = await response.json();
        
        // Verifica se houve mudança antes de atualizar
        if (JSON.stringify(newData) !== JSON.stringify(dataToUse)) {
            setSlides(newData);
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        }
      } catch (e) { console.log('Erro API Onboarding:', e); }
    };

    loadSlides();
  }, [i18n.language, netInfo.isConnected]);


  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  // Componente de Slide Individual
  const Slide = ({ item }) => {
    // Lógica Híbrida:
    // 1. Se a API mandou um URL (ex: foto de natal), usa o URL.
    // 2. Se não, procura a chave (ex: 'img_logo') no mapa local.
    // 3. Se nada funcionar, usa o logo como segurança.
    
    let imageSource;
    
    if (item.imageUrl) {
      imageSource = { uri: item.imageUrl };
    } else {
      imageSource = LOCAL_IMAGES[item.imageKey] || LOCAL_IMAGES['img_logo'];
    }

    return (
      <View style={[style.slide, { width }]}>
        <Image 
          source={imageSource} 
          style={style.image} 
          resizeMode="contain" 
        />
        <Text style={style.title}>{item.title}</Text>
        <Text style={style.description}>{item.description}</Text>
      </View>
    );
  };

  if (isLoading && slides.length === 0) {
      return (
          <SafeAreaView style={[style.container, {justifyContent: 'center'}]}>
              <ActivityIndicator size="large" color={theme.primary} />
          </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={style.container}>
      {/* Botão "Pular" */}
      {currentSlideIndex !== slides.length - 1 && (
        <TouchableOpacity
          style={style.skipButton}
          onPress={onComplete}
        >
          <Text style={style.skipButtonText}>{t('onboarding_skip') || "Pular"}</Text> 
        </TouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: '100%' }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />
      
      <View style={style.footer}>
        {/* Indicadores (bolinhas/barrinhas) */}
        <View style={style.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                style.indicator,
                currentSlideIndex === index && style.indicatorActive,
              ]}
            />
          ))}
        </View>
        
        {/* Botões de Ação */}
        <View style={style.buttonContainer}>
          {currentSlideIndex === slides.length - 1 ? (
            <TouchableOpacity style={style.btn} onPress={onComplete}>
              <Text style={style.btnText}>{t('onboarding_finish') || "Começar"}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={style.btn} onPress={goToNextSlide}>
              <Text style={style.btnText}>{t('next') || "Próximo"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: '45%',
    width: '80%',
    marginBottom: 30,
    borderRadius: 20,
  },
  title: {
    color: theme.text,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    color: theme.subtleText,
    fontSize: 16,
    marginTop: 15,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    height: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: theme.borderColor,
    marginHorizontal: 3,
    borderRadius: 4,
  },
  indicatorActive: {
    backgroundColor: theme.primary,
    width: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza o botão único
  },
  btn: {
    width: '100%', // Ocupa a largura disponível
    height: 55,
    borderRadius: 15,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  skipButton: {
    position: 'absolute',
    top: 20, // Ajuste conforme a StatusBar
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipButtonText: {
    color: theme.subtleText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OnboardingScreen;