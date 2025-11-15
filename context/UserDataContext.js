import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Estado inicial atualizado com 'equippedItems'
const initialState = {
  xp: 0,
  completedChallenges: {}, 
  unlockedItems: [], 
  favorites: [],
  moodLog: [], 
  equippedItems: { color: null, accessory: null }, 
};

// 2. Contexto atualizado com as novas funções
export const UserDataContext = createContext({
  ...initialState,
  addXp: (amount) => {},
  markChallengeCompleted: (challengeId, difficulty) => {},
  getChallengeCompletion: (challengeId) => null,
  unlockItem: (itemId, cost) => {},
  toggleFavorite: (itemId) => {},
  isFavorite: (itemId) => false,
  addMoodEntry: (emotion) => {}, 
  equipItem: (itemId) => {},
  unequipItem: (itemId) => {},
  isEquipped: (itemId) => false,
});

// 3. Componente Provedor (Provider)
export const UserDataProvider = ({ children }) => {
  const [xp, setXp] = useState(initialState.xp);
  const [completedChallenges, setCompletedChallenges] = useState(initialState.completedChallenges); 
  const [unlockedItems, setUnlockedItems] = useState(initialState.unlockedItems);
  const [favorites, setFavorites] = useState(initialState.favorites); 
  const [moodLog, setMoodLog] = useState(initialState.moodLog); 
  const [equippedItems, setEquippedItems] = useState(initialState.equippedItems);
  const [isLoaded, setIsLoaded] = useState(false); 

  // --- Carregar Dados do AsyncStorage ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('userData');
        if (dataString !== null) {
          const data = JSON.parse(dataString);
          setXp(data.xp || 0);
          setCompletedChallenges(data.completedChallenges || {}); 
          setUnlockedItems(data.unlockedItems || []);
          setFavorites(data.favorites || []); 
          setMoodLog(data.moodLog || []); 
          // Garantir que o 'equippedItems' sempre carregue como um objeto
          setEquippedItems(data.equippedItems || { color: null, accessory: null });
        }
      } catch (e) {
        console.error('Failed to load user data.', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // --- Salvar Dados no AsyncStorage ---
  useEffect(() => {
    if (isLoaded) {
      const saveData = async () => {
        try {
          // Salvar o 'equippedItems'
          const data = { xp, completedChallenges, unlockedItems, favorites, moodLog, equippedItems };
          await AsyncStorage.setItem('userData', JSON.stringify(data));
        } catch (e) {
          console.error('Failed to save user data.', e);
        }
      };
      saveData();
    }
  }, [xp, completedChallenges, unlockedItems, favorites, moodLog, equippedItems, isLoaded]); 

  // --- Funções Antigas ---

  const addXp = useCallback((amount) => {
    setXp((prevXp) => prevXp + amount);
  }, []);

  const markChallengeCompleted = useCallback((challengeId, difficulty) => {
    setCompletedChallenges((prev) => ({
      ...prev,
      [challengeId]: difficulty, 
    }));
  }, []);
  
  const getChallengeCompletion = useCallback((challengeId) => {
    return completedChallenges[challengeId] || null; 
  }, [completedChallenges]);
  
  const unlockItem = useCallback((itemId, cost) => {
    if (xp >= cost && !unlockedItems.includes(itemId)) {
      setXp((prevXp) => prevXp - cost);
      setUnlockedItems((prev) => [...prev, itemId]);
      return true; 
    }
    return false; 
  }, [xp, unlockedItems]);

  const isFavorite = useCallback((itemId) => {
    return favorites.includes(itemId);
  }, [favorites]);

  const toggleFavorite = useCallback((itemId) => {
    setFavorites((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const addMoodEntry = useCallback((emotion) => {
    const newEntry = {
      id: new Date().toISOString(), 
      emotion: emotion, 
      timestamp: Date.now(), 
    };
    setMoodLog((prev) => [newEntry, ...prev]);
  }, []);

  // --- 4. CONSTANTES MOVIDAS PARA DENTRO DO PROVIDER ---
  // (Para que as funções 'useCallback' abaixo tenham acesso a elas)
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
  // --- FIM DA MUDANÇA ---

  // --- Novas Funções (Equipar/Desequipar) ---

  const isEquipped = useCallback((itemId) => {
    return equippedItems.color === itemId || equippedItems.accessory === itemId;
  }, [equippedItems]);

  const equipItem = useCallback((itemId) => {
    let category = null;
    if (COLOR_TINTS[itemId]) { // <-- Agora isto funciona
      category = 'color';
    } else if (ACCESSORY_EMOJIS[itemId]) { // <-- E isto também
      category = 'accessory';
    }

    if (category) {
      setEquippedItems((prev) => ({
        ...prev,
        [category]: itemId, // Define o item para esta categoria
      }));
    }
  }, []); // As dependências são constantes, não precisam de estar no array

  const unequipItem = useCallback((itemId) => {
    let category = null;
    if (COLOR_TINTS[itemId]) { 
      category = 'color';
    } else if (ACCESSORY_EMOJIS[itemId]) {
      category = 'accessory';
    }

    if (category) {
      setEquippedItems((prev) => ({
        ...prev,
        [category]: null, // Limpa o item desta categoria
      }));
    }
  }, []);

  // 5. Retornar todos os valores no Provider
  return (
    <UserDataContext.Provider value={{ 
      xp, 
      completedChallenges, 
      unlockedItems, 
      addXp, 
      markChallengeCompleted, 
      getChallengeCompletion, 
      unlockItem,
      favorites,
      isFavorite,
      toggleFavorite,
      moodLog,
      addMoodEntry,
      
      // Novas funções e estados
      equippedItems,
      equipItem,
      unequipItem,
      isEquipped
    }}>
      {isLoaded ? children : null}
    </UserDataContext.Provider>
  );
};

// 6. Hook para usar o contexto
export const useUser = () => useContext(UserDataContext);