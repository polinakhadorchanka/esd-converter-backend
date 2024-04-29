function arraybufferToString(buffer: ArrayBuffer) {
  try {
    const decoder = new TextDecoder('cp1251');
    return decoder.decode(new Uint8Array(buffer));
  } catch (e) {
    throw e;
  }
}

function arraybufferToBase64(buffer: ArrayBuffer) {
  try {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  } catch (e) {
    throw e;
  }
}

function getTypeFromArrayBuffer(arrayBuffer: ArrayBuffer) {
  try {
    const uint8arr = new Uint8Array(arrayBuffer);

    const len = 4;

    if (uint8arr.length >= len) {
      let signatureArr = new Array(len);
      for (let i = 0; i < len; i++) signatureArr[i] = new Uint8Array(arrayBuffer)[i].toString(16);
      const signature: string = signatureArr.join('').toUpperCase();

      switch (signature) {
        case '89504E47':
          return '.png';
        case '504B34':
          return '.docx';
        case '47494638':
          return '.gif';
        case '25504446':
          return '.pdf';
        case 'FFD8FFDB':
        case 'FFD8FFE0':
          return '.jpeg';
        case '504B0304':
          return '.zip';
        default:
          if (/30828*/.test(signature)) return '.p7s';
          else return null;
      }
    } else return null;
  } catch (e) {
    throw e;
  }
}

export {};
module.exports = { arraybufferToString, arraybufferToBase64, getTypeFromArrayBuffer };
