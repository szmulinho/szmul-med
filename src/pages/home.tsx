import React from "react";
import { Button, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import myLogo from "../compontents/Navbar/images/logo.png";


export function Home() {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandCollapse = () => {
        setExpanded(!expanded);
    };

    const containerStyle = {
        background: `rgb(255,255,255), linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(187,255,161,1) 35%, rgba(240,245,164,1) 100%)`,
    };


    return (
        <Container maxWidth="lg" style={containerStyle}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ background: '#AFF09EFF', width: '100%', textAlign: 'center' }}>
                    <Typography variant="h1" component="h1" align="center">
                        <img src={myLogo} alt="Logo" style={{ width: '280px', height: '120px', position: 'relative', left: 20 }} />
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2" component="h2" align="center">
                        Your Healthcare Partner providing quality healthcare services to our patients since 2023.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="h3" component="h3" align="center">
                            Our Services
                        </Typography>
                        <Chip label="Primary Care" />
                        <Chip label="Pediatrics" />
                        <Chip label="Women's Health" />
                        <Chip label="Mental Health" />
                        <Chip label="Urgent Care" />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="h3" component="h3" align="center">
                            Why Choose Us?
                        </Typography>
                        <Chip label="Experienced and qualified doctors" />
                        <Chip label="Friendly and caring staff" />
                        <Chip label="State-of-the-art facilities" />
                        <Chip label="Convenient locations" />
                        <Chip label="Affordable pricing" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4" align="center">
                        Make an appointment today!
                    </Typography>
                    <Button variant="contained" size="large" color="primary">
                        Book an Appointment
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};