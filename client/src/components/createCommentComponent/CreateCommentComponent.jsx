import React, { useState, useRef } from "react";
import "./CreateCommentComponent.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import { useParams } from "react-router-dom";

const CreateCommentComponent = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const params = useParams();

  const imageRoute = process.env.REACT_APP_PUBLIC_FOLDER;
  const defaultProfilePicture = "DefaultProfilePicture.png";

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const resetPosting = () => {
    setImage(null);
    desc.current.value = "";
  };

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      userId: user._id,
      desc: desc.current.value,
      parent: params.id,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      post.image = filename;
      console.log(post);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(post));
    resetPosting();
  };

  return (
    <div className="CreatePost">
      <img
        src={
          user.profilePicture
            ? imageRoute + user.profilePicture
            : imageRoute + defaultProfilePicture
        }
        alt=""
      />
      <div>
        <input ref={desc} required type="text" placeholder="Reply..." />
        <div className="PostOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <UilScenery />
          </div>
          <button
            className="button s-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Commenting..." : "Comment"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCommentComponent;
