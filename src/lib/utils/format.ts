export function formatShortDateTime(value?: string) {
  if (!value) return "Timing pending";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Timing pending";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  }).format(date);
}

export function formatRelativeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Updated recently";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) return `Updated ${diffMinutes} min ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `Updated ${diffHours} hr ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 14) return `Updated ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  return `Updated ${new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date)}`;
}

export function formatRoute(fromAirport?: string, toAirport?: string, location?: string) {
  if (fromAirport && toAirport) return `${fromAirport} -> ${toAirport}`;
  if (location) return location;
  return "Location pending";
}
