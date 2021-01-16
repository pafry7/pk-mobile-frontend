import * as React from "react";
import Box from "./Box";
import { Dimensions, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
  mapStyle: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
  },
});

interface MapWithPinProps {
  coordinates: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  setCoordinates: any;
}

const MapWithPin: React.FC<MapWithPinProps> = ({
  coordinates,
  setCoordinates,
}) => {
  const { height, width } = Dimensions.get("window");

  const LATITUDE = 50.07190457956277;
  const LONGITUDE = 19.941856485955427;
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  return (
    <Box width="100%" height={200}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation
        region={coordinates}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onRegionChangeComplete={(e) => {
          setCoordinates(e);
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
  );
};

export { MapWithPin };
