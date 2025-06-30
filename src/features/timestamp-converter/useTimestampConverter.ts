import { format } from 'date-fns';

export function useTimestampConverter() {
  const convertTimestamp = (timestamp: string): string => {
    if (!timestamp || isNaN(Number(timestamp))) {
      return 'Invalid timestamp';
    }

    try {
      let ts = Number(timestamp);
      
      // If timestamp is in seconds (10 digits), convert to milliseconds
      if (ts.toString().length === 10) {
        ts = ts * 1000;
      }

      const date = new Date(ts);
      
      if (isNaN(date.getTime())) {
        return 'Invalid timestamp';
      }

      return format(date, 'yyyy-MM-dd HH:mm:ss') + ' UTC';
    } catch (error) {
      return 'Invalid timestamp';
    }
  };

  const convertDate = (dateString: string): string => {
    if (!dateString) {
      return 'Invalid date';
    }

    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return Math.floor(date.getTime() / 1000).toString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000).toString();
    const formatted = format(now, 'yyyy-MM-dd HH:mm:ss') + ' UTC';
    
    return { timestamp, formatted };
  };

  return {
    convertTimestamp,
    convertDate,
    getCurrentTimestamp
  };
}