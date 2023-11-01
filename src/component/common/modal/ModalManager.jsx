import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import ManagerForm from '../../partials/users/ManagerForm';

export default function ModalManager( {isOpen, onClose ,toggleModal , managerId}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>{toggleModal ? 'Create Manager' : 'Edit Manager'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ManagerForm
                        toggleModal={toggleModal}
                        requestMethod={toggleModal ? 'post' : 'put'}
                        url={toggleModal ? `${import.meta.env.VITE_SERVER_URL}/users/add-managers`
                         : `${import.meta.env.VITE_SERVER_URL}/users/update-managers/${managerId}`}
                        onClose={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
