import type { SQLiteDatabase } from 'expo-sqlite';
import type { Application, ApplicationInput, ApplicationStatus, Reminder } from './types';

export async function initDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'saved',
      source TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      detail TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      due_at INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
}

function mapApplication(row: Record<string, unknown>): Application {
  return {
    id: Number(row.id),
    company: String(row.company),
    role: String(row.role),
    status: row.status as ApplicationStatus,
    source: String(row.source ?? ''),
    location: String(row.location ?? ''),
    notes: String(row.notes ?? ''),
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

export async function listApplications(db: SQLiteDatabase, search = '') {
  const pattern = `%${search.trim()}%`;
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM applications
     WHERE company LIKE ? OR role LIKE ? OR location LIKE ?
     ORDER BY updated_at DESC`,
    pattern,
    pattern,
    pattern,
  );
  return rows.map(mapApplication);
}

export async function getApplication(db: SQLiteDatabase, id: number) {
  const row = await db.getFirstAsync<Record<string, unknown>>(
    'SELECT * FROM applications WHERE id = ?',
    id,
  );
  return row ? mapApplication(row) : null;
}

export async function saveApplication(db: SQLiteDatabase, input: ApplicationInput, id?: number) {
  const now = Date.now();
  if (id) {
    const previous = await getApplication(db, id);
    await db.runAsync(
      `UPDATE applications SET company = ?, role = ?, status = ?, source = ?, location = ?, notes = ?, updated_at = ? WHERE id = ?`,
      input.company,
      input.role,
      input.status,
      input.source,
      input.location,
      input.notes,
      now,
      id,
    );
    if (previous && previous.status !== input.status) {
      await db.runAsync(
        `INSERT INTO activities (application_id, type, detail, created_at) VALUES (?, 'status_change', ?, ?)`,
        id,
        `${previous.status} -> ${input.status}`,
        now,
      );
    }
    return id;
  }

  const result = await db.runAsync(
    `INSERT INTO applications (company, role, status, source, location, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    input.company,
    input.role,
    input.status,
    input.source,
    input.location,
    input.notes,
    now,
    now,
  );
  await db.runAsync(
    `INSERT INTO activities (application_id, type, detail, created_at) VALUES (?, 'created', 'Lamaran dibuat', ?)`,
    result.lastInsertRowId,
    now,
  );
  return result.lastInsertRowId;
}

export async function deleteApplication(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM applications WHERE id = ?', id);
}

export async function listReminders(db: SQLiteDatabase, limit = 5) {
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT r.*, a.company, a.role FROM reminders r
     JOIN applications a ON a.id = r.application_id
     WHERE r.completed = 0 ORDER BY r.due_at ASC LIMIT ?`,
    limit,
  );
  return rows.map((row) => ({
    id: Number(row.id),
    applicationId: Number(row.application_id),
    title: String(row.title),
    dueAt: Number(row.due_at),
    completed: Boolean(row.completed),
    company: String(row.company),
    role: String(row.role),
  }));
}

export async function saveReminder(db: SQLiteDatabase, applicationId: number, title: string, dueAt: number) {
  await db.runAsync(
    'INSERT INTO reminders (application_id, title, due_at) VALUES (?, ?, ?)',
    applicationId,
    title,
    dueAt,
  );
}

export async function completeReminder(db: SQLiteDatabase, id: number) {
  await db.runAsync('UPDATE reminders SET completed = 1 WHERE id = ?', id);
}

export async function getCounts(db: SQLiteDatabase) {
  const rows = await db.getAllAsync<{ status: ApplicationStatus; count: number }>(
    'SELECT status, COUNT(*) as count FROM applications GROUP BY status',
  );
  return rows.reduce<Record<string, number>>((result, row) => {
    result[row.status] = Number(row.count);
    return result;
  }, {});
}

export async function seedDemoData(db: SQLiteDatabase) {
  const existing = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM applications');
  if (Number(existing?.count ?? 0) > 0) return false;
  const first = await saveApplication(db, {
    company: 'Nusantara Studio',
    role: 'Product Designer',
    status: 'interview',
    source: 'LinkedIn',
    location: 'Remote',
    notes: 'Siapkan studi kasus proyek terakhir.',
  });
  const second = await saveApplication(db, {
    company: 'Ruang Teknologi',
    role: 'Frontend Engineer',
    status: 'applied',
    source: 'Referral',
    location: 'Makassar',
    notes: '',
  });
  await saveReminder(db, first, 'Siapkan interview', Date.now() + 86_400_000);
  await saveReminder(db, second, 'Follow up lamaran', Date.now() + 3 * 86_400_000);
  await db.runAsync(`INSERT OR REPLACE INTO settings (key, value) VALUES ('demo_data_loaded', '1')`);
  return true;
}

export async function clearAllData(db: SQLiteDatabase) {
  await db.execAsync('DELETE FROM reminders; DELETE FROM activities; DELETE FROM applications;');
}

export type ReminderWithApplication = Reminder & { company: string; role: string };
