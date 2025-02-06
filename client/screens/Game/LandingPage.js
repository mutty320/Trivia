// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const LandingPage = () => {
//   const navigation = useNavigation();

//   return (
//     <View>
//       <Text>Landing Page</Text>
//       <Button title="Multiple players" onPress={() => navigation.navigate('JoinOrCreate')} />
//       <Button title="Single player" onPress={() => navigation.navigate('DefaultOrCustom')} />
//     </View>
//   );
// };

// export default LandingPage;

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Landing Page</Text>
      <Button title="Open Profile Menu" onPress={() => navigation.openDrawer()} />
      <Button title="Multiple players" onPress={() => navigation.navigate('JoinOrCreate')} />
      <Button title="Single player" onPress={() => navigation.navigate('Category')} />
    </View>
  );
};

export default LandingPage;
