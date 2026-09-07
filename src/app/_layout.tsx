import { Tabs } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { BriefcaseBusiness, ChartNoAxesColumn, House, Settings } from 'lucide-react-native';
import { initDatabase } from '@/lib/database';
import { useAppColors } from '@/lib/theme';

export default function RootLayout() {
  const colors = useAppColors();
  return (
    <SQLiteProvider databaseName="jejak-karier.db" onInit={initDatabase} useSuspense>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line, height: 68, paddingBottom: 8 },
          tabBarLabelStyle: { fontSize: 11 },
        }}
      >
        <Tabs.Screen name="home" options={{ title: 'Beranda', tabBarIcon: ({ color }) => <House color={color} size={21} /> }} />
        <Tabs.Screen name="applications" options={{ title: 'Lamaran', tabBarIcon: ({ color }) => <BriefcaseBusiness color={color} size={21} /> }} />
        <Tabs.Screen name="insights" options={{ title: 'Insight', tabBarIcon: ({ color }) => <ChartNoAxesColumn color={color} size={21} /> }} />
        <Tabs.Screen name="settings" options={{ title: 'Pengaturan', tabBarIcon: ({ color }) => <Settings color={color} size={21} /> }} />
        <Tabs.Screen name="application/edit" options={{ href: null }} />
      </Tabs>
    </SQLiteProvider>
  );
}
