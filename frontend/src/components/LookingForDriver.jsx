import React from "react";
import carLogo from "../assets/images/—Pngtree—3d super car with transparent_5357818.png";
import motoLogo from "../assets/images/—Pngtree—vector-de-una-moto-deportiva-marca-serpento--hurri white background_20687588.png";
import autoLogo from "../assets/images/pngtree-rickshaw-also-known-as-a-tuk-png-image_20371450.png";

export const LookingForDriver = (props) => {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl font-black mb-4 text-black tracking-wide ">
          Looking For a Driver
        </h3>
        <h5
          className="text-xl text-black cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            props.setVehicleFound(false);
          }}
        >
          <i className="ri-arrow-down-double-line"></i>
        </h5>
      </div>

      <div className="flex gap-2 flex-col items-center justify-between">
        <img
          className="w-44 drop-shadow-[3px_3px_0_rgba(0,0,0,1)] animate-bounce-subtle"
          src={
            props.vehicleType === "car"
              ? carLogo
              : props.vehicleType === "motorcycle"
              ? motoLogo
              : props.vehicleType === "auto"
              ? autoLogo
              : ""
          }
          alt={props.vehicleType}
        />
        <div className="w-full ">
          <div className="flex items-center gap-4 p-2 mb-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5 p-2 mb-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">48/B</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {props.destination}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-5 p-2 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)] ">
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">
                    ₹{props.fare[props.vehicleType]?.toFixed(2) || "N/A"}
                  </h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash 💵</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
