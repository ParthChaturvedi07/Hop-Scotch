import React from "react";
import carLogo from "../assets/images/—Pngtree—3d super car with transparent_5357818.png";

export const WaitingForDriver = (props) => {
  return (
    <div className="space-y-5 px-4 py-3 text-black">
      {/* Close Icon */}
      <h5
        className="text-2xl absolute top-2 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => {
          props.setWaitingForDriverPanel(false);
        }}
      >
        <i className="ri-arrow-down-double-line"></i>
      </h5>

      <div className="flex items-center justify-between bg-white px-4 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)]">
        <img className="h-20 animate-bounce-subtle" src={carLogo} alt="Car" />
        <div className="text-right">
          <h2 className="text-xl font-bold">Dhruv</h2>
          <h4 className="text-md font-bold -mt-1 -mb-1">UP78 AB 1234</h4>
          <p className="text-sm text-gray-600">Wagon-R, Maruti Suzuki</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="w-full flex items-center gap-4 p-3 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
          <i className="ri-map-pin-user-fill text-xl"></i>
          <div>
            <h3 className="text-lg font-bold">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Kantariya Talab, Kanpur
            </p>
          </div>
        </div>

        <div className="w-full flex items-center gap-4 p-3 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
          <i className="ri-map-pin-user-fill text-xl"></i>
          <div>
            <h3 className="text-lg font-bold">48/B</h3>
            <p className="text-sm -mt-1 text-gray-600">Shyam Nagar, Kanpur</p>
          </div>
        </div>

        <div className="w-full flex items-center gap-4 p-3 border-2 border-black rounded-xl bg-gray-50 shadow-[3px_3px_0_rgba(0,0,0,1)]">
          <i className="ri-money-rupee-circle-fill text-xl"></i>
          <div>
            <h3 className="text-lg font-bold">₹193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
          </div>
        </div>
      </div>
    </div>
  );
};
