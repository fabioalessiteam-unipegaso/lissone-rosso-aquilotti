// Pre-genera il contenuto della pagina, così si vede anche dove JavaScript è disattivato (anteprime, ecc.).
const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const [,, input, output] = process.argv;
const d = new JSDOM(fs.readFileSync(input, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: new VirtualConsole() });
setTimeout(() => {
  const doc = d.window.document;
  doc.documentElement.removeAttribute('class');
  doc.querySelectorAll('[hidden]').forEach(e => e.removeAttribute('hidden'));
  doc.querySelectorAll('#gprev,#gnext').forEach(b => b.removeAttribute('disabled'));
  fs.writeFileSync(output, d.serialize());
  process.exit(0);
}, 500);
