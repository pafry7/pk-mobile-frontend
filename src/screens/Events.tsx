import React from "react";
import { filter } from "lodash";
import { Chip } from "../components/Chip";
import Box from "../components/Box";
import Text from "../components/Text";
import { setStatusBarStyle } from "expo-status-bar";
import { format } from "date-fns";
import { HightLightedEvents } from "../components/HightlightedEvents";
import { PopularEvents } from "../components/PopularEvents";
import useDebounce from "../common/useDebounce";
import TextInput from "../components/ElevatedTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { events } from "../mocks/data";
import { Feather } from "@expo/vector-icons";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { types } from "../mocks/data";
import { ScrollView } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddEventModal } from "../components/AddEventModal";
import { NoItems } from "../components/NoItems";

interface HomeProps {
  navigation: any;
}

const FETCH_EVENTS = gql`
  query($date: date) {
    events(where: { start_date: { _gt: $date } }) {
      name
      student {
        photo_uri
        name
        role
      }
      building {
        name
        latitude
        longitude
      }
      id
      end_date
      start_date
      description
      place
      latitude
      longitude
      events_types {
        type {
          name
          id
        }
      }
      photo_uri
    }
  }
`;
const Events: React.FC<HomeProps> = ({ navigation }) => {
  const date = format(new Date(), "yyyy-MM-dd");
  // const { data, error, loading } = useQuery(FETCH_EVENTS, {variables:{date: date}});
  // console.log(data, error, loading);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("wszystkie");
  const theme = useTheme<Theme>();
  // const events = data.events;
  const debouncedValue = useDebounce(search, 750);

  let filteredEvents = events;
  if (type !== "wszystkie") {
    filteredEvents = filter(
      events,
      (event) => event.events_types[0].type.id === type
    );
  }

  if (debouncedValue) {
    filteredEvents = filter(filteredEvents, (event) =>
      new RegExp(debouncedValue, "i").test(event.name)
    );
  }

  const highligtedEvents = filter(
    filteredEvents,
    (event) => event.student.role === "university"
  );
  const popularEvents = filter(
    filteredEvents,
    (event) => event.student.role === "user"
  );

  const black = theme.colors.primaryText;

  React.useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

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
            <TextInput
              icon="search"
              placeholder="Szukaj"
              onChangeText={setSearch}
            />
          </Box>
          <Box mt="l">
            <Chip
              types={[
                { name: "Wszystkie", id: "wszystkie" },
                ...types.data.types,
              ]}
              setValue={setType}
            />
          </Box>
          {highligtedEvents.length > 0 ? (
            <Box mt="m">
              <Text color="primaryText" variant="subheader" pl="l">
                Wyróżnione
              </Text>
              <HightLightedEvents
                events={highligtedEvents}
                navigation={navigation}
              />
            </Box>
          ) : null}
          {popularEvents.length > 0 ? (
            <Box mt="l">
              <Text color="primaryText" variant="subheader" pl="l">
                Popularne
              </Text>
              <PopularEvents navigation={navigation} events={popularEvents} />
            </Box>
          ) : null}
          {popularEvents.length === 0 && highligtedEvents.length === 0 ? (
            <Box mt="xl" alignItems="center" justifyContent="center">
              <NoItems message="Nie ma takich wydarzeń" />
            </Box>
          ) : null}
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
