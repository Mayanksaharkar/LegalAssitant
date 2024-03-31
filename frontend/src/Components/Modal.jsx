import React from "react";

function Modal() {
  return (
    <dialog id='my_modal_2' className='modal'>
      <div className='modal-box'>{/* write modal content here */}</div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
