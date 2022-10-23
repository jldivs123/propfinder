import { useRef, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MdBookmark from "@mui/icons-material/Bookmark";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const pages = ["The Story", "FAQ", "Contacts"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledImg = styled.img`
  width: 72px; /* or any custom size */
  height: 32px;
  object-fit: fill;
`;

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const appBarRef = useRef<any>(null);
  const logo = "/HomeFinder.png";
  const navigate = useNavigate();

  useEffect(() => {
    window.onscroll = function () {
      if (appBarRef.current) {
        if (window.pageYOffset !== 0) {
          appBarRef.current.style.boxShadow =
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
        } else {
          appBarRef.current.style.boxShadow = "none";
        }
      }
    };
  }, []);

  const goToHome = () => {
    navigate("/");
  };
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
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
      position="fixed"
      elevation={0}
      ref={appBarRef}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        padding: 0,
        backgroundColor: "#FFF",
      }}
      className="h-16"
    >
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", color: "#000" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      color: "#000",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              width: "36px",
              height: "36px",
              display: { xs: "block", md: "block", color: "black" },
            }}
          >
            <Button onClick={goToHome} style={{ marginTop: "-5px" }}>
              <Typography
                variant="h4"
                fontWeight="800"
                sx={{ textTransform: "lowercase" }}
              >
                homer.
              </Typography>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#000", display: "block" }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "500",
                    color: "#000",
                  }}
                >
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="secondary">
                <MdBookmark color="primary" />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { ResponsiveAppBar };
