export const makeLambdaPayload = (body) => {
  const str = JSON.stringify(body);
  const payload = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    payload[i] = str.charCodeAt(i);
  }
  return payload;
};
