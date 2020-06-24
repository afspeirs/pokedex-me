export const capitaliseFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);
export const formatKebabToNormal = (string) => {
  const fragment = string.split('-');
  for (let i = 0; i < fragment.length; i += 1) {
    fragment[i] = fragment[i].charAt(0).toUpperCase() + fragment[i].slice(1);
  }

  // Format two digit text in All Caps
  if (fragment.length === 1 && fragment[0].length === 2) {
    fragment[0] = fragment[0].toUpperCase();
  }

  return fragment.join(' ');
};
