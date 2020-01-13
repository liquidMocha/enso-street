import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faImages} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Input.scss";
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import Jimp from "jimp";
import {getUploadLink, uploadImage} from "../../services/ImageService";

const UseMyPhoto = (props) => {
    let history = useHistory();

    const onSelectingImage = async (event) => {
        if (event.target.files && event.target.files[0]) {
            history.goBack();

            const localImageUrl = URL.createObjectURL(event.target.files[0]);

            props.onImageUrlChange(localImageUrl);

            const image = await Jimp.read(localImageUrl);
            const compressedImage = image.scaleToFit(110, 100).getBufferAsync(Jimp.MIME_PNG);
            const {uploadRequest, imageUrl} = await getUploadLink();
            await uploadImage(await compressedImage, uploadRequest);

            props.onImageUrlChange(imageUrl);
        }
    };

    return (
        <div className='column-layout'>
            <div className='image-button'>
                <input id='take-photo-input' type="file" accept="image/*" capture={true}
                       onChange={onSelectingImage}/>
                <label htmlFor='take-photo-input'>
                    <FontAwesomeIcon icon={faCamera}/>
                    Take Photo
                </label>
            </div>
            <div className='image-button'>
                <input id='select-image-input' type="file" accept="image/*" capture={false}
                       onChange={onSelectingImage}/>
                <label htmlFor='select-image-input'>
                    <FontAwesomeIcon icon={faImages}/>
                    Select Photo
                </label>
            </div>
        </div>
    )
};

UseMyPhoto.propTypes = {
    onImageUrlChange: PropTypes.func
};

export default UseMyPhoto;