export function useHtmlToJsx() {
  const convertHtmlToJsx = (htmlString: string): string => {
    if (!htmlString.trim()) {
      return "";
    }

    try {
      let jsx = htmlString;

      // Convert class to className
      jsx = jsx.replace(/\bclass=/g, "className=");

      // Convert for to htmlFor
      jsx = jsx.replace(/\bfor=/g, "htmlFor=");

      // Convert inline styles from string to object format
      jsx = jsx.replace(/style="([^"]*)"/g, (_match, styleString) => {
        const styleObject = styleString
          .split(";")
          .filter((style: any) => style.trim())
          .map((style: any) => {
            const [property, value] = style
              .split(":")
              .map((s: any) => s.trim());
            if (!property || !value) return "";

            // Convert kebab-case to camelCase
            const camelCaseProperty = property.replace(/-([a-z])/g, (g: any) =>
              g[1].toUpperCase()
            );

            // Handle numeric values
            const processedValue = isNaN(Number(value)) ? `"${value}"` : value;

            return `${camelCaseProperty}: ${processedValue}`;
          })
          .filter((style: any) => style)
          .join(", ");

        return styleObject ? `style={{${styleObject}}}` : "";
      });

      // Handle self-closing tags
      const selfClosingTags = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ];

      selfClosingTags.forEach((tag) => {
        // Convert self-closing tags to JSX format
        const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, "gi");
        jsx = jsx.replace(regex, `<${tag}$1 />`);
      });

      // Convert HTML comments to JSX comments
      jsx = jsx.replace(/<!--(.*?)-->/g, "{/* $1 */}");

      // Handle boolean attributes
      const booleanAttributes = [
        "checked",
        "selected",
        "disabled",
        "readonly",
        "multiple",
        "autofocus",
        "autoplay",
        "controls",
        "defer",
        "hidden",
        "loop",
        "open",
        "required",
        "reversed",
      ];

      booleanAttributes.forEach((attr) => {
        // Convert boolean attributes to JSX format
        const regex = new RegExp(`\\b${attr}(?!=)`, "gi");
        jsx = jsx.replace(regex, `${attr}={true}`);
      });

      // Format as a React component
      const componentName = "HtmlComponent";
      const formattedJsx = `import React from 'react';

const ${componentName} = () => {
  return (
${jsx
  .split("\n")
  .map((line) => "    " + line)
  .join("\n")}
  );
};

export default ${componentName};`;

      return formattedJsx;
    } catch (error) {
      return "Error converting HTML to JSX. Please check your HTML syntax.";
    }
  };

  return {
    convertHtmlToJsx,
  };
}
