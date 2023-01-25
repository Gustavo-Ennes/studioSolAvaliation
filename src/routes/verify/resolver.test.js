const { expect } = require("chai");
const { verifyResolver } = require("./resolver");

// default values to tests
const rules = {
  minSize: { rule: "minSize", value: 8 },
  minUppercase: { rule: "minUppercase", value: 2 },
  minLowercase: { rule: "minLowercase", value: 4 },
  minDigit: { rule: "minDigit", value: 3 },
  minSpecialChars: { rule: "minSpecialChars", value: 2 },
  noRepeated: { rule: "noRepeated", value: 0 },
};

describe("Verify tests", () => {
  describe("validate with many valid rules", () => {
    it("should verify if password has at least 'minSize' rule value in length", () => {
      const { minSize } = rules;
      const args = {
        password: "test1234",
        rules: [minSize],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.be.empty;
      expect(response.verify).to.be.true;
    });

    it("should verify if password has at least 'minUppercase' rule value in length", () => {
      const { minSize, minUppercase } = rules;
      const args = {
        password: "TEst1234",
        rules: [minSize, minUppercase],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.be.empty;
      expect(response.verify).to.be.true;
    });

    it("should verify if password has at least 'minLowercase' rule value in length", () => {
      const { minSize, minUppercase, minLowercase } = rules;
      const args = {
        password: "TEsteabc1234",
        rules: [minSize, minUppercase, minLowercase],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.be.empty;
      expect(response.verify).to.be.true;
    });

    it("should verify if password has at least 'minDigit' rule value in length", () => {
      const { minSize, minUppercase, minLowercase, minDigit } = rules;
      const args = {
        password: "TEsteabc1234",
        rules: [minSize, minUppercase, minLowercase, minDigit],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.be.empty;
      expect(response.verify).to.be.true;
    });

    it("should verify if password has at least 'minSpecialChars' rule value in length", () => {
      const { minSize, minUppercase, minLowercase, minDigit, minSpecialChars } =
        rules;
      const args = {
        password: "!#TEsteabc1234",
        rules: [minSize, minUppercase, minLowercase, minDigit, minSpecialChars],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.be.empty;
      expect(response.verify).to.be.true;
    });

    it("should verify if password don't repeat chars with 'noRepeated' rule", () => {
      const {
        minSize,
        minUppercase,
        minLowercase,
        minDigit,
        minSpecialChars,
        noRepeated,
      } = rules;
      const args = {
        password: "!#TEsteabc1234",
        rules: [
          minSize,
          minUppercase,
          minLowercase,
          minDigit,
          minSpecialChars,
          noRepeated,
        ],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.be.empty;
      expect(response.verify).to.be.true;
    });
  });

  describe("validate with many invalid rules", () => {
    it("shouldn't verify if password has less than 'minSize' rule value in length", () => {
      const { minSize } = rules;
      const args = {
        password: "test123",
        rules: [minSize],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch[0]).to.equals("minSize");
      expect(response.verify).to.be.false;
    });

    it("shouldn't verify if password has less than 'minUppercase' rule value in length", () => {
      const { minSize, minUppercase } = rules;
      const args = {
        password: "test123",
        rules: [minSize, minUppercase],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contain("minSize", "minUppercase");
      expect(response.verify).to.be.false;
    });

    it("shouldn't verify if password has less than 'minLowercase' rule value in length", () => {
      const { minSize, minUppercase, minLowercase } = rules;
      const args = {
        password: "tes123",
        rules: [minSize, minUppercase, minLowercase],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contain(
        "minSize",
        "minUppercase",
        "minLowercase"
      );
      expect(response.verify).to.be.false;
    });

    it("shouldn't verify if password has less than 'minDigit' rule value in length", () => {
      const { minSize, minUppercase, minLowercase, minDigit } = rules;
      const args = {
        password: "tes12",
        rules: [minSize, minUppercase, minLowercase, minDigit],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contain(
        "minSize",
        "minUppercase",
        "minLowercase",
        "minDigit"
      );
      expect(response.verify).to.be.false;
    });

    it("shouldn't verify if password has less than 'minSpecialChar' rule value in length", () => {
      const { minSize, minUppercase, minLowercase, minDigit, minSpecialChar } =
        rules;
      const args = {
        password: "$tes12",
        rules: [minSize, minUppercase, minLowercase, minDigit, minSpecialChar],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contain(
        "minSize",
        "minUppercase",
        "minLowercase",
        "minDigit",
        "minSpecialChar"
      );
      expect(response.verify).to.be.false;
    });

    it("shouldn't verify if password repeat chars with 'noRepeated' rule", () => {
      const {
        minSize,
        minUppercase,
        minLowercase,
        minDigit,
        minSpecialChar,
        noRepeat,
      } = rules;
      const args = {
        password: "$tts12",
        rules: [
          minSize,
          minUppercase,
          minLowercase,
          minDigit,
          minSpecialChar,
          noRepeat,
        ],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contain(
        "minSize",
        "minUppercase",
        "minLowercase",
        "minDigit",
        "minSpecialChar",
        "noRepeat"
      );
      expect(response.verify).to.be.false;
    });
  });

  describe("validate with many valid and invalid rules", () => {
    it("should fail minSize validation only", () => {
      const { minSize, minUppercase } = rules;
      const args = {
        password: "TEst123",
        rules: [minSize, minUppercase],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contains("minSize");
      expect(response.verify).to.be.false;
    });

    it("should fail minUppercase validation only", () => {
      const { minSize, minUppercase, minLowercase } = rules;
      const args = {
        password: "Testeab1234",
        rules: [minSize, minUppercase, minLowercase],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contains("minUppercase");
      expect(response.verify).to.be.false;
    });

    it("should fail minSize and minLowercase", () => {
      const { minSize, minUppercase, minLowercase, minDigit } = rules;
      const args = {
        password: "TE1234",
        rules: [minSize, minUppercase, minLowercase, minDigit],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contains("minSize", "minLowercase");
      expect(response.verify).to.be.false;
    });

    it("should fail minDigit validation only", () => {
      const { minSize, minUppercase, minLowercase, minDigit, minSpecialChars } =
        rules;
      const args = {
        password: "!#TEsteabc14",
        rules: [minSize, minUppercase, minLowercase, minDigit, minSpecialChars],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contains("minDigit");
      expect(response.verify).to.be.false;
    });

    it("should fail noRepeated, minSpecialChars and minUppercase", () => {
      const {
        minSize,
        minUppercase,
        minLowercase,
        minDigit,
        minSpecialChars,
        noRepeated,
      } = rules;
      const args = {
        password: "!Tsteeabc1234",
        rules: [
          minSize,
          minUppercase,
          minLowercase,
          minDigit,
          minSpecialChars,
          noRepeated,
        ],
      };
      const response = verifyResolver(args, {}, {});
      expect(response.noMatch).to.contains(
        "noRepeated",
        "minSpecialChars",
        "minUppercase"
      );
      expect(response.verify).to.be.false;
    });
  });
});
