import React from 'react';
import { Modal } from 'antd';

interface ImagePreviewModalProps {
  visible: boolean;
  title: React.ReactNode;
  imageSrc: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = (props) => {
  const { visible, title, imageSrc, onClose } = props;

  return (
    <Modal
      visible={visible}
      title={title}
      footer={null}
      onCancel={onClose}
    >
      <img src={imageSrc} />
    </Modal>
  );
};

export default ImagePreviewModal;
