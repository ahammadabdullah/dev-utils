export function useUuidGenerator() {
  const generateUuid = (): string => {
    // Simple UUID v4 generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateMultiple = (count: number): string[] => {
    return Array.from({ length: count }, () => generateUuid());
  };

  return {
    generateUuid,
    generateMultiple
  };
}