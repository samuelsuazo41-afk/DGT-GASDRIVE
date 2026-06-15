import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// NOMBRES SIN ACENTOS NI Ñ PARA QUE require() NO PETE
const TEMARIO = [
  { 
    id: 1, 
    titulo: "1. Senales de trafico", 
    pdf: require('./01_Senales_Tomo_I_RD_465_2025.pdf'),
    bloqueado: true
  },
  { 
    id: 2, 
    titulo: "2. Normas de circulacion", 
    pdf: require('./02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf'),
    bloqueado: true
  },
  { 
    id: 3, 
    titulo: "3. Primeros Auxilios", 
    pdf: require('./03_Manual_IX_Primeros_Auxilios_2025.pdf'),
    bloqueado: true
  },
  { 
    id: 4, 
    titulo: "4. Mecanica del vehiculo", 
    pdf: require('./04_Manual_VIII_Mecanica_2024.pdf'),
    bloqueado: true
  },
  { 
    id: 5, 
    titulo: "5. Medio Ambiente + Distintivos DGT", 
    pdf: require('./05_Medio_Ambiente_Distintivos_DGT_2025.pdf'),
    bloqueado: true
  }
];

export default function Temario() {
  const navigation = useNavigation();
  const isPremium = false; // déjalo en false para probar

  const handlePress = (item) => {
    if (item.bloqueado && !isPremium) {
      navigation.navigate('Paywall');
    } else {
      navigation.navigate('PDFViewer', { pdf: item.pdf, titulo: item.titulo });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={TEMARIO}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, item.bloqueado && !isPremium && styles.cardBloqueado]} 
            onPress={() => handlePress(item)}
          >
            <Text style={styles.titulo}>{item.titulo}</Text>
            {item.bloqueado && !isPremium ? (
              <Ionicons name="lock-closed" size={20} color="#999" />
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#00D9FF" />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0a' }, // Fondo oscuro como tu web
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#1a1a',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00D9FF',
  },
  cardBloqueado: {
    borderColor: '#333',
    opacity: 0.6,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  }
});