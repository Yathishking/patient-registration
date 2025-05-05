import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { pages } from "../../navpages/pages";

export default function Navbar() {
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
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                href={page.link}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}