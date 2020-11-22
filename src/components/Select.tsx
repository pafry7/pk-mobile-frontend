import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import theme from "../common/theme";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface SelectProps {
  handleChange: any;
  icon: string;
  touched?: boolean;
  error?: string;
  items: Array<{ label: string; value: string }>;
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  handleChange,
  icon,
  touched,
  error,
  items,
  placeholder,
}) => {
  const reColor = !touched ? "secondaryText" : error ? "error" : "primaryText";
  const color = theme.colors[reColor];
  return (
    <RNPickerSelect
      onValueChange={handleChange("course")}
      placeholder={{
        label: placeholder,
        value: "",
        color: theme.colors.secondaryText,
      }}
      style={{
        ...pickerSelectStyles,
        iconContainer: {
          top: theme.spacing.m,
          left: theme.spacing.m,
        },
      }}
      items={items}
      Icon={() => <Feather name={icon} size={16} {...{ color }} />}
    />
  );
};

const styles = StyleSheet.create({
  select: {
    height: 48,
    borderRadius: theme.borderRadii.s,
    paddingLeft: theme.spacing.xl,
    padding: theme.spacing.s,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.secondaryText,
    marginBottom: theme.spacing.s,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styles.select,
  },
  inputAndroid: {
    ...styles.select,
  },
});

export { Select };
