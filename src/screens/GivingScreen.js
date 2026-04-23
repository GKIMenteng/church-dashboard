import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import GivingProgress from '../components/GivingProgress';

export default function GivingScreen() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const funds = [
    { id: 1, name: 'General Tithes & Offerings' },
    { id: 2, name: 'Building Fund' },
    { id: 3, name: 'Missions & Outreach' },
    { id: 4, name: 'Benevolence Fund' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.gradient.end]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Sacred Giving</Text>
        <Text style={styles.headerSubtitle}>
          "Each one must give as he has decided in his heart"
        </Text>
        <Text style={styles.scriptureRef}>— 2 Corinthians 9:7</Text>
      </LinearGradient>

      <View style={styles.content}>
        <GivingProgress
          title="Building Fund Campaign"
          raised={75000}
          goal={100000}
          currency="$"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Give</Text>
          <View style={styles.amountGrid}>
            {predefinedAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.selectedAmount,
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text                  style={[
                    styles.amountText,
                    selectedAmount === amount && styles.selectedAmountText,
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.customAmountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Custom Amount"
              placeholderTextColor={colors.textLight}
              keyboardType="numeric"
              value={customAmount}
              onChangeText={setCustomAmount}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Fund</Text>
          {funds.map((fund) => (
            <TouchableOpacity key={fund.id} style={styles.fundCard}>
               <MaterialCommunityIcons name="hand-heart" size={24} color={colors.primary} />
              <Text style={styles.fundName}>{fund.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.giveButton}>
          <LinearGradient
            colors={[colors.secondary, colors.tertiary]}
            style={styles.giveButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.giveButtonText}>Proceed to Give</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoCard}>
           <MaterialCommunityIcons name="shield-check" size={32} color={colors.success} />
          <Text style={styles.infoTitle}>Secure & Encrypted</Text>
          <Text style={styles.infoText}>
            All transactions are processed securely with bank-level encryption
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  scriptureRef: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  amountButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedAmount: {
    borderColor: colors.secondary,
    backgroundColor: colors.primary,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  selectedAmountText: {
    color: '#fff',
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 10,
  },
  customInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: colors.text,
  },
  fundCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  fundName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 15,
  },
  giveButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  giveButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  giveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(46, 139, 87, 0.2)',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});