import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  isLoading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (router.pathname !== "/") {
          if (user) {
            // Logged in...
            setUser(user);
            setIsLoading(false);
          } else {
            // Not logged in...
            setUser(null);
            setIsLoading(true);
            router.push("/login");
          }
        }

        setInitialLoading(false);
      }),
    [auth, router.pathname]
  );

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
      setIsLoading(false);
    } catch (error: any) {
      alert(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
      setIsLoading(false);
    } catch (error: any) {
      alert(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const memoizedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logout,
      error,
      isLoading,
    }),
    [user, isLoading, error]
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
