import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Signin from '../src/pages/auth/Signin';
import {oauthService,loginAuthService} from '../src/services/loginService';
import { AlertFunc } from '../src/components/Alert/Alert';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


jest.mock('../src/components/Alert/Alert',()=>({
  AlertFunc:jest.fn()
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    signInWithPopup: jest.fn().mockResolvedValueOnce({
      _tokenResponse: { email: 'user@cl.me', firstName: 'John', lastName: 'Doe' },
      providerId: 'google.com',
      user: { uid: '1234' },
    }),
  })),
  GoogleAuthProvider:jest.fn()
}));

jest.mock('../src/services/loginService',()=>({
  oauthService:jest.fn().mockResolvedValueOnce({ ok: true })
}))


const mockStore = configureStore([]);
const store = mockStore({});

describe('Signin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits form with empty data', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('name@cl.me');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /beer sign in/i });

    await user.click(submitButton);

    await waitFor(() => {
      expect(AlertFunc).toHaveBeenCalledWith('Please fill credentials', 'info', 2000);
    });
  });

  test('shows error on failed login', async () => {
    jest.mock('../src/services/loginService',()=>({
      loginAuthService:jest.fn().mockResolvedValueOnce({
        status: 401,
        json: async () => ({ message: 'Failed to login...' }),
      })
    }));
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('name@cl.me');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /beer sign in/i });

    await user.type(emailInput, 'user@cl.me');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(AlertFunc).toHaveBeenCalledWith('Failed to login', 'danger', 2000);
    });
  });

  test('handles OAuth login', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Router>
          <Signin />
        </Router>
      </Provider>
    );

    const googleButton = screen.getByRole('button', { name: /g sign in with google/i });
    await user.click(googleButton);

    await waitFor(() => {
      expect(AlertFunc).toHaveBeenCalledWith('User logged in successfully', 'success', 2000);
    });
  });
});