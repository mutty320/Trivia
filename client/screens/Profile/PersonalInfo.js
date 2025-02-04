import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PersonalInfo = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Personal Info</Text>
      <Button title="Go to Billing Info" onPress={() => navigation.navigate('BillingInfo')} />
    </View>
  );
};

export default PersonalInfo;
