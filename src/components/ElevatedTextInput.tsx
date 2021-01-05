import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import Box from "./Box";
import theme from "../common/theme";

interface TextInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: string;
}

const SIZE = theme.borderRadii.m * 2;

const ElevatedTextInput = ({
  icon,
  touched,
  error,
  ...props
}: TextInputProps) => {
  const reColor = "primaryText";
  const color = theme.colors[reColor];
  return (
    <Box
      flexDirection="row"
      height={48}
      alignItems="center"
      borderRadius="s"
      backgroundColor="tabBackground"
      padding="s"
      shadowColor="primaryText"
      shadowOffset={{
        width: 0,
        height: 3,
      }}
      shadowOpacity={0.27}
      shadowRadius={4.65}
      elevation={6}
    >
      <Box padding="s">
        <Icon name={icon} size={16} {...{ color }} />
      </Box>
      <Box flex={1}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...props}
        />
      </Box>
      {touched && (
        <Box
          height={SIZE}
          width={SIZE}
          borderRadius="m"
          justifyContent="center"
          alignItems="center"
          backgroundColor={!error ? "success" : "error"}
        >
          <Icon name={!error ? "check" : "x"} color="white" size={16} />
        </Box>
      )}
    </Box>
  );
};

export default ElevatedTextInput;
