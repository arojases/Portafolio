import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const repositoryUrl =
  process.env.PROJECTS_50_REPOSITORY ||
  'https://github.com/arojases/50-Projects---HTML-CSS-and-JavaScript.git';
const destination = path.resolve('public', 'project-demos', '50-projects');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function main() {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'portfolio-50-projects-'));
  const checkout = path.join(temporaryRoot, 'repository');

  try {
    await run('git', ['clone', '--depth', '1', repositoryUrl, checkout]);

    const sourceEntries = (await readdir(checkout, { withFileTypes: true })).filter(
      (entry) => entry.name !== '.git',
    );
    const sourceNames = new Set(sourceEntries.map((entry) => entry.name));
    const destinationEntries = await readdir(destination, { withFileTypes: true });

    // index.html pertenece a la galeria del portafolio, no al repositorio externo.
    for (const entry of destinationEntries) {
      if (entry.name === 'index.html' || sourceNames.has(entry.name)) continue;
      await rm(path.join(destination, entry.name), { recursive: true, force: true });
    }

    for (const entry of sourceEntries) {
      const target = path.join(destination, entry.name);
      await rm(target, { recursive: true, force: true });
      await cp(path.join(checkout, entry.name), target, { recursive: true });
    }

    console.log(`Synced ${sourceEntries.length} entries into ${destination}`);
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
