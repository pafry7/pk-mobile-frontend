import * as React from "react";
import * as Yup from "yup";
import { Platform, Modal, KeyboardAvoidingView } from "react-native";
import Box from "../components/Box";
import Text from "../components/Text";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { DatePicker } from "../components/DatePicker";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import TextInput from "./TextInput";
import { buildings, types } from "../mocks/data";
import { Formik } from "formik";
import { Chip } from "./Chip";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Select } from "./Select";
import { useSnackbar } from "../context/snackbar-context";
import { EventImagePicker } from "./EventImagePicker";
import { PlaceTabs } from "./PlaceTabs";
import { MapWithPin } from "./MapWithPin";
import { useAuth } from "../context/auth-context";

const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dyikas7j8/image/upload";

const ADD_EVENT = gql`
  mutation($event: events_insert_input!) {
    insert_events_one(object: $event) {
      id
    }
  }
`;
interface AddEventModalProps {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
}

const EventSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!"),
  // .required("Required"),
  // description: Yup.string().max(240, "Too long!").required("Required"),
  description: Yup.string().max(240, "Too long!"),
  building_fk: Yup.string(),
  place: Yup.string(),
});

const AddEventModal: React.FC<AddEventModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [image, setImage] = React.useState(null);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [eventType, setEventType] = React.useState("");
  const [coordinates, setCoordinates] = React.useState(null);
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const theme = useTheme<Theme>();
  const [addEvent, { error, loading }] = useMutation(ADD_EVENT);

  const changedBuildings = buildings.data.buildings.map((building) => ({
    label: building.name,
    value: building.id,
  }));
  const cloudinaryUpload = async (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "pk-mobile");
    data.append("cloud_name", "dyikas7j8");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyikas7j8/image/upload",
        {
          method: "post",
          body: data,
        }
      ).then((res) => res.json());
      return response.secure_url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const createEvent = async (e) => {
    try {
      let photo_uri = null;
      if (image) {
        console.log("here");
        photo_uri = await cloudinaryUpload(image);
      }
      addEvent({
        variables: {
          event: {
            start_date: startTime,
            end_date: endTime,
            latitude: coordinates?.latitude ? coordinates.latitude : null,
            longitude: coordinates?.longitude ? coordinates.longitude : null,
            place: e.place ? e.place : null,
            name: e.name,
            photo_uri: photo_uri ? photo_uri : null,
            description: e.description,
            building_fk: e.building_fk ? e.building_fk : null,
            student_id: user.id,
            events_types: { data: { id_type: eventType } },
          },
        },
      });
      setModalVisible(false);
      setCoordinates(null); // apparently modal is still in DOM,just hided
      setImage(null);
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
          validationSchema={EventSchema}
          initialValues={{
            name: "",
            description: "",
            place: "",
            building_fk: "",
          }}
          onSubmit={(values) => createEvent(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => (
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
                      Stwórz wydarzenie
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text mr="l" color="error">
                        Anuluj
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box mt="xl" mb="xl">
                    <Box width="80%" ml="xl">
                      <EventImagePicker setEventImage={setImage} />
                    </Box>
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
                    <Box mt="m" ml="xl" width="80%">
                      <PlaceTabs
                        setCoordinates={setCoordinates}
                        setFieldValue={setFieldValue}
                        firstTab={
                          <>
                            <Text mb="s">Budynek</Text>
                            <Select
                              icon="home"
                              placeholder="Budynek"
                              items={changedBuildings}
                              handleChange={handleChange("building_fk")}
                              error={errors.building_fk}
                              touched={touched.building_fk}
                            />
                          </>
                        }
                        secondTab={
                          <>
                            <Text mb="s">Nazwa miejsca</Text>
                            <TextInput
                              placeholder="Miejsce"
                              onChangeText={handleChange("place")}
                              onBlur={handleBlur("place")}
                              error={errors.place}
                              touched={touched.place}
                            />
                            <MapWithPin
                              coordinates={coordinates}
                              setCoordinates={setCoordinates}
                            />
                          </>
                        }
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
                    <Box mt="m">
                      <Text ml="xl" mb="s">
                        Typ
                      </Text>
                      <Chip types={types.data.types} setValue={setEventType} />
                    </Box>
                    <Box mt="m" mb="xl" width="80%" ml="xl">
                      <Text mb="s">Opis</Text>
                      <TextInput
                        placeholder="Opis"
                        onChangeText={handleChange("description")}
                        onBlur={handleBlur("description")}
                        error={errors.description}
                        touched={touched.description}
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

export { AddEventModal };
