"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
      data-aos="fade-down"
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
            <Avatar alt="Remy Sharp" src="/assets/Avatar.png" />
            </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
