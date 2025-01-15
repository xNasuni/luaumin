const { spawnSync } = require('child_process');
const path = require('path');

function minifyLuau(source) {
    const exePath = path.join(__dirname, 'bin', 'luaumin.exe');
    
    try {
        const base64LuaCode = Buffer.from(source).toString('base64');
        const child = spawnSync(exePath, [], {
            input: base64LuaCode,
            encoding: "utf-8"
        })

        if (child.error) {
            console.error('Error spawning child process:', child.error);
            return null;
        }

        const minifiedOutput = JSON.parse(child.stdout.replace(/\s+/g, ' ').trim());

		if (minifiedOutput.error) {
			console.warn("Could not minify:", minifiedOutput.error)
			return null
		}
        
        return atob(minifiedOutput.source);
    } catch (error) {
        console.error('Error executing .exe:', error);
        throw error;
    }
}

var luaumin = {
    'version': '1.0.0',
    'minify': minifyLuau
}
module.exports = luaumin