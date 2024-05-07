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

  return <>{loadContent()}</>;
});

export default PageContent;
