import * as React from "react";
import Text from "../components/Text";
import Box from "../components/Box";
import { FlatList, TouchableOpacity } from "react-native";

interface ChipProps {
  labels: String[];
}

const Chip: React.FC<ChipProps> = ({ labels }) => {
  const [selected, setSelected] = React.useState(0);

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      index === selected ? "primaryText" : "tabBackground";
    const color = index === selected ? "lightText" : "primaryText";

    return (
      <TouchableOpacity onPress={() => setSelected(index)}>
        <Box
          ml={index === 0 ? "xl" : null}
          height={32}
          borderRadius="s"
          marginHorizontal="s"
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
          backgroundColor={backgroundColor}
          padding="s"
          marginBottom="m"
          shadowColor="primaryText"
          shadowOffset={{
            width: 0,
            height: 3,
          }}
          shadowOpacity={0.27}
          shadowRadius={4.65}
          elevation={6}
        >
          <Text color={color}>{item}</Text>
        </Box>
      </TouchableOpacity>
    );
  };
  return (
    <Box width="100%">
      <FlatList
        horizontal
        data={labels}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item}-damdo21`}
      />
    </Box>
  );
};

export { Chip };
