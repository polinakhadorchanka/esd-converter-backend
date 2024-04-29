export type DocToESDReqFiles = { mainDocument: Express.Multer.File[]; signatures: Express.Multer.File[] };
export type ESDToDocsReqFiles = { esd: Express.Multer.File[] };
export type VerifyFiles = { mainDocument: Express.Multer.File[]; signatures?: Express.Multer.File[] };
