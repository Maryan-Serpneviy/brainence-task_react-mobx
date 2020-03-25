import { configure } from 'mobx'

import ProductsStore from './products'
import { getProducts, ProductType } from '~/api/products'

export abstract class AbstractRootStore {
    constructor() { /**/ }
    storage: object
    getProducts: () => Array<ProductType>
    products: ProductsStore
}

configure({ enforceActions: 'observed' })
class RootStore extends AbstractRootStore {
    constructor() {
        super()
        this.storage = localStorage
        this.getProducts = getProducts
        this.products = new ProductsStore(this)
    }
}

export default new RootStore()
