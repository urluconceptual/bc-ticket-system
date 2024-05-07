import { Box, Card, CardContent } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { eventManagerStore } from "../stores/EventManagerStore";

const MyAccount = observer(() => {
  useEffect(() => {
    eventManagerStore.loadEvents();
  }, []);

  const loadListItem = (event) => {
    console.log("loading", event);
    return (
      <ListItem alignItems="flex-start">
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
      <Typography variant="h5" component="div">
        My events:
      </Typography>
      <List sx={{ width: "100%" }}>
        {eventManagerStore.events
          .filter((event) => event.organizer === eventManagerStore.account)
          .map((event) => loadListItem(event))}
      </List>
    </>
  );
});

export default MyAccount;
