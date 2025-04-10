import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import { createTransform } from 'redux-persist';

const nonSerializableTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState) => outboundState
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [nonSerializableTransform], 
  whitelist: ['splash', 'login', 'profile','signup','loginResponseData','chats'], 
  debug: true, 
};

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
