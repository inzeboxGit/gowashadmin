import product1 from '/images/products/1.png'
import product10 from '/images/products/10.png'
import product2 from '/images/products/2.png'
import product3 from '/images/products/3.png'
import product4 from '/images/products/4.png'
import product5 from '/images/products/5.png'
import product6 from '/images/products/6.png'
import product7 from '/images/products/7.png'
import product8 from '/images/products/8.png'
import product9 from '/images/products/9.png'

export type ProductType = {
  id: string
  name: string
  image: string
  price: number
  discount?: number
  rating: number
  reviews: number
  updatedAt?: string
}

export const productData: ProductType[] = [
  {
    id: 'grid-product-1',
    name: 'Modern Minimalist Fabric Sofa Single Seater',
    image: product1,
    price: 899.0,
    discount: 15,
    rating: 3.5,
    reviews: 45,
  },
  {
    id: 'grid-product-2',
    name: 'Funky Streetwear Sneakers - Neon Splash',
    image: product2,
    price: 59.99,
    rating: 3,
    reviews: 32,
  },
  {
    id: 'grid-product-3',
    name: 'Noise Canceling Wireless Earbuds - Black Edition',
    image: product3,
    price: 49.99,
    discount: 15,
    rating: 3,
    reviews: 58,
  },
  {
    id: 'grid-product-4',
    name: 'Minimalist Solid Wood Dining Chair',
    image: product4,
    price: 120.0,
    rating: 3.5,
    reviews: 46,
  },
  {
    id: 'grid-product-5',
    name: 'Modern Black Minimalist Wall Clock',
    image: product5,
    price: 49.99,
    rating: 4,
    reviews: 62,
  },
  {
    id: 'grid-product-6',
    name: 'Elegant Brown Wooden Chair',
    image: product6,
    price: 120.0,
    discount: 20,
    rating: 4,
    reviews: 48,
  },
  {
    id: 'grid-product-7',
    name: 'Apple iMac 24" Retina 4.5K Display',
    image: product7,
    price: 1299.0,
    rating: 4.5,
    reviews: 65,
  },
  {
    id: 'grid-product-8',
    name: 'Coolest Ergonomic Lounge Chair',
    image: product8,
    price: 320.0,
    discount: 20,
    rating: 4,
    reviews: 52,
  },
  {
    id: 'grid-product-9',
    name: 'Apple iPad 10.9" Wi-Fi 64GB - Silver',
    image: product9,
    price: 449.0,
    rating: 4,
    reviews: 142,
  },
  {
    id: 'grid-product-10',
    name: 'Minimalist Denim Jacket – Indigo Blue',
    image: product10,
    price: 89.0,
    rating: 4,
    reviews: 54,
  },
  {
    id: 'grid-product-11',
    name: 'Next-Gen Smartwatch S9 – Graphite Black',
    image: product1,
    price: 249.0,
    rating: 5,
    reviews: 128,
  },
  {
    id: 'grid-product-12',
    name: 'Noise-Cancel Pro Headphones – Arctic White',
    image: product2,
    price: 199.99,
    rating: 4,
    reviews: 87,
  },
]
