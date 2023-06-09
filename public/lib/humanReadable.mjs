export function humanReadable(note) {
  return note.slice(0, -1).replace(/b/, "♭");
}
