import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Map } from "../screens/Map";
import { Events } from "../screens/Events";
import { Scheduler } from "../screens/Scheduler";
import { EventDetails } from "../screens/EventDetails";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { ApolloProvider } from "@apollo/react-hooks";
import { makeApolloClient } from "../apollo";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainStack = () => {
  const client = makeApolloClient();
  return (
    <ApolloProvider client={client as any}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
      </Stack.Navigator>
    </ApolloProvider>
  );
};

const HomeTabs = () => {
  const theme = useTheme<Theme>();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          if (route.name === "Mapa") {
            iconName = focused ? "map-marker" : "map-marker-outline";
          } else if (route.name === "Wydarzenia") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Kalendarz") {
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
      <Tab.Screen name="Mapa" component={Map} />
      <Tab.Screen name="Kalendarz" component={Scheduler} />
      <Tab.Screen name="Wydarzenia" component={Events} />
    </Tab.Navigator>
  );
};

export { MainStack };
