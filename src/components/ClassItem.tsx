import * as React from "react";
import { Feather } from "@expo/vector-icons";
import Box from "./Box";
import Text from "./Text";
import { getHours, getMinutes } from "date-fns";
import { Theme } from "../common/theme";
import { useTheme } from "@shopify/restyle";

interface Activity {
  additional_info: string;
  end_date: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  place: string;
  start_date: string;
  type_fk: "CLASS" | "EVENT" | "PERSONAL";
}

interface ClassItemProps {
  activity: Activity;
}

const getInfo = (additionalInfo: string) => {
  try {
    const {
      groups: { room, type },
    } = /Type:(?<type>[a-zA-ZłćĆ]{1,6} ).+(?<room>s.+)/.exec(additionalInfo);
    return { room, type };
  } catch (e) {
    console.log(e);
    return { room: null, type: null };
  }
};

const getIcon = (type: string) => {
  switch (type) {
    case (type.match(/wyk/i) || {}).input:
      return <Feather name="book-open" size={32} color="black" />;
    case (type.match(/lab/i) || {}).input:
      return <Feather name="monitor" size={32} color="black" />;
    case (type.match(/ć/i) || {}).input:
      return <Feather name="pen-tool" size={32} color="black" />;
    default:
      return <Feather name="info" size={32} color="black" />;
  }
};

const ClassItem: React.FC<ClassItemProps> = ({ activity }) => {
  const theme = useTheme<Theme>();
  const { type, room } = getInfo(activity.additional_info);
  const Icon = getIcon(type);
  // const room = null;
  // const type = null;

  const startDate = new Date(activity.start_date);
  const endDate = new Date(activity.end_date);
  const time = `${startDate.getHours()}:${startDate.getMinutes()}-${endDate.getHours()}:${endDate.getMinutes()}`;

  return (
    <Box
      width="80%"
      height={130}
      backgroundColor="mainBackground"
      borderRadius="s"
      shadowColor="primaryText"
      flexDirection="row"
      padding="m"
      shadowOffset={{
        width: 0,
        height: 6,
      }}
      shadowOpacity={0.57}
      shadowRadius={6.65}
      elevation={10}
    >
      <Box
        width={70}
        height={70}
        borderWidth={1}
        borderRadius="xl"
        alignItems="center"
        justifyContent="center"
      >
        {Icon}
      </Box>
      <Box ml="m" width="70%">
        <Text fontWeight="600">{activity.name}</Text>
        <Text mt="xs" color="secondaryText">
          {room}
        </Text>
        <Box
          mt="m"
          borderRadius="s"
          width={110}
          height={30}
          alignItems="center"
          justifyContent="center"
          backgroundColor="buttonLightBackground"
          flexDirection="row"
        >
          <Feather
            name="clock"
            size={16}
            color={theme.colors.buttonPrimaryBackground}
          />
          <Text ml="s" color="buttonPrimaryBackground">
            {time}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export { ClassItem };
