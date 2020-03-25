import React, { useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'

import { Card, Button } from 'react-bootstrap'
import { ProductType } from '@/api/products'
import classes from './Card.module.scss'
import withStore from '../../../hocs/withStore'

type Props = {
   product: ProductType
   index: number
   handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
   moveItem: (dragIndex: number, hoverIndex: number) => void
   store: { pin: (id: number) => void }
}

const ProductCard: React.FC<Props> = (
   { product, index, handleDelete, moveItem, store: { products: { pin } } }
   : InferProps<typeof ProductCard.propTypes>) => {

   const ref = useRef(null)
   const [, drop] = useDrop({
      accept: 'item',
      hover(item: DragItem, monitor: DropTargetMonitor) {
         if (!ref.current) {
            return
         }
         const dragIndex = item.index
         const hoverIndex = index
         if (dragIndex === hoverIndex) {
            return
         }
         const hoverBoundingRect = ref.current.getBoundingClientRect()
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset = monitor.getClientOffset()
         const hoverClientY = clientOffset.y - hoverBoundingRect.top
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
         }
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
         }
         moveItem(dragIndex, hoverIndex)
         item.index = hoverIndex
      }
   })

   const [{ isDragging }, drag] = useDrag({
      item: { type: 'item', id: product.id, index },
      collect: (monitor: any) => ({
         isDragging: monitor.isDragging()
      })
   })
   const opacity = isDragging ? 0 : 1
   drag(drop(ref))

   const cardStyles = [classes.card]
   if (index === 0) {
      cardStyles.push(classes.pinned)
   }

   return (
      <Card key={product.id} ref={ref} className={cardStyles.join(' ')} style={{ width: '17.5rem', opacity }}>
         <Card.Img variant="top" src={product.image} />
         <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Title>{product.price} UAH</Card.Title>
            <Card.Text>{product.description}</Card.Text>

            <Button
               id={`pin-${product.id}`}
               onClick={() => pin(product.id)}
               disabled={index === 0}
            >
               {index === 0 ? 'Pinned' : 'Pin'}
            </Button>

            <Button id={`del-${product.id}`} style={{ float: 'right' }} onClick={handleDelete} variant="danger">
               Delete
            </Button>
         </Card.Body>
      </Card>
   )
}

ProductCard.propTypes = {
   product: PropTypes.object.isRequired,
   index: PropTypes.number.isRequired,
   handleDelete: PropTypes.func.isRequired,
   moveItem: PropTypes.func.isRequired
}

interface DragItem {
   id: any
   text: string
   index: number
}

export default withStore(ProductCard)
