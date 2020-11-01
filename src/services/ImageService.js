import axios from 'axios';
import Jimp from 'jimp';
import { BASE_URL } from './Constants';

const imagePath = '/image';

export const getUploadLink = () => axios.get(`${BASE_URL + imagePath}/signedS3Request`)
  .then((response) => response.data);

export const uploadImage = (image, uploadRequest) => axios.put(uploadRequest, image, { headers: { 'Content-Type': 'image/jpeg' } });

export async function resizeAndUploadImage(localImageUrl) {
  const image = await Jimp.read(localImageUrl);
  const compressedImage = image.getBufferAsync(Jimp.MIME_PNG);
  const { uploadRequest, imageUrl } = await getUploadLink();
  await uploadImage(await compressedImage, uploadRequest);
  return imageUrl;
}
