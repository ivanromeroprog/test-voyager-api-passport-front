"use client";
import React, { createContext, useState, useContext } from "react";

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// 1. Crear el contexto
const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined
);

// 2. Crear el proveedor del contexto
export const AccessTokenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

// 3. Consumir el contexto
export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error(
      "useAccessToken debe ser utilizado dentro de un AccessTokenProvider"
    );
  }
  return context;
};
