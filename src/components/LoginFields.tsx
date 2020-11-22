import React from "react";
import TextInput from "../components/TextInput";
import Box from "./Box";

interface LoginFieldsProps {
  handleChange: any;
  handleBlur: any;
  errors: any;
  touched: any;
}

const LoginFields: React.FC<LoginFieldsProps> = ({
  handleBlur,
  handleChange,
  errors,
  touched,
}) => {
  return (
    <Box width={250}>
      <TextInput
        icon="user"
        placeholder="Enter your full name"
        onChangeText={handleChange("fullName")}
        onBlur={handleBlur("fullName")}
        error={errors.fullName}
        touched={touched.fullName}
      />
      <TextInput
        icon="mail"
        placeholder="Enter your Email"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={errors.email}
        touched={touched.email}
      />
      <TextInput
        icon="lock"
        placeholder="Enter your Password"
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        error={errors.password}
        touched={touched.password}
      />
    </Box>
  );
};

export { LoginFields };
