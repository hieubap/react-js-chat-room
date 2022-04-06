import factoryIcon from "@images/oxy/factory-icon.png";
import iconArrowRight from "@images/oxy/icon-arrow-right.png";
import iconCall from "@images/oxy/icon-call-1.png";
import oxyIcon from "@images/oxy/oxygen-icon.png";
import icon from "@images/oxy/plus-1.png";
import icon2 from "@images/oxy/plus-2.png";
import icon3 from "@images/oxy/plus-4.png";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import hospitalProvider from "@oxy/data-access/ck-su-dung-oxy";
import { Popup } from "react-leaflet";
import {numberWithCommas} from "@utils/common";

const PopupContent = forwardRef(({ item, ...props }, ref) => {
  const [state, _setState] = useState({});
  const { dataDetail = {} } = state;

  useImperativeHandle(ref, () => ({
    setData: (dataDetail) => {
      _setState({ dataDetail });
    },
  }));

  return (
    <div>
      <div className="popup-info">
        <div className="left-action">
          <div style={{ fontSize: 15, fontWeight: "bold" }}>
            {`${item.ten || " "}`}
          </div>
          <div className="address">{`${item.diaChi ? `${item.diaChi},` : ""}${
            item.xaPhuongTen || " "
          } ${item.quanHuyenTen ? `${item.quanHuyenTen}, ` : ""} ${
            item.tinhThanhPhoTen || " "
          }`}</div>
          <div className="nlh">
            {item.nguoiLienHe} <a className="a-sdt">{item.soDienThoai}</a>
          </div>
        </div>

        <div className="right-action">
          <div className="rounded-circle">
            <img src={iconArrowRight} alt="" />
          </div>
          <div className="rounded-circle">
            <a href={`tel:${dataDetail.soDienThoai}`}>
              <img src={iconCall} alt="" />
            </a>
          </div>
        </div>
      </div>

      {[0, 1].some((status) => status === item.tinhTrangHienTai) && (
        <>
          <div className="content-2">
            <div className="left-content">
              <div>
                <span
                  className="status-span"
                  style={{
                    backgroundColor: item.tinhTrangHienTai ? "#009ad1" : "#f00",
                  }}
                >
                  {item.tinhTrangHienTai ? "Đủ" : "Cần bổ sung"}
                </span>
              </div>
              <p>Tình trạng hiện tại (Đủ/ Cần bổ sung)</p>
            </div>
            <div className="right-content">
              <div className="ncsdtdb">
                {numberWithCommas(
                  item?.tinhTrangHienTai
                    ? dataDetail.tongSoOxyDaNapThem || 0
                    : dataDetail.tongSoOxyCanNapThem || 0
                )}
                (m3)
              </div>
              <p>Nhu cầu sử dụng oxy trên địa bàn</p>
            </div>
          </div>
          <div className="content-3">
            <div style={{ fontWeight: "bold" }}>
              {dataDetail.thongBaoTinhHinh}
            </div>
            <p style={{ marginTop: 5 }}>
              Thông báo tình hình (CSYT gửi đến SYT)
            </p>
          </div>
        </>
      )}
      <div></div>
      <div>
        {(item.listNear || [])
          .filter((_, idx) => idx < 3)
          .map((item, key) => (
            <div key={key} className="popup-item-list">
              <div>
                <img
                  src={
                    item.phanLoaiNccs[0] === 30
                      ? item.tinhTrangHienTai === 1
                        ? icon
                        : item.tinhTrangHienTai === 0
                        ? icon2
                        : icon3
                      : item.phanLoaiNccs[0] === 20
                      ? factoryIcon
                      : oxyIcon
                  }
                  style={{ width: 42, height: 42 }}
                />
              </div>
              <div>
                <div>{item.ten}</div>
                <div style={{ color: "red" }}>
                  {parseInt(item.distanse / 1000)} (km)
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

const PopupMarker = ({ onVisiblePopup, item }) => {
  const refContent = useRef();
  const getDetail = () => {
    if ([0, 1].some((status) => status === item.tinhTrangHienTai)) {
      hospitalProvider.search({ donViId: item.id, size: 1 }).then((res) => {
        if (res && res.code === 0 && res.data[0]) {
          if (refContent.current && refContent.current.setData)
            refContent.current.setData(res.data[0]);
        }
      });
    }
  };

  return (
    <Popup
      autoClose={false}
      onOpen={() => {
        getDetail();
        onVisiblePopup({
          listNear: item.listNear,
          centerFocus: item.toaDo,
          chonSuDung: item.phanLoaiNccs[0] === 30,
          item,
        });
      }}
    >
      <PopupContent ref={refContent} item={item} />
    </Popup>
  );
};

export default PopupMarker;
