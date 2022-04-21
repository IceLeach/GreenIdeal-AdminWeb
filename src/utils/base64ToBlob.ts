const base64ToBlob = (code: string) => {
  const raw = window.atob(code);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array]);
};

export default base64ToBlob;
