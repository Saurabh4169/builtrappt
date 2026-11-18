import fs from 'fs';

for (let i = 2; i <= 10; i++) {
  const content = `import React from 'react';
import { TwoColumnSlide } from '../components/shared';

export default function Slide${i}() {
  return <TwoColumnSlide slideNumber={${i}} totalSlides={10} />;
}
`;
  fs.writeFileSync(`src/slides/Slide${i}.jsx`, content, 'utf8');
}
console.log('Generated Slide2 through Slide10');
