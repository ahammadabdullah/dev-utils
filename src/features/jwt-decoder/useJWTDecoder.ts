export interface JWTHeader {
  alg?: string;
  typ?: string;
  kid?: string;
  [key: string]: any;
}

export interface JWTPayload {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp?: number; // Expiration Time
  nbf?: number; // Not Before
  iat?: number; // Issued At
  jti?: string; // JWT ID
  [key: string]: any;
}

export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  isValid: boolean;
  isExpired: boolean;
  expiresIn?: string;
  issuedAt?: string;
  notBefore?: string;
}

export function useJWTDecoder() {
  // Base64URL decode function
  const base64URLDecode = (str: string): string => {
    // Add padding if needed
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    try {
      return atob(base64);
    } catch (error) {
      throw new Error('Invalid Base64URL encoding');
    }
  };

  // Format timestamp to human readable format
  const formatTimestamp = (timestamp: number): string => {
    try {
      return new Date(timestamp * 1000).toLocaleString();
    } catch {
      return 'Invalid timestamp';
    }
  };

  // Calculate time until expiration
  const getTimeUntilExpiration = (exp: number): string => {
    const now = Math.floor(Date.now() / 1000);
    const diff = exp - now;

    if (diff <= 0) {
      const expiredAgo = Math.abs(diff);
      if (expiredAgo < 60) return `Expired ${expiredAgo} seconds ago`;
      if (expiredAgo < 3600) return `Expired ${Math.floor(expiredAgo / 60)} minutes ago`;
      if (expiredAgo < 86400) return `Expired ${Math.floor(expiredAgo / 3600)} hours ago`;
      return `Expired ${Math.floor(expiredAgo / 86400)} days ago`;
    }

    if (diff < 60) return `Expires in ${diff} seconds`;
    if (diff < 3600) return `Expires in ${Math.floor(diff / 60)} minutes`;
    if (diff < 86400) return `Expires in ${Math.floor(diff / 3600)} hours`;
    return `Expires in ${Math.floor(diff / 86400)} days`;
  };

  // Check if token is expired
  const isTokenExpired = (exp?: number): boolean => {
    if (!exp) return false;
    return exp < Math.floor(Date.now() / 1000);
  };

  // Validate JWT structure
  const validateJWTStructure = (token: string): boolean => {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check if each part is valid Base64URL
    try {
      parts.forEach(part => {
        if (!part) throw new Error('Empty part');
        base64URLDecode(part);
      });
      return true;
    } catch {
      return false;
    }
  };

  // Decode JWT token
  const decodeJWT = (token: string): DecodedJWT => {
    if (!token.trim()) {
      throw new Error('Token is empty');
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
    }

    const [headerPart, payloadPart, signaturePart] = parts;

    try {
      // Decode header
      const headerJson = base64URLDecode(headerPart);
      const header: JWTHeader = JSON.parse(headerJson);

      // Decode payload
      const payloadJson = base64URLDecode(payloadPart);
      const payload: JWTPayload = JSON.parse(payloadJson);

      // Signature (keep as is, can't decode without key)
      const signature = signaturePart;

      // Validate structure
      const isValid = validateJWTStructure(token);

      // Check expiration
      const isExpired = isTokenExpired(payload.exp);

      // Format timestamps
      const expiresIn = payload.exp ? getTimeUntilExpiration(payload.exp) : undefined;
      const issuedAt = payload.iat ? formatTimestamp(payload.iat) : undefined;
      const notBefore = payload.nbf ? formatTimestamp(payload.nbf) : undefined;

      return {
        header,
        payload,
        signature,
        isValid,
        isExpired,
        expiresIn,
        issuedAt,
        notBefore
      };
    } catch (error) {
      throw new Error(`Failed to decode JWT: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Generate sample JWT for testing
  const generateSampleJWT = (): string => {
    // Create sample header and payload
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: "1234567890",
      name: "John Doe",
      iat: now - 3600, // 1 hour ago
      exp: now + 86400, // 24 hours from now
      aud: "dev-utils-app",
      iss: "dev-utils-service",
      role: "developer",
      email: "john.doe@example.com"
    };

    // Encode to Base64URL
    const encodeBase64URL = (obj: any): string => {
      const json = JSON.stringify(obj);
      const base64 = btoa(json);
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    const encodedHeader = encodeBase64URL(header);
    const encodedPayload = encodeBase64URL(payload);
    const fakeSignature = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
  };

  return {
    decodeJWT,
    validateJWTStructure,
    generateSampleJWT,
    formatTimestamp,
    getTimeUntilExpiration,
    isTokenExpired
  };
}