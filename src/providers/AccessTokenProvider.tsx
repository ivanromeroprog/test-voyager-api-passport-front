"use client";
import React, { createContext, useState, useContext } from "react";

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined
);

export const AccessTokenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error(
      "useAccessToken debe ser utilizado dentro de un AccessTokenProvider"
    );
  }
  return context;
};
