// screens/RewardsScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
   
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserDataContext'; // Importar o hook useUser

// Lista de Recompensas
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
const RewardItem = ({ item, xp, onBuy, isOwned, isEquipped, onEquip, onUnequip, theme, t }) => {
  const style = styles(theme);
  const canAfford = xp >= item.cost;
  
  return (
    <View style={style.itemContainer}>
      <Text style={style.itemIcon}>{item.icon}</Text>
      <View style={style.itemDetails}>
        <Text style={style.itemTitle}>{t(item.titleKey)}</Text>
        <Text style={style.itemCost}>{t('rewards_cost', { cost: item.cost })}</Text>
      </View>

      {/* --- LÓGICA DOS BOTÕES ATUALIZADA --- */}
      {isOwned ? (
        isEquipped ? (
          // Já tem e está equipado -> Botão "Remover"
          <TouchableOpacity
            style={[style.buyButton, style.buyButtonOwned]} // Botão cinza
            onPress={() => onUnequip(item.id)}
          >
            <Text style={style.buyButtonText}>{t('rewards_unequip_button')}</Text>
          </TouchableOpacity>
        ) : (
          // Já tem, mas não está equipado -> Botão "Equipar"
          <TouchableOpacity
            style={style.buyButton} // Botão azul
            onPress={() => onEquip(item.id)}
          >
            <Text style={style.buyButtonText}>{t('rewards_equip_button')}</Text>
          </TouchableOpacity>
        )
      ) : (
        // Não tem o item -> Lógica de "Comprar"
        <TouchableOpacity
          style={[
            style.buyButton,
            !canAfford && style.buyButtonDisabled, // Botão desativado
          ]}
          disabled={!canAfford}
          onPress={() => onBuy(item)}
        >
          <Text style={style.buyButtonText}>
            {t('rewards_buy_button')}
          </Text>
        </TouchableOpacity>
      )}
      {/* --- FIM DA LÓGICA DOS BOTÕES --- */}

    </View>
  );
};

// Tela Principal da Loja
const RewardsScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const style = styles(theme);

  // Pegar TODAS as funções e estados necessários do Contexto
  const { 
    xp, 
    unlockedItems, 
    unlockItem, 
    equipItem, 
    unequipItem, 
    isEquipped 
  } = useUser();

  // Função de Compra
  const handleBuyItem = (item) => {
    const success = unlockItem(item.id, item.cost);

    if (success) {
      Alert.alert(
        t('rewards_buy_success_title'), 
        t('rewards_buy_success_message', { item: t(item.titleKey) })
      );
      // Equipa automaticamente ao comprar
      equipItem(item.id);
    } else {
      Alert.alert(
        t('rewards_buy_fail_title'),
        t('rewards_buy_fail_message')
      );
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={REWARDS_LIST}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<StoreHeader xp={xp} theme={theme} t={t} />}
        // Passar as novas props para o 'renderItem'
        renderItem={({ item }) => (
          <RewardItem
            item={item}
            xp={xp}
            onBuy={handleBuyItem}
            isOwned={unlockedItems.includes(item.id)}
            isEquipped={isEquipped(item.id)} // <--- NOVO
            onEquip={equipItem}               // <--- NOVO
            onUnequip={unequipItem}             // <--- NOVO
            theme={theme}
            t={t}
          />
        )}
        contentContainerStyle={style.listContainer}
      />
    </SafeAreaView>
  );
};

// Estilos
const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    // Espaço no fundo para o Poti não tapar o último item
    paddingBottom: 140, 
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
    backgroundColor: theme.primary, // Botão "Equipar" ou "Comprar"
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buyButtonOwned: {
    backgroundColor: theme.subtleText, // Cinza para "Remover"
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