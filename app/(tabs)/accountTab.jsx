import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const AccountTab = () => {
  const user = {
    name: "Hasan",
    email: "Hasan@example.com",
    avatar: require("../../assets/images/userIcon.png"),
  };

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => console.log("User signed out") },
    ]);
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{
          padding: wp(5),
          backgroundColor: "#171717",
          flex: 1,
          justifyContent: "space-around",
          paddingBottom: hp(20),
        }}
      >
        {/* Profile Header */}
        <View className="items-center my-2">
          <Image
            source={user.avatar}
            style={{
              width: wp(24),
              height: wp(24),
              borderRadius: wp(12),
              marginBottom: hp(1),
            }}
          />
          <Text style={{ fontSize: wp(6) }} className="text-white font-bold">
            {user.name}
          </Text>
          <Text style={{ fontSize: wp(4.5) }} className="text-white">
            {user.email}
          </Text>
        </View>

        {/* Options */}
        <View>
          {[
            { label: "Edit Profile", icon: "person-circle-outline" },
            { label: "Change Password", icon: "lock-closed-outline" },
            { label: "Privacy Settings", icon: "shield-checkmark-outline" },
            { label: "Help & Support", icon: "help-circle-outline" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: hp(1.8),
                borderBottomColor: "#333",
                borderBottomWidth: 1,
              }}
            >
              <Ionicons name={item.icon} size={24} color="#0ea5e9" />
              <Text style={{ fontSize: wp(4) }} className="text-white ml-2">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <View>
          <TouchableOpacity
            className="mt-4 bg-sky-500 items-center py-4 rounded-full"
            onPress={handleLogout}
          >
            <Text
              style={{ fontSize: wp(4.5) }}
              className="text-white font-bold"
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountTab;
