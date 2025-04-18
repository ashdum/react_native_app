import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { colors } from '@/utils/constants/colors';
import { View } from 'react-native';
import { LogoHeader } from '@/components/shared/LogoHeader';
import { MenuIcon } from '@/components/ui/MenuIcon';

const screenOptions = {
    headerStyle: { backgroundColor: '#A3DFFA' },
    headerTintColor: colors.text,
    headerTitleStyle: { fontFamily: 'Inter-Bold', fontSize: 20 },
    cardStyle: { backgroundColor: colors.background },
    header: () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: 20,
                backgroundColor: '#A3DFFA',
            }}
        >
            <LogoHeader />
            <MenuIcon />
        </View>
    ),
};

export default function RootNavigator() {
    useFrameworkReady();

    const [fontsLoaded, fontError] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Bold': Inter_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <>
            <Stack screenOptions={screenOptions}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="auth/login" options={{ title: 'Вход', headerShown: false }} />
                <Stack.Screen name="menu" options={{ title: 'Меню' }} />
                <Stack.Screen name="grid" options={{ title: 'Данные' }} />
                <Stack.Screen name="camera" options={{ title: 'Камера', headerShown: false }} />
                <Stack.Screen name="+not-found" options={{ title: 'Ошибка' }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}