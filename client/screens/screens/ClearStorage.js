import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClearStorage() {
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage cleared.');
    } catch (e) {
      console.error('Failed to clear AsyncStorage:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Clear Storage" onPress={clearStorage} />
      <Text>Press the button to clear all storage data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
