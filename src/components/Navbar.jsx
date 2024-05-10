import { Face, LocalActivity, Logout } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import { observer } from "mobx-react";
import { useState } from "react";
import { eventManagerStore } from "../stores/EventManagerStore";

const options = [
  <>
    <ListItemIcon>
      <Face fontSize="small" />
    </ListItemIcon>
    <ListItemText>My account</ListItemText>
  </>,
  <>
    <ListItemIcon>
      <LocalActivity fontSize="small" />
    </ListItemIcon>
    <ListItemText>Events</ListItemText>
  </>,
  <>
    <ListItemIcon>
      <Logout fontSize="small" />
    </ListItemIcon>
    <ListItemText>Log out</ListItemText>
  </>,
];

const Navbar = observer(() => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenuButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    eventManagerStore.setAccount(account);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    switch (index) {
      case 0:
        eventManagerStore.activePage = "myAccount";
        break;
      case 1:
        eventManagerStore.activePage = "events";
        break;
      case 2:
        eventManagerStore.setAccount(null);
        break;
      default:
    }
    handleClose();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            DappEvents
          </Typography>
          {eventManagerStore.account ? (
            <>
              <Button color="inherit" onClick={handleClickMenuButton}>
                {eventManagerStore.account.slice(0, 6) + '...' + eventManagerStore.account.slice(38, 42)  }
              </Button>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button onClick={connectHandler} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Navbar;
