import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import BasicTable from './ConfigList';
import AddConfig from './AddConfig';

export default function App() {
  return (
    <Container  fixed >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
           React Application
        </Typography>
      </Box>
      {/* <AddConfig /> */}
      <BasicTable />
    </Container>
  );
}
