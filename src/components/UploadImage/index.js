import React, { useState } from "react";
import { Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { prefix } from "@utils/client-utils";
import { UrlServer } from "@utils/client-utils";
import fileProvider from "@src/data-access/file-provider";
import { StyledWrapper } from "./styled";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 12;
  if (!isLt2M) {
    message.error("Image must smaller than 12MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = ({
  onChange = () => {},
  disabled,
  viewMode = false,
  fileUrl,
}) => {
  const [loading, setLoading] = useState(false);

  const hadleUpload = (file) => {
    setLoading(true);
    getBase64(file, (imageUrl) => {
      fileProvider
        .upload(file)
        .then((json) => {
          if (json && json.code === 0) {
            onChange(json.data?.filePath);
          } else {
            onChange(imageUrl);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <StyledWrapper>
      <div className="upload-wrapper">
        {!viewMode && (
          <Upload
            disabled={disabled}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={hadleUpload}
            beforeUpload={beforeUpload}
            style={{
              border: "dotted 4px green",
            }}
            customRequest={() => {}}
          >
            {loading ? (
              <LoadingOutlined />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        )}
      </div>
      <div className="image">
        {fileUrl && (
          <img
            alt="image-profile"
            style={{ width: "100%" }}
            src={UrlServer() + prefix + "/files/" + fileUrl}
          />
        )}
      </div>
    </StyledWrapper>
  );
};

export default UploadImage;
