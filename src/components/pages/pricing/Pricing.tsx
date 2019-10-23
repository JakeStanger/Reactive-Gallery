import React from "react";
import styles from "./Pricing.module.scss";

const Pricing: React.FC = () => (
<div className={styles.container}>
        <div className={styles.title}>Pricing</div>
        <p>Photos are grouped into pricing categories depending on their aspect ratio. Each photo lists its group in its description. 
          An order can be placed through the Facebook shop or by email. </p>
        <div>
          <div className={styles.subTitle} id="group1">
            Group One
          </div>
          <table>
            <thead>
              <tr className={styles.tableRow}>
                <th>Size</th>
                <th>Print Only</th>
                <th>Framed</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <td>8x12"</td>
                <td>£20</td>
                <td>£45</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>10x15"</td>
                <td>£22</td>
                <td>£55</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>12x18"</td>
                <td>£25</td>
                <td>£60</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>16x24"</td>
                <td>£40</td>
                <td>£80</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>20x30"</td>
                <td>£50</td>
                <td>£100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.subTitle} id="group2">
            Group Two
          </div>
          <table>
            <thead>
              <tr className={styles.tableRow}>
                <th>Size</th>
                <th>Print Only</th>
                <th>Framed</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <td>15x20"</td>
                <td>£25</td>
                <td>£60</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>18x24"</td>
                <td>£30</td>
                <td>£80</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.subTitle} id="group3">
            Group Three
          </div>
          <table>
            <thead>
              <tr className={styles.tableRow}>
                <th>Size</th>
                <th>Print Only</th>
                <th>Framed</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <td>15x12"</td>
                <td>£22</td>
                <td>£55</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>16x20"</td>
                <td>£25</td>
                <td>£65</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.subTitle} id="group4">
            Group Four
          </div>
          <table>
            <thead>
              <tr className={styles.tableRow}>
                <th>Size</th>
                <th>Print Only</th>
                <th>Framed</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <td>10x20"</td>
                <td>£25</td>
                <td>£60</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>12x24"</td>
                <td>£30</td>
                <td>£70</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>13x26"</td>
                <td>£32</td>
                <td>£80</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>15x30"</td>
                <td>£40</td>
                <td>£90</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.subTitle} id="group5">
            Group Five
          </div>
          <table>
            <thead>
              <tr className={styles.tableRow}>
                <th>Size</th>
                <th>Print Only</th>
                <th>Framed</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <td>10x24"</td>
                <td>£30</td>
                <td>£70</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>14x36.5"</td>
                <td>£35</td>
                <td>£100</td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className={styles.subTitle} id="other">
              Other
            </div>
            <table>
              <thead>
                <tr className={styles.tableRow}>
                  <th>Type</th>
                  <th>Single</th>
                  <th>Bulk</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.tableRow}>
                  <td>Greetings Card</td>
                  <td>£1.50</td>
                  <td>4 for £5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
);

export default Pricing;