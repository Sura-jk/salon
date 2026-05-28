const { exec } = require('child_process');

console.log('Building the app...');
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error('Build error:', error);
    return;
  }
  console.log('Build successful!');
  console.log(stdout);
  
  console.log('\nStarting preview...');
  exec('npm run preview', (previewError, previewStdout, previewStderr) => {
    if (previewError) {
      console.error('Preview error:', previewError);
      return;
    }
    console.log('Preview started!');
    console.log(previewStdout);
  });
});