import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SERVER_URL = 'http://192.168.1.24:5000';

const MyGames = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

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
    Alert.alert(
      'What would you like to do?',
      `Game: ${game.gameName}`,
      [
        {
          text: 'Host Multiplayer',
          onPress: () => {
            navigation.navigate('GameLobby', {
              gameId: game._id,
              gamePin: game.gamePin,
              hostId: user.userId
            });
          }
        },
        {
          text: 'Play Solo',
          onPress: () => {
            navigation.navigate('ActiveGame', {
              game
            });
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
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
            <TouchableOpacity onPress={() => handleSelectGame(item)} style={styles.gameItem}>
              <Text style={styles.gameName}>{item.gameName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  gameName: { fontSize: 18 },
});

export default MyGames;
