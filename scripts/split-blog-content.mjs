// Genera módulos lazy por artículo a partir de src/data/blog.ts.
// - Escribe src/data/blog-contents/<slug>.ts con el HTML de cada artículo.
// - Escribe src/data/blogContentLoaders.ts con el mapa slug -> import() lazy.
// - Elimina el campo `content` de los posts en src/data/blog.ts (queda solo metadata).
// El contenido se copia byte a byte: si un día cambia el formato, regenera con este script.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogFile = path.join(root, 'src/data/blog.ts');
const contentsDir = path.join(root, 'src/data/blog-contents');
const loadersFile = path.join(root, 'src/data/blogContentLoaders.ts');

const src = readFileSync(blogFile, 'utf8');

const slugs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);

// `content: `...`` termina en el primer backtick + coma (el HTML no contiene backticks).
const contentRe = /    content: `([\s\S]*?)`,\n/g;
const contents = [...src.matchAll(contentRe)].map((m) => m[1]);

if (slugs.length !== contents.length) {
  throw new Error(
    `Desajuste: ${slugs.length} slugs vs ${contents.length} contenidos. Aborta sin tocar nada.`
  );
}

mkdirSync(contentsDir, { recursive: true });

const loaders = [];
for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const content = contents[i];
  writeFileSync(path.join(contentsDir, `${slug}.ts`), `export const content = \`${content}\`;\n`);
  loaders.push(`  '${slug}': () => import('./blog-contents/${slug}'),`);
}

writeFileSync(
  loadersFile,
  `// Generado por scripts/split-blog-content.mjs — no editar a mano.\nexport const blogContentLoaders: Record<string, () => Promise<{ content: string }>> = {\n${loaders.join('\n')}\n};\n`
);

const stripped = src.replace(contentRe, '');
writeFileSync(blogFile, stripped);

console.log(`OK: ${slugs.length} artículos separados. Contenido -> ${contentsDir}, loaders -> ${loadersFile}.`);
