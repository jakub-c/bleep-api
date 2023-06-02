export const nextArrayIndex = (index, arr) => {
  const maybeNextIndex = index + 1;
  let nextIndex = maybeNextIndex;
  if (maybeNextIndex > arr.length - 1) nextIndex = 0;
  return nextIndex;
};
