import styles from "./Timetable.module.css";

const TimeTable = () => {
  return (
    <div className={styles.timetable}>
      <h1>TIME TABLE</h1>
      <table>
        <tr>
          <th>DAY</th>
          <th>
            <p>1</p>
            <p>8:00 -9:00</p>
          </th>
          <th>
            <p>2</p>
            <p>9:00-9:50</p>
          </th>
          <th>
            <p>9:50-10:10</p>
          </th>
          <th>
            <p>3</p>
            <p>10:10-11:00</p>
          </th>
          <th>
            <p>4</p>
            <p>11:00-11:50</p>
          </th>
          <th>
            <p>5/L</p>
            <p>11:50-12:30/12:40</p>
          </th>
          <th>
            <p>L/5</p>
            <p>12:30/12:40-1:20</p>
          </th>
          <th>
            <p>6</p>
            <p>1:20-2:10</p>
          </th>
          <th>
            <p>7</p>
            <p>2:10-3:00</p>
          </th>
        </tr>
        <tr>
          <th>TUESDAY</th>
          <td title="Computer Networks" colSpan="2">
            <p>CS19541 CN</p>
            <p>A 208</p>
          </td>
          <td rowSpan="5">
            <p>B<br />R<br />E<br />A<br />K<br /></p>
          </td>
          <td colSpan="2">
            <p>CS19541 CN / AI19341 POAI LAB</p>
            <p>TLFL4/TLGL3</p>
          </td>
          <td>LUNCH</td>
          <td title="Human Computer Interaction" colSpan="2">
            <p>CS19P06</p>
            <p>A208</p>
          </td>
          <td>
            <p>COUN</p>
            <p>A208</p>
          </td>
        </tr>
        <tr>
          <th>WEDNESDAY</th>
          <td colSpan="2">
            <p>CS19542 IP / AI19341 POAI LAB</p>
            <p>TLFL1/TLGL3</p>
          </td>
          <td title="Internet Programming">
            <p>CS19542 IP</p>
            <p>B218</p>
          </td>
          <td colSpan="2">
            <p>VAP</p>
          </td>
          <td>LUNCH</td>
          <td colSpan="2" title="Theory Of Computation">
            <p>CS19501 TOC</p>
            <p>A105</p>
          </td>
        </tr>
        <tr>
          <th>THURSDAY</th>
          <td title="Internet Programming" colSpan="2">
            <p>CS19452 IP</p>
            <p>A208</p>
          </td>
          <td colSpan="2">
            <p>CS1906 HCI / CS19452 IP LAB</p>
            <p>TLFL5/JL2</p>
          </td>
          <td>
            <p>LUNCH</p>
          </td>
          <td title="Principles Of Artificial Intelligence">
            <p>AI19341 POAI</p>
            <p>A208</p>
          </td>
          <td colSpan="2">
            <p>CS19542 IP / CS19541 CN LAB</p>
            <p>TLFL4/TLFL1</p>
          </td>
        </tr>
        <tr>
          <th>FRIDAY</th>
          <td colSpan="2">
            <p>CS1906 HCI / CS19541 CN LAB</p>
            <p>TLFL5/TLFL4</p>
          </td>
          <td colSpan="2" title="Theory Of Computation">
            <p>CS19501 TOC</p>
            <p>A105</p>
          </td>
          <td>
            <p>LUNCH</p>
          </td>
          <td title="Computer Networks">
            <p>CS19541 CN</p>
            <p>A208</p>
          </td>
          <td title="Robotic Process Automation" colSpan="2">
            <p>OAI1903 RPA</p>
            <p>A105</p>
          </td>
        </tr>
        <tr>
          <th>SATURDAY</th>
          <td colSpan="2" title="Principles Of Artificial Intelligence">
            <a href="">
              <p>AI19341 POAI</p>
              <p>A208</p>
            </a>
          </td>
          <td title="Robotic Process Automation" colSpan="2">
            <p>OAI1903 RPA</p>
            <p>A105</p>
          </td>
          <td>
            <p>LUNCH</p>
          </td>
          <td title="Internet Programming" colSpan="2">
            <p>CS19452 IP</p>
            <p>A211</p>
          </td>
          <td colSpan="2">
            <p>CS19542 IP / CS19541 CN LAB</p>
            <p>JL2/JL1</p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default TimeTable;
