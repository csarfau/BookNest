import { useEffect, useState } from 'react';
import { Link as RouterLink, Outlet, Navigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  MenuBook as BookIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';
import axiosClient from '../axios-client';
import { toast } from 'react-toastify';

const DRAWER_WIDTH = 240;

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if(token) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token, setUser]);

  const onLogout = () => {
    axiosClient
      .post("/logout")
      .then(() => {
        setUser(null), setToken(null);
      })
      .catch((err) => {
        toast.error(`Falha ao sair: ${err}`, { theme: "dark" });
      });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ mt: 2 }}>
      <List>
        <ListItem component={RouterLink} to="/dashboard" sx={{ color: 'inherit', textDecoration: 'none' }} onClick={handleDrawerToggle}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={RouterLink} to="/books" sx={{ color: 'inherit', textDecoration: 'none' }} onClick={handleDrawerToggle}>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Meus Livros" />
        </ListItem>
      </List>
    </Box>
  );

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Nest
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">{user?.name}</Typography>
            <Link
              component="button"
              color="inherit"
              onClick={onLogout}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <LogoutIcon />
              <Typography variant="body2">Sair</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
            }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                borderRight: `1px solid ${theme.palette.divider}`
              }
            }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};