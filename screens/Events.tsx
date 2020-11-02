import React from "react";
import Box from "../components/Box";
import Text from "../components/Text";

interface HomeProps {}

const Events: React.FC<HomeProps> = ({}) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text color="primaryText">Events</Text>
    </Box>
  );
};

export { Events };
