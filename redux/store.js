import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import { createTransform } from 'redux-persist';

// Fix: Ensure correct transformation
const nonSerializableTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState) => outboundState
);

// Fix: Ensure reducer names in whitelist are correct
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [nonSerializableTransform], 
  whitelist: ['splash', 'login', 'profile','signup','loginResponseData'], 
  debug: true, 
};

// Fix: Ensure persistReducer is used correctly
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], 
      },
    }),
});

export const persistor = persistStore(store);
