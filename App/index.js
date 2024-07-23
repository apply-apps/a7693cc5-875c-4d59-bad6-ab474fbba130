// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    // Simulate fetching menu from an API
    try {
      const menuData = [
        { id: '1', name: 'Espresso', price: 3 },
        { id: '2', name: 'Cappuccino', price: 4 },
        { id: '3', name: 'Latte', price: 4.5 },
        { id: '4', name: 'Mocha', price: 5 },
      ];
      setMenu(menuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = () => {
    setLoyaltyPoints(loyaltyPoints + 1);
    setOrder([]);
    alert('Order placed successfully!');
  };

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Coffee Shop</Text>
        <Text style={styles.subtitle}>Menu</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={menu}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>
                  {item.name} - ${item.price}
                </Text>
                <Button title="Add to Order" onPress={() => addToOrder(item)} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
        <Text style={styles.subtitle}>Order</Text>
        {order.length === 0 ? (
          <Text style={styles.emptyOrder}>No items in order</Text>
        ) : (
          order.map((item, index) => (
            <Text key={index} style={styles.orderText}>
              {item.name} - ${item.price}
            </Text>
          ))
        )}
        {order.length > 0 && <Button title="Place Order" onPress={placeOrder} />}
        <Text style={styles.subtitle}>Loyalty Points: {loyaltyPoints}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
  },
  emptyOrder: {
    fontStyle: 'italic',
  },
  orderText: {
    fontSize: 18,
    marginVertical: 3,
  },
});

export default App;