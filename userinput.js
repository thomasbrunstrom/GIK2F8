const standardInput = process.stdin;
standardInput.setEncoding('utf-8');
console.log('Hej, vad heter du?');
standardInput.on('data', (data) => {
    if(data.trim() === 'exit') {
        console.log('Tack för mig, vi ses.');
        process.exit();
    }
    else {
        console.log(`Hej ${data.replace('\n', '')}, trevligt att träffas`);
    }
});