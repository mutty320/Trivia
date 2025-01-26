import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';
import he from 'he';

const decodeHtml = (html) => he.decode(html);

export default function FreeTriviaScreen() {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState('10');
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');
  const [category, setCategory] = useState('9');
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState(t('startGame'));
  const [language, setLanguage] = useState('en');
  const [correctSound, setCorrectSound] = useState(null);
  const [wrongSound, setWrongSound] = useState(null);
  const isFirstRender = useRef(true); // Track initial render


  useEffect(() => {
    const loadSounds = async () => {
      try {
        const correct = new Audio.Sound();
        const wrong = new Audio.Sound();

        await correct.loadAsync(require('../assets/correct-answer.mp3'));
        await wrong.loadAsync(require('../assets/wrong-answer.mp3'));

        setCorrectSound(correct);
        setWrongSound(wrong);
      } catch (error) {
        console.error('Error loading sounds:', error);
      }
    };

    loadSounds();

    return () => {
      if (correctSound) correctSound.unloadAsync();
      if (wrongSound) wrongSound.unloadAsync();
    };
  }, []);

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark as not the first render
      return; // Skip the effect on the first render
    }

    const timeout = setTimeout(() => {
        fetchQuestions();
    }, 5000); // Debounce API calls
  
    return () => clearTimeout(timeout); // Cleanup previous timeout

}, [amount, difficulty, type, category]);


  const playSound = async (sound) => {
    if (!sound) return;

    try {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleAnswer = async (questionIndex, selectedAnswer, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: { selected: selectedAnswer, correct: correctAnswer },
    }));

    if (selectedAnswer === correctAnswer) {
      await playSound(correctSound);
    } else {
      await playSound(wrongSound);
    }
  };

  const fetchQuestions = (async () => {
    console.log('fetchQuestions called');

    try {
      const response = await axios.get('http://localhost:5000/free-trivia', {
        params: { amount, category, difficulty, type },
      });

      let fetchedQuestions = response.data;

      // If Hebrew is selected, translate questions
      if (language === 'he') {
        fetchedQuestions = await Promise.all(
          fetchedQuestions.map(async (question) => {
            const translatedQuestion = await translateText(question.question, 'he');
            const translatedCorrectAnswer = await translateText(question.correct_answer, 'he');
            const translatedIncorrectAnswers = await Promise.all(
              question.incorrect_answers.map((answer) => translateText(answer, 'he'))
            );

            return {
              ...question,
              question: translatedQuestion,
              correct_answer: translatedCorrectAnswer,
              incorrect_answers: translatedIncorrectAnswers,
            };
          })
        );
      }

      setQuestions(fetchedQuestions);
      setButtonText(t('nextQuestion'));
    } catch (error) {
      console.error('Error fetching questions:', error.response?.data || error.message);
      setMessage(t('fetchError'));
    }
  });


  const translateText = async (text, targetLang) => {
    try {
      const response = await axios.post(`https://translation-api-url`, {
        q: text,
        target: targetLang,
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Error translating text:', error.message);
      return text; // fallback to original text if translation fails
    }
  };

  const renderQuestion = ({ item, index }) => {
    const answerState = selectedAnswers[index];
    const allAnswers = [...item.incorrect_answers, item.correct_answer].map((answer) =>
      decodeHtml(answer)
    );

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {index + 1}. {decodeHtml(item.question)}
        </Text>

        {allAnswers.map((answer, i) => {
          const isCorrect = answer === decodeHtml(item.correct_answer);
          const isSelected = answerState?.selected === answer;

          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleAnswer(index, answer, decodeHtml(item.correct_answer))}
              style={[
                styles.answerButton,
                isSelected && isCorrect ? styles.correct : null,
                isSelected && !isCorrect ? styles.wrong : null,
              ]}
            >
              <Text style={styles.answerText}>
                {i + 1}. {answer}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>

      <Picker
        selectedValue={language}
        onValueChange={(value) => {
          i18n.changeLanguage(value);
          setLanguage(value);
        }}
        style={styles.input}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="עברית" value="he" />
      </Picker>

      <Text>{t('numberOfQuestions')}:</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>{t('difficulty')}:</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(value) => setDifficulty(value)}
        style={styles.input}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      <Text>{t('type')}:</Text>
      <Picker
        selectedValue={type}
        onValueChange={(value) => setType(value)}
        style={styles.input}
      >
        <Picker.Item label="Multiple Choice" value="multiple" />
        <Picker.Item label="True / False" value="boolean" />
      </Picker>

      <Text>{t('category')}:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.input}
      >
        {triviaCategories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id.toString()} />
        ))}
      </Picker>

      <Button title={buttonText} onPress={fetchQuestions} />

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}

      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderQuestion}
        style={styles.questionList}
      />
    </View>
  );
}

const triviaCategories = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 13, name: 'Entertainment: Musicals & Theatres' },
  { id: 14, name: 'Entertainment: Television' },
  { id: 15, name: 'Entertainment: Video Games' },
  { id: 16, name: 'Entertainment: Board Games' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Entertainment: Comics' },
  { id: 30, name: 'Science: Gadgets' },
  { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
  { id: 32, name: 'Entertainment: Cartoon & Animations' },
];

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  questionContainer: { marginVertical: 10 },
  questionText: { fontSize: 18, marginBottom: 5 },
  answerButton: { backgroundColor: '#f0f0f0', padding: 10, marginVertical: 5, borderRadius: 5 },
  answerText: { fontSize: 16 },
  correct: { backgroundColor: 'green' },
  wrong: { backgroundColor: 'red' },
  errorMessage: { color: 'red', marginTop: 10 },
  questionList: { marginTop: 10 },
});
