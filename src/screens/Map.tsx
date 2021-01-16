import React from "react";
import { Feather } from "@expo/vector-icons";
import { client } from "../auth-provider";
import { format, endOfDay, startOfToday, isBefore } from "date-fns";
import Box from "../components/Box";
import Text from "../components/Text";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../context/auth-context";
import Gradient from "react-native-css-gradient";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { activities } from "../mocks/data";
import { forEachRight } from "lodash";
import { ClassItem } from "../components/ClassItem";

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

const GET_CLASSES = gql`
  query($id: uuid, $day: String) {
    students(where: { id: { _eq: $id } }) {
      students_groups {
        group {
          classes(where: { day: { _eq: $day } }) {
            name
            start_time
            end_time
            building {
              latitude
              longitude
            }
            room
          }
        }
      }
    }
  }
`;

interface HomeProps {}

const Map: React.FC<HomeProps> = ({}) => {
  // const [activities, setActivities] = React.useState([]);
  const [currentActivity, setCurrentActivity] = React.useState(activities[0]);
  console.log("render");
  // console.log(currentActivity);
  // console.log(activities);

  React.useEffect(() => {
    // const fetchActivities = async () => {
    //   const startDate = new Date();
    //   const endDate = endOfDay(startDate);
    //   const response = await client("getActivities", {
    //     body: { startDate, endDate },
    //   });
    //   if (response) {
    //     setActivities(response.activities);
    //   }
    // };
    // fetchActivities();
    // const interval = setInterval(() => {
    //   const now = new Date();
    //   if (activities) {
    //     for (let i = 0; i < activities.length; i++) {
    //       if (isBefore(now, new Date(activities[i].end_date))) {
    //         setCurrentActivity(activities[i]);
    //         break;
    //       }
    //     }
    //   }
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);

  const EventItem = () => {
    return (
      <Box>
        <Text>event</Text>
      </Box>
    );
  };
  const PersonalItem = () => {
    return (
      <Box>
        <Text>personal</Text>
      </Box>
    );
  };
  const Item = () => {
    if (currentActivity.type_fk === "CLASS") {
      return <ClassItem activity={currentActivity} />;
    } else if (currentActivity.type_fk === "EVENT") {
      return <EventItem />;
    } else if (currentActivity.type_fk === "PERSONAL") {
      return <PersonalItem />;
    } else {
      return null;
    }
  };

  const { height, width } = Dimensions.get("window");
  const LATITUDE = 50.07190457956277;
  const LONGITUDE = 19.941856485955427;
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height); //minus bottom nav
  return (
    <Box flex={1} alignItems="center">
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Box
          height={160}
          bottom={0}
          paddingBottom="m"
          width="100%"
          position="absolute"
          justifyContent="center"
          alignItems="center"
        >
          <Item />
        </Box>
      </MapView>
    </Box>
  );
};

export { Map };
