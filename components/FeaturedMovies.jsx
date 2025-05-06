import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import { useEffect, useState } from "react";
import axios from "axios";

const TMDB_API_KEY = "d9bc92897d44a69c35a71a00f56d0d3a";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const fetchPopularMovies = async () => {
  try {
    const url = `${TMDB_BASE_URL}/movie/popular`;
    const response = await axios.get(url, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

const FeaturedMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchPopularMovies();
        setTrendingMovies(trendingMovies);
      } catch (error) {
        setError("Failed to fetch trending movies.");
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  if (error) {
    return <Text className="text-white text-center">{error}</Text>;
  }

  if (!trendingMovies || trendingMovies.length === 0) {
    return <Text className="text-white text-center">No movies found.</Text>;
  }

  return (
    <View>
      <Text
        style={{ fontSize: wp(4), paddingHorizontal: wp(5) }}
        className="text-white font-bold"
      >
        Trending Movies
      </Text>
      <View className="flex-1 justify-center items-center py-2">
        <Carousel
          loop
          autoPlay={true}
          width={wp(100)}
          height={hp(32)}
          data={trendingMovies}
          scrollAnimationDuration={2000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: wp(60),
            parallaxAdjacentItemScale: 0.75,
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            return (
              <View className="flex-1 justify-center items-center">
                <ImageBackground
                  source={{ uri: posterUrl }}
                  resizeMode="cover"
                  className="flex-1 justify-center items-center overflow-hidden"
                  style={{
                    width: wp(40),
                    borderRadius: wp(5),
                    overflow: "hidden",
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default FeaturedMovies;
