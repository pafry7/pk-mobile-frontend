import * as React from "react";
import Text from "../components/Text";
import { Event } from "../mocks/data";
import Box from "../components/Box";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { capitalize } from "lodash";
import { format } from "date-fns";
import { pl } from "date-fns/esm/locale";
interface HightLightedEventsProps {
  events: Event[];
  navigation: any;
}

const HightLightedEvents: React.FC<HightLightedEventsProps> = ({
  events,
  navigation,
}) => {
  const handleClick = (item: Event) => {
    navigation.push("EventDetails", { details: item });
  };

  const renderItem = ({ item, index }: { item: Event; index: number }) => {
    const date = new Date(item.start_date);

    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Box
          backgroundColor="tabBackground"
          marginBottom="m"
          ml={index === 0 ? "xl" : null}
          marginHorizontal="m"
          shadowColor="primaryText"
          shadowOffset={{
            width: 0,
            height: 3,
          }}
          shadowOpacity={0.27}
          shadowRadius={4.65}
          elevation={6}
          width={250}
          height={220}
          mt="m"
          borderRadius="s"
          p="s"
        >
          <Box height="60%" borderRadius="s">
            <Image
              source={{ uri: item.photo_uri }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
            />
          </Box>
          <Box mt="s" flexDirection="row">
            <Box
              backgroundColor="buttonPrimaryBackground"
              borderRadius="s"
              width={55}
              height={60}
              padding="s"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="body" fontWeight="bold" color="lightText">
                {format(date, "d", { locale: pl })}
              </Text>
              <Text variant="body" fontWeight="bold" color="lightText">
                {capitalize(format(date, "iiiiii", { locale: pl }))}
              </Text>
            </Box>
            <Box ml="s">
              <Text variant="body" fontWeight="bold">
                {item.name}
              </Text>
              <Box mt="s" flexDirection="row" opacity={0.8}>
                <Feather name="map-pin" color="black" size={14} />
                <Text ml="s" fontSize={14}>
                  {item.place ? item.place : item.building.name}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };
  return (
    <Box width="100%">
      <FlatList
        horizontal
        data={events}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
      />
    </Box>
  );
};

export { HightLightedEvents };
