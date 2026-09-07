import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Plus, Search, Trash2 } from 'lucide-react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { deleteApplication, listApplications } from '@/lib/database';
import { STATUS_LABELS, STATUSES, type Application } from '@/lib/types';
import { useAppColors } from '@/lib/theme';

export default function ApplicationsScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const palette = useAppColors();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [items, setItems] = useState<Application[]>([]);
  const refresh = useCallback(async () => setItems(await listApplications(db, search)), [db, search]);
  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));
  const filtered = status === 'all' ? items : items.filter((item) => item.status === status);
  const remove = (id: number) => Alert.alert('Hapus lamaran?', 'Data dan agenda terkait akan dihapus dari perangkat.', [
    { text: 'Batal', style: 'cancel' },
    { text: 'Hapus', style: 'destructive', onPress: async () => { await deleteApplication(db, id); refresh(); } },
  ]);

  return (
    <View style={[styles.screen, { backgroundColor: palette.paper }]}>
      <View style={styles.header}>
        <View><Text style={[styles.eyebrow, { color: palette.green }]}>PIPELINE</Text><Text style={[styles.title, { color: palette.ink }]}>Lamaran</Text></View>
        <Pressable onPress={() => router.push('/application/edit' as never)} style={[styles.add, { backgroundColor: palette.green }]}><Plus color="#fff" size={21} /></Pressable>
      </View>
      <View style={[styles.search, { backgroundColor: palette.surface, borderColor: palette.line }]}>
        <Search color={palette.muted} size={18} /><TextInput value={search} onChangeText={setSearch} placeholder="Cari perusahaan atau posisi" placeholderTextColor={palette.muted} style={[styles.searchInput, { color: palette.ink }]} />
      </View>
      <FlatList data={STATUSES} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item} contentContainerStyle={styles.filters} ListHeaderComponent={<Pressable onPress={() => setStatus('all')} style={[styles.filter, { backgroundColor: status === 'all' ? palette.green : palette.surface, borderColor: palette.line }]}><Text style={{ color: status === 'all' ? '#fff' : palette.ink }}>Semua</Text></Pressable>} renderItem={({ item }) => <Pressable onPress={() => setStatus(item)} style={[styles.filter, { backgroundColor: status === item ? palette.green : palette.surface, borderColor: palette.line }]}><Text style={{ color: status === item ? '#fff' : palette.ink }}>{STATUS_LABELS[item]}</Text></Pressable>} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={[styles.empty, { color: palette.muted }]}>Belum ada lamaran. Tekan + untuk mencatat yang pertama.</Text>}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/application/edit' as never, params: { id: String(item.id) } })} style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.line }]}>
            <View style={styles.cardTop}><View style={{ flex: 1 }}><Text style={[styles.role, { color: palette.ink }]}>{item.role}</Text><Text style={[styles.company, { color: palette.muted }]}>{item.company} · {item.location || 'Lokasi belum diisi'}</Text></View><Pressable hitSlop={10} onPress={() => remove(item.id)}><Trash2 color={palette.muted} size={18} /></Pressable></View>
            <View style={[styles.badge, { backgroundColor: palette.greenSoft }]}><Text style={[styles.badgeText, { color: palette.green }]}>{STATUS_LABELS[item.status]}</Text></View>
            {item.notes ? <Text numberOfLines={2} style={[styles.notes, { color: palette.muted }]}>{item.notes}</Text> : null}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, paddingTop: 64 }, header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, eyebrow: { fontWeight: '800', letterSpacing: 2, fontSize: 11 }, title: { fontSize: 30, fontWeight: '700', marginTop: 5 }, add: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' }, search: { margin: 20, marginBottom: 8, borderWidth: 1, borderRadius: 14, height: 48, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' }, searchInput: { flex: 1, marginLeft: 8, fontSize: 14 }, filters: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 }, filter: { borderWidth: 1, borderRadius: 18, paddingVertical: 8, paddingHorizontal: 13 }, list: { paddingHorizontal: 20, paddingBottom: 110, gap: 10 }, card: { borderWidth: 1, borderRadius: 17, padding: 16, marginBottom: 10 }, cardTop: { flexDirection: 'row', alignItems: 'flex-start' }, role: { fontSize: 17, fontWeight: '700' }, company: { fontSize: 13, marginTop: 5 }, badge: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5, marginTop: 13 }, badgeText: { fontSize: 11, fontWeight: '700' }, notes: { fontSize: 13, lineHeight: 19, marginTop: 10 }, empty: { textAlign: 'center', paddingTop: 60, paddingHorizontal: 30, lineHeight: 21 } });
