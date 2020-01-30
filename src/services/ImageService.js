import {BASE_URL} from "./Constants";
import axios from "axios";

const imagePath = '/image';

export const getUploadLink = () => {
    return axios.get(BASE_URL + imagePath + '/signedS3Request')
        .then(response => {
            return response.data;
        });
};

export const uploadImage = (image, uploadRequest) => {
    return axios.put(uploadRequest, image, {headers: {'Content-Type': 'image/jpeg'}});
};