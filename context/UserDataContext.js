import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Definir o estado inicial
const initialState = {
  xp: 0,
  completedChallenges: {}, 
  unlockedItems: [], 
  favorites: [],
  moodLog: [], // --- MUDANÇA: Adicionado o log de humor ---
};

// 2. Criar o Contexto
export const UserDataContext = createContext({
  ...initialState,
  addXp: (amount) => {},
  markChallengeCompleted: (challengeId, difficulty) => {},
  getChallengeCompletion: (challengeId) => null,
  unlockItem: (itemId, cost) => {},
  toggleFavorite: (itemId) => {},
  isFavorite: (itemId) => false,
  addMoodEntry: (emotion) => {}, // --- MUDANÇA: Adicionada função de humor ---
});

// 3. Criar o Provedor (Provider)
export const UserDataProvider = ({ children }) => {
  const [xp, setXp] = useState(initialState.xp);
  const [completedChallenges, setCompletedChallenges] = useState(initialState.completedChallenges); 
  const [unlockedItems, setUnlockedItems] = useState(initialState.unlockedItems);
  const [favorites, setFavorites] = useState(initialState.favorites); 
  const [moodLog, setMoodLog] = useState(initialState.moodLog); // --- MUDANÇA ---
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
          setMoodLog(data.moodLog || []); // --- MUDANÇA ---
        }
      } catch (e) {
        console.error('Failed to load user data.', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // --- Salvar Dados no AsyncStorage (sempre que algo mudar) ---
  useEffect(() => {
    if (isLoaded) {
      const saveData = async () => {
        try {
          // --- MUDANÇA: Salvar 'moodLog' também ---
          const data = { xp, completedChallenges, unlockedItems, favorites, moodLog };
          await AsyncStorage.setItem('userData', JSON.stringify(data));
        } catch (e) {
          console.error('Failed to save user data.', e);
        }
      };
      saveData();
    }
  }, [xp, completedChallenges, unlockedItems, favorites, moodLog, isLoaded]); // --- MUDANÇA ---

  // --- Funções para modificar os dados ---

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

  // --- MUDANÇA: Nova função para Adicionar Humor ---
  const addMoodEntry = useCallback((emotion) => {
    const newEntry = {
      id: new Date().toISOString(), // ID único
      emotion: emotion, // 'happy', 'sad', etc.
      timestamp: Date.now(), // Data/hora exata
    };
    // Adiciona o novo registro no INÍCIO do array
    setMoodLog((prev) => [newEntry, ...prev]);
  }, []);
  // --- FIM DA MUDANÇA ---


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
      // --- MUDANÇA: Exportar novas funções ---
      moodLog,
      addMoodEntry
      // --- FIM DA MUDANÇA ---
    }}>
      {isLoaded ? children : null}
    </UserDataContext.Provider>
  );
};

// 4. Criar o Hook customizado (useUser)
export const useUser = () => useContext(UserDataContext);