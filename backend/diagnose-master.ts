import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function diagnose() {
    const email = 'waniely2357@gmail.com';
    const rawPassword = 'G@usti8826'; // Provided by user previously

    console.log(`--- Diagnosing user: ${email} ---`);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error('ERROR: User not found in database.');
        return;
    }

    console.log('User found:');
    console.log(`- ID: ${user.id}`);
    console.log(`- Role: ${user.role}`);
    console.log(`- CreatedAt: ${user.createdAt}`);

    // Check password
    try {
        const isMatch = await bcrypt.compare(rawPassword, user.password);
        console.log(`- Password Match ('${rawPassword}'): ${isMatch ? '✅ VALID' : '❌ INVALID'}`);
    } catch (e) {
        console.error('- Password check error:', e);
    }

    // Check Tenant
    if (user.tenantId) {
        const tenant = await prisma.tenant.findUnique({ where: { id: user.tenantId } });
        console.log(`- Tenant: ${tenant ? tenant.name : 'NOT FOUND'}`);
    } else {
        console.log('- Tenant ID: MISSING');
    }

    await prisma.$disconnect();
}

diagnose();
