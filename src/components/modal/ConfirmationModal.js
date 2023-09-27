import React from 'react'

const ConfirmationModal = ({ title, message, onConfirm }) => {
  return (
    <>
      <button type="button" id='confirmationModalButton' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#confirmatioModal">
      </button>
      <div className="modal fade" id="confirmatioModal" tabIndex="-1" aria-labelledby="confirmatioModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="confirmatioModalLabel">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal;