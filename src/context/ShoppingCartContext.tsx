import { createContext, ReactNode, useContext, useState } from "react"
import storeItems from "../data/items.json"
import StoreItem from "../components/StoreItem"
import _ from 'lodash';
import { useLocalStorage } from "../hooks/UseLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type StoreItem = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    cartItems: CartItem[]
    getStoreItemById: (id: number) => StoreItem
    getCartItemById: (id: number) => CartItem | void
    increaseCartItem: (id: number) => void
    decreaseCartItem: (id: number) => void
    removeFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    isOpen: boolean
}

const ShoppingCartContext = createContext<ShoppingCartContext>({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping", [])

    const [isOpen, setIsOpen] = useState(false)

    const getStoreItemById = (id: number): StoreItem => {
        let storeItem: StoreItem
        storeItems.map(item => {
            if (item.id === id) {
                storeItem = item
            }
        })
        return storeItem!
    }

    const getCartItemById = (id: number): CartItem | void => {
        return cartItems.find(item => item.id === id)
    }

    const increaseCartItem = (id: number) => {
        const cartItemsCopy = _.cloneDeep(cartItems);
        const target = cartItemsCopy.find(item => item.id === id)
        if (!target) {
            cartItemsCopy.push({ id, quantity: 1 })
        } else {
            target.quantity++
        }
        setCartItems(cartItemsCopy)
    }

    const decreaseCartItem = (id: number) => {
        let cartItemsCopy = _.cloneDeep(cartItems);
        const target = cartItemsCopy.find(item => item.id === id)
        if (target) {
            if (target.quantity === 1) {
                cartItemsCopy = cartItemsCopy.filter(item => item.id !== id)
            } else {
                target.quantity--
            }
        }
        setCartItems(cartItemsCopy)
    }

    const removeFromCart = (id: number) => {
        let cartItemsCopy = _.cloneDeep(cartItems);
        const target = cartItemsCopy.find(item => item.id === id)
        if (target) {
            cartItemsCopy = cartItemsCopy.filter(item => item.id !== id)
        }
        setCartItems(cartItemsCopy)
    }

    const openCart = () => {
        setIsOpen(true)
    }

    const closeCart = () => {
        setIsOpen(false)
    }


    return (
        <ShoppingCartContext.Provider
            value={{
                cartItems,
                getStoreItemById,
                getCartItemById,
                increaseCartItem,
                decreaseCartItem,
                removeFromCart,
                isOpen,
                openCart,
                closeCart
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}