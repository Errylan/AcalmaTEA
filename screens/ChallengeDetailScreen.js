import React, { useLayoutEffect, useState } from 'react';
// 1. Importar SafeAreaView
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert,  } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext'; 
import { useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';


// ... (Componente HeaderFavoriteButton não muda) ...
const HeaderFavoriteButton = ({ challengeId, theme }) => {
  const { isFavorite, toggleFavorite } = useUser();
  const favorite = isFavorite(challengeId);

  return (
    <TouchableOpacity onPress={() => toggleFavorite(challengeId)} style={{ marginRight: 15 }}>
      <Text style={{ fontSize: 28, color: theme.accent }}>
        {favorite ? '★' : '☆'}
      </Text>
    </TouchableOpacity>
  );
};

const ChallengeDetailScreen = ({ route }) => {
  // ... (Toda a lógica interna não muda) ...
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);
  const { challenge } = route.params;
  const navigation = useNavigation();
  
  const { addXp, markChallengeCompleted, getChallengeCompletion } = useUser();
  const challengeId = challenge.titleKey; 
  
  const completionStatus = getChallengeCompletion(challengeId);
  
  const [modalVisible, setModalVisible] = useState(false);

  const langKey = i18n.language; 
  const title = challenge.titleKey ? t(challenge.titleKey) : challenge.title;
  const objective = challenge.objKey ? t(challenge.objKey) : challenge.objective;
  const steps = challenge.stepKeys ? challenge.stepKeys.map(key => t(key)) : challenge.steps; 
  const extra = challenge.extraKey ? t(challenge.extraKey) : challenge.extra;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderFavoriteButton challengeId={challengeId} theme={theme} />
      ),
    });
  }, [navigation, challengeId, theme]);

  const handleCompleteChallenge = () => {
    setModalVisible(true);
  };
  
  const handleSelectDifficulty = (difficulty) => {
    const xpGained = 10; 
    
    markChallengeCompleted(challengeId, difficulty);
    addXp(xpGained);
    
    setModalVisible(false);
    
    Alert.alert(
      t('challenge_complete_title'), 
      t('challenge_complete_message', { xp: xpGained })
    );
  };

  return (
    // 2. Substituir o ScrollView principal por SafeAreaView
    <SafeAreaView style={style.container}>
      <ScrollView 
        contentContainerStyle={{ padding: 20, paddingBottom: 140 }} // Adicionei padding aqui
      >
        <View style={[style.card, { backgroundColor: theme.accent }]}>
          <Text style={style.title}>{t('challenge_title')}</Text>
          <Text style={style.subtitle}>{title}</Text>
          <View style={style.divider} />
          <Text style={style.label}>{t('objective')}:</Text>
          <Text style={style.text}>{objective}</Text>
          <View style={style.divider} />
          <Text style={style.label}>{t('instructions')}:</Text>
          {steps.map((step, index) => (
            <Text key={index} style={style.stepText}>
              <Text style={{fontWeight: 'bold'}}>{t('challenge_step', { num: index + 1 })}</Text>
              {step}
            </Text>
          ))}
          {extra && (
            <>
              <View style={style.divider} />
              <Text style={style.label}>{t('extra_tip')}:</Text>
              <Text style={style.text}>{extra}</Text>
            </>
          )}
        </View>

        <View style={style.completionContainer}>
          {!completionStatus ? (
            <TouchableOpacity 
              style={style.completeButton} 
              onPress={handleCompleteChallenge}
            >
              <Text style={style.completeButtonText}>{t('challenge_complete_button')}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={style.completedText}>{t('challenge_completed_text')} ✅</Text>
          )}
        </View>
        
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={style.modalOverlay}>
            <View style={style.modalContainer}>
              <Text style={style.modalTitle}>{t('challenge_feedback_title')}</Text>
              
              <TouchableOpacity 
                style={style.feedbackButton}
                onPress={() => handleSelectDifficulty('easy')}
              >
                <Text style={style.feedbackButtonText}>😊 {t('challenge_feedback_easy')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={style.feedbackButton}
                onPress={() => handleSelectDifficulty('medium')}
              >
                <Text style={style.feedbackButtonText}>😐 {t('challenge_feedback_medium')}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={style.feedbackButton}
                onPress={() => handleSelectDifficulty('hard')}
              >
                <Text style={style.feedbackButtonText}>😟 {t('challenge_feedback_hard')}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={style.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={style.cancelButtonText}>{t('challenge_feedback_cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1, // <--- Esta linha é importante
    backgroundColor: theme.background,
    // Removido o padding, pois foi para o contentContainer do ScrollView
  },
  card: {
    borderRadius: 20,
    padding: 25,
  },
  // ... (restante dos estilos não muda)
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333', 
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.2)',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#333', 
    lineHeight: 22,
  },
  stepText: {
    fontSize: 15,
    color: '#333', 
    lineHeight: 22,
    marginBottom: 8,
  },
  completionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: theme.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    padding: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: theme.card,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 25,
  },
  feedbackButton: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.borderColor,
    borderRadius: 15,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  feedbackButtonText: {
    fontSize: 18,
    color: theme.text,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 14,
    color: theme.subtleText,
    fontWeight: '500',
  },
});

export default ChallengeDetailScreen;