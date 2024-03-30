'use client';
import React, { createContext, useContext, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useAccessToken } from './AccessTokenProvider';
import { createAxiosInstances } from '@/lib/services';

interface AxiosProviderProps {
  children: React.ReactNode;
}

interface AxiosContextType {
  axiosApiInstance: AxiosInstance;
  axiosApiAccessTokenInstance: AxiosInstance;
  axiosAppInstance: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextType | null>(null);

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
};

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const { accessToken } = useAccessToken();

  let  data = createAxiosInstances(accessToken);

  useEffect(() => {

    let {axiosApiAccessTokenInstance} = createAxiosInstances(accessToken);
    data.axiosApiAccessTokenInstance = axiosApiAccessTokenInstance;

  }, [accessToken])


  return (
    <AxiosContext.Provider value={data}>
      {children}
    </AxiosContext.Provider>
  );
};
