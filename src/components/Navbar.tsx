"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "transparent",
        border: "none",
        boxShadow: "none",
        width: "95%",
      }}
    >
      <Toolbar disableGutters>
        <Button sx={{ backgroundColor: "#7B5AFF", color: "white" }}>
          Logo
        </Button>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", justifyContent: "end", alignItems: "center"} }}>
          <Button sx={{ backgroundColor: "#7B5AFF", color: "white" }}>
            FeedBack
          </Button>
          <IconButton sx={{ color: "#7B5AFF" }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: "#7B5AFF" }}>
            <InfoOutlinedIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "end",
            alignItems: "center",
            gap:0,
          }}
        >
          <Button sx={{ backgroundColor: "#7B5AFF", color: "white" }}>
            FeedBack
          </Button>
          <IconButton sx={{ color: "#7B5AFF" }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: "#7B5AFF" }}>
            <InfoOutlinedIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 0, marginLeft: "16px" }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/assets/avatar.png" />
            </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
