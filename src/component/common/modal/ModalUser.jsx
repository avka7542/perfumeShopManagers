import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import UserForm from '../../partials/users/UserForm';


function ModalUser({ isOpen, onClose ,toggleModal , userId}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>{toggleModal ? 'Create User' : 'Edit User'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UserForm
                        toggleModal={toggleModal}
                        requestMethod={'put'}
                        url={`${import.meta.env.VITE_SERVER_URL}/users/update-user-for-managers/${userId}`}
                        onClose={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalUser