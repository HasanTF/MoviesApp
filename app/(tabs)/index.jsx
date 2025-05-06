import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import FeaturedMovies from "../../components/FeaturedMovies";
import Genres from "../../components/Genres";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View>
          <Header />
        </View>

        {/* Search Section */}
        <SearchBar />

        {/* FeaturedMovies Section */}
        <View>
          <FeaturedMovies />
        </View>

        {/* Genres Section */}
        <View>
          <Genres />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
