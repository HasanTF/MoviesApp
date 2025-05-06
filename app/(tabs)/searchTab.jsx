import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import MoviesCard from "../../components/MoviesCard";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const TMDB_API_KEY = "d9bc92897d44a69c35a71a00f56d0d3a";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [showTrending, setShowTrending] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL}/trending/movie/week`,
          {
            params: { api_key: TMDB_API_KEY },
          }
        );
        setTrendingMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch trending movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching movies", error);
      throw error;
    }
  };

  const performSearch = async () => {
    if (searchQuery.trim().length < 1) {
      setResults([]);
      setShowTrending(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setShowTrending(false);
      const data = await searchMovies(searchQuery);
      setResults(data.results);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <StatusBar style="light" />
      {/* Search Bar */}
      <View className="items-center">
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
          <TextInput
            placeholder="Search"
            placeholderTextColor={"#ffffff4d"}
            color={"white"}
            className="flex-1"
            style={{ fontSize: wp(3.5) }}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              performSearch();
            }}
            returnKeyType="search"
            onSubmitEditing={performSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setResults([]);
                setShowTrending(true);
              }}
              className="p-2"
            >
              <Ionicons name="close" size={wp(6)} color={"#ffffff4d"} />
            </TouchableOpacity>
          )}
          <View className="w-[1px] h-2/3 bg-white/30" />
          <TouchableOpacity className="p-2">
            <Ionicons name="mic" size={wp(6)} color={"#ffffff4d"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Section */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">{error}</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: hp(10),
          }}
          renderItem={({ item }) => <MoviesCard movie={item} />}
        />
      ) : searchQuery.length > 2 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">No results found</Text>
        </View>
      ) : showTrending ? (
        <>
          <Text className="text-white text-xl font-bold mx-4 my-2">
            Recently Searched
          </Text>
          <FlatList
            data={trendingMovies}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            contentContainerStyle={{
              paddingBottom: hp(10),
            }}
            renderItem={({ item }) => <MoviesCard movie={item} />}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default SearchTab;
