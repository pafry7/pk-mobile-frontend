import * as React from "react";
import * as auth from "../auth-provider";
import * as SplashScreen from "expo-splash-screen";

interface ContextValue {
  user: any;
  login: (form: any) => Promise<void>;
  logout: () => void;
  register: (form: any) => Promise<void>;
}

const AuthContext = React.createContext<ContextValue>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  console.log(" i am in auth context", isLoading, user);

  async function bootstrapAppData() {
    try {
      await SplashScreen.preventAutoHideAsync();
      let user = null;

      const token = await auth.getToken();
      console.log({ token });
      if (token) {
        const data = await auth.me(token);
        user = data;
      }
      setUser(user);
      setIsLoading(false);
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    bootstrapAppData();
  }, []);

  const login = React.useCallback(
    (form) => auth.login(form).then((user) => setUser(user)),
    [setUser]
  );
  const register = React.useCallback(
    (form) => auth.register(form).then((user) => setUser(user)),
    [setUser]
  );
  const logout = React.useCallback(() => {
    auth.logout();
    setUser(null);
  }, [setUser]);

  const value = React.useMemo(() => ({ user, login, logout, register }), [
    login,
    logout,
    register,
    user,
  ]);

  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
