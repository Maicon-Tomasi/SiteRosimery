'use client'
import React, { createContext, useContext } from 'react';
import axios from 'axios';

import type { AxiosInstance } from 'axios';

type ApiContextType = {
  api: AxiosInstance;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const ApiProvider: React.FC<Props> = ({ children }) => {
  const api = axios.create({
    baseURL: 'https://localhost:7034/',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + localStorage.getItem('token'), 
    },
  });

  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};

const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext deve ser usado dentro de ApiProvider');
  }
  return context;
};


export { ApiProvider, useApiContext };