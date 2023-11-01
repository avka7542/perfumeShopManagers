import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import AddProductForm from '../partials/products/AddProductForm';

function ModalEditProduct({isOpen , onClose , product}) {

    const editUrl = `${import.meta.env.VITE_SERVER_URL}/products/managers/update/${product?._id}`
    const addUrl = `${import.meta.env.VITE_SERVER_URL}/products/managers/add`
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{product ? 'Edit Product' : 'Create Product'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddProductForm
                         url={product ? 
                            editUrl :
                            addUrl
                        }
                         requestMethod={product ? 'put' : 'post'}
                         actionName ={product ? 'Update' : 'Add'}
                         product={product}
                         CloseModal={onClose}
                        />
                    </ModalBody>    
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalEditProduct