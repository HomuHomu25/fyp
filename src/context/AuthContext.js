import React, { createContext, useReducer, useEffect, useContext } from 'react';
// For secure storage in real app, you might use:
// import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

const initialState = {
  isLoading: true,      // Loading token from storage
  isSignout: false,
  userToken: null,      // null means not signed in
};

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // TODO: Load token from secure storage on app start
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // TODO: Replace with real token retrieval from SecureStore or AsyncStorage
        // userToken = await SecureStore.getItemAsync('userToken');
        userToken = null; // Simulate no token at start
      } catch (e) {
        // Restoring token failed
        console.error('Failed to load token:', e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    // TODO: Replace signIn with real API call to backend
    signIn: async (data) => {
      // Simulate successful sign in and token retrieval
      // Replace below with API call and token from backend
      const dummyToken = 'dummy-auth-token';

      // TODO: Save token securely (e.g., SecureStore)
      // await SecureStore.setItemAsync('userToken', dummyToken);

      dispatch({ type: 'SIGN_IN', token: dummyToken });
    },

    // TODO: Replace signOut with real sign out logic and token removal
    signOut: async () => {
      // TODO: Remove token from secure storage
      // await SecureStore.deleteItemAsync('userToken');

      dispatch({ type: 'SIGN_OUT' });
    },

    // TODO: Replace signUp with real API call to backend
    signUp: async (data) => {
      // Simulate successful sign up and token retrieval
      const dummyToken = 'dummy-auth-token';

      // TODO: Save token securely
      // await SecureStore.setItemAsync('userToken', dummyToken);

      dispatch({ type: 'SIGN_IN', token: dummyToken });
    },

    userToken: state.userToken,
    isLoading: state.isLoading,
    isSignout: state.isSignout,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

// Custom hook for easy usage
export function useAuth() {
  return useContext(AuthContext);
}
