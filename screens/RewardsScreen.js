// screens/RewardsScreen.js
import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext'; // 1. Importar o hook useUser

// 2. Lista de Recompensas (como planejamos)
// Adicionamos 'titleKey' para tradução e 'icon'
const REWARDS_LIST = [
  // Categoria: Acessórios
  { id: 'oculos_sol', cost: 100, titleKey: 'reward_sunglasses', icon: '🕶️' },
  { id: 'laco', cost: 100, titleKey: 'reward_bow', icon: '🎀' },
  { id: 'oculos_grau', cost: 250, titleKey: 'reward_glasses', icon: '🤓' },
  { id: 'bigode', cost: 250, titleKey: 'reward_mustache', icon: '🥸' },
  { id: 'fones', cost: 300, titleKey: 'reward_headphones', icon: '🎧' },
  
  // Categoria: Chapéus
  { id: 'chapeu_mago', cost: 150, titleKey: 'reward_wizard_hat', icon: '🧙' },
  { id: 'coroa', cost: 150, titleKey: 'reward_crown', icon: '👑' },
  { id: 'cartola', cost: 150, titleKey: 'reward_top_hat', icon: '🎩' },
  { id: 'chapeu_detetive', cost: 300, titleKey: 'reward_detective_hat', icon: '🕵️' },
  { id: 'aureola', cost: 500, titleKey: 'reward_halo', icon: '😇' },
  
  // Categoria: Cores (tint)
  { id: 'cor_vermelha', cost: 200, titleKey: 'reward_color_red', icon: '🟥' },
  { id: 'cor_verde', cost: 200, titleKey: 'reward_color_green', icon: '🟩' },
  { id: 'cor_roxa', cost: 200, titleKey: 'reward_color_purple', icon: '🟪' },
  { id: 'cor_arcoiris', cost: 400, titleKey: 'reward_color_rainbow', icon: '🌈' },
  { id: 'cor_dourada', cost: 400, titleKey: 'reward_color_gold', icon: '✨' },
];

// Componente para o Header da Loja
const StoreHeader = ({ xp, theme, t }) => {
  const style = styles(theme);
  return (
    <View style={style.headerContainer}>
      <Text style={style.headerTitle}>{t('rewards_title')}</Text>
      <View style={style.xpBadge}>
        <Text style={style.xpText}>{t('rewards_my_xp')}: {xp} 🏆</Text>
      </View>
    </View>
  );
};

// Componente para cada Item da Loja
const RewardItem = ({ item, xp, onBuy, isOwned, theme, t }) => {
  const style = styles(theme);
  const canAfford = xp >= item.cost;
  
  return (
    <View style={style.itemContainer}>
      <Text style={style.itemIcon}>{item.icon}</Text>
      <View style={style.itemDetails}>
        <Text style={style.itemTitle}>{t(item.titleKey)}</Text>
        <Text style={style.itemCost}>{t('rewards_cost', { cost: item.cost })}</Text>
      </View>
      <TouchableOpacity
        style={[
          style.buyButton,
          isOwned && style.buyButtonOwned,
          !isOwned && !canAfford && style.buyButtonDisabled,
        ]}
        disabled={isOwned || !canAfford}
        onPress={() => onBuy(item)}
      >
        <Text style={style.buyButtonText}>
          {isOwned ? t('rewards_owned_button') : t('rewards_buy_button')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Tela Principal da Loja
const RewardsScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  // 3. Pegar os dados e funções do Contexto
  const { xp, unlockedItems, unlockItem } = useUser();

  // 4. Lógica de Compra
  const handleBuyItem = (item) => {
    // Tenta comprar o item
    const success = unlockItem(item.id, item.cost);

    if (success) {
      Alert.alert(
        t('rewards_buy_success_title'), 
        t('rewards_buy_success_message', { item: t(item.titleKey) })
      );
    } else {
      Alert.alert(
        t('rewards_buy_fail_title'),
        t('rewards_buy_fail_message')
      );
    }
  };

  return (
    <View style={style.container}>
      <FlatList
        data={REWARDS_LIST}
        keyExtractor={(item) => item.id}
        // 5. Renderiza o Header com o XP
        ListHeaderComponent={<StoreHeader xp={xp} theme={theme} t={t} />}
        // 6. Renderiza cada item
        renderItem={({ item }) => (
          <RewardItem
            item={item}
            xp={xp}
            onBuy={handleBuyItem}
            isOwned={unlockedItems.includes(item.id)}
            theme={theme}
            t={t}
          />
        )}
        contentContainerStyle={style.listContainer}
      />
    </View>
  );
};

// 7. Estilos
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    paddingBottom: 40,
  },
  // Header
  headerContainer: {
    backgroundColor: theme.card,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  xpBadge: {
    backgroundColor: theme.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  xpText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Item da Loja
  itemContainer: {
    backgroundColor: theme.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  itemIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  itemCost: {
    fontSize: 16,
    color: theme.primary,
    fontWeight: '500',
  },
  buyButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buyButtonOwned: {
    backgroundColor: theme.subtleText,
  },
  buyButtonDisabled: {
    backgroundColor: theme.card,
    borderColor: theme.subtleText,
    borderWidth: 1,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default RewardsScreen;