import React, { useRef } from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import Gradient from "react-native-css-gradient";
import Dot from "../components/Dot";
import { LoginFields } from "../components/LoginFields";
import { UniFields } from "../components/UniFields";
import { Button } from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, { divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";
import { Dimensions } from "react-native";
import { useAuth } from "../context/auth-context";

interface RegisterProps {}

const { width, height } = Dimensions.get("window");

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  fullName: Yup.string().required(),
  course: Yup.string().required(),
  exerciseGroup: Yup.string().required(),
  laboratoryGroup: Yup.string(),
});

const Register: React.FC<RegisterProps> = ({}) => {
  const { register } = useAuth();
  const gradient = `linear-gradient(33.36deg, #F19F00 42.25%, #C23232 86.63%)`;
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();

  const test = [LoginFields, UniFields];

  return (
    <Gradient
      gradient={gradient}
      style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
    >
      <Box height={120} alignItems="flex-start" marginLeft="l">
        <Text color="lightText" variant="header">
          Rejestracja
        </Text>
      </Box>
      <Box
        borderTopLeftRadius="xl"
        backgroundColor="mainBackground"
        borderTopRightRadius="xl"
      >
        <Formik
          validationSchema={RegisterSchema}
          initialValues={{
            email: "",
            password: "",
            fullName: "",
            course: "",
            exerciseGroup: "",
            laboratoryGroup: "",
          }}
          onSubmit={(values) => register(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <Animated.View
              style={{
                height: 0.7 * height,
              }}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                height={75}
                justifyContent="center"
              >
                {test.map((_, index) => (
                  <Dot
                    key={index}
                    currentIndex={divide(x, width)}
                    {...{ index, x }}
                  />
                ))}
              </Box>
              <Animated.ScrollView
                ref={scroll}
                horizontal
                snapToInterval={width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                {...scrollHandler}
              >
                {test.map((component, index) => {
                  const last = index === test.length - 1;
                  const Test = component;
                  return (
                    <Box key={index} width={width} alignItems="center">
                      <Test
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                      />
                      <Button
                        label={last ? "Zakończ" : "Dalej"}
                        variant={last ? "primary" : "default"}
                        mt="xl"
                        onPress={async () => {
                          if (last) {
                            handleSubmit();
                          } else {
                            scroll.current?.getNode().scrollTo({
                              x: width * (index + 1),
                              animated: true,
                            });
                          }
                        }}
                      />
                    </Box>
                  );
                })}
              </Animated.ScrollView>
            </Animated.View>
          )}
        </Formik>
      </Box>
    </Gradient>
  );
};

export { Register };
