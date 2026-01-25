import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNav, type NavRoute } from './app-nav';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#282828',
  },
  scrollView: {
    display: 'flex',
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
  },
  appNav: {
    display: 'flex',
  }
});

export type AppShellProps = {
  activeRoute?: NavRoute;
  children: React.ReactNode;
};

export function AppShell({ activeRoute, children }: AppShellProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[0]}
      >
        <AppNav activeRoute={activeRoute} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AppShell;
