import React from 'react';
import { View, Text, TextInput } from 'react-native';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  containerStyles = '',
  inputStyles = '',
  labelStyles = '',
}) => {
  return (
    <View className={`mb-5 ${containerStyles}`}>
      {label && <Text className={`text-base mb-2 ${labelStyles}`}>{label}</Text>}
      <TextInput
        className={`bg-white p-3 rounded-lg text-base ${inputStyles}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;