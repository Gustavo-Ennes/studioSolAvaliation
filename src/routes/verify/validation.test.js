const { expect } = require("chai");
const {
  minSize,
  minUppercase,
  minLowercase,
  minDigit,
  minSpecialChars,
  noRepeated,
} = require("./validation");

describe("Validation tests", () => {
  describe("minSize", () => {
    it("should validate when password has minimum length", () => {
      const password = "teste123";
      const ruleValue = 8;
      expect(minSize({ password, ruleValue })).to.be.true;
    });

    it("shouldn't validate when password hasn't minimum length", () => {
      const password = "teste123";
      const ruleValue = 9;
      expect(minSize({ password, ruleValue })).to.be.false;
    });
  });

  describe("minUppercase", () => {
    it("should validate when password has minimum uppercase letters", () => {
      const password = "Teste123";
      const ruleValue = 1;
      expect(minUppercase({ password, ruleValue })).to.be.true;
    });

    it("shouldn't validate when password hasn't minimum uppercase letters", () => {
      const password = "teSTe123";
      const ruleValue = 9;
      expect(minUppercase({ password, ruleValue })).to.be.false;
    });
  });

  describe("minLowercase", () => {
    it("should validate when password has minimum lowercase letters", () => {
      const password = "Teste123";
      const ruleValue = 4;
      expect(minLowercase({ password, ruleValue })).to.be.true;
    });

    it("shouldn't validate when password hasn't minimum lowercase letters", () => {
      const password = "teSTe123";
      const ruleValue = 4;
      expect(minLowercase({ password, ruleValue })).to.be.false;
    });
  });

  describe("minDigits", () => {
    it("should validate when password has minimum digits", () => {
      const password = "teste123";
      const ruleValue = 3;
      expect(minDigit({ password, ruleValue })).to.be.true;
    });

    it("shouldn't validate when password hasn't minimum digits", () => {
      const password = "teSTe123";
      const ruleValue = 4;
      expect(minDigit({ password, ruleValue })).to.be.false;
    });
  });

  describe("minSpecialChars", () => {
    it("should validate when password has minimum special characters", () => {
      const password = "{teste123!";
      const ruleValue = 2;
      expect(minSpecialChars({ password, ruleValue })).to.be.true;
    });

    it("shouldn't validate when password hasn't minimum digits", () => {
      const password = "!t(eSTe1{23";
      const ruleValue = 4;
      expect(minSpecialChars({ password, ruleValue })).to.be.false;
    });
  });

  describe("noRepeat", () => {
    it("should validate when password hasn't sequencial characters", () => {
      const password = "teste123";
      const ruleValue = 0;
      expect(noRepeated({ password, ruleValue })).to.be.true;
    });

    it("shouldn't validate when password has sequencial characters", () => {
      const password = "testee123";
      const ruleValue = 0;
      expect(noRepeated({ password, ruleValue })).to.be.false;
    });
  });
});
