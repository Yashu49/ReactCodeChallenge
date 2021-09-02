import { locationDashBoard } from "./ApiResponseFunction";
import { responseFromApi } from "./mockData";

describe("Algorithm to create a location specific object from array of objecte", () => {
    it("Should return an object as result", () => {
        expect(Object.keys(locationDashBoard(responseFromApi)).length).toEqual(9)
    });

    it("Object key should have a 2 character prefix", () => {
        const objKeys = Object.keys(locationDashBoard(responseFromApi));

        objKeys.map(val => {
            expect(val.length).toEqual(2);
        });
    });

    it("Should not throw an exception when invalid data is passed", () => {
        window.alert = jest.fn(); // or global.alert = jest.fn();

        locationDashBoard()
        expect(window.alert).toHaveBeenCalled();
    });

});