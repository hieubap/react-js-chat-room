var CryptoJS = require("crypto-js");

module.exports = {
  save(key, value) {
    return new Promise((resolve, reject) => {
      try {
        var data = {
          value,
        };
        const dataEncrypt = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          "SECURITY_KEY"
        );
        localStorage.setItem(key, dataEncrypt.toString());
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  read(key, defaultValue) {
    if (localStorage.hasOwnProperty(key)) {
      var item = localStorage.getItem(key);
      item = CryptoJS.AES.decrypt(item, "SECURITY_KEY").toString(
        CryptoJS.enc.Utf8
      );
      if (item)
        try {
          var data = JSON.parse(item);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {}
    }
    return defaultValue;
  },
};
