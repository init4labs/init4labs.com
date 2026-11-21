const openEvent = document.querySelector('#open-event');
const eventReady = document.querySelector('#event-ready');
const eventMissing = document.querySelector('#event-missing');
// The app limits the decoded event JSON to 64 KiB.
const maxPayloadLength = 87_382;

function updateEventLink() {
  const payload = window.location.hash.slice(1);
  const hasPayload = payload.length <= maxPayloadLength
    && payload.length % 4 !== 1
    && /^[A-Za-z0-9_-]+$/.test(payload);

  if (hasPayload) {
    openEvent.href = `howmanysleeps://share/event#${payload}`;
  } else {
    openEvent.removeAttribute('href');
  }

  openEvent.hidden = !hasPayload;
  eventReady.hidden = !hasPayload;
  eventMissing.hidden = hasPayload;
}

updateEventLink();
window.addEventListener('hashchange', updateEventLink);
