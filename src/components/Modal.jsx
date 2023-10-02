function Modal({
  showModal,
  setShowModal,
  modalContent,
  modalTitle,
  modalClassName,
  footer
}) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className={`modal-dialog ${modalClassName}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{modalContent}</div>
            <div className="modal-footer">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modal;
