import React from "react";
import { AddActivityModal } from "../components/AddActivityModal";
import Box from "../components/Box";
import Text from "../components/Text";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { useAuth } from "../context/auth-context";
import { Feather } from "@expo/vector-icons";
import { activities } from "../mocks/data";
import { Button } from "../components/Button";
import { Calendar } from "../components/Calendar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import Gradient from "react-native-css-gradient";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";

interface HomeProps {}
// 17 week * every activity -> stworz daty prezz rrsync biblioteke i wix calendar

const GET_ACTIVITIES = gql`
  query($id: uuid) {
    activities(where: { id_student: { _eq: $id } }) {
      id
      name
      start_date
      end_date
      place
      latitude
      longitude
      type_fk
      activities_repeats_fkey
      additional_info
    }
  }
`;

const Scheduler: React.FC<HomeProps> = ({}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const theme = useTheme<Theme>();
  const white = theme.colors.lightText;
  const { user } = useAuth();

  // const gradient = `linear-gradient(33.36deg, #F19F00 42.25%, #C23232 86.63%)`;
  const gradient = `linear-gradient(to right, #c31432, #240b36)`;

  React.useEffect(() => {
    setStatusBarStyle("light");

    return () => setStatusBarStyle("dark");
  }, []);

  // const { data, error, loading } = useQuery(GET_ACTIVITIES, {
  //   variables: { id: user.id },
  // });
  // console.log(data, error, loading);

  return (
    <Gradient
      gradient={gradient}
      style={{ width: "100%", height: "100%", flex: 1 }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <Box
          flexDirection="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mt="xl"
          paddingHorizontal="l"
        >
          <Text color="lightText" variant="header">
            Plan
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="plus" color={white} size={24} />
          </TouchableOpacity>
        </Box>
        <Calendar />
      </SafeAreaView>
      <AddActivityModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Gradient>
  );
};

export { Scheduler };
