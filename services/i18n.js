import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      // Chaves existentes
      'welcome_message': 'Welcome to AcalmaTEA!',
      'main_menu': 'Main Menu',
      'expressions': 'List of Expressions',
      'find_comfort': 'Find Your Comfort',
      'social_skills': 'Develop Social Skills',
      'regulations': 'Self-Regulation Exercises',
      'settings': 'Settings',
      'poti_greeting': "Hi! I'm Poti. I'll help you here.",
      'search_placeholder': 'Search expressions...',
      'motivation': 'Motivation',
      'bible': 'Bible Verses',
      'next': 'Next',
      'back': 'Back',
      'challenge_title': 'Challenge!',
      'objective': 'Objective',
      'instructions': 'Instructions',
      'extra_tip': 'Extra Tip',
      'dark_mode': 'Dark Mode',
      'language': 'Language',
      'system_default': 'System Default',

      // Novas chaves para os títulos do App.js
      'app_title_home': 'Home',
      'app_title_expressions': 'List of Expressions',
      'app_title_comfort': 'Find Your Comfort',
      'app_title_social_nav': 'Social Skills',
      'app_title_regulation': 'Self-Regulation',
      'app_title_settings': 'Settings',

      // Novas chaves para ExpressionsScreen
      'expressions_meaning': 'Meaning: ',
      'expressions_example': 'Example: ',

      // Novas chaves para SettingsScreen
      'settings_portuguese': 'Portuguese',
      'settings_english': 'English',

      // Novas chaves para SocialSkillsMenuScreen
      'social_basic': 'Basic Social Interaction',
      'social_communication': 'Verbal and Non-Verbal Communication',
      'social_understanding': 'Understanding Others',
      'social_group': 'Group Skills',
      'social_conflict': 'Conflict Resolution',
      
      // Novas chaves para ChallengeDetailScreen
      'challenge_step': 'Step {{num}}: ',
    },
  },
  pt: {
    translation: {
      // Chaves existentes
      'welcome_message': 'Bem-vindo ao AcalmaTEA!',
      'main_menu': 'Menu Inicial',
      'expressions': 'Lista de Expressões',
      'find_comfort': 'Encontre seu Conforto',
      'social_skills': 'Desenvolver Habilidades Sociais',
      'regulations': 'Exercícios de Autorregulação',
      'settings': 'Configurações',
      'poti_greeting': 'Olá! Sou o Poti. Vou te ajudar aqui.',
      'search_placeholder': 'Buscar expressões...',
      'motivation': 'Motivação',
      'bible': 'Versículos Bíblicos',
      'next': 'Próximo',
      'back': 'Voltar',
      'challenge_title': 'Desafio!',
      'objective': 'Objetivo',
      'instructions': 'Instruções',
      'extra_tip': 'Dica Extra',
      'dark_mode': 'Modo Escuro',
      'language': 'Idioma',
      'system_default': 'Padrão do Sistema',

      // Novas chaves para os títulos do App.js
      'app_title_home': 'Menu Inicial',
      'app_title_expressions': 'Lista de Expressões',
      'app_title_comfort': 'Encontre seu Conforto',
      'app_title_social_nav': 'Habilidades Sociais',
      'app_title_regulation': 'Autorregulação',
      'app_title_settings': 'Configurações',

      // Novas chaves para ExpressionsScreen
      'expressions_meaning': 'Significado: ',
      'expressions_example': 'Exemplo: ',

      // Novas chaves para SettingsScreen
      'settings_portuguese': 'Português',
      'settings_english': 'English',

      // Novas chaves para SocialSkillsMenuScreen
      'social_basic': 'Interação Social Básica',
      'social_communication': 'Comunicação Verbal e Não Verbal',
      'social_understanding': 'Entendendo os Outros',
      'social_group': 'Habilidades em Grupo',
      'social_conflict': 'Resolução de Conflitos',
      
      // Novas chaves para ChallengeDetailScreen
      'challenge_step': 'Passo {{num}}: ',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.getLocales()[0].languageCode,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;