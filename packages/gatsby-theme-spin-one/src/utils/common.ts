export const parseJson = (json: string | undefined | null = '{}') => {
  if (typeof json !== 'string') {
    return null;
  }

  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('JSON parse error', e);
    return null;
  }
};
