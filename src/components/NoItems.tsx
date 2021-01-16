import * as React from "react";
import Box from "./Box";
import Text from "./Text";
import { Feather } from "@expo/vector-icons";

interface NoItemsProps {
  message: string;
}

const NoItems: React.FC<NoItemsProps> = ({ message }) => {
  return (
    <Box alignItems="center">
      <Feather name="square" size={32} color="black" />
      <Text variant="subheader" mt="s">
        {message}
      </Text>
    </Box>
  );
};

export { NoItems };
