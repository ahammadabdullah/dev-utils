import { useState, useEffect } from 'react';
import { ToolCard } from '@/components/ui/tool-card';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Shield, Clock, User, AlertTriangle, CheckCircle, XCircle, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { useJWTDecoder, type DecodedJWT } from './useJWTDecoder';

export function JWTDecoder() {
  const { decodeJWT, generateSampleJWT } = useJWTDecoder();
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState('');
  const [isRealTime, setIsRealTime] = useState(true);

  const handleDecode = () => {
    if (!token.trim()) {
      setDecodedToken(null);
      setError('');
      return;
    }

    try {
      setError('');
      const decoded = decodeJWT(token);
      setDecodedToken(decoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDecodedToken(null);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleLoadSample = () => {
    const sampleToken = generateSampleJWT();
    setToken(sampleToken);
  };

  const handleClear = () => {
    setToken('');
    setDecodedToken(null);
    setError('');
  };

  // Real-time decoding
  useEffect(() => {
    if (isRealTime) {
      const debounceTimer = setTimeout(() => {
        handleDecode();
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [token, isRealTime]);

  const getTokenStatus = (): { icon: any; variant: 'default' | 'secondary' | 'destructive' | 'outline'; text: string } | null => {
    if (!decodedToken) return null;
    
    if (!decodedToken.isValid) {
      return { icon: XCircle, variant: 'destructive' as const, text: 'Invalid Token' };
    }
    
    if (decodedToken.isExpired) {
      return { icon: AlertTriangle, variant: 'destructive' as const, text: 'Expired Token' };
    }
    
    // Check if expiring soon (within 1 hour)
    const exp = decodedToken.payload.exp;
    if (exp) {
      const now = Math.floor(Date.now() / 1000);
      const timeUntilExp = exp - now;
      if (timeUntilExp < 3600 && timeUntilExp > 0) {
        return { icon: AlertTriangle, variant: 'secondary' as const, text: 'Expiring Soon' };
      }
    }
    
    return { icon: CheckCircle, variant: 'default' as const, text: 'Valid Token' };
  };

  const tokenStatus = getTokenStatus();

  const formatJSON = (obj: any): string => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <ToolCard 
      title="JWT Token Decoder" 
      description="Decode and inspect JWT tokens with detailed claims analysis and validation"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <SectionHeader title="JWT Token Input">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                Sample Token
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRealTime(!isRealTime)}
              >
                {isRealTime ? 'Real-time: ON' : 'Real-time: OFF'}
              </Button>
              {!isRealTime && (
                <Button size="sm" onClick={handleDecode} disabled={!token.trim()}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Decode
                </Button>
              )}
            </div>
          </SectionHeader>
          <div className="relative">
            <Textarea
              placeholder="Paste your JWT token here (format: header.payload.signature)..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
            {tokenStatus && (
              <div className="absolute top-2 right-2">
                <Badge className={`flex items-center gap-1 ${
                  tokenStatus.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' :
                  tokenStatus.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                  'bg-primary text-primary-foreground'
                }`}>
                  <tokenStatus.icon className="h-3 w-3" />
                  {tokenStatus.text}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="h-4 w-4" />
              <span className="font-medium">Decoding Error</span>
            </div>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        )}

        {/* Decoded Token Display */}
        {decodedToken && (
          <div className="space-y-4">
            {/* Token Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {decodedToken.expiresIn && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Expiration</div>
                    <div className="text-xs text-muted-foreground">{decodedToken.expiresIn}</div>
                  </div>
                </div>
              )}
              {decodedToken.issuedAt && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Issued At</div>
                    <div className="text-xs text-muted-foreground">{decodedToken.issuedAt}</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Algorithm</div>
                  <div className="text-xs text-muted-foreground">{decodedToken.header.alg || 'Unknown'}</div>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="payload" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="payload">Payload</TabsTrigger>
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="payload" className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Token Payload</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(formatJSON(decodedToken.payload), 'Payload')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-auto max-h-[400px]">
                  {formatJSON(decodedToken.payload)}
                </pre>
              </TabsContent>

              <TabsContent value="header" className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Token Header</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(formatJSON(decodedToken.header), 'Header')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-auto">
                  {formatJSON(decodedToken.header)}
                </pre>
              </TabsContent>

              <TabsContent value="claims" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Standard Claims */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Standard Claims</h4>
                    <div className="space-y-2">
                      {decodedToken.payload.iss && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Issuer (iss):</span>
                          <span className="font-mono">{decodedToken.payload.iss}</span>
                        </div>
                      )}
                      {decodedToken.payload.sub && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subject (sub):</span>
                          <span className="font-mono">{decodedToken.payload.sub}</span>
                        </div>
                      )}
                      {decodedToken.payload.aud && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Audience (aud):</span>
                          <span className="font-mono">
                            {Array.isArray(decodedToken.payload.aud) 
                              ? decodedToken.payload.aud.join(', ')
                              : decodedToken.payload.aud
                            }
                          </span>
                        </div>
                      )}
                      {decodedToken.payload.jti && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">JWT ID (jti):</span>
                          <span className="font-mono">{decodedToken.payload.jti}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Custom Claims */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Custom Claims</h4>
                    <div className="space-y-2">
                      {Object.entries(decodedToken.payload)
                        .filter(([key]) => !['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-mono">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))
                      }
                      {Object.entries(decodedToken.payload)
                        .filter(([key]) => !['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'].includes(key))
                        .length === 0 && (
                        <p className="text-sm text-muted-foreground italic">No custom claims found</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Security Notes */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Security Note</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                This tool only decodes the token structure. Signature verification requires the secret key 
                or public key, which should never be exposed in client-side applications. Always validate 
                tokens on your backend server.
              </p>
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">About JWT Tokens</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims between two parties.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <strong>Structure:</strong>
                <ul className="mt-1 space-y-1 ml-4">
                  <li>• <code>header.payload.signature</code></li>
                  <li>• Base64URL encoded parts</li>
                  <li>• Cryptographically signed</li>
                </ul>
              </div>
              <div>
                <strong>Common Claims:</strong>
                <ul className="mt-1 space-y-1 ml-4">
                  <li>• <code>iss</code> - Issuer</li>
                  <li>• <code>sub</code> - Subject</li>
                  <li>• <code>aud</code> - Audience</li>
                  <li>• <code>exp</code> - Expiration Time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>
  );
}