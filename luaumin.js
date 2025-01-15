const { execSync } = require('child_process');
const path = require('path');

function minifyLuau(source) {
    const exePath = path.join(__dirname, 'bin', 'luaumin.exe');
    
    try {
        const base64LuaCode = Buffer.from(source).toString('base64');

        let output = execSync(`${exePath} ${base64LuaCode}`).toString();

		const minifiedOutput = JSON.parse(output.replace(/\s+/g, ' ').trim());

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