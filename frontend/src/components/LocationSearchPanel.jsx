import React from "react";

export const LocationSearchPanel = (props) => {
  const locations = [
    "24B, Near Kapoor's cafe, Sheriyan Coding School, Bhopal",
    "22B, Near Malhotr's cafe, VSECSN, Kanpur",
    "2B, Near Raj's cafe, Candore , Bhopal",
    "27B, Raj Nagar, JSSATEN, Bhopal",
  ];

  return (
    <div className="flex flex-col gap-2">
      {locations.map((elem, index) => (
        <div
          onClick={() => {
            props.setVehiclePanelOpen(true);
            props.setPanelOpen(false);
          }}
          key={index}
          className="flex active:border-2 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start gap-1"
        >
          <h2 className="bg-gray-100 rounded-full h-8 w-12 flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};
