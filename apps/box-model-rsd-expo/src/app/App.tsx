import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  AboutScreen,
  BlogArticleScreen,
  BlogsScreen,
  HomeScreen,
  type RootStackParamList,
} from '@box-model/rsd-app';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          id="RootStack"
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            contentStyle: {
              backgroundColor: '#121212',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Box Model UI' }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ title: 'About' }}
          />
          <Stack.Screen
            name="Blogs"
            component={BlogsScreen}
            options={{ title: 'Developer Blog' }}
          />
          <Stack.Screen
            name="BlogArticle"
            component={BlogArticleScreen}
            options={{ title: 'Blog Post' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
