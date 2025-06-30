import { useState, useEffect } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useRegexTester } from "./useRegexTester";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const { matches, isValid, flags, updateFlags, testRegex } = useRegexTester();

  // const handleTest = () => {
  //   testRegex(pattern, testString, flags);
  // };

  // Auto-test when inputs change
  useEffect(() => {
    if (pattern && testString) {
      testRegex(pattern, testString, flags);
    }
  }, [pattern, testString, flags, testRegex]);

  return (
    <ToolCard
      title="Regex Tester"
      description="Test regular expressions with real-time matching and flag support"
    >
      <div className="space-y-6">
        <div>
          <SectionHeader title="Regular Expression" />
          <Input
            placeholder="Enter your regex pattern..."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="font-mono"
          />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="global"
                checked={flags.global}
                onCheckedChange={(checked) => updateFlags("global", !!checked)}
              />
              <label htmlFor="global" className="text-sm">
                Global (g)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreCase"
                checked={flags.ignoreCase}
                onCheckedChange={(checked) =>
                  updateFlags("ignoreCase", !!checked)
                }
              />
              <label htmlFor="ignoreCase" className="text-sm">
                Ignore Case (i)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiline"
                checked={flags.multiline}
                onCheckedChange={(checked) =>
                  updateFlags("multiline", !!checked)
                }
              />
              <label htmlFor="multiline" className="text-sm">
                Multiline (m)
              </label>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Test String" />
          <Textarea
            placeholder="Enter text to test against..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <div>
          <SectionHeader title="Matches">
            <Badge variant={isValid ? "default" : "destructive"}>
              {matches.length} {matches.length === 1 ? "match" : "matches"}
            </Badge>
          </SectionHeader>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {matches.length === 0 ? (
              <p className="text-muted-foreground text-sm">No matches found</p>
            ) : (
              matches.map((match, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Match {index + 1}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Index: {match.index}
                    </span>
                  </div>
                  <code className="text-sm bg-background p-2 rounded block">
                    {match.match}
                  </code>
                  {match.groups && match.groups.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">
                        Groups:
                      </p>
                      {match.groups.map((group, groupIndex) => (
                        <Badge
                          key={groupIndex}
                          variant="secondary"
                          className="mr-1"
                        >
                          {group}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
