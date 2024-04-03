export function hasAtLeastOneNonNullValue(obj) {
  return Object.values(obj).some((value) => value !== null);
}

export function cloneWithNonNullValues(obj) {
  const nonNullEntries = Object.entries(obj).filter(
    ([key, value]) => value !== null
  );
  return Object.fromEntries(nonNullEntries);
}
