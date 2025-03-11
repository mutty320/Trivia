import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';

const ActiveGame = ({ route, navigation }) => {
  const { game } = route.params;

  if (!game) {
    return <Text>Error: No game data received.</Text>;
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const currentQuestion = game.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer.');
      return;
    }

    if (currentQuestionIndex < game.questions.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert('Game Over!', 'You completed all questions.');
      navigation.goBack(); // Go back to My Games or show results later
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{game.gameName}</Text>
      <Text>Question {currentQuestionIndex + 1} / {game.questions.length}</Text>

      <Text style={{ marginTop: 10, fontSize: 18 }}>{currentQuestion.questionText}</Text>

      <FlatList
        data={currentQuestion.choices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleAnswerSelect(item)}
            style={{
              backgroundColor: selectedAnswer === item ? '#6c5ce7' : '#dfe6e9',
              padding: 10,
              marginVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: selectedAnswer === item ? 'white' : 'black' }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Next" onPress={handleNextQuestion} />
    </View>
  );
};

export default ActiveGame;
