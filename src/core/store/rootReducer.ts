
// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../modules/auth/store/authSlice';
import processMiningReducer from '@/modules/process-mining/store/processMiningSlice'
import timeUnitReducer from '@/modules/process-mining/store/timeUnitSlice'
import themeReducer from './themeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  processMining: processMiningReducer,
  timeUnit: timeUnitReducer
  
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;