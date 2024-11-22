import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import

// Define the type for a menu item
type MenuItemType = {
  dishName: string;
  description: string;
  course: string;
  price: number;
};

export default function FilterScreen({ route }: any) {
  const { menu: initialMenu }: { menu: MenuItemType[] } = route.params;
  const [menu, setMenu] = useState<MenuItemType[]>(initialMenu); // Use state to manage menu
  const [filter, setFilter] = useState<string | null>(null);

  // Apply filter logic
  const filteredMenu = filter
    ? menu.filter((item: MenuItemType) => item.course === filter)
    : menu;

  // Remove item logic
  const removeItem = (index: number) => {
    setMenu((prevMenu) => prevMenu.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filter}
        onValueChange={(value: string | null) => setFilter(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Course to Filter" value={null} />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <FlatList
        data={filteredMenu}
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
        keyExtractor={(item, index) => `${item.dishName}-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  menuItem: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  dishName: { fontWeight: 'bold', fontSize: 18 },
});
