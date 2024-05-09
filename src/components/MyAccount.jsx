import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Modal,
  TextField,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { eventManagerStore } from "../stores/EventManagerStore";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyAccount = observer(() => {
  const [openCreateForm, setOpenCreateForm] = useState(false);

  useEffect(() => {
    eventManagerStore.loadEvents();
  }, []);

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
  };

  const loadListItem = (event) => {
    console.log("loading", event);
    return (
      <ListItem
        alignItems="flex-start"
        sx={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.eventName}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Available tickets:{" "}
                {(
                  parseInt(event.totalTickets) - parseInt(event.tickesSold) || 0
                ).toString()}
                /{event.totalTickets}
              </Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {event.price} ETH
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </ListItem>
    );
  };

  return (
    <>
      <Typography variant="h5" component="div" paddingTop={5} paddingBottom={3}>
        My events
      </Typography>
      <List sx={{ width: "100%" }}>
        {eventManagerStore.events
          .filter((event) => event.organizer === eventManagerStore.account)
          .map((event) => loadListItem(event))}
      </List>
      <Button variant="contained" onClick={() => setOpenCreateForm(true)}>
        Create event
      </Button>
      <Modal open={openCreateForm} onClose={handleCloseCreateForm}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" paddingBottom={2}>
            New Event
          </Typography>
          <FormControl
            sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}
          >
            <TextField required id="outlined-required" label="Name" />
            <TextField
              required
              id="outlined-required"
              label="Price"
              type="number"
            />
            <TextField
              required
              id="outlined-required"
              label="Number of tickets"
              type="number"
            />
          </FormControl>
        </Box>
      </Modal>
    </>
  );
});

export default MyAccount;
