const renderText = require('./../helpers/calcTextLength')
const distance = require('./../helpers/convertDistanceUnit')
const correctDistrict = require('./../helpers/correctDistrict')
const convertProj4 = require('./../helpers/proj4')

import proj4 from "proj4";


// toBe
test("測試中文字串超過7byte是否自動切除並加上'...'", () => {
  expect(
    renderText("台灣台北市中正區承德路一段台北車站", 7)
  ).toBe("台灣台...")

  expect(
    renderText("Taipei station, 承德路一段中正區台北市台灣", 7)
  ).toBe("Taipei ...")
})

test("測試經緯度換算距離後是否為數字", ()=>{
  expect(
    typeof(distance(23.5, 120.4, 24.5, 121.4, "K"))
  ).toBe("number")
})

test("測試API錯誤資料是否能夠被更改正確", ()=>{
  expect(
    correctDistrict("005")
  ).toBe("北投區")

  expect(
    correctDistrict("050")
  ).toBe("信義區")

  expect(
    correctDistrict("4152")
  ).toBe("信義區")

  expect(
    correctDistrict("KE25")
  ).toBe("內湖區")

  expect(
    correctDistrict("001", "信義區")
  ).toBe("信義區")
})


// test("測試經緯度換算後是否為數字", ()=>{
//   expect(
//     typeof(convertProj4(306812.928, 2769892.95).lat,convertProj4(306812.928, 2769892.95).lng)
//   ).toBe("number", "number")
// })

