import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import './DeleteItemModal.scss';

const DeleteItemModal = ({ isOpen, onDelete, onCancel }) => (
  <Modal
    isOpen={isOpen}
    className="delete-item-modal"
    overlayClassName="delete-item-modal-overlay"
  >
    <div>Are you sure you want to delete this item?</div>
    <div className="modal-button-group">
      <div onClick={onDelete}>
        Delete
      </div>
      <div onClick={onCancel}>
        Cancel
      </div>
    </div>
  </Modal>
);

DeleteItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteItemModal;
