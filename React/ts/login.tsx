import React, { useState } from 'react';
import './App.css';

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

    if (
      !login &&
      form.password !== form.confirmPassword
    ) {
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
        alert('Login successful');
      } else {
        alert(
          data.message || 'Login unsuccessful',
        );
      }
    } catch (error: unknown) {
      console.error(error);
      alert('Something went wrong');
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
        alert('Registration successful');
      } else {
        alert(
          data.message ||
            'Registration unsuccessful',
        );
      }
    } catch (error: unknown) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const submit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

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
    <div className="container">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <form
          className="auth-card"
          onSubmit={submit}
        >
          <h1>
            {login ? 'LOGIN' : 'REGISTER'}
          </h1>

          {!login && (
            <input
              type="text"
              value={form.name}
              placeholder="Name"
              onChange={event =>
                handleUpdate(
                  'name',
                  event.target.value,
                )
              }
            />
          )}

          <input
            type="email"
            value={form.email}
            placeholder="Email"
            autoComplete="email"
            onChange={event =>
              handleUpdate(
                'email',
                event.target.value,
              )
            }
          />

          <input
            type={
              showPass ? 'text' : 'password'
            }
            value={form.password}
            placeholder="Password"
            autoComplete={
              login
                ? 'current-password'
                : 'new-password'
            }
            onChange={event =>
              handleUpdate(
                'password',
                event.target.value,
              )
            }
          />

          {!login && (
            <input
              type={
                showPass ? 'text' : 'password'
              }
              value={form.confirmPassword}
              placeholder="Confirm Password"
              autoComplete="new-password"
              onChange={event =>
                handleUpdate(
                  'confirmPassword',
                  event.target.value,
                )
              }
            />
          )}

          <button
            type="button"
            className="show-button"
            onClick={() =>
              setShowPass(prev => !prev)
            }
          >
            {showPass
              ? 'Hide Password'
              : 'Show Password'}
          </button>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="submit-button"
          >
            {login ? 'LOGIN' : 'REGISTER'}
          </button>

          <button
            type="button"
            className="switch-button"
            onClick={switchMode}
          >
            {login
              ? "Don't have an account? REGISTER"
              : 'Already have an account? LOGIN'}
          </button>
        </form>
      )}
    </div>
  );
}
