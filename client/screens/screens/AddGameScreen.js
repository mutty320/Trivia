// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://192.168.1.24:5000';

// export default function AddGameScreen() {
//   const [gameName, setGameName] = useState('');
//   const [category, setCategory] = useState('');
//   const [categoryList, setCategoryList] = useState([]);
//   const [questionText, setQuestionText] = useState('');
//   const [questionType, setQuestionType] = useState('');
//   const [numChoices, setNumChoices] = useState(null);
//   const [choices, setChoices] = useState([]);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Fetch categories when component mounts
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${SOCKET_SERVER_URL}/categories`);
//         setCategoryList(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();

//     // Initialize the socket connection
//     const newSocket = io(SOCKET_SERVER_URL);
//     setSocket(newSocket);

//     // Clean up socket connection on unmount
//     return () => {
//       if (newSocket) newSocket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     // Update choices array based on numChoices value
//     if (numChoices) {
//       const updatedChoices = Array.from({ length: numChoices }, (_, index) => choices[index] || '');
//       setChoices(updatedChoices);
//     } else {
//       setChoices([]);
//     }
//   }, [numChoices]);

//   // Add a new question to the temporary questions list
//   const handleAddQuestion = () => {
//     if (!questionText || !correctAnswer) {
//       alert('Please enter both question text and correct answer.');
//       return;
//     }

//     const newQuestion = {
//       questionText,
//       questionType,
//       choices: questionType === 'multipleChoice' ? choices.filter(choice => choice) : [],
//       correctAnswer,
//     };
//     setQuestions([...questions, newQuestion]);
//     setQuestionText('');
//     setChoices([]);
//     setCorrectAnswer('');
//     setNumChoices(null);
//   };

//   // Submit the game with all questions to the backend
//   const handleAddGame = async () => {
//     const token = await AsyncStorage.getItem('authToken');
//     try {
//       const response = await axios.post(
//         `${SOCKET_SERVER_URL}/trivia-games/add-game`,
//         { gameName, category, questions },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       socket.emit('newGameCreated', response.data);
//       console.log('Game added:', response.data);
//     } catch (error) {
//       console.error('Error adding game:', error.response?.data);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Game Name"
//         value={gameName}
//         onChangeText={setGameName}
//         style={styles.input}
//       />

//       <Picker
//         selectedValue={category}
//         onValueChange={(itemValue) => setCategory(itemValue)}
//         style={styles.input}
//       >
//         <Picker.Item label="Select Category" value="" />
//         {categoryList.map((cat) => (
//           <Picker.Item key={cat._id} label={cat.category} value={cat._id} />
//         ))}
//       </Picker>

//       <TextInput
//         placeholder="Question Text"
//         value={questionText}
//         onChangeText={setQuestionText}
//         style={styles.input}
//       />

//       <Picker
//         selectedValue={questionType}
//         onValueChange={(value) => {
//           setQuestionType(value);
//           setNumChoices(null);
//           setChoices([]);
//         }}
//         style={styles.input}
//       >
//         <Picker.Item label="Select Question Type" value="" />
//         <Picker.Item label="Multiple Choice" value="multipleChoice" />
//         <Picker.Item label="Open Text" value="openText" />
//       </Picker>

//       {questionType === 'multipleChoice' && (
//         <>
//           <Picker
//             selectedValue={numChoices}
//             onValueChange={(value) => setNumChoices(value)}
//             style={styles.input}
//           >
//             <Picker.Item label="Choose number of choices" value={null} />
//             {[2, 3, 4, 5].map(num => (
//               <Picker.Item key={num} label={`${num} Choices`} value={num} />
//             ))}
//           </Picker>

//           {choices.map((choice, index) => (
//             <TextInput
//               key={index}
//               placeholder={`Choice ${index + 1}`}
//               value={choice}
//               onChangeText={(text) => {
//                 const newChoices = [...choices];
//                 newChoices[index] = text;
//                 setChoices(newChoices);
//               }}
//               style={styles.input}
//             />
//           ))}
//         </>
//       )}

//       <TextInput
//         placeholder="Correct Answer"
//         value={correctAnswer}
//         onChangeText={setCorrectAnswer}
//         style={styles.input}
//       />

//       <Button title="Add Question" onPress={handleAddQuestion} />

//       <FlatList
//         data={questions}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.questionItem}>
//             <Text>{index + 1}. {item.questionText}</Text>
//             {item.questionType === 'multipleChoice' && item.choices.map((choice, i) => (
//               <Text key={i}>- {choice}</Text>
//             ))}
//             <Text>Correct Answer: {item.correctAnswer}</Text>
//           </View>
//         )}
//       />

//       <Button title="Submit Game" onPress={handleAddGame} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 8,
//   },
//   questionItem: {
//     marginVertical: 10,
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_SERVER_URL = 'http://192.168.1.24:5000';

export default function AddGameScreen() {
  const [gameName, setGameName] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [numChoices, setNumChoices] = useState(null);
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SOCKET_SERVER_URL}/categories`);
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (numChoices) {
      const updatedChoices = Array.from({ length: numChoices }, (_, index) => choices[index] || '');
      setChoices(updatedChoices);
    } else {
      setChoices([]);
    }
  }, [numChoices]);

  const handleAddQuestion = () => {
    if (!questionText || !correctAnswer) {
      alert('Please enter both question text and correct answer.');
      return;
    }

    const newQuestion = {
      questionText,
      questionType,
      choices: questionType === 'multipleChoice' ? choices.filter(choice => choice) : [],
      correctAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setChoices([]);
    setCorrectAnswer('');
    setNumChoices(null);
  };

  const handleAddGame = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await axios.post(
        `${SOCKET_SERVER_URL}/trivia-games/add-game`,
        { gameName, category, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Game added:', response.data);
    } catch (error) {
      console.error('Error adding game:', error.response?.data);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Game Name"
        value={gameName}
        onChangeText={setGameName}
        style={styles.input}
      />

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Category" value="" />
        {categoryList.map((cat) => (
          <Picker.Item key={cat._id} label={cat.category} value={cat._id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Question Text"
        value={questionText}
        onChangeText={setQuestionText}
        style={styles.input}
      />

      <Picker
        selectedValue={questionType}
        onValueChange={(value) => {
          setQuestionType(value);
          setNumChoices(null);
          setChoices([]);
        }}
        style={styles.input}
      >
        <Picker.Item label="Select Question Type" value="" />
        <Picker.Item label="Multiple Choice" value="multipleChoice" />
        <Picker.Item label="Open Text" value="openText" />
      </Picker>

      {questionType === 'multipleChoice' && (
        <>
          <Picker
            selectedValue={numChoices}
            onValueChange={(value) => setNumChoices(value)}
            style={styles.input}
          >
            <Picker.Item label="Choose number of choices" value={null} />
            {[2, 3, 4, 5].map(num => (
              <Picker.Item key={num} label={`${num} Choices`} value={num} />
            ))}
          </Picker>

          {choices.map((choice, index) => (
            <TextInput
              key={index}
              placeholder={`Choice ${index + 1}`}
              value={choice}
              onChangeText={(text) => {
                const newChoices = [...choices];
                newChoices[index] = text;
                setChoices(newChoices);
              }}
              style={styles.input}
            />
          ))}
        </>
      )}

      <TextInput
        placeholder="Correct Answer"
        value={correctAnswer}
        onChangeText={setCorrectAnswer}
        style={styles.input}
      />

      <Button title="Add Question" onPress={handleAddQuestion} />

      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionItem}>
            <Text>{index + 1}. {item.questionText}</Text>
            {item.questionType === 'multipleChoice' && item.choices.map((choice, i) => (
              <Text key={i}>- {choice}</Text>
            ))}
            <Text>Correct Answer: {item.correctAnswer}</Text>
          </View>
        )}
      />

      <Button title="Submit Game" onPress={handleAddGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  questionItem: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});
