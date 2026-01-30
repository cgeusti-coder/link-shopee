import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

async function generate() {
    const hash = await bcrypt.hash('G@usti8826', 10);
    fs.writeFileSync('final_hash.txt', hash, 'utf8');
    console.log('Hash gravado em final_hash.txt');
}

generate();
