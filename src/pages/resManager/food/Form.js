import resManagerProvider from "@data-access/food-provider";
import Button from "@src/components/Button";
import UploadImage from "@src/components/UploadImage";
import { Col, Form, Input, message, Row, Select, Upload } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { Modal } from "./styled";

const nameModal = "Món ăn";

const PlaceForm = ({ reload = () => {}, auth, ...props }, ref) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({});

  const max = useRef();

  useEffect(() => {}, []);

  useImperativeHandle(ref, () => ({
    show: (data = {}, isDetail) => {
      debugger;
      setState({ ...state, isDetail, data, visible: true });
      form.setFieldsValue({ ...data, password2: data.password });
    },
  }));

  const onFinish = (values) => {
    if (values.password !== values.password2) {
      message.error("Mật khẩu không đúng");
      return;
    }
    const body = {
      id: state.data?.id,
      active: state.data?.active,
      ...values,
      idRes: auth?.userId,
    };
    if (!!state.data?.id) {
      resManagerProvider._put(body, state.data?.id).then((json) => {
        if (json && json.code === 0 && json.data) {
          reload();
          setState({ ...state, visible: false });
          form.resetFields();
          message.success("Cập nhật thành công");
        } else if (json && json.code === 401) {
          window.location.href = "/login";
        } else {
          setState({ ...state, loading: false });
          message.error(json.message);
        }
      });
    } else {
      resManagerProvider._post(body).then((json) => {
        if (json && json.code === 0 && json.data) {
          setState({ ...state, visible: false });
          form.resetFields();
          reload();
          message.success("Tạo mới thành công");
        } else if (json && json.code === 401) {
          window.location.href = "/login";
        } else {
          setState({ ...state, loading: false });
          message.error(json.message);
        }
      });
    }
  };
  const onClose = () => {
    form.resetFields();
    setState({ ...state, visible: false });
  };

  return (
    <Modal
      className="modal-lg"
      size="sm"
      width={400}
      onCancel={onClose}
      visible={state.visible}
      title={
        <div style={{ width: "100%", textAlign: "center", fontWeight: 600 }}>
          {state.isDetail
            ? "Chi tiết " + nameModal
            : state.data?.id
            ? "Chỉnh sửa " + nameModal
            : "Thêm mới " + nameModal}
        </div>
      }
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            className="btn-white"
            content="Trở lại"
            icon={"fa fa-times"}
          />
          {!state.isDetail && (
            <Button
              onClick={() => form.submit()}
              content={state.data?.id ? "Chỉnh sửa" : "Tạo mới"}
              icon={"fa fa-check"}
            />
          )}
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row>
          <Col span="24">
            <Form.Item label="Ảnh" name="avatar" valuePropName="fileUrl">
              <UploadImage
                className="avatar-uploader"
                onChange={(avatar) => {
                  form.setFieldsValue({ avatar });
                }}
              ></UploadImage>
            </Form.Item>
          </Col>

          <Col span="24">
            <Form.Item
              label="Tên món ăn"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên",
                },
              ]}
            >
              <Input
                placeholder="Nhập tên"
                type="text"
                autoComplete="off"
                disabled={state.isDetail}
              />
            </Form.Item>
          </Col>
          <Col span="24">
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin",
                },
              ]}
            >
              <Input
                placeholder="Nhập giá"
                type="text"
                autoComplete="off"
                disabled={state.isDetail}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(
  ({ auth: { auth } }) => ({ auth }),
  ({}) => ({}),
  null,
  { forwardRef: true }
)(forwardRef(PlaceForm));
