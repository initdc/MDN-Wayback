ts=$(date +%Y.%m.%d)
pkg=mdn-wayback-$ts.zip

zip $pkg -r background.js images LICENSE options.html js manifest.json popup.html
