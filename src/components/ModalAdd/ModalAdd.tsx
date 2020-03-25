import React, { useState, useRef, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import { ProductType } from '@/api/products'

type Props = {
    show: boolean
    handleClose: () => void
    handleAdd: (item: ProductType) => void
}

const ModalAdd: React.FC<Props> = (
    { show, handleClose, handleAdd } : InferProps<typeof ModalAdd.propTypes>) => {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [price, setPrice] = useState<string>('')

    const nameInput = useRef(null)

    useEffect(() => {
        nameInput.current.focus()
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Add item</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup className="p-3 mb-1">
                    <FormControl
                        ref={nameInput}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        maxLength={20}
                        placeholder="Name"
                    />
                </InputGroup>

                <InputGroup className="p-3 mb-1">
                    <FormControl
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                        maxLength={150}
                        placeholder="Description"
                    />
                </InputGroup>

                <InputGroup className="p-3 mb-1">
                    <FormControl
                        value={image}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
                        maxLength={100}
                        placeholder="Image url"
                    />
                </InputGroup>

                <InputGroup className="p-3 mb-1">
                    <FormControl
                        value={price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                        maxLength={5}
                        placeholder="Price"
                    />
                </InputGroup>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleAdd(
                    { name, description, image, price }
                )}>
                    Add item
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalAdd.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired
}

export default ModalAdd
