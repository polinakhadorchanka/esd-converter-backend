export type Signature = {
  Subject: string;
  Person: string;
  Date: Date;
  Result: string;
  Value: string;
};

export type SignatureXML = {
  Attributes: {
    Comment: string;
    SignedByUserName: string;
    InTheNameOfUserName: string;
  };
  Data: string;
};
