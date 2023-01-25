const verifyTypeDefs = `
  type Query {
    verify(
      password: String
      rules: [Rule]!
    ) : VerifyOutput
  }

  input Rule {
    rule: String!
    value: Int!
  }
  
  type VerifyOutput{
    verify: Boolean
    noMatch: [String]
  }`;

module.exports = { verifyTypeDefs };
