import React from "react";

export const LocationSearchPanel = ({
  suggestions,
  setVehiclePanelOpen,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
  findFare,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  return (
    <div className="flex items-center flex-col gap-2">
      <button
        onClick={findFare}
        className=" w-[70%] bg-yellow-300 border-2 border-black text-black font-semibold p-3 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform"
      >
        Find Your Ride
      </button>
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            handleSuggestionClick(elem);
          }}
          className="flex active:border-2 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start gap-1"
        >
          <h2 className="bg-gray-100 rounded-full h-8 w-12 flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem.description}</h4>
        </div>
      ))}
    </div>
  );
};
