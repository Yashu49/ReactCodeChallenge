import { responseFromApi } from "./mockData";

/* Function to create a prefix keyed object */

export const locationDashBoard = (responseData) => {
    const dashBoardData = responseData && responseData.data.dashboard.components;
    let locationObj = {};

    /* Perform algorithm for valid Response Data */
    if (dashBoardData && dashBoardData.length) {
        dashBoardData.reduce((data, acc) => {
            const prefix = acc.location.substr(0, 2);
            const copyRes = { ...acc }

            /* Remove location attribute as it is being used as a key now */
            delete copyRes.location;

            locationObj = { ...data };

            if (Object.keys(data).includes(prefix)) {
                locationObj[prefix] = {
                    ...locationObj[prefix],
                    [acc.location]: { ...copyRes }
                }
            } else {
                locationObj[prefix] = {
                    [acc.location]: {
                        ...copyRes
                    }
                }
            }

            return locationObj
        }, {})
        return locationObj
    } else {
        alert("Not a valid data")
    }
}

/* Call Function with the ResponseAPI */
console.log("Location Data ==>", locationDashBoard(responseFromApi))


/* Function to Remove location Data */

const removeLocations = (location, data) => {
    let removeLocObj = {};

    Object.keys(data).map((loc) => {
        removeLocObj = {
            ...removeLocObj,
            [location]: {
                ...data[loc]
            }
        }
    })

    return removeLocObj;
}


/* Call the Function to remove locations */
const locationObjData = locationDashBoard(responseFromApi);

/* Calling below function will give the new obj without location keys in it */
const newRemovedLocObj = Object.keys(locationObjData).map((value) => {
    return removeLocations(value, locationObjData[value]);
})
