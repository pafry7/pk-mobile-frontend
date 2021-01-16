import * as React from "react";
import { Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { filter } from "lodash";
import { startOfWeek, endOfWeek, endOfDay, isSameDay } from "date-fns";
import Text from "./Text";
import moment from "moment";
// import { activities } from "../mocks/data";
import "moment/locale/pl";
import CalendarStrip from "react-native-calendar-strip";
import Box from "./Box";
import { Theme } from "../common/theme";
import { useTheme } from "@shopify/restyle";
import { pl } from "date-fns/locale";
import { client } from "../auth-provider";
interface CalendarProps {}

const Lines = ({ width }: { width: number }) => {
  const start = 0;
  const end = 24;
  const calendarHeight = (end - start) * 100;

  const offset = calendarHeight / (end - start);

  return (
    <Box height={calendarHeight} width="100%" flex={1}>
      {[...Array(end).keys()].map((i) => (
        <Box key={i}>
          <Box position="absolute" left={15} top={offset * i - 6}>
            <Text color="secondaryText" fontSize={10} fontWeight="500">
              {i === start ? "" : i === 24 ? 0 : i}
            </Text>
          </Box>
          {i === start ? null : (
            <Box
              key={`line${i}`}
              height={1}
              position="absolute"
              left={49}
              backgroundColor="grayLight"
              top={offset * i}
              width={width - 20}
            />
          )}
          <Box
            key={`lineHalf${i}`}
            height={1}
            position="absolute"
            left={49}
            backgroundColor="grayLight"
            top={offset * (i + 0.5)}
            width={width - 20}
          />
        </Box>
      ))}
    </Box>
  );
};
const Events = ({ width, events, selectedDate }) => {
  // for now
  const dayStartTime = moment(selectedDate).clone().hour(1).minute(0);

  const calculateTop = (startTime) => {
    const diffHours = startTime.diff(dayStartTime, "hours", true);
    return (diffHours + 1) * 100; // hack for locale/utc
  };

  const getTime = (activity: any) => {
    const startDate = new Date(activity.start_date);
    const endDate = new Date(activity.end_date);
    return `${startDate.getHours()}:${
      startDate.getMinutes() === 0 ? "00" : startDate.getMinutes()
    }-${endDate.getHours()}:${
      endDate.getMinutes() === 0 ? "00" : endDate.getMinutes()
    }`;
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case "PERSONAL":
        return "buttonLightBackground";
      case "CLASS":
        return "successLight";
      case "EVENT":
        return "blueLight";
    }
  };
  const getBorderColor = (type) => {
    switch (type) {
      case "PERSONAL":
        return "buttonPrimaryBackground";
      case "CLASS":
        return "success";
      case "EVENT":
        return "blue";
    }
  };

  return (
    <>
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          activeOpacity={0.5}
          onPress={() => console.log("pressed")}
          style={{
            position: "absolute",
          }}
        >
          <Box
            left={49}
            height={event.duration > 0 ? (event.duration / 60) * 100 : 100}
            top={calculateTop(moment(event.start_date))}
            width={width - 49}
            overflow="hidden"
            opacity={0.8}
            p="s"
            flex={1}
            borderRadius="m"
            borderWidth={2}
            backgroundColor={getBackgroundColor(event.type_fk)}
            borderColor={getBorderColor(event.type_fk)}
          >
            <Text>{event.name}</Text>
            {/* <Text>{event.additional_info}</Text> */}
            <Text>{getTime(event)}</Text>
          </Box>
        </TouchableOpacity>
      ))}
    </>
  );
};

function RedLine({ width }: any) {
  const offset = 100;
  const hourNow = new Date().getHours();
  const minuteNow = new Date().getMinutes();
  return (
    <Box
      key={`timeNow`}
      height={1}
      position="absolute"
      left={49}
      backgroundColor="buttonPrimaryBackground"
      top={offset * (hourNow - 0) + (offset * minuteNow) / 60}
      width={width - 20}
    />
  );
}

const Calendar: React.FC<CalendarProps> = ({}) => {
  const [activities, setActivities] = React.useState(null);
  const [filtered, setFiltered] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const theme = useTheme<Theme>();
  let { width } = Dimensions.get("window");

  React.useEffect(() => {
    const date = new Date();
    const fetchActivities = async () => {
      try {
        const response = await client("getActivities", {
          body: {
            startDate: startOfWeek(date, { weekStartsOn: 1 }),
            endDate: endOfWeek(date, { weekStartsOn: 1 }),
          },
        });
        if (response) {
          setActivities(response.activities);
          const test = filt(selectedDate);
          setFiltered(test);
        }
      } catch (e) {
        console.log(e, "here");
      }
    };
    fetchActivities();
  }, []);

  const scrollView = React.useRef<ScrollView>();
  React.useEffect(() => scrollToFirst(), [filtered]);

  function scrollToFirst() {
    if (filtered?.length > 0) {
      const dayStartTime = moment(filtered[0].start_date)
        .clone()
        .hour(1)
        .minute(0);
      const diffHours = moment(filtered[0].start_date).diff(
        dayStartTime,
        "hours",
        true
      );
      const initPosition = diffHours * 100 - 10;

      setTimeout(() => {
        if (scrollView) {
          scrollView.current.scrollTo({
            x: 0,
            y: initPosition ? initPosition : 0,
            animated: true,
          });
        }
      }, 1);
    }
  }

  const filt = (date) => {
    return filter(activities, (activity) =>
      isSameDay(new Date(activity.start_date), new Date(date))
    );
  };

  const customDatesStyles = [
    {
      startDate: new Date(),
      dateContainerStyle: { borderWidth: 1, borderColor: "white" },
    },
  ];

  const onDateSelected = (date) => {
    setSelectedDate(date);
    if (activities.length > 0) {
      const newActivities = filt(date);
      setFiltered(newActivities);
    }
  };

  return (
    <Box height="100%" marginTop="l">
      <CalendarStrip
        scrollable={true}
        startingDate={startOfWeek(new Date(), { weekStartsOn: 1 }) as any}
        calendarAnimation={{ type: "sequence", duration: 100 }}
        daySelectionAnimation={{
          type: "background",
          duration: 100,
          highlightColor: "white",
        }}
        style={{ height: 100, paddingTop: 10 }}
        calendarHeaderStyle={{ color: "white" }}
        calendarColor="transparent"
        selectedDate={selectedDate as any}
        locale={{ name: "pl", config: pl }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        customDatesStyles={customDatesStyles}
        leftSelector={[]}
        rightSelector={[]}
        iconContainer={{}}
        onDateSelected={onDateSelected}
      />
      <Box
        shadowColor="primaryText"
        shadowOffset={{
          width: 0,
          height: -4,
        }}
        shadowOpacity={0.3}
        shadowRadius={4.65}
        elevation={8}
      >
        <ScrollView
          contentContainerStyle={{ height: 2410 }}
          ref={scrollView}
          style={
            {
              backgroundColor: theme.colors.mainBackground,
              borderTopLeftRadius: "16",
              borderTopRightRadius: "16",
            } as any
          }
          showsVerticalScrollIndicator
        >
          <Lines width={width} />
          <RedLine width={width} />
          {filtered?.length > 0 ? (
            <Events
              width={width}
              events={filtered}
              selectedDate={selectedDate}
            />
          ) : null}
        </ScrollView>
      </Box>
    </Box>
  );
};

export { Calendar };
