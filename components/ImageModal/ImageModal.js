import React from 'react'
import { Modal } from 'react-responsive-modal';

function ImageModal({
    open = false,
    onCloseModal = () => { },
    imageUrl = "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
}) {
    return (
        <Modal 
        open={open} 
        onClose={onCloseModal} 
        center
        classNames={{
            overlay: 'bg-black bg-opacity-80',
            modal: 'p-0',
          }}
        >
            <img className="flex h-auto w-96" src={imageUrl} />
        </Modal>
    )
}

export default ImageModal