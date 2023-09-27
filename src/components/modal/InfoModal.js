import React from 'react'

const InfoModal = ({ title = 'Remember to add a Title', message = 'Remeber to add a message', onConfirm }) => {

  const handleOnConfirm = () => {
    if (onConfirm)
      onConfirm();
  }

  return (
    <>
      <button type="button" id='infoModalButton' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#infoModal">
      </button>
      <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="infoModalLabel">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleOnConfirm}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoModal