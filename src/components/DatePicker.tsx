import * as React from "react";
import { split } from "lodash";
import Box from "../components/Box";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";

interface DatePickerProps {
  setValue: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ setValue }) => {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date());

  const onDateChange = (_, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setValue(
        new Date(
          `${selectedDate
            .toISOString()
            .substring(0, 10)}${time.toISOString().substring(10)}`
        )
      );
      // console.log(time.toISOString().substring(10));
    }
  };
  const onTimeChange = (_, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
      setValue(
        new Date(
          `${date
            .toISOString()
            .substring(0, 10)}${selectedTime.toISOString().substring(10)}`
        )
      );
    }
  };

  return (
    <Box flexDirection="row" alignItems="center">
      <Feather name="calendar" size={18} color="black" />
      <DateTimePicker
        testID="datePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onDateChange}
        neutralButtonLabel="test"
        locale="pl-PL"
        style={{ marginLeft: 8, width: 120 }}
      />

      <Feather name="clock" size={18} color="black" />
      <DateTimePicker
        testID="default"
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onTimeChange}
        timeZoneOffsetInMinutes={0}
        style={{ marginLeft: 8, width: 100 }}
      />
    </Box>
  );
};

export { DatePicker };
