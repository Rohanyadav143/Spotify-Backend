import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async (buffer, originalName) => {
  try {
    const file = await toFile(buffer, originalName);

    const result = await client.files.upload({
      file,
      fileName: originalName,
      folder: "/Spotify-Backend/music",
    });

    return result;
  } catch (err) {
    throw err;
  }
};
