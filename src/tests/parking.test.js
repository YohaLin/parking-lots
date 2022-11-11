const Parking = require('./../pages/parking')

test("", () => {
  expect(
    typeof(Parking.getInfo("001"))
  ).toBe("object")
})