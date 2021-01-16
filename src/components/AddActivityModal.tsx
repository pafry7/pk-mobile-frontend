import * as React from "react";
import * as Yup from "yup";
import { Platform, Modal, KeyboardAvoidingView } from "react-native";
import { differenceInMinutes } from "date-fns";
import Box from "../components/Box";
import Text from "../components/Text";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { RRule } from "rrule";
import { DatePicker } from "../components/DatePicker";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { Select } from "./Select";
import TextInput from "./TextInput";
import { Formik } from "formik";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSnackbar } from "../context/snackbar-context";
import { useAuth } from "../context/auth-context";

const ADD_ACTIVITY = gql`
  mutation($activity: activities_insert_input!) {
    insert_activities_one(object: $activity) {
      id
    }
  }
`;
interface AddActivityModalProps {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
}

const ActivitySchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!"),
  additional_info: Yup.string().max(240, "Too long!"),
  repeat: Yup.string(),
});

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const theme = useTheme<Theme>();
  const [addActivity, { error, loading }] = useMutation(ADD_ACTIVITY);
  console.log(error, loading);

  const createActivity = async (e) => {
    const duration = differenceInMinutes(
      new Date(endTime),
      new Date(startTime)
    );
    const rule = new RRule({
      freq: e.repeat === "codziennie" ? RRule.DAILY : RRule.WEEKLY,
      dtstart: startTime,
      interval: e.repeat === "2" ? 2 : 1,
    });
    try {
      console.log({
        variables: {
          activity: {
            start_date: startTime,
            end_date: endTime,
            name: e.name,
            additional_info: e.additional_info,
            student_id: user.id,
            type_fk: "PERSONAL",
            is_reccuring: e.repeat ? true : false,
            recurrence_pattern: rule.toString(),
            duration,
          },
        },
      });
      await addActivity({
        variables: {
          activity: {
            start_date: startTime,
            end_date: endTime,
            name: e.name,
            additional_info: e.additional_info,
            id_student: user.id,
            type_fk: "PERSONAL",
            is_recurring: e.repeat ? true : false,
            recurrence_pattern: rule.toString(),
            duration,
          },
        },
      });
      setModalVisible(false);
      showSnackbar("Test", "success");
    } catch (error) {
      console.log(error);
      showSnackbar("Nastąpił problem, spróbuj ponownie.", "error");
    }
  };

  const backgroundColor = theme.colors.mainBackground;

  return (
    <Modal
      visible={modalVisible}
      presentationStyle="fullScreen"
      animationType="slide"
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor,
          justifyContent: "space-between",
        }}
      >
        <Formik
          validationSchema={ActivitySchema}
          initialValues={{
            name: "",
            additional_info: "",
            repeat: "",
          }}
          onSubmit={(values) => createActivity(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <ScrollView>
                  <Box
                    alignItems="center"
                    justifyContent="space-between"
                    paddingLeft="l"
                    mt="xl"
                    flexDirection="row"
                  >
                    <Text color="primaryText" variant="header">
                      Stwórz aktywność
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text mr="l" color="error">
                        Anuluj
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box mt="xl" mb="xl">
                    <Box width="80%" ml="xl" mt="m">
                      <Text mb="s">Nazwa wydarzenia</Text>
                      <TextInput
                        placeholder="Nazwa"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        error={errors.name}
                        touched={touched.name}
                      />
                    </Box>

                    <Box mt="m" ml="xl">
                      <Text mb="s">Początek</Text>
                      <DatePicker setValue={setStartTime} />
                    </Box>
                    <Box mt="m" ml="xl">
                      <Text mb="s">Koniec</Text>
                      <DatePicker setValue={setEndTime} />
                    </Box>
                    <Box mt="m" ml="xl" width="80%">
                      <Text mb="s">Powtarzaj</Text>
                      <Select
                        icon="home"
                        placeholder="Powtarzaj"
                        items={[
                          { label: "Codziennie", value: "codziennie" },
                          { label: "Co tydzień", value: "Co tydzień" },
                          {
                            label: "Co dwa tygodnie",
                            value: "2",
                          },
                        ]}
                        handleChange={handleChange("repeat")}
                        error={errors.repeat}
                        touched={touched.repeat}
                      />
                    </Box>
                    <Box mt="m" mb="xl" width="80%" ml="xl">
                      <Text mb="s">Opis</Text>
                      <TextInput
                        placeholder="Opis"
                        onChangeText={handleChange("additional_info")}
                        onBlur={handleBlur("additional_info")}
                        error={errors.additional_info}
                        touched={touched.additional_info}
                        maxLength={240}
                        multiline
                        textAlignVertical="top"
                      />
                    </Box>
                  </Box>
                </ScrollView>
              </KeyboardAvoidingView>
              <Box position="absolute" bottom={20} alignSelf="center">
                <Button
                  label="Gotowe"
                  onPress={handleSubmit}
                  shadowColor="primaryText"
                  shadowOffset={{
                    width: 0,
                    height: 3,
                  }}
                  shadowOpacity={0.27}
                  shadowRadius={4.65}
                  elevation={6}
                />
              </Box>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </Modal>
  );
};

export { AddActivityModal };
