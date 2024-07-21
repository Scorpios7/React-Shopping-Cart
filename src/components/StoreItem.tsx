import { Button, Card, CardBody, Flex, Heading, Image, Spacer, Stack, Text, Box } from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/FormatCurrency";

type StoreItemProps = {
    id: number
}

export default function StoreItem({ id }: StoreItemProps) {
    const { getStoreItemById, getCartItemById, increaseCartItem, decreaseCartItem, removeFromCart } = useShoppingCart()
    const storeItem = getStoreItemById(id)
    const cartItem = getCartItemById(id)

    return (
        <Card w="100%" variant="elevated" h="350px">
            <CardBody>
                <Image src={storeItem.imgUrl} objectFit='cover' boxSize="sm" h="170px" w="100%" />
                <Stack py={2} px={2}>
                    <Flex align="center" justify="space-between">
                        <Heading fontSize="26px" as="h1">{storeItem.name}</Heading>
                        <Text color="gray.600">{formatCurrency(storeItem.price)}</Text>
                    </Flex>
                    <Spacer />
                    {cartItem ? (<Stack>
                        <Flex justify="center" align="center" gap={2}>
                            <Button colorScheme='blue' onClick={() => decreaseCartItem(id)}>-</Button>
                            <Box>
                                <Text as="span" fontSize="24px" fontWeight="400">{cartItem.quantity}</Text> in Cart
                            </Box>
                            <Button colorScheme='blue' onClick={() => increaseCartItem(id)}>+</Button>
                        </Flex>
                        <Flex justify="center">
                            <Button colorScheme='red' onClick={() => removeFromCart(id)}>Remove</Button>
                        </Flex>
                    </Stack>) : (
                        <Button colorScheme='blue' onClick={() => increaseCartItem(id)}>+ Add To Cart</Button>
                    )}

                </Stack>
            </CardBody>
        </Card>
    )
}
