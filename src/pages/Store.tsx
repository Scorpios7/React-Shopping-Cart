import { Heading, Box, SimpleGrid } from "@chakra-ui/react";
import StoreItem from "../components/StoreItem";
import storeItems from "../data/items.json"
import ShoppingCart from "../components/ShoppingCart";

export default function Store() {
    return (
        <>
            <Heading>Store</Heading>
            <SimpleGrid spacing={10} minChildWidth="350px" py={3}>
                {storeItems.map(item => (
                    <Box bg="white" key={item.id}>
                        <StoreItem id={item.id} />
                    </Box>
                ))}
            </SimpleGrid>
            <ShoppingCart />
        </>

    )
}
