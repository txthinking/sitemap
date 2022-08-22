#!/bin/bash

if [ $# -ne 1 ]; then
    echo "./build.sh version"
    exit
fi

mkdir _

deno compile -A -r --unstable --target x86_64-unknown-linux-gnu -o _/sitemap_linux_amd64 https://raw.githubusercontent.com/txthinking/sitemap/master/main.js
deno compile -A -r --unstable --target x86_64-apple-darwin -o _/sitemap_darwin_amd64 https://raw.githubusercontent.com/txthinking/sitemap/master/main.js
deno compile -A -r --unstable --target aarch64-apple-darwin -o _/sitemap_darwin_arm64 https://raw.githubusercontent.com/txthinking/sitemap/master/main.js

nami release github.com/txthinking/sitemap $1 _

rm -rf _
