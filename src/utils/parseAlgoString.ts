export function parseAlgoString(
  value: string | number | null | undefined
): number {
  if (!value) {
    // If it's null or undefined or empty, return 0
    return 0;
  }

  // Convert to string (handles if it's already a string or a number)
  const strValue = String(value);

  // Remove all '.' characters => "517992783522431"
  const noDots = strValue.replace(/\./g, "");

  // Convert to integer
  const bigNumber = parseInt(noDots, 10) || 0;

  // Divide by 10^6 to assume ALGO has 6 decimal places
  return bigNumber / 1e6;
}
