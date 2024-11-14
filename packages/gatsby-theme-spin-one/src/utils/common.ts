export const parseJson = (json = '{}') => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('JSON parse error', e);
    return null;
  }
};
