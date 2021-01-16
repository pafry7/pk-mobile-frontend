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
  icon?: string;
  touched?: boolean;
  error?: string;
  label?: string;
}

const SIZE = theme.borderRadii.m * 2;

const TextInput = ({
  icon,
  touched,
  error,
  label,
  ...props
}: TextInputProps) => {
  const reColor = !touched ? "secondaryText" : error ? "error" : "primaryText";
  const color = theme.colors[reColor];
  return (
    <Box
      flexDirection="row"
      height={props.multiline ? 120 : 48}
      alignItems={props.multiline ? null : "center"}
      borderRadius="s"
      borderWidth={StyleSheet.hairlineWidth}
      borderColor={reColor}
      marginBottom="s"
      padding="s"
    >
      {icon ? (
        <Box padding="s">
          <Icon name={icon} size={16} {...{ color }} />
        </Box>
      ) : null}
      <Box flex={1}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          // secureTextEntry={true}
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

export default TextInput;
