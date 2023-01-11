import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import authReducer from "./state"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"


const presistConfig = {
  key: "root",
  storage,
  version: 1
}

const presistReduce = persistReducer(presistConfig, authReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
