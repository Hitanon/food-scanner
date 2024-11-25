// app/_layout.js
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import "../global.css";
import { useEffect } from 'react';
import { ProductProvider } from '../context/ProductContext';

SplashScreen.preventAutoHideAsync(); // Удерживаем Splash Screen

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        if (error) throw error;

        if (fontsLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          SplashScreen.hideAsync();
        }
      } catch (e) {
        console.error(e);
      }
    };

    prepare();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{ headerShown: false }} />
      </Stack>
    </ProductProvider>
  );
};

export default RootLayout;
