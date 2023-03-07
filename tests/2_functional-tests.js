const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const { json } = require("body-parser");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("#valid input", () => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.match(
          JSON.parse(res.text).string,
          /^(\d+|\d+\.\d+)\s(liters|gallons|miles|kilometers|pounds|kilograms)\sconverts\sto\s(\d+|\d+\.\d+)\s(liters|gallons|miles|kilometers|pounds|kilograms)$/
        );
      });
  });

  test("#invalid input", () => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.text, "invalid unit");
      });
  });

  test("#invalid number", () => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.text, "invalid number");
      });
  });

  test("#invalid number and unit", () => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.text, "invalid number and unit");
      });
  });

  test("#no number input", () => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.match(
          JSON.parse(res.text).string,
          /^1\s(liters|gallons|miles|kilometers|pounds|kilograms)\sconverts\sto\s(\d+|\d+\.\d+)\s(liters|gallons|miles|kilometers|pounds|kilograms)$/
        );
      });
  });
});
