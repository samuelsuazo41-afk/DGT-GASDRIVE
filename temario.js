import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TEMARIO = [
  { 
    id: 1, 
    titulo: "1. Señales de tráfico", 
    pdf: require('./01_Señales_Tomo_I_RD_465_2025.pdf'),
    bloqueado: true
  },
  { 
    id: 2, 
    titulo: "2. Normas de circulación", 
    pdf: require('./02_Normas_Circulacion_Tomo_II_Edicio_2024.pdf'),
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
    titulo: "4. Mecánica del vehículo", 
    pdf: require('./04_Manual_VIII_Mecanica_2024.pdf'),
    bloqueado: true
  },
  { 
    id: 5, 
    titulo: "5. Medio Ambiente + Distintivos DGT", 
    pdf: require('./05_Medio_Ambiente_Distintius_DGT_2025.pdf'),
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
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Ionicons name="lock-closed" size={20} color="#999" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '500',
  }
});
