import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BillingInfo = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Billing Info</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default BillingInfo;
