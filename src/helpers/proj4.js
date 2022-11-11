import proj4 from "proj4";

function convertProj4(x, y) {
  proj4.defs([
    [
      "EPSG:4326",
      "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
    ],
    [
      "EPSG:3826",
      "+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs",
    ],
  ]);

  var EPSG3826 = new proj4.Proj("EPSG:3826"); //TWD97 121分帶
  var EPSG4326 = new proj4.Proj("EPSG:4326"); //WGS84

  // 記得proj4要代數字，從API來的資料是字串喔！！！
  const latlng = proj4(EPSG3826, EPSG4326, [Number(x), Number(y)])

  return {
    lng: latlng[0],
    lat: latlng[1] 
  }
  
}

// console.log(convertProj4(306812.928, 2769892.95)) // 經度、緯度
export default convertProj4

// module.exports = convertProj4