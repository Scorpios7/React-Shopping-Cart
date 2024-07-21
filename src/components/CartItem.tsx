import { Box, Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CloseIcon } from "@chakra-ui/icons"
import { formatCurrency } from "../utilities/FormatCurrency"

type CartItemProps = {
    id: number
}

export default function CartItem({ id }: CartItemProps) {
    const { getCartItemById, getStoreItemById, removeFromCart } = useShoppingCart()
    const cartItem = getCartItemById(id)
    const storeItem = getStoreItemById(id)
    const totalPrice = (cartItem?.quantity || 0) * storeItem.price

    return (
        <>
            <HStack>
                <Image
                    src={storeItem.imgUrl}
                    boxSize="100px"
                    h="60px"
                    objectFit="cover"
                />
                <Flex justify="space-between" flex={1}>
                    <Flex direction="column" justify="center">
                        <Box>
                            <Text as="span" fontWeight="700" fontSize="14px">{storeItem.name}</Text>
                            <Text as="span" fontSize="12px">×{cartItem?.quantity || 0}</Text>
                        </Box>
                        <Box fontSize="12px">{formatCurrency(storeItem.price)}</Box>
                    </Flex>
                    <Flex align="center" gap={1}>
                        <Text fontWeight="700" fontSize="14px">{formatCurrency(totalPrice)}</Text>
                        <IconButton
                            variant='outline'
                            colorScheme='red'
                            aria-label='Call Sage'
                            size="sm"
                            fontSize="6px"
                            icon={<CloseIcon />}
                            onClick={() => removeFromCart(id)}
                        />
                    </Flex>
                </Flex>
            </HStack>
        </>
    )
}
