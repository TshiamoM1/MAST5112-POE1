import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default function HomeScreen({ navigation }: any) {
  const [menu, setMenu] = useState<any[]>([]);

  const calculateAveragePrice = (course: string) => {
    const filteredItems = menu.filter((item) => item.course === course);
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    return filteredItems.length ? (total / filteredItems.length).toFixed(2) : '0.00';
  };

  const removeItem = (index: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () =>
            setMenu((prevMenu) => prevMenu.filter((_, i) => i !== index)),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>
      <Button
        title="Add Menu Item"
        onPress={() => navigation.navigate('Add Menu Item', { setMenu })}
      />
      <FlatList
        data={menu}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Price: R{item.price.toFixed(2)}</Text>
            <Button
              title="Remove"
              onPress={() => removeItem(index)}
              color="red"
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Text style={styles.average}>Average Prices:</Text>
      <Text>Starters: {calculateAveragePrice('Starters')}</Text>
      <Text>Mains: {calculateAveragePrice('Mains')}</Text>
      <Text>Desserts: {calculateAveragePrice('Desserts')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  menuItem: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  dishName: { fontWeight: 'bold', fontSize: 18 },
  average: { marginTop: 16, fontSize: 18, fontWeight: 'bold' },
});
