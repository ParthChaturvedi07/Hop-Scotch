import React from "react";

export const DriverDetails = () => {
  const driver = JSON.parse(localStorage.getItem("driver"));

  console.log(driver);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {driver.fullName.firstName + " " + driver.fullName.lastName}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹193.28</h4>
          <p className="text-sm px-2 py-0.5 bg-yellow-200 border border-black rounded shadow-[2px_2px_0_rgba(0,0,0,1)]">
            Earned
          </p>
        </div>
      </div>
      <div className=" h-full w-full flex justify-center items-center">
        <div className="w-full flex p-3 bg-gray-50 border-2 border-black rounded-2xl shadow-[3px_3px_0_rgba(0,0,0,1)] justify-around items-start">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
    </>
  );
};
