const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');
import { Signature, SignatureXML } from '../types/signature.types';
const { arraybufferToString } = require('./decoder.utils');
const { readFile, writeTempFile } = require('./file-processing.utils');

function getCDataContent(strBase64: string) {
  try {
    return `<![CDATA[${strBase64}]]>`;
  } catch (e) {
    throw e;
  }
}

function getDigitalSignatureContent(signature: Signature) {
  try {
    const signData = getCDataContent(signature.Value);

    return (
      `<DigitalSignature Signed="${signature.Date.toISOString()}" CertificateIssuedTo="" CryptoProvider="{DAB1AA08-70CD-4145-8715-350A1D24108C}" Version="4.4.1.116" SignatureType="Authenticating">` +
      `<Attributes>` +
      `<Comment Name="Comment" Type="String" IsNull="false" Value="${signature.Person}"/>` +
      `<SignedByUserName Name="SignedByUserName" Type="String" IsNull="false" Value="${signature.Person}"/>` +
      `<InTheNameOfUserName Name="InTheNameOfUserName" Type="String" IsNull="false" Value="${signature.Person}"/>` +
      `</Attributes>` +
      `<Data>` +
      `${signData}` +
      `</Data>` +
      `</DigitalSignature>`
    );
  } catch (e) {
    throw e;
  }
}

function getESDContent(docBase64: string, signatures: Signature[]) {
  try {
    const docData = getCDataContent(docBase64);
    const signContent = signatures.map((signature) => getDigitalSignatureContent(signature));

    return (
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<StructuredElectronicObject Version="2.0" MetadataID="" MetadataVersion="">` +
      `<Header Type="Document" Name="Акт выполненных работ" Extension="PDF" Modified="" Organization="" Number="" Date=""/>` +
      `<ExtAttributes>` +
      `<ID Name="ID" Type="Integer" IsNull="false" Value=""/>` +
      `<VersionNumber Name="VersionNumber" Type="Integer" IsNull="false" Value="1"/>` +
      `</ExtAttributes>` +
      `<AccessRights/>` +
      `<Links/>` +
      `<Contents>` +
      `${docData}` +
      `</Contents>` +
      `<MetadataScheme><![CDATA[]]></MetadataScheme>` +
      `<DigitalSignatures>` +
      `${signContent.join('')}` +
      `</DigitalSignatures>` +
      `</StructuredElectronicObject>`
    );
  } catch (e) {
    throw e;
  }
}

function getContentFileFromESD(esd: Express.Multer.File) {
  try {
    const esdData = arraybufferToString(readFile(esd.path));

    let content = esdData.substring(esdData.indexOf('<Contents>') + 10, esdData.lastIndexOf('</Contents>'));
    content = content.substring(content.indexOf('<![CDATA[') + 9, content.lastIndexOf(']]>'));

    const filePath = writeTempFile(content, { encoding: 'base64' });

    return filePath;
  } catch (e) {
    throw e;
  }
}

function getSignatureFilesFromESD(esd: Express.Multer.File) {
  try {
    const esdData = arraybufferToString(readFile(esd.path));

    let content = esdData.substring(
      esdData.indexOf('<DigitalSignatures>') + 19,
      esdData.lastIndexOf('</DigitalSignatures>')
    );

    const parser = new XMLParser();
    let signatures: SignatureXML[] | SignatureXML = parser.parse(content)?.DigitalSignature;

    if (!Array.isArray(signatures)) signatures = [signatures];

    return signatures?.map((signature) => {
      return writeTempFile(signature.Data, { encoding: 'base64' });
    });
  } catch (e) {
    throw e;
  }
}

module.exports = { getESDContent, getContentFileFromESD, getSignatureFilesFromESD };
