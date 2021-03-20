import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import './DeleteItemModal.scss';

const DeleteItemModal = ({ isOpen, onDelete, onCancel }) => (
  <Modal
    isOpen={isOpen}
    className="delete-item-modal"
    overlayClassName="delete-item-modal-overlay"
    ariaHideApp={false}
  >
    <div>Are you sure you want to delete this item?</div>
    <div className="modal-button-group">
      <button type="button" onClick={onDelete}>
        Delete
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  </Modal>
);

DeleteItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteItemModal;
