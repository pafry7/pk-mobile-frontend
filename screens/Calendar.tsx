import React from "react";
import Box from "../components/Box";
import Text from "../components/Text";

interface HomeProps {}

const Calendar: React.FC<HomeProps> = ({}) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text color="primaryText">Calendar</Text>
    </Box>
  );
};

export { Calendar };
