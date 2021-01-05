import * as React from "react";
import Text from "../components/Text";
import Box from "../components/Box";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface HightLightedEventsProps {
  events: String[];
  handleClick: any;
}

const HightLightedEvents: React.FC<HightLightedEventsProps> = ({
  events,
  handleClick,
}) => {
  const renderItem = ({ item, index }) => {
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
          width={220}
          height={220}
          mt="m"
          borderRadius="s"
          p="s"
        >
          <Box height="60%" borderRadius="s">
            <Image
              source={require("../../assets/george-pagan-iii-WwCTFNpZx8g-unsplash(1).jpg")}
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
                30
              </Text>
              <Text variant="body" fontWeight="bold" color="lightText">
                Wt
              </Text>
            </Box>
            <Box ml="s">
              <Text variant="body" fontWeight="bold">
                Baltic Days 2020
              </Text>
              <Box mt="s" flexDirection="row" opacity={0.8}>
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
    <Box width="100%">
      <FlatList
        horizontal
        data={events}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item}-dada`}
      />
    </Box>
  );
};

export { HightLightedEvents };
