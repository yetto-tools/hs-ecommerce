
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";


function ModalLoginOrRegister({ show, onHide }) {
  const { t, i18n } = useTranslation();

  const onCloseModal = () => {
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="row">
            
            <div className="col-md-5 col-sm-12 col-xs-12">
                
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ModalLoginOrRegister.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,

};

export default ModalLoginOrRegister;
