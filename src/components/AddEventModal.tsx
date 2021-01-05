import * as React from "react";
import { Dimensions, Image, Modal, StyleSheet } from "react-native";
import Box from "../components/Box";
import Text from "../components/Text";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { DatePicker } from "../components/DatePicker";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import TextInput from "./TextInput";
import { Chip } from "./Chip";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Select } from "./Select";

interface AddEventModalProps {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
}
const styles = StyleSheet.create({
  mapStyle: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
  },
});

const labels = ["Targi", "Wykład", "Impreza", "Spotkanie"];
const buildings = [
  { label: "Biblioteka", value: "Biblioteka" },
  { label: "Działowania", value: "Działawnia" },
];

type PlaceType = "CUSTOM" | "BUILDING";

const AddEventModal: React.FC<AddEventModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [placeType, setPlaceType] = React.useState<PlaceType>("BUILDING");
  const theme = useTheme<Theme>();

  const { height, width } = Dimensions.get("window");
  const LATITUDE = 50.07190457956277;
  const LONGITUDE = 19.941856485955427;
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height); //minus bottom nav
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
              <Text mb="s">Nazwa wydarzenia</Text>
              <TextInput
                placeholder="Nazwa"
                onChangeText={() => console.log("xD")}
              />
            </Box>
            <Box mt="m" ml="xl">
              <Text mb="s">Miejsce</Text>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                width={210}
              >
                <TouchableOpacity onPress={() => setPlaceType("BUILDING")}>
                  <Box
                    width={100}
                    height={40}
                    borderRadius="s"
                    alignItems="center"
                    backgroundColor={
                      placeType === "BUILDING" ? "primaryText" : "tabBackground"
                    }
                    justifyContent="center"
                    shadowColor="primaryText"
                    shadowOffset={{
                      width: 0,
                      height: 3,
                    }}
                    shadowOpacity={0.27}
                    shadowRadius={4.65}
                    elevation={6}
                  >
                    <Text
                      color={
                        placeType === "BUILDING" ? "lightText" : "primaryText"
                      }
                    >
                      Budynek PK
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPlaceType("CUSTOM")}>
                  <Box
                    width={100}
                    height={40}
                    backgroundColor={
                      placeType === "CUSTOM" ? "primaryText" : "tabBackground"
                    }
                    borderRadius="s"
                    justifyContent="center"
                    alignItems="center"
                    shadowColor="primaryText"
                    shadowOffset={{
                      width: 0,
                      height: 3,
                    }}
                    shadowOpacity={0.27}
                    shadowRadius={4.65}
                    elevation={6}
                  >
                    <Text
                      color={
                        placeType === "CUSTOM" ? "lightText" : "primaryText"
                      }
                    >
                      Własne
                    </Text>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
            <Box mt="m" ml="xl" width="80%">
              {placeType === "BUILDING" ? (
                <>
                  <Text mb="s">Budynek</Text>
                  <Select
                    icon="home"
                    placeholder="Budynek"
                    items={buildings}
                    handleChange={() => console.log("building selected")}
                    // error={errors.laboratoryGroup}
                    // touched={touched.laboratoryGroup}
                  />
                </>
              ) : (
                <>
                  <Text mb="s">Nazwa miejsca</Text>
                  <TextInput
                    placeholder="Miejsce"
                    onChange={() => console.log("xD")}
                  />
                  <Box width="100%" height={200}>
                    <MapView
                      style={styles.mapStyle}
                      showsUserLocation
                      initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                      onRegionChangeComplete={(e) => {
                        console.log(e);
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: -24,
                          marginTop: -48,
                          height: 50,
                          width: 50,
                          position: "absolute",
                        }}
                        source={require("../../assets/marker.png")}
                      />
                    </MapView>
                  </Box>
                </>
              )}
            </Box>

            <Box mt="m" ml="xl">
              <Text mb="s">Początek</Text>
              <DatePicker value={""} setValue={""} />
            </Box>
            <Box mt="m" ml="xl">
              <Text mb="s">Koniec</Text>
              <DatePicker value={""} setValue={""} />
            </Box>
            <Box mt="m" mb="xl">
              <Text ml="xl" mb="s">
                Typ
              </Text>
              <Chip labels={labels} />
            </Box>
          </Box>
        </ScrollView>
        {/**button nie chce wspolpracowac */}
        <Button
          label="Gotowe"
          onPress={() => {
            console.log("gotowe");
          }}
          alignSelf="center"
          position="absolute"
          bottom={20}
          shadowColor="primaryText"
          shadowOffset={{
            width: 0,
            height: 3,
          }}
          shadowOpacity={0.27}
          shadowRadius={4.65}
          elevation={6}
        />
        {/* <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => login(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                }) => (
                  <Box> */}
        {/* <TextInput
                      icon="lock"
                      placeholder="Enter your Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      error={errors.password}
                      // touched={touched.password}
                      textContentType="password"
                      secureTextEntry={true}
                    />
                    <Box alignItems="center" marginTop="m">
                      <Button onPress={handleSubmit} label="Zaloguj"></Button>
                      <Box
                        flexDirection="row"
                        alignItems="flex-end"
                        justifyContent="center"
                      >
                        <Text marginTop="m">Nie masz konta? </Text>
                        <Button
                          onPress={goToRegistration}
                          label="Zarejestruj się"
                          variant="text"
                        ></Button>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Formik> */}
      </SafeAreaView>
    </Modal>
  );
};

export { AddEventModal };
