export const resolveImageUrl = (value: string): string => {
  try {
    const url = new URL(value);
    if (url.hostname !== 'drive.google.com') return value;

    const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? url.searchParams.get('id');
    return fileId
      ? `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}`
      : value;
  } catch {
    return value;
  }
};
