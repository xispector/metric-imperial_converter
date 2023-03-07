const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const units = ["gal", "L", "mi", "km", "lbs", "kg"];

suite("Unit Tests", function () {
  suite("Number parsing test", () => {
    test("#number", () => {
      const unit = units[Math.floor(Math.random() * units.length)];
      const integer = Math.floor(Math.random() * 1000);
      assert.equal(convertHandler.getNum(`${integer}${unit}`), integer);
    });

    test("#float", () => {
      const unit = units[Math.floor(Math.random() * units.length)];
      const float = Math.random() * 1000;
      assert.equal(convertHandler.getNum(`${float}${unit}`), float);
    });

    test("#fraction", () => {
      const unit = units[Math.floor(Math.random() * units.length)];
      const integerNumerator = Math.floor(Math.random() * 1000);
      const integerDenominator = Math.floor(Math.random() * 1000);
      assert.equal(
        convertHandler.getNum(
          `${integerNumerator}/${integerDenominator}${unit}`
        ),
        integerNumerator / integerDenominator
      );
    });

    test("#fraction and float", () => {
      const unit = units[Math.floor(Math.random() * units.length)];
      const numerator = Math.random() * 1000;
      const denominator = Math.random() * 1000;
      assert.equal(
        convertHandler.getNum(`${numerator}/${denominator}${unit}`),
        numerator / denominator
      );
    });

    test("#double fraction", () => {
      const unit = units[Math.floor(Math.random() * units.length)];
      const first = Math.random() * 1000;
      const second = Math.random() * 1000;
      const third = Math.random() * 1000;
      assert.equal(
        convertHandler.getNum(`${first}/${second}/${third}`),
        undefined
      );
    });

    test("#no input", () => {
      units.forEach((v) => {
        assert.equal(convertHandler.getNum(v), 1);
      });
    });
  });

  suite("Unit parsing test", () => {
    test("#read valid unit", () => {
      const unit = units[Math.floor(Math.random() * units.length)];
      const number = Math.random() * 1000;
      assert.equal(convertHandler.getUnit(`${number}${unit}`), unit);
    });

    test("#read invalid unit", () => {
      const virUnit = "kgalbs";
      const number = Math.random() * 1000;
      assert.equal(convertHandler.getUnit(`${number}${virUnit}`), undefined);
    });

    test("#check returned unit", () => {
      const output = ["L", "gal", "km", "mi", "kg", "lbs"];
      units.forEach((v, i) => {
        assert.equal(convertHandler.getReturnUnit(v), output[i]);
      });
    });

    test("#spell out", () => {
      const output = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      units.forEach((v, i) => {
        assert.equal(convertHandler.spellOutUnit(v), output[i]);
      });
    });
  });

  suite("Convert tests", () => {
    const number = Math.random() * 1000;
    const cons = {
      gal: 3.78541,
      lbs: 0.453592,
      mi: 1.60934,
    };
    const allCons = {
      gal: cons.gal,
      L: 1 / cons.gal,
      lbs: cons.lbs,
      kg: 1 / cons.lbs,
      mi: cons.mi,
      km: 1 / cons.mi,
    };
    units.forEach((v, i) => {
      test(`#convert ${v}`, () => {
        assert.equal(
          convertHandler.convert(number, v),
          (allCons[v] * number).toFixed(5)
        );
      });
    });
  });
});
