import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { eventManagerStore } from "../stores/EventManagerStore";
import EventList from "./EventList";
import MyAccount from "./MyAccount";

const PageContent = observer(() => {
  const loadContent = () => {
    switch (eventManagerStore.activePage) {
      case "events":
        return <EventList />;
      case "myAccount":
        return <MyAccount />;
      default:
        return <EventList />;
    }
  };

  return (
    <Box
      sx={{
        width: "1200px",
      }}
    >
      {loadContent()}
    </Box>
  );
});

export default PageContent;
