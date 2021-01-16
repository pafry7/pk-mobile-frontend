import * as React from "react";
import Box from "./Box";
import { TouchableOpacity, Platform, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

interface EventImagePickerProps {
  setEventImage: any;
}

const EventImagePicker: React.FC<EventImagePickerProps> = ({
  setEventImage,
}) => {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // change state to upper component
      const uri = result.uri;
      const type = result.type;
      const name = "test";
      const source = {
        uri,
        type,
        name,
      };
      setEventImage(source);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Box
        borderWidth={image ? 0 : 1}
        width="100%"
        height={120}
        opacity={image ? 1 : 0.5}
        borderRadius="s"
        alignItems="center"
        justifyContent="center"
        borderStyle="dashed"
      >
        {image ? (
          <Box
            width="100%"
            shadowColor="primaryText"
            shadowOffset={{
              width: 0,
              height: 3,
            }}
            shadowOpacity={0.27}
            shadowRadius={4.65}
            elevation={6}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
            />
          </Box>
        ) : (
          <Box
            borderRadius="xl"
            width={60}
            height={60}
            borderWidth={1}
            justifyContent="center"
            alignItems="center"
          >
            <Feather name="camera" size={24} color="black" />
          </Box>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export { EventImagePicker };
