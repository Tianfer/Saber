#!/usr/bin/env sh
npm run build
# cd docs/.vuepress/dist
git init
git add .
git commit -m 'publish'
git push https://github.com/Tianfer/Tianfer.github.io.git master -f
cd -
cmd /k