import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Stack } from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/FormatCurrency";


export default function ShoppingCart() {
    const { isOpen, closeCart, cartItems, getStoreItemById } = useShoppingCart()
    const totalPrice = cartItems.reduce((total, item) => {
        const storeItem = getStoreItemById(item.id)
        return total + item.quantity * storeItem.price
    }, 0)

    return (
        <>
            <Drawer isOpen={isOpen} onClose={() => closeCart()} size="sm">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px' mb={3}>Cart</DrawerHeader>
                    <DrawerBody>
                        <Stack gap={4}>
                            {cartItems.map(item => (
                                <Box key={item.id}>
                                    <CartItem id={item.id} />
                                </Box>
                            ))}
                        </Stack>
                        <Flex direction="row-reverse" mt={2} fontWeight="700">
                            <Box fontSize="16px">
                                Total {formatCurrency(totalPrice)}
                            </Box>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
