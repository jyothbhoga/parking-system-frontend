import { atom } from "jotai";

// Atom for storing vehicle data
export const vehicleDataAtom = atom({ data: [], totalCount: 0, totalPages: 0 });

//Atom for storing current vehicle
export const currVehicleDataAtom = atom({ data: [], totalCount: 0, totalPages: 0 });


// Atom for tracking loading state
export const loadingAtom = atom(false);

// Atom for error handling
export const errorAtom = atom(null);
