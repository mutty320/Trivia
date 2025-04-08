import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker'; // or use dropdown from any other UI lib

const SERVER_URL = 'http://192.168.1.24:5000';

const HostGame = ({ navigation }) => {
  const { user } = useAuth();
  const [myGames, setMyGames] = useState([]);
  const [publicCategories, setPublicCategories] = useState(['General', 'Events', 'Entertainment', 'Jewish']);
  const [selectedMyGame, setSelectedMyGame] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGames = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/my-games`);
        const data = await response.json();

        if (response.ok) {
          setMyGames(data);
        } else {
          Alert.alert('Error', data.error || 'Could not load your games.');
        }
      } catch (err) {
        Alert.alert('Error', 'Server error.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyGames();
  }, []);

  const handleStartMyGame = () => {
    if (!selectedMyGame) return;
    navigation.navigate('GameLobby', {
      gameId: selectedMyGame._id,
      gamePin: selectedMyGame.gamePin,
      hostId: user.userId
    });
  };

  const handleStartPublicGame = async () => {
    if (!selectedCategory) return;

    try {
      const response = await fetch(`${SERVER_URL}/public-games?category=${selectedCategory}`);
      const game = await response.json();

      if (!response.ok) throw new Error('Game not found');

      navigation.navigate('GameLobby', {
        gameId: game._id,
        gamePin: game.gamePin,
        hostId: user.userId
      });
    } catch (err) {
      Alert.alert('Error', 'Could not start a public game.');
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>🎯 Host a Game</Text>

      {/* Host from your own games */}
      {myGames.length > 0 && (
        <>
          <Text>Your games:</Text>
          <Picker
            selectedValue={selectedMyGame}
            onValueChange={(itemValue) => setSelectedMyGame(itemValue)}
          >
            <Picker.Item label="Select a game..." value="" />
            {myGames.map(game => (
              <Picker.Item key={game._id} label={game.gameName} value={game} />
            ))}
          </Picker>
          <Button title="Start My Game" onPress={handleStartMyGame} />
        </>
      )}

      {/* Host from public category */}
      <Text>Or choose a public game category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Select a category..." value="" />
        {publicCategories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <Button title="Start Public Game" onPress={handleStartPublicGame} />
    </View>
  );
};

export default HostGame;
