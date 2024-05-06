import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import { observer } from "mobx-react";
import { eventManagerStore } from "../stores/EventManagerStore";

const Navbar = observer(() => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    eventManagerStore.setAccount(account);
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
            <Button color="inherit">{eventManagerStore.account}</Button>
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
