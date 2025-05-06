import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => {
  return (
    <View className="flex-row w-full px-8 justify-between items-center mt-2">
      {/* HelloContainer */}
      <View>
        <Text style={{ fontSize: hp(3) }} className="text-white">
          Hello <Text className="font-bold text-sky-500">Hasan</Text>
        </Text>
        <Text style={{ fontSize: hp(2) }} className="text-slate-400">
          Check for latest movies!
        </Text>
      </View>
      {/* UserImage Container */}
      <View>
        <Image
          source={require("../assets/images/userIcon.png")}
          className="rounded-full"
          style={{ width: wp(15), height: wp(15) }}
        />
      </View>
    </View>
  );
};

export default Header;
