import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Container from "react-bootstrap/Container";
import "./UploadImages.css";
import axios from "axios";

const Uploads = (props) => {
  const { image, setImage } = useState({ array: [] });
  const { loading, setLoading } = useState("");

  const handleDrop = (files) => {
    const uploaders = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "mascotas");
      formData.append("api_key", "636473186254919");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading("true");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvw0vrnxp/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      const data = response.data;
      //console.log(data);
      const fileURL = data.secure_url;
      //console.log(fileURL);
      let foticos = image.array;
      foticos.push(fileURL);
      const newobj = { ...image, foticos };
      setImage(newobj);
      //console.log(image);
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
  };

  function imagePreview() {
    if (loading === "true") {
      return <h3>Cargando Imagenes...</h3>;
    }
    if (loading === "false") {
      return (
        <h3>
          {image.array.length <= 0
            ? "No hay fotos"
            : image.array.map((item, index) => (
                <img
                  alt="fotos"
                  style={{
                    width: "125px",
                    height: "105px",
                    backgroundSize: "cover",
                    paddingRight: "21px",
                  }}
                  src={item}
                />
              ))}
        </h3>
      );
    }
  }

  return (
    <div>
      <Container>
        <h1 className="text-center">Sube tus fotos aqui</h1>
        <Dropzone
          onDrop={handleDrop}
          onChange={(e) => setImage(e.target.value)}
          value={image}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <span>😼</span>
                <p>Coloca aqui tus fotos o clickea para seleccionar</p>
              </div>
            </section>
          )}
        </Dropzone>
        {imagePreview()}
      </Container>
    </div>
  );
};

export default Uploads;
