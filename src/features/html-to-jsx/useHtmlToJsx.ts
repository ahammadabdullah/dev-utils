import * as prettier from "prettier/standalone";
import * as babelParser from "prettier/parser-babel";
import estree from "prettier/plugins/estree";

export function useHtmlToJsx() {
  const validateHtml = (htmlString: string): boolean => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const parseErrors = doc.querySelectorAll("parsererror");
      return parseErrors.length === 0;
    } catch {
      return false;
    }
  };

  type GeneratedFile = {
    name: string;
    type: "css" | "js" | "meta";
    content: string;
  };

  const convertHtmlToJsx = async (
    htmlString: string
  ): Promise<{ jsx: string; files: GeneratedFile[] }> => {
    if (!htmlString.trim()) {
      return { jsx: "", files: [] };
    }

    if (!validateHtml(htmlString)) {
      return {
        jsx: "Error: Invalid HTML syntax. Please fix before converting.",
        files: [],
      };
    }

    try {
      let jsx = htmlString;
      const imports: string[] = [];
      const files: GeneratedFile[] = [];
      let styleCounter = 0;
      let scriptCounter = 0;
      const metaContents: string[] = [];

      // Remove <!DOCTYPE>, <html>, <head>, <body>, <title>
      jsx = jsx.replace(/<!DOCTYPE[^>]*>/i, "");
      jsx = jsx.replace(/<\/?(html|head|body|title)[^>]*>/gi, "");

      // Extract <meta> tags (collect all into one)
      jsx = jsx.replace(/<meta[^>]*>/gi, (match) => {
        metaContents.push(match);
        return "";
      });

      if (metaContents.length > 0) {
        files.push({
          name: "generated-meta.txt",
          type: "meta",
          content: metaContents.join("\n"),
        });
      }

      // Convert class → className
      jsx = jsx.replace(/\bclass=/g, "className=");

      // Convert for → htmlFor
      jsx = jsx.replace(/\bfor=/g, "htmlFor=");

      // Inline style attributes
      jsx = jsx.replace(/style="([^"]*)"/g, (_match, styleString) => {
        const styleObject = styleString
          .split(";")
          .filter((s: string) => s.trim())
          .map((s: string) => {
            const [property, value] = s.split(":").map((p) => p.trim());
            if (!property || !value) return "";
            const camelCase = property.replace(/-([a-z])/g, (g) =>
              g[1].toUpperCase()
            );
            const processedValue = isNaN(Number(value)) ? `"${value}"` : value;
            return `${camelCase}: ${processedValue}`;
          })
          .filter(Boolean)
          .join(", ");
        return styleObject ? `style={{${styleObject}}}` : "";
      });

      // Self-closing tags
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
        const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, "gi");
        jsx = jsx.replace(regex, `<${tag}$1 />`);
      });

      // HTML comments → JSX comments
      jsx = jsx.replace(/<!--(.*?)-->/g, "{/* $1 */}");

      // Boolean attributes
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
        const regex = new RegExp(`\b${attr}(?!=)`, "gi");
        jsx = jsx.replace(regex, `${attr}={true}`);
      });

      // External CSS
      jsx = jsx.replace(
        /<link[^>]*rel=['"]stylesheet['"][^>]*href=['"]([^'"']+)['"][^>]*\/?>/gi,
        (_match, href) => {
          imports.push(`import '${href}';`);
          return "";
        }
      );

      // External JS
      jsx = jsx.replace(
        /<script[^>]*src=['"]([^'"']+)['"][^>]*>\s*<\/script>/gi,
        (_match, src) => {
          imports.push(`import '${src}';`);
          return "";
        }
      );

      // Inline <style>
      jsx = jsx.replace(
        /<style[^>]*>([\s\S]*?)<\/style>/gi,
        (_match, cssContent) => {
          const fileName = `generated-styles${styleCounter++ || ""}.css`;
          imports.push(`import './${fileName}';`);
          files.push({
            name: fileName,
            type: "css",
            content: cssContent.trim(),
          });
          return "";
        }
      );

      // Inline <script>
      jsx = jsx.replace(
        /<script[^>]*>([\s\S]*?)<\/script>/gi,
        (_match, jsContent) => {
          const fileName = `generated-scripts${scriptCounter++ || ""}.js`;
          imports.push(`import './${fileName}';`);
          files.push({ name: fileName, type: "js", content: jsContent.trim() });
          return "";
        }
      );

      // Final JSX component
      const componentName = "HtmlComponent";
      const jsxCode = `import React from 'react';
${imports.join("\n")}

const ${componentName} = () => {
  return (
    <>
${jsx
  .split("\n")
  .map((l) => "      " + l)
  .join("\n")}
    </>
  );
};

export default ${componentName};`;

      const formattedJsx = await prettier.format(jsxCode, {
        parser: "babel",
        plugins: [babelParser, estree],
      });

      return { jsx: formattedJsx, files };
    } catch (e) {
      console.error(e);
      return {
        jsx: "Error converting HTML to JSX. Please check your HTML syntax.",
        files: [],
      };
    }
  };

  return { convertHtmlToJsx };
}
