import { join } from "https://deno.land/std@0.130.0/path/mod.ts";

var l = [];
var readdir = async (k) => {
    for await (const d of Deno.readDir(k)) {
        if (d.isFile) {
            if (!d.name.endsWith(".html") && !d.name.endsWith(".article") && !d.name.endsWith(".slide")) {
                continue;
            }
            l.push(k + "/" + d.name);
            continue;
        }
        if (d.name.startsWith(".")) {
            continue;
        }
        await readdir(k + "/" + d.name);
    }
};
await readdir(".");

var s = '<?xml version="1.0" encoding="UTF-8"?>\n';
s += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (var i = 0; i < l.length; i++) {
    var st = await Deno.stat(l[i]);
    s += "<url>\n";
    s += `<loc>${l[i].replace(".", Deno.args[0])}</loc>\n`;
    s += `<lastmod>${st.mtime.toISOString()}</lastmod>\n`;
    s += "</url>\n";
}
s += "</urlset>";
await Deno.writeTextFile("sitemap.xml", s);
