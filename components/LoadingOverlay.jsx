import { View, ActivityIndicator } from 'react-native';

export default LoadingOverlay = () => (
    <View className="absolute w-full h-full inset-0 bg-white bg-opacity-50 justify-center items-center z-10">
        <ActivityIndicator size="large" color="grey" />
    </View>
);