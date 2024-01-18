export interface KeyValuePair {
  key: string;
  value: string;
}

export const TEXT_DATA_KEY = 'comments';

export function parseAsArray(data: string): Array<KeyValuePair> {
  const comments: Array<string> = [];
  const result: Array<KeyValuePair> = [];

  for (const part of data.split('\n')) {
    if (!part) continue;

    const colonPosition = part.indexOf(': ');
    const key = part.substring(0, colonPosition);

    if (key) {
      result.push({
        key,
        value: part.substring(colonPosition + 1).trim(),
      });
    } else {
      comments.push(part.substring(colonPosition + 1).trim());
    }
  }

  result.push({
    key: TEXT_DATA_KEY,
    value: comments.join('\n'),
  });

  return result;
}

export function parseAsObject(
  data: string
): Record<string, string | Array<string>> {
  const array = parseAsArray(data);
  return array.reduce<Record<string, string | Array<string>>>((prev, curr) => {
    const value = prev[curr.key];
    if (typeof value === 'undefined') {
      prev[curr.key] = curr.value;
    } else {
      if (typeof value === 'string') {
        prev[curr.key] = [value, curr.value];
      } else {
        value.push(curr.value);
      }
    }
    return prev;
  }, {});
}
