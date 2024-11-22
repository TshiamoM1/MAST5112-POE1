import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Define props for the MenuItem component
type MenuItemProps = {
  item: {
    dishName: string;
    description: string;
    course: string;
    price: number;
    image: string; // Image URL
  };
};

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>Course: {item.course}</Text>
      <Text>Price: R{item.price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
