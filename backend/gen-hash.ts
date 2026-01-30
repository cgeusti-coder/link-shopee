import * as bcrypt from 'bcrypt';

async function generate() {
    const hash = await bcrypt.hash('G@usti8826', 10);
    console.log('HASH:', hash);
}

generate();
