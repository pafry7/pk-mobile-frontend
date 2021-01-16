import * as React from "react";
import Text from "../components/Text";
import Box from "../components/Box";
import { TouchableOpacity, Image } from "react-native";
import { Event } from "../mocks/data";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { pl } from "date-fns/esm/locale";

interface PopularEventsProps {
  events: Event[];
  navigation: any;
}

const PopularEvents: React.FC<PopularEventsProps> = ({
  events,
  navigation,
}) => {
  const [selected, setSelected] = React.useState(0);

  const Item = ({ item }: { item: Event }) => {
    const handleClick = (item: Event) => {
      navigation.push("EventDetails", { details: item });
    };
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Box marginBottom="m">
          <Box flexDirection="row">
            <Image
              source={
                item.photo_uri
                  ? { uri: item.photo_uri }
                  : require("../../assets/george-pagan-iii-WwCTFNpZx8g-unsplash(1).jpg")
              }
              style={{ width: 90, height: 120, borderRadius: 8 }}
            />
            <Box ml="m" alignItems="flex-start" mt="s" width="60%">
              <Text variant="body" fontWeight="bold" opacity={0.7}>
                {format(new Date(item.start_date), "d LLLL yyyy", {
                  locale: pl,
                })}
              </Text>
              <Text variant="body" fontWeight="bold" mt="s">
                {item.name}
              </Text>
              <Box mt="s" flexDirection="row">
                <Feather name="map-pin" color="black" size={14} />
                <Text
                  ml="s"
                  fontSize={14}
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                  }}
                >
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
    <Box width="100%" ml="xl" mt="m">
      {events.map((event) => (
        <Item item={event} key={event.id} />
      ))}
    </Box>
  );
};

export { PopularEvents };
