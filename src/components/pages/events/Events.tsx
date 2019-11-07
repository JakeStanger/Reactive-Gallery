import React from "react";
import styles from "./Events.module.scss";

const Events: React.FC = () => (
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
        <tr>
          <td>Sun 3rd Nov 10:00</td>
          <td>Arts and Crafts Fair</td>
          <td>The Westgate Hall, Canterbury</td>
        </tr>
        <tr>
          <td>Sat 9th Nov 10:00</td>
          <td>Hersden Arts and Crafts Fair</td>
          <td>Hersden Community Centre, Canterbury</td>
        </tr>
        <tr>
          <td>Thu 14th Nov 09:30 - 14:00</td>
          <td>Sandwich Thursday Market</td>
          <td>St Peter's Church, Sandwich</td>
        </tr>
        <tr>
          <td>Sat 16th Nov 09:30</td>
          <td>Arts and Crafts Fair</td>
          <td>St George's Hall, High Street, Deal, CT14 6AZ</td>
        </tr>
        <tr>
          <td>Thu 21st Nov 09:30 - 14:00</td>
          <td>Sandwich Thursday Market</td>
          <td>St Peter's Church, Sandwich</td>
        </tr>
        <tr>
          <td>Sun 24th Nov 10:00</td>
          <td>Christmas Gift Market</td>
          <td>Rare Breed Centre, Woodchurch, TN26 3RJ</td>
        </tr>
        <tr>
          <td>Thu 28th Nov 09:30 - 14:00</td>
          <td>Sandwich Thursday Market</td>
          <td>St Peter's Church, Sandwich</td>
        </tr>
        <tr>
          <td>Sat 30th Nov 10:00</td>
          <td>Arts and Crafts Gift Fair</td>
          <td>King's Hall, Herne Bay</td>
        </tr>
        <tr>
          <td>Sun 1st Dec 11:00</td>
          <td>Tankerton Christmas Market</td>
          <td>Whitstable Castle, CT5 2BW</td>
        </tr>
        <tr>
          <td>Thu 5th Dec 09:30 - 14:00</td>
          <td>Sandwich Thursday Market</td>
          <td>St Peter's Church, Sandwich</td>
        </tr>
        <tr>
          <td>Sat 7th Dec 14:00</td>
          <td>Hersden Neighbourhood Christmas Fair</td>
          <td>Hersden Community Centre, Canterbury</td>
        </tr>
        <tr>
          <td>Thu 12th Dec 09:30 - 14:00</td>
          <td>Sandwich Thursday Market</td>
          <td>St Peter's Church, Sandwich</td>
        </tr>
        <tr>
          <td>Sat 14th Dec 09:30</td>
          <td>Christmas Arts and Crafts Fair</td>
          <td>St George's Hall, High Street, Deal, CT14 6AZ</td>
        </tr>
        <tr>
          <td>Thu 19th Nov 09:30 - 14:00</td>
          <td>Sandwich Thursday Market</td>
          <td>St Peter's Church, Sandwich</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Events;
