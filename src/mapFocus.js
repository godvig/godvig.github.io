// Lets the skyline at the top of the page tell the map which place to show.
// The map loads late, so a request made before it exists is kept until it asks for it.
let pending = null;
const listeners = new Set();

export function focusPlace(id) {
  pending = id;
  listeners.forEach(fn => fn(id));
}

/** The place asked for before the map was ready, if any. Asking clears it. */
export function takePendingPlace() {
  const id = pending;
  pending = null;
  return id;
}

export function onFocusPlace(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
