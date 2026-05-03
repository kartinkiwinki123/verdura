import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

export const sql = neon(process.env.DATABASE_URL);

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  gemeente?: string;
  service?: string;
  message: string;
  created_at?: string;
}

// ─── Init (run once to create table) ──────────────────────────────────────

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      gemeente   TEXT,
      service    TEXT,
      message    TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

// ─── Queries ───────────────────────────────────────────────────────────────

export async function insertContactSubmission(data: Omit<ContactSubmission, 'id' | 'created_at'>) {
  const [row] = await sql`
    INSERT INTO contact_submissions (name, email, phone, gemeente, service, message)
    VALUES (${data.name}, ${data.email}, ${data.phone ?? null}, ${data.gemeente ?? null}, ${data.service ?? null}, ${data.message})
    RETURNING *
  `;
  return row as ContactSubmission;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const rows = await sql`
    SELECT * FROM contact_submissions
    ORDER BY created_at DESC
  `;
  return rows as ContactSubmission[];
}
