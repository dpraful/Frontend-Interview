import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

const API_URL = 'https://your-api.com';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (key, value) => {
    setForm({...form, [key]: value});
    setError('');
  };

  // 1. VALIDATE
  const validate = () => {
    if (!isLogin && !form.name.trim())
      return 'Name is required';

    if (!form.email.trim())
      return 'Email is required';

    if (!form.email.includes('@'))
      return 'Invalid email';

    if (form.password.length < 6)
      return 'Password must be at least 6 characters';

    if (!isLogin && form.password !== form.confirmPassword)
      return 'Passwords do not match';

    return '';
  };

  // 2. LOGIN API
  const loginUser = async () => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: form.email.trim(),
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || 'Login failed');

    Alert.alert('Success', 'Login successful');
  };

  // 3. REGISTER API
  const registerUser = async () => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || 'Registration failed');

    Alert.alert('Success', 'Registration successful');
    switchMode();
  };

  // 4. SUBMIT
  const submit = async () => {
    const message = validate();

    if (message) {
      setError(message);
      return;
    }

    setLoading(true);

    try {
      if (isLogin)
        await loginUser();
      else
        await registerUser();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. SWITCH LOGIN / REGISTER
  const switchMode = () => {
    setIsLogin(!isLogin);

    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    setError('');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {isLogin ? 'Login' : 'Register'}
      </Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={v => update('name', v)}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={v => update('email', v)}
      />

      <View style={styles.password}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={v => update('password', v)}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={form.confirmPassword}
          onChangeText={v => update('confirmPassword', v)}
        />
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {isLogin && (
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={submit}>

        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </Text>
        )}

      </TouchableOpacity>

      <TouchableOpacity onPress={switchMode}>
        <Text style={styles.link}>
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  password: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  passwordInput: {
    flex: 1,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },

  link: {
    color: '#2563eb',
    textAlign: 'center',
    marginVertical: 10,
  },

  button: {
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
