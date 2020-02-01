import React, { useEffect, useState } from "react";
import styles from "./Events.module.scss";
import IEvent from "../../../services/eventService/IEvent";
import EventService from "../../../services/eventService/EventService";
import { DateTime } from "luxon";

const Events: React.FC = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);

  useEffect(() => {
    if (events === null)
      EventService.getInstance()
        .getAll()
        .then(setEvents);
  }, [events]);

  console.log(events);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Upcoming Events</div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr className={styles.tableRow}>
            <th>Time</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event: IEvent) => (
              <tr>
                <td>
                  {DateTime.fromISO(event.startTime).toFormat(
                    "ccc dd LLL HH:mm"
                  )}{" "}
                  - {DateTime.fromISO(event.endTime).toFormat("HH:mm")}
                </td>
                <td>{event.name}</td>
                <td>{event.location}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!(events && events.length) && <div className={styles.subSubTitle}>There are currently no upcoming events</div>}
    </div>
  );
};

export default Events;
