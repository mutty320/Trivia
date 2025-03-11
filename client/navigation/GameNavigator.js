import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Game Screens
import LandingPage from '../screens/Game/LandingPage';
import JoinOrCreate from '../screens/Game/JoinOrCreate';
import CreateGame from '../screens/Game/CreateGame';
import JoinGame from '../screens/Game/JoinGame';
import WaitingRoom from '../screens/Game/WaitingRoom';
import ActiveGame from '../screens/Game/ActiveGame';
import CreatedConfirmation from '../screens/Game/CreatedConfirmation';
import PlayOrCreate from '../screens/Game/PlayOrCreate';

// Game Settings Screens
import Category from '../screens/GameSettings/Category';
import Difficulty from '../screens/GameSettings/Difficulty';
import Timer from '../screens/GameSettings/Timer';
import Type from '../screens/GameSettings/Type';
import DefaultOrCustom from '../screens/GameSettings/DefaultOrCustom';
import CreateQuestions from '../screens/GameSettings/CreateQuestions';
import GameConfig from '../screens/GameSettings/GameConfig';

import Logout from '../screens/Auth/Logout';
import SignIn from '../screens/Auth/SignIn';
import SignInOrSignUp from '../screens/Auth/SignInOrSignUp';
import SignUp from '../screens/Auth/SignUp';

const Stack = createStackNavigator();

const GameNavigator = () => (
  <Stack.Navigator initialRouteName="LandingPage">
    <Stack.Screen name="LandingPage" component={LandingPage} />
    <Stack.Screen name="JoinOrCreate" component={JoinOrCreate} />
    <Stack.Screen name="CreateGame" component={CreateGame} />
    <Stack.Screen name="JoinGame" component={JoinGame} />
    <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
    <Stack.Screen name="ActiveGame" component={ActiveGame} />
    <Stack.Screen name="CreatedConfirmation" component={CreatedConfirmation} />
    <Stack.Screen name="PlayOrCreate" component={PlayOrCreate} />

    {/* Auth Screens */}

    <Stack.Screen name="Logout" component={Logout} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignInOrSignUp" component={SignInOrSignUp} />
    <Stack.Screen name="SignUp" component={SignUp} />

    {/* Game Settings Screens */}
    <Stack.Screen name="Category" component={Category} />
    <Stack.Screen name="Difficulty" component={Difficulty} />
    <Stack.Screen name="Timer" component={Timer} />
    <Stack.Screen name="Type" component={Type} />
    <Stack.Screen name="DefaultOrCustom" component={DefaultOrCustom} />
    <Stack.Screen name="CreateQuestions" component={CreateQuestions} />
    <Stack.Screen name="GameConfig" component={GameConfig} />
  </Stack.Navigator>
);

export default GameNavigator;
