import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { css, html } from 'react-strict-dom';

import {
  AboutScreen,
  BlogArticleScreen,
  BlogsScreen,
  HomeScreen,
  type RootStackParamList,
} from '@box-model/rsd-app';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = css.create({
  root: {
    flex: 1,
  },
});

export const App = () => {
  return (
    <html.div data-layoutconformance="strict" style={styles.root}>
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
    </html.div>
  );
};

export default App;
