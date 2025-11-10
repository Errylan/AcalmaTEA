// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animação de fade-in para a logo
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    // Usamos SafeAreaView para o splash também
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/logo.png')} // Certifique-se que o caminho da logo está correto
          style={styles.logo}
        />
      </Animated.View>
      {/* Um indicador de atividade para mostrar que algo está "carregando" */}
      <ActivityIndicator size="large" color={theme.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 50, 
  },
});

export default SplashScreen;