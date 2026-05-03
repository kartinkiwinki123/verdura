import { NextRequest, NextResponse } from 'next/server';
import { insertContactSubmission, initDb } from '@/lib/db';

// Init table on first request (idempotent)
let dbReady = false;

async function ensureDb() {
  if (!dbReady) {
    await initDb();
    dbReady = true;
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDb();

    const body = await req.json();

    const { name, email, phone, gemeente, service, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Naam, e-mailadres en bericht zijn verplicht.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres.' },
        { status: 400 }
      );
    }

    const submission = await insertContactSubmission({
      name:     String(name).trim(),
      email:    String(email).trim().toLowerCase(),
      phone:    phone ? String(phone).trim() : undefined,
      gemeente: gemeente ? String(gemeente).trim() : undefined,
      service:  service ? String(service).trim() : undefined,
      message:  String(message).trim(),
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });

  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Er is een serverfout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    );
  }
}
