import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Plus, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { getCounts, listApplications, listReminders, completeReminder } from '@/lib/database';
import { type Application, type Reminder } from '@/lib/types';
import { colors, useAppColors } from '@/lib/theme';

type HomeReminder = Reminder & { company: string; role: string };

export default function HomeScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const palette = useAppColors();
  const [applications, setApplications] = useState<Application[]>([]);
  const [reminders, setReminders] = useState<HomeReminder[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const refresh = useCallback(async () => {
    const [apps, nextReminders, nextCounts] = await Promise.all([listApplications(db), listReminders(db), getCounts(db)]);
    setApplications(apps);
    setReminders(nextReminders);
    setCounts(nextCounts);
  }, [db]);

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));
  const active = applications.filter((app) => !['rejected', 'withdrawn'].includes(app.status)).length;

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.paper }]} contentContainerStyle={styles.content}>
      <View style={styles.header}><View><Text style={[styles.eyebrow, { color: palette.green }]}>JEJAK KARIER</Text><Text style={[styles.title, { color: palette.ink }]}>Tetap tenang, tetap bergerak.</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Tambah lamaran" onPress={() => router.push('/application/edit')} style={[styles.addButton, { backgroundColor: palette.green }]}><Plus color={colors.white} size={22} /></Pressable></View>
      <View style={[styles.focusCard, { backgroundColor: palette.green }]}><Text style={styles.focusEyebrow}>RINGKASAN HARI INI</Text><Text style={styles.focusTitle}>{active ? `${active} lamaran masih aktif` : 'Mulai catat langkah pertamamu'}</Text><Text style={styles.focusText}>{active ? 'Satu pembaruan kecil hari ini cukup untuk menjaga pipeline tetap jelas.' : 'Simpan detail lowongan, status, dan langkah berikutnya di satu tempat.'}</Text><Pressable onPress={() => router.push('/applications')} style={styles.cardLink}><Text style={styles.cardLinkText}>Lihat semua lamaran</Text><ArrowRight color={colors.white} size={16} /></Pressable></View>
      <Text style={[styles.sectionTitle, { color: palette.ink }]}>Pipeline</Text>
      <View style={styles.metrics}>{[['Aktif', active], ['Interview', counts.interview ?? 0], ['Offer', counts.offer ?? 0]].map(([label, value]) => <View key={String(label)} style={[styles.metric, { backgroundColor: palette.surface, borderColor: palette.line }]}><Text style={[styles.metricValue, { color: palette.ink }]}>{value}</Text><Text style={[styles.metricLabel, { color: palette.muted }]}>{label}</Text></View>)}</View>
      <View style={styles.sectionRow}><Text style={[styles.sectionTitle, { color: palette.ink }]}>Agenda berikutnya</Text><Pressable onPress={() => router.push('/applications')}><Text style={[styles.seeAll, { color: palette.green }]}>Buka lamaran</Text></Pressable></View>
      {reminders.length === 0 ? <View style={[styles.empty, { backgroundColor: palette.surface, borderColor: palette.line }]}><Text style={[styles.emptyTitle, { color: palette.ink }]}>Belum ada agenda</Text><Text style={[styles.emptyText, { color: palette.muted }]}>Tambahkan lamaran dan catat langkah berikutnya agar tidak terlewat.</Text></View> : reminders.map((reminder) => <View key={reminder.id} style={[styles.reminder, { backgroundColor: palette.surface, borderColor: palette.line }]}><View style={styles.reminderBody}><Text style={[styles.reminderTitle, { color: palette.ink }]}>{reminder.title}</Text><Text style={[styles.reminderMeta, { color: palette.muted }]}>{reminder.company} · {new Date(reminder.dueAt).toLocaleDateString('id-ID')}</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Tandai selesai" onPress={async () => { await completeReminder(db, reminder.id); refresh(); }}><CheckCircle2 color={palette.green} size={24} /></Pressable></View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 }, content: { padding: 20, paddingTop: 64, paddingBottom: 100 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }, eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 2 }, title: { fontSize: 28, lineHeight: 34, fontWeight: '700', maxWidth: 280, marginTop: 8 }, addButton: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' }, focusCard: { borderRadius: 22, padding: 22, marginBottom: 28 }, focusEyebrow: { color: '#BBD9CB', fontWeight: '800', fontSize: 11, letterSpacing: 1.5 }, focusTitle: { color: colors.white, fontSize: 22, fontWeight: '700', marginTop: 12 }, focusText: { color: '#DCEBE3', fontSize: 14, lineHeight: 21, marginTop: 8 }, cardLink: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }, cardLinkText: { color: colors.white, fontWeight: '700' }, sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 }, metrics: { flexDirection: 'row', gap: 10, marginBottom: 28 }, metric: { flex: 1, borderWidth: 1, borderRadius: 16, padding: 14 }, metricValue: { fontSize: 25, fontWeight: '700' }, metricLabel: { fontSize: 12, marginTop: 4 }, sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, seeAll: { fontWeight: '700', marginBottom: 12 }, empty: { borderWidth: 1, borderRadius: 16, padding: 18 }, emptyTitle: { fontSize: 16, fontWeight: '700' }, emptyText: { fontSize: 14, lineHeight: 20, marginTop: 5 }, reminder: { borderWidth: 1, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }, reminderBody: { flex: 1 }, reminderTitle: { fontWeight: '700', fontSize: 15 }, reminderMeta: { marginTop: 5, fontSize: 12 } });
