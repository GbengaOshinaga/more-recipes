/**
 * Unescapes entities in string
 * @param {String} string
 *
 * @returns {String} unescaped string
 */
export default function decode(string) {
  const domParser = new DOMParser().parseFromString(string, 'text/html');
  return domParser.documentElement.textContent;
}
