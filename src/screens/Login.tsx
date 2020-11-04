import React from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import Gradient from "react-native-css-gradient";
import TextInput from "../components/TextInput";
import { Button } from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";

interface LoginProps {}

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login: React.FC<LoginProps> = ({}) => {
  const gradient = `linear-gradient(33.36deg, #F19F00 42.25%, #C23232 86.63%)`;

  return (
    <Gradient
      gradient={gradient}
      style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
    >
      <Box height={120} alignItems="flex-start" marginLeft="l">
        <Text color="lightText" variant="header">
          Logowanie
        </Text>
      </Box>
      <Box
        borderTopLeftRadius="xl"
        width="100%"
        alignItems="center"
        justifyContent="center"
        height="70%"
        backgroundColor="mainBackground"
        borderTopRightRadius="xl"
      >
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <Box>
              <Box marginBottom="m">
                <TextInput
                  icon="mail"
                  placeholder="Enter your Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                />
              </Box>
              <TextInput
                icon="lock"
                placeholder="Enter your Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
              />
              <Box alignItems="center" marginTop="m">
                <Button onPress={handleSubmit} label="Zaloguj"></Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Gradient>
  );
};

export { Login };
