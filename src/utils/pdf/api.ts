import * as pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { fonts } from "./fonts";

export const makePDF = (docDef: TDocumentDefinitions) => {
  return pdfMake.createPdf(docDef, undefined, fonts);
};
