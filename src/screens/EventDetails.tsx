import React from "react";
import { format, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";
import { truncate, capitalize } from "lodash";
import Box from "../components/Box";
import Text from "../components/Text";
import { Feather, MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import {
  ImageBackground,
  Image,
  ScrollView,
  PushNotificationIOS,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setStatusBarHidden } from "expo-status-bar";
import { Event } from "../mocks/data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { Button } from "../components/Button";

interface EventDetailsProps {
  navigation: any;
  route: any;
}

// TODO: 1.utworzenie forma do tworzenia eventu, 2.ogarniecie image w bazie, 3. podpiecie do api 4. refactor detailsow z api 5. zmiana image picker

const EventDetails: React.FC<EventDetailsProps> = ({ navigation, route }) => {
  const [moreText, setMoreText] = React.useState(false);
  const { details }: { details: Event } = route.params;
  const theme = useTheme<Theme>();
  // console.log({ details });

  React.useEffect(() => {
    setStatusBarHidden(true, "slide");

    return () => setStatusBarHidden(false, "slide");
  }, [details]);

  const startDate = new Date(details.start_date);
  const endDate = new Date(details.end_date);

  let date = null;
  let time = null;

  if (isSameDay(startDate, endDate)) {
    date = capitalize(
      format(startDate, "iiii, d MMMM y", {
        locale: pl,
      })
    );

    time = `${format(startDate, "k:mm", { locale: pl })}-${format(
      endDate,
      "k:mm",
      { locale: pl }
    )}`;
  }

  const avatar =
    details.student.role === "university"
      ? require("../../assets/pk.png")
      : require("../../assets/user.png");

  return (
    <Box flex={1} justifyContent="flex-end">
      <ImageBackground
        resizeMode="cover"
        source={{ uri: details.photo_uri }}
        style={{
          width: "100%",
          height: "70%",
          top: 0,
          position: "absolute",
        }}
      >
        <Box height={120} mt="xl" alignItems="flex-start" marginLeft="l">
          <TouchableOpacity
            onPress={() => {
              setStatusBarHidden(false, "slide");
              navigation.goBack();
            }}
          >
            <Box
              width={32}
              height={32}
              backgroundColor="mainBackground"
              borderRadius="s"
              alignItems="center"
              justifyContent="center"
            >
              <Feather name="chevron-left" size={24} color="black" />
            </Box>
          </TouchableOpacity>
        </Box>
      </ImageBackground>
      <Box
        borderTopLeftRadius="xl"
        width="100%"
        height="75%"
        backgroundColor="mainBackground"
        borderTopRightRadius="xl"
      >
        <ScrollView style={{ paddingLeft: 32 }}>
          <Box mt="xl">
            <Text variant="header">{details.name}</Text>
          </Box>
          <Box mt="l" flexDirection="row" alignItems="center">
            <Box
              backgroundColor="lightText"
              borderRadius="m"
              width={45}
              height={45}
              shadowColor="primaryText"
              shadowOffset={{
                width: 0,
                height: 3,
              }}
              shadowOpacity={0.27}
              alignItems="center"
              justifyContent="center"
              shadowRadius={4.65}
              elevation={6}
            >
              <Icon
                name="calendar-star"
                size={24}
                color={theme.colors.buttonPrimaryBackground}
              />
            </Box>
            <Box ml="m">
              <Text variant="body" fontWeight="500">
                {date}
              </Text>
              <Text opacity={0.8} mt="xs">
                {time}
              </Text>
            </Box>
          </Box>
          <Box mt="m" flexDirection="row" alignItems="center">
            <Box
              backgroundColor="lightText"
              borderRadius="m"
              width={45}
              height={45}
              shadowColor="primaryText"
              shadowOffset={{
                width: 0,
                height: 3,
              }}
              shadowOpacity={0.27}
              alignItems="center"
              justifyContent="center"
              shadowRadius={4.65}
              elevation={6}
            >
              <Icon
                name="compass"
                size={24}
                color={theme.colors.buttonPrimaryBackground}
              />
            </Box>
            <Box ml="m" alignItems="flex-start" flexShrink={1}>
              <Text variant="body" fontWeight="500" textAlign="left">
                {details.place ? details.place : details.building.name}
              </Text>
              <Text opacity={0.8} mt="xs">
                Politechnika Krakowska, ul. Warszawska
              </Text>
            </Box>
          </Box>
          <Box mt="l">
            <Text variant="subheader">Opis</Text>
            <Text mt="m" textAlign="left">
              {!moreText
                ? truncate(details.description, { length: 135, separator: " " })
                : details.description}
            </Text>
            {/* fix więcej, zajmuje cala szerokosc :(*/}
            {details.description.length > 135 ? (
              <Button
                mt="xs"
                opacity={0.7}
                variant="text"
                label={moreText ? "Mniej" : "Więcej"}
                onPress={() => setMoreText(!moreText)}
              />
            ) : null}
          </Box>
          <Box mt="l" flexDirection="row" alignItems="center">
            <Box
              backgroundColor="lightText"
              borderRadius="xl"
              width={50}
              height={50}
              shadowColor="primaryText"
              shadowOffset={{
                width: 0,
                height: 3,
              }}
              shadowOpacity={0.27}
              alignItems="center"
              justifyContent="center"
              shadowRadius={4.65}
              elevation={6}
            >
              <Image
                source={
                  details.student.photo_uri
                    ? { uri: details.student.photo_uri }
                    : avatar
                }
                style={{
                  width: "60%",
                  height: "60%",
                  transform: [{ scale: 1 }],
                }}
              />
            </Box>
            <Box ml="m" alignItems="flex-start">
              <Text fontWeight="500">{details.student.name}</Text>
              <Text opacity={0.8} mt="xs">
                Organizator
              </Text>
            </Box>
          </Box>
          <Button
            mt="l"
            label="Dodaj do kalendarza"
            onPress={() => {
              console.log("dodaj do kaldendra");
            }}
            alignSelf="center"
            shadowColor="primaryText"
            shadowOffset={{
              width: 0,
              height: 3,
            }}
            shadowOpacity={0.27}
            shadowRadius={4.65}
            elevation={6}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export { EventDetails };
