import React from "react";
import { Route } from "react-router-dom";
import MissionsList from "./list";

const Missions = () => {
  return <Route
    key={"missions"}
    exact
    path="/cadlite/admin/missions"
    render={() => <MissionsList />}
  />
};

export default Missions;
