import React, { memo, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import config from "../../common/config";
import Login from "../Login";
import AddEditVehicle from "../Vehicles/AddEditVehicle";
import VehiclesList from "../Vehicles";
import ViewVehicle from "../Vehicles/ViewVehicle";
import { getCookie } from "../../common/helper";

const RoutesComponent = memo(() => {
  const loggedInToken = getCookie("token");

  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          {loggedInToken ? (
            <>
              <Route
                path={`/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.edit}/:id/`}
                element={<AddEditVehicle />}
              />
              <Route
                path={`/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.add}`}
                element={<AddEditVehicle />}
              />
              <Route
                path={`/${config.enumStaticUrls.vehicleList}`}
                element={<VehiclesList />}
              />
              <Route
                path={`/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.view}/:id/`}
                element={<ViewVehicle />}
              />
              {/* Default to vehicle list if route doesn't match */}
              <Route
                path="*"
                element={
                  <Navigate to={`/${config.enumStaticUrls.vehicleList}`} />
                }
              />
            </>
          ) : (
            <>
              <Route
                path={`/${config.enumStaticUrls.login}`}
                element={<Login />}
              />
              {/* Default to login if not logged in */}
              <Route
                path="*"
                element={<Navigate to={`/${config.enumStaticUrls.login}`} />}
              />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
});

export default RoutesComponent;
