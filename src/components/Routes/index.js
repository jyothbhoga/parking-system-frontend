import React, { memo, Suspense } from "react";
import {
  Routes as Switch,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import config from "../../common/config";
import Login from "../Login";
import AddEditVehicle from "../Vehicles/AddEditVehicle";
import VehiclesList from "../Vehicles";
import ViewVehicle from "../Vehicles/ViewVehicle";

const Routes = memo((props) => {
  const loggedIn = true;
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading</p>}>
        <Switch>
          <Route path={config.enumStaticUrls.login} element={<Login />} />
          <Route
            path={config.enumStaticUrls.add}
            element={<AddEditVehicle />}
          />
          <Route
            path={`/${config.enumStaticUrls.edit}/:id/`}
            element={<AddEditVehicle />}
          />
          <Route
            path={`/${config.enumStaticUrls.vehicleList}`}
            element={<VehiclesList />}
          />
          <Route
            path={`/${config.enumStaticUrls.view}/:id/`}
            element={<ViewVehicle />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to={`/${
                  config.enumStaticUrls[loggedIn ? "vehicleList" : "login"]
                }`}
              />
            }
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
});

export default Routes;
