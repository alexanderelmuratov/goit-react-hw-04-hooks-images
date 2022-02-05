import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';
import { ModalOverlay, ModalContent, CloseButton } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImage: { src, alt }, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <CloseButton type="button" onClick={onClose}>
        <GrClose style={{ width: 30, height: 30 }} />
      </CloseButton>
      <ModalContent>
        <img src={src} alt={alt} width="780" />
      </ModalContent>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImage: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};
