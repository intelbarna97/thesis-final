import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";

function ProfileModal({ modalOpened, setModalOpen, data }) {
  const theme = useMantineTheme();
  const { password, email, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const imageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    let userData = formData;
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    console.log(params, userData);
    dispatch(updateUser(params.id, userData));
    setModalOpen(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.1}
      overlayBlur={3}
      opened={modalOpened}
      size="35%"
      centered
      onClose={() => setModalOpen(false)}
    >
      <form
        className="descriptionForm"
        style={{ display: "flex", "flex-direction": "column", gap: "1rem" }}
      >
        <h3>Username</h3>
        <div className="Search">
          <input
            type="text"
            className="nameInput"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <h3>About</h3>
        <div className="Search">
          <input
            type="text"
            className="descInput"
            name="about"
            placeholder="Your description..."
            onChange={handleChange}
            value={formData.about}
          />
        </div>
        <div
          style={{ display: "flex", "flex-direction": "column", gap: "0.5rem" }}
        >
          Profile picture
          <input type="file" name="profilePicture" onChange={imageChange} />
        </div>
        <button
          className="button"
          style={{ padding: "1rem" }}
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
