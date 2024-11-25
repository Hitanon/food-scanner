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
  type = 'text',
}) => {
  const handleInputChange = (text) => {
    if (type === 'number') {
      // Разрешить только положительные числа с точкой или запятой
      let validatedText = text.replace(/[^0-9.,]/g, '');
      validatedText = validatedText.replace(',', '.'); 
      
      const parts = validatedText.split('.');
      if (parts.length > 2) {
        return; 
      }
      onChangeText(validatedText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View className={`mb-5 ${containerStyles}`}>
      {label && <Text className={`text-base mb-2 ${labelStyles}`}>{label}</Text>}
      <TextInput
        className={`bg-white p-3 rounded-lg text-base ${inputStyles}`}
        placeholder={placeholder}
        value={value}
        onChangeText={handleInputChange}
        keyboardType={type === 'number' ? 'numeric' : keyboardType}
      />
    </View>
  );
};

export default InputField;
