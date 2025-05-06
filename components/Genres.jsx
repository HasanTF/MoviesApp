import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

const TMDB_API_KEY = "d9bc92897d44a69c35a71a00f56d0d3a";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const genreIconMap = {
  Action: "flash",
  Adventure: "map",
  Animation: "color-palette",
  Comedy: "happy",
  Crime: "alert-circle",
  Documentary: "document",
  Drama: "film",
  Family: "people",
  Fantasy: "sparkles",
  History: "time",
  Horror: "skull",
  Music: "musical-notes",
  Mystery: "search",
  Romance: "heart",
  "Science Fiction": "rocket",
  "TV Movie": "tv",
  Thriller: "alert",
  War: "flag",
  Western: "leaf",
};

const Genres = () => {
  const router = useRouter();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
          params: {
            api_key: TMDB_API_KEY,
            language: "en-US",
          },
        });
        // console.log("Genres fetched successfully:", response.data.genres);
        setGenres(response.data.genres);
        if (response.data.genres.length > 0) {
          setSelectedGenre(response.data.genres[0].id);
        }
      } catch (error) {
        console.error("Error fetching genres:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setError("Failed to fetch genres.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const fetchMovies = async () => {
        try {
          // console.log("Fetching movies for genre:", selectedGenre);
          const movies = await fetchMoviesByGenre(selectedGenre);
          setMovies(movies);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError("Failed to fetch movies.");
        }
      };

      fetchMovies();
    }
  }, [selectedGenre]);

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genreId,
          language: "en-US",
          page: 1,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      return [];
    }
  };

  const handlePress = (item) => {
    setSelectedGenre(item.id);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  if (error) {
    return <Text className="text-white text-center">{error}</Text>;
  }

  if (!genres || genres.length === 0) {
    return <Text className="text-white text-center">No genres found.</Text>;
  }

  return (
    <View>
      {/* Genre List */}
      <View>
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: wp(4), paddingHorizontal: wp(5) }}
            className="text-white font-bold"
          >
            Genres
          </Text>
          <TouchableOpacity>
            <Text
              style={{ fontSize: wp(4), paddingHorizontal: wp(5) }}
              className="text-sky-500 font-bold"
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: wp(3),
            gap: wp(5),
          }}
          extraData={selectedGenre}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedGenre;
            const iconName = genreIconMap[item.name] || "film";

            return (
              <View className="justify-center items-center">
                <TouchableOpacity
                  style={{ width: wp(14), height: wp(14) }}
                  className={`justify-center items-center rounded-xl ${
                    isSelected ? "bg-white/20" : "bg-white/30"
                  }`}
                  onPress={() => {
                    handlePress(item);
                  }}
                >
                  <Ionicons
                    name={iconName}
                    size={wp(6)}
                    color={isSelected ? "#0ea5e9" : "white"}
                  />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: wp(3.2) }}
                  className={isSelected ? "text-white/80" : "text-white/30"}
                >
                  {item.name}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Movies List */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movies}
          contentContainerStyle={{
            paddingHorizontal: wp(2),
            gap: wp(3),
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/moviesDetailsScreen",
                    params: item,
                  })
                }
                className="justify-center items-center"
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  resizeMode="stretch"
                  style={{
                    height: wp(35),
                    width: wp(25),
                  }}
                  className="rounded2xl"
                />
                <Text
                  style={{ fontSize: wp(4) }}
                  className="text-white/50 font-bold"
                >
                  {item.title.length > 6
                    ? `${item.title.substring(0, 12)}...`
                    : item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Genres;
