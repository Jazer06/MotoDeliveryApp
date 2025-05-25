import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Добро пожаловать, {user?.name}</Text>
      <Text>Роль: {user?.role}</Text>
      <Button title="Выйти" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;