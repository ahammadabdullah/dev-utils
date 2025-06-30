export function useSvgToJsx() {
  const convertSvgToJsx = (svgString: string): string => {
    if (!svgString.trim()) {
      return '';
    }

    try {
      // Basic SVG to JSX conversion
      let jsx = svgString;

      // Convert HTML attributes to JSX attributes
      const attributeMap: Record<string, string> = {
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
        'stroke-dasharray': 'strokeDasharray',
        'stroke-dashoffset': 'strokeDashoffset',
        'stroke-miterlimit': 'strokeMiterlimit',
        'stroke-opacity': 'strokeOpacity',
        'fill-opacity': 'fillOpacity',
        'fill-rule': 'fillRule',
        'clip-rule': 'clipRule',
        'clip-path': 'clipPath',
        'font-family': 'fontFamily',
        'font-size': 'fontSize',
        'font-weight': 'fontWeight',
        'font-style': 'fontStyle',
        'text-anchor': 'textAnchor',
        'text-decoration': 'textDecoration',
        'text-rendering': 'textRendering',
        'vector-effect': 'vectorEffect',
        'marker-start': 'markerStart',
        'marker-mid': 'markerMid',
        'marker-end': 'markerEnd',
        'color-interpolation': 'colorInterpolation',
        'color-interpolation-filters': 'colorInterpolationFilters',
        'color-profile': 'colorProfile',
        'color-rendering': 'colorRendering',
        'dominant-baseline': 'dominantBaseline',
        'enable-background': 'enableBackground',
        'flood-color': 'floodColor',
        'flood-opacity': 'floodOpacity',
        'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
        'glyph-orientation-vertical': 'glyphOrientationVertical',
        'image-rendering': 'imageRendering',
        'letter-spacing': 'letterSpacing',
        'lighting-color': 'lightingColor',
        'marker-height': 'markerHeight',
        'marker-units': 'markerUnits',
        'marker-width': 'markerWidth',
        'mask-content-units': 'maskContentUnits',
        'mask-units': 'maskUnits',
        'overflow': 'overflow',
        'paint-order': 'paintOrder',
        'pointer-events': 'pointerEvents',
        'shape-rendering': 'shapeRendering',
        'stop-color': 'stopColor',
        'stop-opacity': 'stopOpacity',
        'text-overflow': 'textOverflow',
        'unicode-bidi': 'unicodeBidi',
        'word-spacing': 'wordSpacing',
        'writing-mode': 'writingMode'
      };

      // Convert attributes
      Object.entries(attributeMap).forEach(([htmlAttr, jsxAttr]) => {
        const regex = new RegExp(`\\b${htmlAttr}=`, 'g');
        jsx = jsx.replace(regex, `${jsxAttr}=`);
      });

      // Convert class to className
      jsx = jsx.replace(/\bclass=/g, 'className=');

      // Convert for to htmlFor
      jsx = jsx.replace(/\bfor=/g, 'htmlFor=');

      // Convert self-closing tags to JSX format
      jsx = jsx.replace(/<(\w+)([^>]*?)>/g, (match, tagName, attributes) => {
        // Check if it's a self-closing tag
        const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 'stop', 'use'];
        
        if (selfClosingTags.includes(tagName.toLowerCase())) {
          // If it doesn't already end with />, add it
          if (!attributes.trim().endsWith('/')) {
            return `<${tagName}${attributes} />`;
          }
        }
        return match;
      });

      // Format as a React component
      const componentName = 'SvgComponent';
      const formattedJsx = `import React from 'react';

const ${componentName} = (props) => (
${jsx.split('\n').map(line => '  ' + line).join('\n')}
);

export default ${componentName};`;

      return formattedJsx;
    } catch (error) {
      return 'Error converting SVG to JSX. Please check your SVG syntax.';
    }
  };

  return {
    convertSvgToJsx
  };
}