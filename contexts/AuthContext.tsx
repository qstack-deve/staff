"use client";

import React, { createContext, useContext } from "react";
import { AuthUserType } from "@/lib/types/user.types";
import { useGetUser } from "@/lib/hooks/account.hook";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: AuthUserType | null;
  loading: boolean;
  refreshUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading: loading, refetch } = useGetUser();
  const queryClient = useQueryClient();
  // console.log(user);

  const logout = () => {
    queryClient.setQueryData(["profile"], null);
    queryClient.removeQueries({ queryKey: ["profile"] });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading,
        refreshUser: refetch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
