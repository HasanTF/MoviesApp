import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import FeaturedMovies from "../../components/FeaturedMovies";
import Genres from "../../components/Genres";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Index = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: hp(10) }}
      showsVerticalScrollIndicator={false}
      className="bg-neutral-900"
    >
      <SafeAreaView>
        <StatusBar style="light" />
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Index;
