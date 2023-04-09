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
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/db";

const pages = [
  { displayName: "The Story", slug: "/story" },
  { displayName: "FAQ", slug: "/faq" },
  { displayName: "Contacts", slug: "/contacts" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const appBarRef = useRef<any>(null);
  const navigate = useNavigate();
  const bookmarkedProperties = useLiveQuery(() => db.savedProperties.toArray());

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

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      ref={appBarRef}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        padding: 0,
        backgroundColor: "#f7faff",
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
                <MenuItem key={page.slug} onClick={() => navigate(page.slug)}>
                  <Typography
                    textAlign="center"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      color: "#000",
                    }}
                  >
                    {page.displayName}
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
            <Button onClick={() => navigate("")} style={{ marginTop: "-5px" }}>
              <Typography
                variant="h4"
                fontWeight="800"
                sx={{ textTransform: "lowercase" }}
              >
                Scarriot
              </Typography>
              {/* <img
                src="./Scarriot-Banner-2.png"
                alt="scarriot-log"
                style={{
                  width: "200px",
                  height: "60px",
                  border: "1px solid black",
                }}
              /> */}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.slug}
                onClick={() => navigate(page.slug)}
                sx={{ my: 2, color: "#000", display: "block" }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "500",
                    color: "#000",
                  }}
                >
                  {page.displayName}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => window.open("/bookmark", "_blank")}
              sx={{ marginRight: { xs: "-15px", sm: 0 } }}
            >
              {bookmarkedProperties && (
                <Badge
                  badgeContent={bookmarkedProperties.length}
                  color="secondary"
                >
                  <MdBookmark color="primary" />
                </Badge>
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { ResponsiveAppBar };
