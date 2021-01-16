import * as React from "react";
import Box from "./Box";
import Text from "./Text";
import { TouchableOpacity } from "react-native";

interface PlaceTabsProps {
  setFieldValue: any;
  setCoordinates: any;
  firstTab: JSX.Element;
  secondTab: JSX.Element;
}

type PlaceType = "CUSTOM" | "BUILDING";

const PlaceTabs: React.FC<PlaceTabsProps> = ({
  setFieldValue,
  setCoordinates,
  firstTab,
  secondTab,
}) => {
  const [placeType, setPlaceType] = React.useState<PlaceType>("BUILDING");
  return (
    <>
      <Text mb="s">Miejsce</Text>
      <Box flexDirection="row" justifyContent="space-between" width={210}>
        <TouchableOpacity
          onPress={() => {
            setPlaceType("BUILDING");
            setFieldValue("place", "");
            setCoordinates(null);
          }}
        >
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
              color={placeType === "BUILDING" ? "lightText" : "primaryText"}
            >
              Budynek PK
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPlaceType("CUSTOM");
            setFieldValue("building_fk", "");
          }}
        >
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
            <Text color={placeType === "CUSTOM" ? "lightText" : "primaryText"}>
              Własne
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box mt="m">{placeType === "BUILDING" ? firstTab : secondTab}</Box>
    </>
  );
};

export { PlaceTabs };
