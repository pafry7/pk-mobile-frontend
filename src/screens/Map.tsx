import React from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../context/auth-context";
import Gradient from "react-native-css-gradient";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

interface HomeProps {}

const Map: React.FC<HomeProps> = ({}) => {
  console.log("iam in map");
  const { height, width } = Dimensions.get("window");
  const LATITUDE = 50.07190457956277;
  const LONGITUDE = 19.941856485955427;
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height); //minus bottom nav
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      ></MapView>
    </Box>
  );
};

export { Map };
