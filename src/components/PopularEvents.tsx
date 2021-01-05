import * as React from "react";
import Text from "../components/Text";
import Box from "../components/Box";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface PopularEventsProps {
  events: String[];
  handleClick: any;
}

const PopularEvents: React.FC<PopularEventsProps> = ({
  events,
  handleClick,
}) => {
  const [selected, setSelected] = React.useState(0);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Box marginBottom="m">
          <Box flexDirection="row">
            <Box
              backgroundColor="success"
              height={120}
              width={90}
              borderRadius="s"
            />
            {/* <Image
              source={require("../../assets/george-pagan-iii-WwCTFNpZx8g-unsplash(1).jpg")}
              style={{ width: "60%", height: 120, borderRadius: 8 }}
            /> */}
            <Box ml="m" alignItems="flex-start" mt="s">
              <Text variant="body" fontWeight="bold" opacity={0.7}>
                29 wrzesień 2020
              </Text>
              <Text variant="body" fontWeight="bold" mt="s">
                Planszówki
              </Text>
              <Box mt="s" flexDirection="row">
                <Feather name="map-pin" color="black" size={14} />
                <Text ml="s" fontSize={14}>
                  Biblioteka
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
      {events.map((e, index) => (
        <Item item={e} key={`${index}-1221`} />
      ))}
    </Box>
  );
};

export { PopularEvents };
