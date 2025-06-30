import { useState, useEffect } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithCopy } from "@/components/ui/input-with-copy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { useTimestampConverter } from "./useTimestampConverter";

export function TimestampConverter() {
  const { convertTimestamp, convertDate, getCurrentTimestamp } =
    useTimestampConverter();
  const [timestamp, setTimestamp] = useState("");
  const [humanDate, setHumanDate] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [convertedTimestamp, setConvertedTimestamp] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState("");

  const handleTimestampToDate = () => {
    const result = convertTimestamp(timestamp);
    setConvertedDate(result);
  };

  const handleDateToTimestamp = () => {
    const result = convertDate(humanDate);
    setConvertedTimestamp(result);
  };

  const handleGetCurrent = () => {
    const current = getCurrentTimestamp();
    setCurrentTimestamp(current.timestamp);
    setTimestamp(current.timestamp);
    setConvertedDate(current.formatted);
  };

  // Initialize with current timestamp
  useEffect(() => {
    handleGetCurrent();
  }, []);

  return (
    <ToolCard
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates"
    >
      <div className="space-y-6">
        <div>
          <SectionHeader title="Current Timestamp">
            <Button onClick={handleGetCurrent} size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </SectionHeader>
          <InputWithCopy
            value={currentTimestamp}
            readOnly
            placeholder="Current timestamp..."
          />
        </div>

        <Tabs defaultValue="timestamp-to-date" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timestamp-to-date">
              Timestamp → Date
            </TabsTrigger>
            <TabsTrigger value="date-to-timestamp">
              Date → Timestamp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timestamp-to-date" className="space-y-4">
            <div>
              <SectionHeader title="Unix Timestamp">
                <Button
                  onClick={handleTimestampToDate}
                  size="sm"
                  disabled={!timestamp}
                >
                  Convert
                </Button>
              </SectionHeader>
              <Input
                placeholder="Enter Unix timestamp (seconds or milliseconds)..."
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <SectionHeader title="Human-Readable Date" />
              <InputWithCopy
                value={convertedDate}
                readOnly
                placeholder="Converted date will appear here..."
              />
            </div>
          </TabsContent>

          <TabsContent value="date-to-timestamp" className="space-y-4">
            <div>
              <SectionHeader title="Date Input">
                <Button
                  onClick={handleDateToTimestamp}
                  size="sm"
                  disabled={!humanDate}
                >
                  Convert
                </Button>
              </SectionHeader>
              <Input
                placeholder="Enter date (YYYY-MM-DD HH:mm:ss or ISO format)..."
                value={humanDate}
                onChange={(e) => setHumanDate(e.target.value)}
              />
            </div>

            <div>
              <SectionHeader title="Unix Timestamp" />
              <InputWithCopy
                value={convertedTimestamp}
                readOnly
                placeholder="Converted timestamp will appear here..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Supported Formats</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Unix timestamp (seconds): 1640995200</li>
            <li>• Unix timestamp (milliseconds): 1640995200000</li>
            <li>• ISO 8601: 2021-12-31T12:00:00Z</li>
            <li>• Date string: 2021-12-31 12:00:00</li>
          </ul>
        </div>
      </div>
    </ToolCard>
  );
}
