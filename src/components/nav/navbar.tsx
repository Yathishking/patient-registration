import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { pages } from "../../navpages/pages";

export default function Navbar() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    const nav_links = () => {
        if(isLoggedIn) {
            if (role === 'admin') {
                return (
                    <>
                        <Button href='/dashboard' sx={{ my: 2, color: 'white', display: 'block' }}>Dashboard</Button>
                        <Button onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('role');
                            localStorage.removeItem('isLoggedIn');
                            window.location.reload();
                        }} sx={{ my: 2, color: 'white', display: 'block' }}>Log Out</Button>
                    </>
                )
            }
            return (
                <>
                    <Button onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('role');
                        localStorage.removeItem('isLoggedIn');
                        window.location.reload();
                    }} sx={{ my: 2, color: 'white', display: 'block' }}>Log Out</Button>
                </>
            )
        }
        return pages.map((page) => (
            <Button
                key={page.title}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page.link}
            >
                {page.title}
            </Button>
        ))
    }

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'sans-serif',
                                fontWeight: 800,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >DocSys
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {nav_links()}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}