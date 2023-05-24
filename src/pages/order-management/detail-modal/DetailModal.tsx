import React from "react";
import { GlobalModal } from "../../../module/component/Modal";
import { Col, Image, Row } from "antd";
import "./styles.scss";

interface IDetailModalProps {
  isOpen: boolean;
  handleOpenDetailModal: (record: number, type: "open" | "cancel") => void;
}
const DetailModal = ({ isOpen, handleOpenDetailModal }: IDetailModalProps) => {
  return (
    //@ts-ignored
    <GlobalModal open={isOpen} onCancel={handleOpenDetailModal} footer={[]}>
      <div className="detail-information-wrapper">
        <div className="detail-information-title">
          {/*<div>Sản phẩm: {product?.name}</div>*/}
        </div>
        <div className={"detail-information-body"}>
          <Row className="detail-information-img">
            <Col span={6}>
              <Image
                className={"product-img"}
                width={100}
                // src={product?.img1}
              />
              <Image
                className={"product-img"}
                width={100}
                // src={product?.img2}
              />
            </Col>
            <Col span={6}>
              <Image
                className={"product-img"}
                width={100}
                // src={product?.img3}
              />
              <Image
                className={"product-img"}
                width={100}
                // src={product?.img4}
              />
            </Col>
          </Row>
          <div className={"detail-information-txt"}>
            {/*<div>Mô tả ngắn: {product?.short_description}</div>*/}
            {/*<div>Chi tiết sản phẩm: {product?.long_description}</div>*/}
          </div>
        </div>
      </div>
    </GlobalModal>
  );
};

export default DetailModal;
