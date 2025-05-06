import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const SearchBar = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/(tabs)/searchTab");
      }}
      className="items-center"
    >
      <View
        className="flex-row justify-center items-center my-4 bg-white/15 rounded-2xl p-1"
        style={{ width: wp(90) }}
      >
        <Ionicons
          name="search"
          size={wp(6)}
          color={"#ffffffcc"}
          className="p-2"
        />
        <Text className="flex-1 text-white/50">Search..</Text>
        <View className="w-[1px] h-2/3 bg-white/30" />
        <Ionicons className="p-2" name="mic" size={wp(6)} color={"#ffffff4d"} />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;
