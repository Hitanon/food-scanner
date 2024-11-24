import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SmallCustomButton = ({ title, handlePress, bgColor, textColor, borderColor, className }) => {
  return (
    <View className={className}>
        <TouchableOpacity
        onPress={handlePress}
        className={`px-3 py-1 rounded-lg ${bgColor} ${textColor} ${borderColor || ''}`}
        activeOpacity={0.8}
        >
        <Text className={`text-sm font-psemibold ${textColor}`}>{title}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default SmallCustomButton;
