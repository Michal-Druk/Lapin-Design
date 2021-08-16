import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router, Switch,
  Route, Link, useRouteMatch,
} from 'react-router-dom';
import './projects.css'
import Gallery from '../gallery/gallery';
import MailPhoneProjects from "../backgroundPicture/backgroundPicture";

function Projects() {
  const [simulation, setSimulation] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [salesPlane, setSalesPlane] = useState([]);
  useEffect((res) => {

    fetch("http://localhost:3080/LapinDesignerData/getPictures", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    }).then(res => res.json())
      .then((res) => {
        var image
        let s = res[0].Pictures.map((item) => {
          image = require("../../images/simulation/" + item)
          return image.default
        })
        let d = res[1].Pictures.map((item) => {
          image = require("../../images/drawings/" + item)
          return image.default
        })
        let p = res[2].Pictures.map((item) => {
          image = require("../../images/salesPlane/" + item)
          return image.default
        })
        setSimulation(s)
        setDrawings(d)
        setSalesPlane(p)
      }).catch(error => console.log('error', error));
  }, []);

  let match = useRouteMatch();
  return (
    <Router>
      <nav>
        <div className="links">
          <Link className="link-text" to={`${match.url}/simulation`} >
            <button className="button-link"> הדמיות</button></Link>
          <Link className="link-text" to={`${match.url}/drawings`}>
            <button className="button-link">שרטוטים</button></Link>
          <Link className="link-text" to={`${match.url}/salesPlans`}>
            <button className="button-link">תוכניות מכר</button></Link>
        </div>
      </nav>
      <Switch>
        <Route path={`${match.url}/simulation`}>
          <Gallery category={simulation} />
        </Route>
        <Route path={`${match.url}/drawings`}>
          <Gallery category={drawings} />
        </Route>
        <Route path={`${match.url}/salesPlans`}>
          <Gallery category={salesPlane} />
        </Route>
        <Route path={`${match.url}`}>
          <MailPhoneProjects info={"progectBackground"} />
        </Route>
      </Switch>
    </Router>

  );
}
export default Projects;