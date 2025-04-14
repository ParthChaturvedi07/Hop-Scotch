import React from "react";

export const LocationSearchPanel = ({
  suggestions,
  setVehiclePanelOpen,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
      setVehiclePanelOpen(true);
      setPanelOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
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
