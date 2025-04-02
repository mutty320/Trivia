import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import socket from '../../services/socket';

const SERVER_URL = 'http://localhost:5000';

const MyGames = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/my-games`);
        const data = await response.json();

        if (response.ok) {
          setGames(data);
        } else {
          Alert.alert('Error', data.error || 'Failed to load games.');
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
        Alert.alert('Error', 'Something went wrong.');
      }
    };

    fetchGames();
  }, []);

  const handleSelectGame = (game) => {
    setSelectedGame(game); // ✅ Store the selected game
  };

  const handleStartGame = () => {
    if (!selectedGame) {
      Alert.alert('Select a game first.');
      return;
    }

    console.log("✅ Host starting game:", selectedGame);
    socket.emit('startGame', { gamePin: selectedGame.gamePin });

    // ✅ Pass the entire `game` object to ActiveGame
    navigation.navigate('ActiveGame', { game: selectedGame });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Games</Text>

      {games.length === 0 ? (
        <Text style={styles.noGames}>No games found.</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectGame(item)} style={[
              styles.gameItem,
              selectedGame?._id === item._id ? styles.selectedGame : null // ✅ Highlight selection
            ]}>
              <Text style={styles.gameName}>{item.gameName}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Start Game" onPress={handleStartGame} disabled={!selectedGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  noGames: { fontSize: 18, color: 'gray' },
  gameItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedGame: {
    backgroundColor: '#74b9ff', // ✅ Highlight selected game
  },
  gameName: { fontSize: 18 },
});

export default MyGames;
