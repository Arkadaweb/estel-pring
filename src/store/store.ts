import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filter from './slices/filterSlice';
import bucket from './slices/bucketSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Define persist config
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['bucket'],
};

// Use combineReducers from Redux Toolkit to combine slices
const rootReducer = combineReducers({
	filter,
	bucket,
});

// Wrap your original reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a persistor
export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
