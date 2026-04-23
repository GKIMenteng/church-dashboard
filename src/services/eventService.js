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

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isUpcomingEvent(eventDate) {
  if (!eventDate) {
    return false;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    return eventDate >= getTodayString();
  }

  const parsedDate = new Date(eventDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsedDate >= today;
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

  return events.filter((event) => isUpcomingEvent(event.date));
}

export function formatEventDate(date) {
  if (!date) {
    return '';
  }
  return date;
}
