import * as React from "react";
import SnackBar from "react-native-snackbar-component";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
interface ContextValue {
  showSnackbar: (message: string, type: SnackbarType) => void;
}

type SnackbarType = "error" | "success" | "info";

const SnackbarContext = React.createContext<ContextValue>({
  showSnackbar: () => {},
});

function SnackbarProvider(props) {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<SnackbarType>("error");

  const backgroundColor =
    type === "error"
      ? theme.colors.error
      : type === "success"
      ? theme.colors.success
      : theme.colors.info;

  const showSnackbar = (message: string, type: SnackbarType) => {
    setMessage(message);
    setType(type);
    setVisible(true);
    setTimeout(() => setVisible(false), 1500);
  };

  const value = React.useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value} {...props}>
      {props.children}
      <SnackBar
        visible={visible}
        textMessage={message}
        actionHandler={() => setVisible(false)}
        actionText="zamknij"
        backgroundColor={backgroundColor}
        position="bottom"
        accentColor={theme.colors.lightText}
        messageColor={theme.colors.lightText}
        bottom={10}
        containerStyle={{
          marginLeft: 10,
          marginRight: 10,
          alignSelf: "center",
          borderRadius: 8,
        }}
      />
    </SnackbarContext.Provider>
  );
}

function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error(`useSnackbar must be used within a SnackbarProvider`);
  }
  return context;
}

export { SnackbarProvider, useSnackbar };
