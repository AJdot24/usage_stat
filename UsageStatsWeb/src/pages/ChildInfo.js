import React, { useEffect, useState } from "react";
import app from "../base";
import { DashboardLayout } from "../components/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import moment from "moment";
const database = app.database();
var user = app.auth().currentUser;
const ChildInfo = () => {
  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  var databaseref = database.ref();
  const email = app.auth().currentUser.email;
  const username = email.split("@")[0];
  const [childData, setChildData] = useState([]);
  const params = useParams();
  console.log(params.id);
  useEffect(() => {
    let ref = databaseref
      .child("users")
      .child(username)
      .child("children")
      .child(params.id)
      .child("AppDetails");
    ref.on("value", (snapshot) => {
      let elements = [];
      const data = snapshot.val();
      console.log(data);
      // snapshot.forEach((child) => {
      //   elements.push({ id: child.key, ...child.val() });
      // });
      setChildData(data);
    });
  }, []);
  return (
    <DashboardLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>App Launch Count</th>
            <th>lastTimeUsed</th>
            <th>totalTimeInForeground</th>
          </tr>
        </thead>
        <tbody>
          {childData.map((item, idx) => {
            console.log(item);
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.packageName}</td>
                <td>{item.appLaunchCount} </td>
                <td>{moment.unix(item.lastTimeUsed).format("HH:mm:ss")}</td>
                <td>
                  {moment
                    .duration(item.totalTimeForegroundServiceUsed)
                    .humanize()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </DashboardLayout>
  );
};

export default ChildInfo;
