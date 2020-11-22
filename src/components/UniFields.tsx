import React from "react";
import TextInput from "../components/TextInput";
import { Select } from "../components/Select";
import Box from "./Box";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";

interface UniFieldsProps {
  handleChange: any;
  handleBlur: any;
  errors: any;
  touched: any;
}

const UniFields: React.FC<UniFieldsProps> = ({
  handleBlur,
  handleChange,
  errors,
  touched,
}): JSX.Element => {
  const theme = useTheme<Theme>();

  const courses = [
    { label: "Informatyke", value: "informatyka" },
    { label: "Matematyka", value: "matematyka" },
  ];
  const labs = [
    { label: "Lab 1", value: "lab1" },
    { label: "Lab 2", value: "lab2" },
  ];
  const classes = [
    { label: "Grupa 1", value: "1" },
    { label: "Grupa 2", value: "2" },
  ];

  return (
    <Box width={250}>
      <Select
        icon="heart"
        placeholder="Enter your course"
        items={courses}
        handleChange={() => handleChange("course")}
        error={errors.course}
        touched={touched.course}
      />
      <Select
        icon="bar-chart-2"
        placeholder="Enter your class group"
        items={classes}
        handleChange={() => handleChange("exerciseGroup")}
        error={errors.exerciseGroup}
        touched={touched.exerciseGroup}
      />
      <Select
        icon="code"
        placeholder="Enter your lab group"
        items={labs}
        handleChange={() => handleChange("laboratoryGroup")}
        error={errors.laboratoryGroup}
        touched={touched.laboratoryGroup}
      />
    </Box>
  );
};

export { UniFields };
