import React, { useMemo, useCallback } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

import ProductCard from './Card'
import { ProductType } from '@/api/products'
import withStore from '../../hocs/withStore'

type Props = {
   handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
   handleDnd: (items: Array<ProductType>) => void
   store: { items: Array<ProductType> }
}

const ProductCards: React.FC<Props> = (
   { handleDelete, handleDnd, store: { products: { items } } }
   : InferProps<typeof ProductCards.propTypes>) => {

   const moveItem = useCallback(
      (dragIndex: number, hoverIndex: number) => {
         const dragItem = items[dragIndex]
         const newItems = [...items]
         newItems.splice(dragIndex, 1)
         newItems.splice(hoverIndex, 0, dragItem)
         handleDnd(newItems)
      },
      [items]
   )
   
   // disable render on modal add
   return useMemo(() => (
      <Container>
         <Row>
         {items.map((item: ProductType, index: number) => (
            <Col key={Math.random()}>
               <ProductCard
                  key={item.id}
                  index={index}
                  product={item}
                  handleDelete={handleDelete}
                  moveItem={moveItem}
               />
            </Col>
         ))}
         </Row>
      </Container>
   ), [items])
}

ProductCards.propTypes = {
   handleDelete: PropTypes.func.isRequired
}

export default withStore(ProductCards)
