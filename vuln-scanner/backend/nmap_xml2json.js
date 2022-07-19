const { exec } = require("child_process");

function exec_code(repport, ipRange) {

    let cmd = "nmap -v -sS -p- -sV 9 -PR -O -oX res.xml " + ipRange;
    exec(cmd, (error, stdout,stderr) => {
        if(error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if(stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    exec("fxparser res.xml > result.json", (error, stdout,stderr) => {
        if(error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if(stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}