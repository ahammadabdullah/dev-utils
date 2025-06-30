export type ToolType = 
  | 'json-formatter' 
  | 'regex-tester' 
  | 'uuid-generator' 
  | 'timestamp-converter' 
  | 'color-picker'
  | 'svg-to-jsx'
  | 'html-to-jsx';

export interface Tool {
  id: ToolType;
  name: string;
  description: string;
  icon: string;
}

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    icon: 'FileJson'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions',
    icon: 'Search'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUID v4',
    icon: 'Hash'
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert timestamps to dates',
    icon: 'Clock'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick and convert colors',
    icon: 'Palette'
  },
  {
    id: 'svg-to-jsx',
    name: 'SVG to JSX',
    description: 'Convert SVG to React JSX',
    icon: 'Code'
  },
  {
    id: 'html-to-jsx',
    name: 'HTML to JSX',
    description: 'Convert HTML to React JSX',
    icon: 'FileCode'
  }
];