import React from "react";
import carLogo from "../assets/images/—Pngtree—3d super car with transparent_5357818.png";
import motoLogo from "../assets/images/—Pngtree—vector-de-una-moto-deportiva-marca-serpento--hurri white background_20687588.png";
import autoLogo from "../assets/images/pngtree-rickshaw-also-known-as-a-tuk-png-image_20371450.png";
export const VehiclePanel = (props) => {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold mb-5 ">Choose a Ride</h3>
        <h5
          className="text-xl"
          onClick={() => {
            props.setVehiclePanelOpen(false);
          }}
        >
          <i className="ri-arrow-down-double-line"></i>
        </h5>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("car");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img className="h-14" src={carLogo} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-md">
            Hop Cab
            <span>
              <i className="ri-user-5-fill"></i>
            </span>
            4
          </h4>
          <h5 className="font-medium text-base">2 mins away</h5>
          <p className="font-normal text-sm text-gray-600">
            Affordable, Car rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">
          ₹{props.fare?.car?.toFixed(2) || "N/A"}
        </h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("motorcycle");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img className="h-14" src={motoLogo} alt="" />
        <div className=" -ml-2 w-1/2">
          <h4 className="font-medium text-md">
            Hop Moto
            <span>
              <i className="ri-user-5-fill"></i>{" "}
            </span>
            1
          </h4>
          <h5 className="font-medium text-base">3 mins away</h5>
          <p className="font-normal text-sm text-gray-600">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">
          ₹{props.fare?.motorcycle?.toFixed(2) || "N/A"}
        </h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("auto");
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-14" src={autoLogo} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-md">
            Hop Auto
            <span>
              <i className="ri-user-5-fill"></i>
            </span>
            3
          </h4>
          <h5 className="font-medium text-base">5 mins away</h5>
          <p className="font-normal text-sm text-gray-600">
            Affordable, Auto Rickshaw rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">
          ₹{props.fare?.auto?.toFixed(2) || "N/A"}
        </h2>
      </div>
    </>
  );
};
