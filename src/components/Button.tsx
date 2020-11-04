import {
  AllProps,
  backgroundColor,
  border,
  spacing,
  useRestyle,
  useTheme,
} from "@shopify/restyle";
import { Theme } from "../common/theme";
import Box from "./Box";
import Text from "./Text";
import React from "react";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";

const restyleFunctions = [spacing, border, backgroundColor];

type Props = AllProps<Theme> & {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  onPress,
  label,
  disabled,
  loading,
  ...rest
}: Props): JSX.Element => {
  const props = useRestyle(restyleFunctions, rest);
  const theme = useTheme<Theme>();

  const backgroundColor = disabled
    ? "buttonLightBackground"
    : "buttonPrimaryBackground";

  const color = disabled ? "secondaryText" : "lightText";

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
      disabled={disabled}
    >
      <Box
        width={250}
        height={50}
        backgroundColor={backgroundColor}
        justifyContent="center"
        alignItems="center"
        borderRadius="s"
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={theme.colors.lightText}
            testID="loading-indicator"
          />
        ) : (
          <Text variant="buttonLabel" color={color}>
            {label}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export { Button };
