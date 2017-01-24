var cli = require.resolve('gitbook-cli');
console.log('node ' + cli + ' ' + process.argv.slice(2).join(' '))
var proc = require('child_process').exec('node ' + cli + ' ' + process.argv.slice(2).join(' '));
proc.stdout.on('data', (info) => {
    process.stdout.write(info);
});
proc.stderr.on('data', (err) => {
    process.stdout.write(err);
});