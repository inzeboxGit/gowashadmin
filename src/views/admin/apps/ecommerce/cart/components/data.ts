import product1 from '/images/products/1.png'
import product2 from '/images/products/2.png'
import product3 from '/images/products/3.png'

export type CartItemType = {
  id: number
  image: string
  alt: string
  title: string
  color: string
  model: string
  price: number
  discount?: number
  quantity: number
}

export const cartItemData: CartItemType[] = [
  {
    id: 1,
    image: product1,
    alt: 'iPhone',
    title: 'Apple iPhone 14 128GB',
    color: 'White',
    model: '128GB',
    price: 899.0,
    quantity: 1,
  },
  {
    id: 2,
    image: product2,
    alt: 'iPad',
    title: 'Tablet Apple iPad Pro M2',
    color: 'Black',
    model: '256GB',
    price: 989.0,
    discount: 10,
    quantity: 3,
  },
  {
    id: 3,
    image: product3,
    alt: 'Watch',
    title: 'Smart Watch Series 7',
    color: 'White',
    model: '44mm',
    price: 429.0,
    quantity: 2,
  },
]
