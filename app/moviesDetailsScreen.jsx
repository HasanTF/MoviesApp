import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

const TMDB_API_KEY = "d9bc92897d44a69c35a71a00f56d0d3a";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const MovieDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${params.id}`,
          {
            params: {
              api_key: TMDB_API_KEY,
              append_to_response: "credits,videos",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMovieDetails();
    }
  }, [params.id]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this movie: ${movie.title}\n\n${movie.overview}`,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        title: movie.title,
      });
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-neutral-900 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-neutral-900 justify-center items-center px-4">
        <Text className="text-white text-center text-lg">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-sky-600 px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      {/* Backdrop Image */}
      <View className="relative">
        <Image
          source={{
            uri: movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : "https://via.placeholder.com/780x439?text=No+Backdrop",
          }}
          style={{ width: wp(100), height: hp(45) }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(23, 23, 23, 0.8)",
            "rgba(23, 23, 23, 1)",
          ]}
          style={{ width: wp(100), height: hp(20) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>

      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-12 left-4 p-2 rounded-full bg-neutral-800/90"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={wp(6)} color="white" />
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity
        className="absolute top-12 right-4 p-2 rounded-full bg-neutral-800/90"
        onPress={handleShare}
      >
        <Ionicons name="share-social" size={wp(6)} color="white" />
      </TouchableOpacity>

      {/* Movie Poster and Basic Info */}
      <View
        className="flex-row px-4"
        style={{ marginTop: -hp(10), marginBottom: hp(2) }}
      >
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : "https://via.placeholder.com/342x513?text=No+Poster",
          }}
          style={{ width: wp(30), height: hp(22), borderRadius: wp(3) }}
          resizeMode="cover"
        />

        <View className="flex-1 ml-4">
          <Text className="text-white text-2xl font-bold">{movie.title}</Text>
          <Text className="text-neutral-400 text-base">
            {movie.release_date?.split("-")[0]} • {movie.runtime} min
          </Text>

          <View className="flex-row flex-wrap mt-2">
            {movie.genres?.map((genre, index) => (
              <View
                key={genre.id}
                className="bg-neutral-800 rounded-full px-3 py-1 mr-2 mb-2"
              >
                <Text className="text-white text-xs">{genre.name}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={wp(4)} color="#FFD700" />
            <Text className="text-white ml-1 text-base">
              {movie.vote_average?.toFixed(1)} (
              {movie.vote_count?.toLocaleString()} votes)
            </Text>
          </View>
        </View>
      </View>

      {/* Overview */}
      <View className="px-4 mb-6">
        <Text className="text-white text-xl font-bold mb-2">Overview</Text>
        <Text className="text-neutral-400 text-base">{movie.overview}</Text>
      </View>

      {/* Production Companies */}
      {movie.production_companies?.length > 0 && (
        <View className="px-4 mb-6">
          <Text className="text-white text-xl font-bold mb-2">Production</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {movie.production_companies.map((company) => (
              <View key={company.id} className="mr-4 items-center">
                {company.logo_path ? (
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w200${company.logo_path}`,
                    }}
                    style={{ width: wp(20), height: wp(10) }}
                    resizeMode="contain"
                  />
                ) : (
                  <View className="bg-neutral-800 p-3 rounded-lg">
                    <Text className="text-white text-xs text-center">
                      {company.name}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Cast */}
      {movie.credits?.cast?.length > 0 && (
        <View className="px-4 mb-6">
          <Text className="text-white text-xl font-bold mb-2">Cast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {movie.credits.cast.slice(0, 10).map((person) => (
              <View key={person.id} className="mr-4" style={{ width: wp(20) }}>
                <Image
                  source={{
                    uri: person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image",
                  }}
                  style={{
                    width: wp(20),
                    height: wp(20),
                    borderRadius: wp(10),
                  }}
                  resizeMode="cover"
                />
                <Text className="text-white text-sm mt-2" numberOfLines={1}>
                  {person.name}
                </Text>
                <Text className="text-neutral-400 text-xs" numberOfLines={1}>
                  {person.character}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetailsScreen;
