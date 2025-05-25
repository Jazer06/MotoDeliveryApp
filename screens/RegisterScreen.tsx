import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { register } = useAuth(); // используем настоящий register из контекста
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('Начало регистрации');
    console.log('Данные пользователя:', { name, email, password, role_id: 2 });

    if (!name || !email || !password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    setLoading(true);

    try {
      console.log('Отправка запроса на регистрацию...');
      await register(name, email, password, 2); // роль user
      console.log('Регистрация успешна');

      Alert.alert('Успех', 'Вы зарегистрировались!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error: any) {
      console.error('Ошибка регистрации:', error.message);
      console.error('Детали ошибки:', error);

      let errorMessage = 'Не удалось зарегистрироваться';

      if (error.response?.data?.errors) {
        // Выводим ошибки валидации Laravel
        const validationErrors = Object.values(error.response.data.errors).flat();
        errorMessage = validationErrors.join('\n');
      } else if (error.request) {
        errorMessage = 'Нет соединения с сервером';
      }

      Alert.alert('Ошибка', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Регистрация</Text>

      <TextInput
        placeholder="Имя"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
      />

      <Button title={loading ? 'Регистрация...' : 'Зарегистрироваться'} onPress={handleRegister} disabled={loading} />
      <Button title="Войти" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default RegisterScreen;