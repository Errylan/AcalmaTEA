import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const style = styles(theme);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={style.container}>
      {/* Configuração de Tema */}
      <View style={style.settingRow}>
        <Text style={style.settingText}>{t('dark_mode')}</Text>
        <Switch
          trackColor={{ false: '#767577', true: theme.primary }}
          thumbColor={isDarkMode ? theme.accent : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>

      {/* Configuração de Idioma */}
      <View style={style.languageSection}>
        <Text style={style.settingText}>{t('language')}</Text>
        <TouchableOpacity 
          style={[style.langButton, i18n.language === 'pt' && style.langButtonActive]} 
          onPress={() => changeLang('pt')}>
          <Text style={[style.langText, i18n.language === 'pt' && style.langTextActive]}>{t('settings_portuguese')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[style.langButton, i18n.language === 'en' && style.langButtonActive]} 
          onPress={() => changeLang('en')}>
          <Text style={[style.langText, i18n.language === 'en' && style.langTextActive]}>{t('settings_english')}</Text>
        </TouchableOpacity>
        
        {/* --- ADICIONE ESTE BOTÃO NOVO --- */}
        <TouchableOpacity 
          style={[style.langButton, i18n.language === 'es' && style.langButtonActive]} 
          onPress={() => changeLang('es')}>
          <Text style={[style.langText, i18n.language === 'es' && style.langTextActive]}>{t('settings_spanish')}</Text>
        </TouchableOpacity>
        {/* --- FIM DO BOTÃO NOVO --- */}
        
      </View>
    </View>
  );
};

// ... (Estilos permanecem os mesmos)
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: theme.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
    color: theme.text,
  },
  languageSection: {
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 15,
  },
  langButton: {
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.borderColor,
    alignItems: 'center',
  },
  langButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  langText: {
    color: theme.text,
    fontSize: 15,
  },
  langTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;