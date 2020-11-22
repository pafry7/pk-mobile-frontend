import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Map } from "../screens/Map";
import { Events } from "../screens/Events";
import { Calendar } from "../screens/Calendar";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  console.log("i am in home tabs");
  const theme = useTheme<Theme>();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          if (route.name === "Map") {
            iconName = focused ? "map-marker" : "map-marker-outline";
          } else if (route.name === "Events") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.buttonPrimaryBackground,
        inactiveTintColor: theme.colors.secondaryText,
      }}
    >
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Events" component={Events} />
    </Tab.Navigator>
  );
};

export { HomeTabs };
