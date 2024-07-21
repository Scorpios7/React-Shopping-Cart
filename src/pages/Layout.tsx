import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Box } from "@chakra-ui/react"


export function Layout() {
    return (
        <>
            <Navbar />
            <Box px={{ base: 10, md: 30, lg: 320 }} py={3}>
                <Outlet />
            </Box>
        </>
    )
}
