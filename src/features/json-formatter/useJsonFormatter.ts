import { useState } from 'react';

export function useJsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const formatJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setInput(jsonString);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
      setIsValid(false);
    }
  };

  const minifyJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setInput(jsonString);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
      setIsValid(false);
    }
  };

  return {
    input,
    output,
    error,
    isValid,
    formatJson,
    minifyJson
  };
}