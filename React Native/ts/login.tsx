import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse {
  message?: string;
  [key: string]: unknown;
}

export default function App() {
  const [login, setLogin] = useState<boolean>(true);

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleUpdate = (
    key: keyof FormData,
    value: string,
  ): void => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));

    setError('');
  };

  const validate = (): string => {
    if (!login && !form.name.trim()) {
      return 'Name is required';
    }

    if (!form.email.trim()) {
      return 'Email is required';
    }

    if (!form.email.includes('@')) {
      return 'Enter a valid email';
    }

    if (!form.password) {
      return 'Password is required';
    }

    if (form.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (!login && !form.confirmPassword) {
      return 'Confirm password is required';
    }

    if (!login && form.password !== form.confirmPassword) {
      return 'Passwords do not match';
    }

    return '';
  };

  const loginUser = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://dummyjson.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: form.email.trim(),
            password: form.password,
          }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
      } else {
        Alert.alert(
          'Failed',
          data.message || 'Login unsuccessful',
        );
      }
    } catch (error: unknown) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://dummyjson.com/users/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
          }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Registration successful',
        );
      } else {
        Alert.alert(
          'Failed',
          data.message || 'Registration unsuccessful',
        );
      }
    } catch (error: unknown) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const submit = async (): Promise<void> => {
    const validationError: string = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (login) {
      await loginUser();
    } else {
      await registerUser();
    }
  };

  const switchMode = (): void => {
    setLogin(prev => !prev);
    setError('');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.title}>
            {login ? 'LOGIN' : 'REGISTER'}
          </Text>

          {!login && (
            <TextInput
              value={form.name}
              placeholder="Name"
              style={styles.input}
              onChangeText={value =>
                handleUpdate('name', value)
              }
            />
          )}

          <TextInput
            value={form.email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={value =>
              handleUpdate('email', value)
            }
          />

          <TextInput
            value={form.password}
            placeholder="Password"
            secureTextEntry={!showPass}
            style={styles.input}
            onChangeText={value =>
              handleUpdate('password', value)
            }
          />

          {!login && (
            <TextInput
              value={form.confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={!showPass}
              style={styles.input}
              onChangeText={value =>
                handleUpdate('confirmPassword', value)
              }
            />
          )}

          <TouchableOpacity
            onPress={() => setShowPass(prev => !prev)}
            style={styles.showButton}
          >
            <Text>
              {showPass
                ? 'Hide Password'
                : 'Show Password'}
            </Text>
          </TouchableOpacity>

          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}

          <Button
            title={login ? 'LOGIN' : 'REGISTER'}
            onPress={submit}
          />

          <TouchableOpacity
            onPress={switchMode}
            style={styles.switchButton}
          >
            <Text>
              {login
                ? "Don't have an account? REGISTER"
                : 'Already have an account? LOGIN'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },

  error: {
    color: 'red',
    marginBottom: 12,
  },

  showButton: {
    marginBottom: 15,
  },

  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});