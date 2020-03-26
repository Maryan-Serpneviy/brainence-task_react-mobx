import { observable, computed, action } from 'mobx'
import { AbstractRootStore } from './index'
import { ProductType } from '../api/products'

abstract class AbstractProducts {
    constructor() { /**/ }
    storage: object
    getProducts: () => Array<ProductType>
}

export default class extends AbstractProducts {
    constructor(private rootStore: AbstractRootStore) {
        super()
        this.storage = rootStore.storage
        this.getProducts = rootStore.getProducts
    }

    @observable items: Array<ProductType> | [] = []
    pinned: boolean = false

    private cached: Array<ProductType> | [] = []
    private matched: Array<ProductType> | [] = []
    currId: number | null = null

    @computed get getId() {
        return (rawId: string): number => Number(/\d+/.exec(rawId)[0])
    }

    @action loadItems() {
        try {
            const serializedItems = this.storage.getItem('products')
            this.items = JSON.parse(serializedItems)
            this.cached = [...this.items] // for search filter
        } catch (err) {
            this.items = this.getProducts()
            this.cached = this.getProducts()
        }
    }

    @action search(inputVal: string): void {
        this.matched = this.cached.filter(el => (
            el['name'].toLowerCase().includes(inputVal.toLowerCase()) ||
            el['description'].toLowerCase().includes(inputVal.toLowerCase()))
        )
        this.items = [...this.matched]
    }

    @action add(item: ProductType): void {
        this.cached.unshift({
            ...item,
            id: Math.round(Math.random() * 1000)
        })
        this.items = [...this.cached]
        this.setItems()
    }

    @action delete(id: number): void {
        this.items = this.cached.filter(el => el.id !== id)
        this.cached = [...this.items] // update cached data
        this.setItems()
    }

    @action pin = (id: number): void => {
        const pinned = this.items.find(el => el.id === id)
        const pinnedIndex = this.items.indexOf(pinned)
        this.items.forEach(item => {
            item.isPinned = false
        })
        pinned.isPinned = true

        const newItems = [...this.items]
        newItems.splice(pinnedIndex, 1)
        newItems.unshift(pinned)
        this.items = newItems
        this.cached = [...this.items]
        this.setItems()
    }

    @action dragAndDrop(newItems: Array<ProductType>): void {
        this.items = newItems
        this.cached = newItems
        this.setItems()
    }

    setItems() {
        try {
            this.storage.setItem('products', JSON.stringify(this.cached))
        } catch (err) {
            console.error(err)
        }
    }
}
