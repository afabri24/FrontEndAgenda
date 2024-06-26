import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Asesores from './Asesores/Asesores';
import Usuarios from './Usuarios/Usuarios'
import Administradores from './Administradores/Administradores'

function Tabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Asesores" value="1" />
            <Tab label="Usuario" value="2" />
            <Tab label="Admin" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Asesores />
        </TabPanel>
        <TabPanel value="2">
            <Usuarios />
        </TabPanel>
        <TabPanel value="3">
            <Administradores />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Tabs
