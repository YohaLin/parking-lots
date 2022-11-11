function correctDistrict(id, area) {
  switch (id) {
    case "005":
      return "北投區";
    case "050":
      return "信義區";
    case "4152":
      return "信義區";
    case "KE25":
      return "內湖區";
    default:
      return area;
  }
}

// export default correctDistrict

module.exports = correctDistrict;
