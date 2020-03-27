import React, { Component } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'

import withStore from '~hoc/withStore'
import Header from '~cm/Header'
import ProductCards from '~cm/ProductCards'
import ModalAdd from '~cm/ModalAdd'
import ModalRemove from '~cm/ModalRemove'
import { ProductType } from '@/api/products'

type Store = {
    loadItems: () => void
    items: Array<ProductType>
    currId: number | null
    getId: (rawId: string) => number
    search: (value: string) => void
    add: (item: ProductType) => void
    delete: (id: number) => void
    dragAndDrop: (newItems: Array<ProductType>) => void
}

@withStore
export default class extends Component {
    private store: Store = this.props.store.products
    readonly state = {
        showDelete: false,
        showAdd: false
    }

    componentWillMount() {
        this.store.loadItems()
    }

    render() {
        const { showAdd, showDelete } = this.state
        return (
            <>
                <Header />
                <h1>Products</h1>
                <section className="wrapper">
                    <InputGroup className="p-3 mb-2">
                        <FormControl
                            ref={this.addInput}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                this.store.search(event.target.value)
                            }}
                            placeholder="Recipient's product"
                        />
                        <Button onClick={() => this.setState({ showAdd: true })} variant="outline-secondary">Add</Button>
                    </InputGroup>

                    {showAdd && <ModalAdd
                        show={showAdd}
                        handleClose={() => this.setState({ showAdd: false })}
                        handleAdd={this.handleAdd}
                    />}
    
                    {showDelete && <ModalRemove
                        show={showDelete}
                        handleClose={() => this.setState({ showDelete: false })}
                        handleDelete={this.deleteItem}
                    />}

                    <ProductCards
                        handleDelete={this.handleDelete}
                        handleDnd={(newItems: object[]): void => this.store.dragAndDrop(newItems)}
                    />
                </section>
            </>
        )
    }

    addInput = React.createRef()

    handleAdd = (item: ProductType): void => {
        // if some prop empty
        for (const prop in item) {
            if (item.hasOwnProperty(prop)) {
                if (item[prop] === '') {
                    return
                }
            }
        }
        this.store.add(item)
        this.setState({ showAdd: false })
    }

    handleDelete = ({ target }): void => {
        this.store.currId = this.store.getId(target.id)
        this.setState({ showDelete: true })
    }

    deleteItem = (): void => {
        this.store.delete(this.store.currId)
        this.setState({ showDelete: false })
        this.addInput.current.focus()
    }
}
