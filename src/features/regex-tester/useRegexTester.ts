import { useState } from 'react';

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

interface RegexFlags {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
}

export function useRegexTester() {
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [flags, setFlags] = useState<RegexFlags>({
    global: true,
    ignoreCase: false,
    multiline: false
  });

  const updateFlags = (flag: keyof RegexFlags, value: boolean) => {
    setFlags(prev => ({ ...prev, [flag]: value }));
  };

  const testRegex = (pattern: string, testString: string, currentFlags: RegexFlags) => {
    if (!pattern || !testString) {
      setMatches([]);
      setIsValid(true);
      return;
    }

    try {
      let flagString = '';
      if (currentFlags.global) flagString += 'g';
      if (currentFlags.ignoreCase) flagString += 'i';
      if (currentFlags.multiline) flagString += 'm';

      const regex = new RegExp(pattern, flagString);
      const foundMatches: RegexMatch[] = [];

      if (currentFlags.global) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          
          // Prevent infinite loop
          if (match[0].length === 0) {
            break;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(foundMatches);
      setIsValid(true);
    } catch (error) {
      setMatches([]);
      setIsValid(false);
    }
  };

  return {
    matches,
    isValid,
    flags,
    updateFlags,
    testRegex
  };
}