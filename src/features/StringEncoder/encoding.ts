import bs58 from "bs58"; 

// Base64
export const encodeBase64 = (input:string) => btoa(input);
export const decodeBase64 = (input:string) => {
  try {
    return atob(input);
  } catch {
    return "Invalid Base64";
  }
};

// Base58
export const encodeBase58 = (input:string) => bs58.encode(Buffer.from(input));
export const decodeBase58 = (input:string) => {
  try {
    return Buffer.from(bs58.decode(input)).toString();
  } catch {
    return "Invalid Base58";
  }
};
