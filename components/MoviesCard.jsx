import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { image500 } from "../helpers/helper";
import { useRouter } from "expo-router";

const MoviesCard = ({ movie }) => {
  const router = useRouter();

  if (!movie?.poster_path) return null;

  return (
    <View className="flex-1 rounded-3xl overflow-hidden m-2">
      <View>
        <Image
          source={{ uri: image500(movie.poster_path) }}
          resizeMode="cover"
          style={{
            height: hp(30),
          }}
        />
        <View className="absolute bottom-0 left-0 right-0 bg-black/50 z-10">
          <Text
            className="text-white text-center font-bold"
            style={{ fontSize: wp(3.5) }}
          >
            {movie.title || "Unknown Title"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-[#0ea5e9] py-2"
        onPress={() =>
          router.push({
            pathname: "/moviesDetailsScreen",
            params: movie,
          })
        }
      >
        <Text
          style={{ fontSize: wp(4) }}
          className="text-white text-center font-extrabold"
        >
          View Movie
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoviesCard;
