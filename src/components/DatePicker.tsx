import * as React from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "./Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

interface DatePickerProps {
  value: any;
  setValue: any;
}

const DatePicker: React.FC<DatePickerProps> = ({}) => {
  const [showDatePicker, setShowDatePicker] = React.useState(true);
  const [showTimePicker, setShowTimePicker] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  return (
    <Box flexDirection="row" alignItems="center">
      <Feather name="calendar" size={18} color="black" />
      <DateTimePicker
        testID="datePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={(e) => console.log(e)}
        neutralButtonLabel="test"
        locale="pl-PL"
        style={{ marginLeft: 8, width: 120 }}
      />

      <Feather name="clock" size={18} color="black" />
      <DateTimePicker
        testID="default"
        value={date}
        mode="time"
        locale="pl-PL"
        is24Hour={true}
        display="default"
        onChange={(e) => console.log(e)}
        style={{ marginLeft: 8, width: 100 }}
      />
    </Box>
  );
};

export { DatePicker };
