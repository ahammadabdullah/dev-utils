import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "@/layout/MainLayout";
import { JsonFormatter } from "@/features/json-formatter/JsonFormatter";
import { RegexTester } from "@/features/regex-tester/RegexTester";
import { UuidGenerator } from "@/features/uuid-generator/UuidGenerator";
import { TimestampConverter } from "@/features/timestamp-converter/TimestampConverter";
import { ColorPicker } from "@/features/color-picker/ColorPicker";
import { SvgToJsx } from "@/features/svg-to-jsx/SvgToJsx";
import { HtmlToJsx } from "@/features/html-to-jsx/HtmlToJsx";
import { ToolType } from "@/lib/types";
import { StringEncoder } from "./features/StringEncoder/StringEncoder";
import { JWTDecoder } from "./features/jwt-decoder/JWTDecoder";
import WindowBar from "./components/windows/window-bar";

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>("json-formatter");

  const renderTool = () => {
    switch (activeTool) {
      case "json-formatter":
        return <JsonFormatter />;
      case "regex-tester":
        return <RegexTester />;
      case "uuid-generator":
        return <UuidGenerator />;
      case "timestamp-converter":
        return <TimestampConverter />;
      case "color-picker":
        return <ColorPicker />;
      case "svg-to-jsx":
        return <SvgToJsx />;
      case "html-to-jsx":
        return <HtmlToJsx />;
      case 'string-encoder':
        return <StringEncoder/>;
      case 'jwt-decoder':
        return <JWTDecoder/>;
      default:
        return <JsonFormatter />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WindowBar />
      <MainLayout activeTool={activeTool} onToolChange={setActiveTool}>
        {renderTool()}
      </MainLayout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
