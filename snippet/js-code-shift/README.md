# run script
## replace original source code
$ npx jscodeshift -t transform.js source.js
## dry run
$ npx jscodeshift -t transform.js source.js --dry --print
