import React from "react";
import { IProduct } from "../../../../interface/product-management/ProductInterface";
import { GlobalModal } from "../../../../module/component/Modal";
import { Col, Image, Row } from "antd";

interface IDetailModalProps {
  product: IProduct | null;
  isOpen: boolean;
  handleOpenDetailModal: (record: IProduct, type: "open" | "cancel") => void;
}
const DetailModal = ({
  product,
  isOpen,
  handleOpenDetailModal,
}: IDetailModalProps) => {
  return (
    //@ts-ignored
    <GlobalModal open={isOpen} onCancel={handleOpenDetailModal} footer={[]}>
      <div className="detail-information-wrapper">
        <div className="detail-information-txt">
          <div>{product?.name}</div>
        </div>
        <Row className="detail-information-img">
          <Col span={6} offset={10}>
            <Image className={"product-img"} width={100} src={product?.img1} />
            <Image className={"product-img"} width={100} src={product?.img2} />
          </Col>
          <Col span={6}>
            <Image className={"product-img"} width={100} src={product?.img3} />
            <Image className={"product-img"} width={100} src={product?.img4} />
          </Col>
        </Row>
      </div>
    </GlobalModal>
  );
};

export default DetailModal;
