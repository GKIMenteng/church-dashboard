import { collection, getDocs } from 'firebase/firestore';
import { getFirestoreInstance } from './firebaseService';

const EVENTS_COLLECTION = 'events';
const isProduction = true;

function compareDates(a, b) {
  return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
}

function sortEvents(events) {
  return [...events].sort(compareDates);
}

function normalizeEvent(event) {
  return {
    id: String(event.id),
    title: event.title ?? '',
    date: event.date ?? '',
    time: event.time ?? '',
    location: event.location ?? '',
    description: event.description ?? '',
    volunteers: event.volunteers ?? '',
  };
}

export async function list() {
  if (!isProduction) {
    throw new Error('Development API mode is disabled in this app build.');
  }

  const db = getFirestoreInstance();
  const snapshot = await getDocs(collection(db, EVENTS_COLLECTION));

  const events = sortEvents(
    snapshot.docs.map((eventDoc) =>
      normalizeEvent({
        id: eventDoc.id,
        ...eventDoc.data(),
      })
    )
  );

  return events;
}

export function formatEventDate(date) {
  if (!date) {
    return '';
  }
  return date;
}
