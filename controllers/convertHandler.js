function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    if (new RegExp("^[a-z]+", "i").test(input)) {
      return 1;
    } else {
      const parsed = input.match(/^[^a-z]+/i)[0];
      if (
        new RegExp(
          "^(\\d+|\\d+\\.\\d+)$|^(\\d+|\\d+\\.\\d+)\\/(\\d+|\\d+\\.\\d+)$"
        ).test(parsed)
      ) {
        numbers = parsed.split("/").map((v) => parseFloat(v));
        result = numbers[0] / (numbers[1] || 1);
      }
      return result;
    }
  };

  this.getUnit = function (input) {
    let result;
    input = input.toLowerCase();
    result = input.match(/^[^a-z]*(gal|l|mi|km|lbs|kg)$/i);
    if (result == null) {
      return result;
    } else {
      if (result[1] == "l") {
        return result[1].toUpperCase();
      } else {
        return result[1];
      }
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const unitArr = [
      ["gal", "L"],
      ["mi", "km"],
      ["lbs", "kg"],
    ];
    switch (initUnit) {
      case "gal":
      case "L":
        result = unitArr[0].splice(unitArr[0].indexOf(initUnit) - 1, 1)[0];
        break;
      case "mi":
      case "km":
        result = unitArr[1].splice(unitArr[1].indexOf(initUnit) - 1, 1)[0];
        break;
      case "lbs":
      case "kg":
        result = unitArr[2].splice(unitArr[2].indexOf(initUnit) - 1, 1)[0];
        break;
      default:
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    const units = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    result = units[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const unitArr = [
      ["gal", "L", galToL],
      ["mi", "km", miToKm],
      ["lbs", "kg", lbsToKg],
    ];

    switch (initUnit) {
      case "gal":
      case "L":
        result =
          unitArr[0].indexOf(initUnit) == 0
            ? initNum * unitArr[0][2]
            : initNum / unitArr[0][2];
        break;
      case "mi":
      case "km":
        result =
          unitArr[1].indexOf(initUnit) == 0
            ? initNum * unitArr[1][2]
            : initNum / unitArr[1][2];
        break;
      case "lbs":
      case "kg":
        result =
          unitArr[2].indexOf(initUnit) == 0
            ? initNum * unitArr[2][2]
            : initNum / unitArr[2][2];
        break;
      default:
    }
    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
