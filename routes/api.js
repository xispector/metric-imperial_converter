"use strict";
const express = require("express");
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

const app = express();

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });
  app.get("/api/convert", (req, res) => {
    const input = {
      number: convertHandler.getNum(req.query["input"]),
      unit: convertHandler.getUnit(req.query["input"]),
    };
    if (!input.number && !input.unit) {
      res.send("invalid number and unit");
    } else if (!input.unit) {
      res.send("invalid unit");
    } else if (!input.number) {
      res.send("invalid number");
    } else {
      const output = {
        returnNum: parseFloat(convertHandler.convert(input.number, input.unit)),
        returnUnit: convertHandler.getReturnUnit(input.unit),
      };
      res.json({
        initNum: input.number,
        initUnit: input.unit,
        returnNum: output.returnNum,
        returnUnit: output.returnUnit,
        string: convertHandler.getString(
          input.number,
          input.unit,
          output.returnNum,
          output.returnUnit
        ),
      });
    }
  });
};
