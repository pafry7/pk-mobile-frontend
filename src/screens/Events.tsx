import React from "react";
import { Chip } from "../components/Chip";
import Box from "../components/Box";
import Text from "../components/Text";
import { setStatusBarStyle } from "expo-status-bar";
import { HightLightedEvents } from "../components/HightlightedEvents";
import { PopularEvents } from "../components/PopularEvents";
import TextInput from "../components/ElevatedTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Gradient from "react-native-css-gradient";
import { Feather } from "@expo/vector-icons";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Modal, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import { AddEventModal } from "../components/AddEventModal";

interface HomeProps {
  navigation: any;
}
const FETCH_USERS = gql`
  query {
    events {
      id
      latitude
      longitude
      end_date
      description
      building {
        latitude
        longitude
        name
      }
      name
      photo
      place
      start_date
    }
  }
`;
const Events: React.FC<HomeProps> = ({ navigation }) => {
  // const [getUsers, { data, error, loading }] = useLazyQuery(FETCH_USERS);
  const [modalVisible, setModalVisible] = React.useState(false);
  console.log({ modalVisible });
  const theme = useTheme<Theme>();

  // console.log({ data });
  const black = theme.colors.primaryText;

  // change status bar to dark
  React.useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  const test = ["Wszystkie", "Targi", "Wykłady", "Imprezy", "Spotkania"];

  return (
    <Box width="100%" height="100%" backgroundColor="mainBackground">
      <SafeAreaView>
        <ScrollView>
          <Box
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            mt="xl"
            paddingHorizontal="l"
          >
            <Text color="primaryText" variant="header">
              Wydarzenia
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Feather name="plus" color={black} size={24} />
            </TouchableOpacity>
          </Box>
          <Box pl="xl" width={300} mt="l">
            <TextInput icon="search" placeholder="Szukaj" />
          </Box>
          <Box mt="l">
            <Chip labels={test} />
          </Box>
          <Box mt="m">
            <Text color="primaryText" variant="subheader" pl="l">
              Wyróżnione
            </Text>
            <HightLightedEvents
              events={["Test", "124", "1"]}
              handleClick={() =>
                navigation.push("EventDetails", { details: "xDD" })
              }
            />
          </Box>
          <Box mt="l">
            <Text color="primaryText" variant="subheader" pl="l">
              Popularne
            </Text>
            <PopularEvents
              events={["1", "2", "3", "4"]}
              handleClick={() =>
                navigation.push("EventDetails", { details: "xDD" })
              }
            />
          </Box>
        </ScrollView>
        <AddEventModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaView>
    </Box>
  );
};

export { Events };
