// screens/OnboardingScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

// Pegamos a largura da tela
const { width, height } = Dimensions.get('window');

// 1. Seus dados de slides (sem alteração)
const slidesData = [
  {
    id: '1',
    image: require('../assets/logo.png'), 
    titleKey: 'onboarding_title_1', 
    descKey: 'onboarding_desc_1',
  },
  {
    id: '2',
    image: require('../assets/Expressions.jpg'), 
    titleKey: 'onboarding_title_2',
    descKey: 'onboarding_desc_2',
  },
  {
    id: '3',
    image: require('../assets/comfort.jpg'), 
    titleKey: 'onboarding_title_3',
    descKey: 'onboarding_desc_3',
  },
    {
    id: '4',
    image: require('../assets/challenges.jpg'), 
    titleKey: 'onboarding_title_4',
    descKey: 'onboarding_desc_4',
    },
    {
    id: '5',
    image: require('../assets/regulation.jpg'), 
    titleKey: 'onboarding_title_5',
    descKey: 'onboarding_desc_5',
    },
    {
    id: '6',
    image: require('../assets/rewards.jpg'), 
    titleKey: 'onboarding_title_6',
    descKey: 'onboarding_desc_6',
    },
    {
    id: '7',
    image: require('../assets/mood.jpg'), 
    titleKey: 'onboarding_title_7',
    descKey: 'onboarding_desc_7',
    },
    {
    id: '8',
    image: require('../assets/settings.jpg'), 
    titleKey: 'onboarding_title_8',
    descKey: 'onboarding_desc_8',
    },
    {
    id: '9',
    image: require('../assets/avatar.jpg'), 
    titleKey: 'onboarding_title_9',
    descKey: 'onboarding_desc_9',
    },
    {
    id: '10',
    image: require('../assets/Homescreen.jpg'), 
    titleKey: 'onboarding_title_10',
    descKey: 'onboarding_desc_10',
    },
    

    
];

// Componente SlideItem (sem alteração)
const SlideItem = ({ item, theme, t }) => {
  const style = styles(theme);
  return (
    <View style={style.slideContainer}>
      <Image source={item.image} style={style.slideImage} />
      <Text style={style.slideTitle}>{t(item.titleKey)}</Text>
      <Text style={style.slideDescription}>{t(item.descKey)}</Text>
    </View>
  );
};

// Componente Paginator (sem alteração)
const Paginator = ({ data, currentIndex, theme }) => {
  const style = styles(theme);
  return (
    <View style={style.paginatorContainer}>
      {data.map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <View
            key={index.toString()}
            style={[style.dot, isActive && style.dotActive]}
          />
        );
      })}
    </View>
  );
};

// A tela principal de Onboarding
const OnboardingScreen = ({ onComplete }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(null);

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlideIndex(viewableItems[0].index || 0);
    }
  }, []);

  return (
    <SafeAreaView style={style.container}>
      {/* --- MUDANÇA: ADICIONAR BOTÃO DE PULAR --- */}
      {/* Mostra o botão em todos os slides, MENOS no último */}
      {currentSlideIndex !== slidesData.length - 1 && (
        <TouchableOpacity
          style={style.skipButton} // Novo estilo
          onPress={onComplete} // Mesma ação do "Concluir"
        >
          <Text style={style.skipButtonText}>{t('onboarding_skip')}</Text> 
        </TouchableOpacity>
      )}
      {/* --- FIM DA MUDANÇA --- */}

      <FlatList
        ref={ref}
        data={slidesData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SlideItem item={item} theme={theme} t={t} />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      <Paginator 
        data={slidesData} 
        currentIndex={currentSlideIndex} 
        theme={theme} 
      />

      {/* Lógica do Botão de Concluir (sem alteração) */}
      {currentSlideIndex === slidesData.length - 1 && (
        <TouchableOpacity
          style={style.finishButton}
          onPress={onComplete} 
        >
          <Text style={style.finishButtonText}>{t('onboarding_finish')}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

// Estilos (com os pontinhos)
const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    slideContainer: {
      width: width, 
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    slideImage: {
      width: width * 0.7,
      height: width * 0.7,
      resizeMode: 'contain',
      marginBottom: 40,
      borderRadius: 50, 
    },
    slideTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 15,
    },
    slideDescription: {
      fontSize: 16,
      color: theme.subtleText,
      textAlign: 'center',
      lineHeight: 24,
    },
    paginatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 100, 
      width: '100%',
    },
    dot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: theme.subtleText, 
      marginHorizontal: 8,
    },
    dotActive: {
      backgroundColor: theme.primary, 
      width: 20, 
    },
    // --- MUDANÇA: NOVOS ESTILOS PARA O BOTÃO "PULAR" ---
    skipButton: {
      position: 'absolute',
      top: 60, // Posição no topo (ajuste se necessário)
      right: 30,
      padding: 10,
      zIndex: 10, // Garante que fique sobre a FlatList
    },
    skipButtonText: {
      color: theme.subtleText, // Cor discreta
      fontSize: 16,
      fontWeight: '500',
    },
    // --- FIM DA MUDANÇA ---
    finishButton: {
      position: 'absolute',
      bottom: 40,
      right: 30,
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
    },
    finishButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default OnboardingScreen;