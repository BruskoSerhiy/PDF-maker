import React, { useState } from "react";
import { Upload, message as antMessage } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined } from "@ant-design/icons";
import css from "./LoadingPhoto.module.css";

interface AvatarUploaderProps {
  text?: string;
  onSelected?: (imageDataUrl: string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ text, onSelected }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      antMessage.error("Можна завантажувати тільки  JPG/PNG файли!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      antMessage.error("Максимальний розмір файлу 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        onSelected?.(url);
      });
    }
  };

  return (
    <div className={css.positions}>
      {imageUrl ? (
        <div>
          <span
            onClick={() => {
              setImageUrl("");
            }}
            className={css.clearPhotoBtn}
          >
            X
          </span>
          <img src={imageUrl} alt={text} className={css.img} />
        </div>
      ) : (
        <Upload
          name="avatar"
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.("ok");
            }, 500);
          }}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {loading ? <LoadingOutlined /> : null}
          <span>Завантажити фото</span>
        </Upload>
      )}
    </div>
  );
};

export default AvatarUploader;
