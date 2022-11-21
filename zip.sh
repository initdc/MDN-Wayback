ts=$(date +%Y.%m.%d)
pkg=mdn-wayback-$ts.zip

# ls --sort=extension
zip $pkg -r images js LICENSE options.html popup.html background.js manifest.json
