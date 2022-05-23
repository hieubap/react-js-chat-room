import clientUtils from "@utils/client-utils";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  upload(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      clientUtils
        .upload("post", "/auth-server/api/v1/file/uploadFile", formData)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
