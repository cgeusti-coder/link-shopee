import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando Seed da Conta Master ---');

    // 1. Criar ou Buscar o Tenant padrão
    let tenant = await prisma.tenant.findUnique({
        where: { slug: 'master-workspace' }
    });

    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: {
                name: 'Master Workspace',
                slug: 'master-workspace',
                plan: 'ENTERPRISE'
            }
        });
        console.log('✅ Tenant Master criado.');
    }

    // 2. Hash da Senha
    const password = 'G@usti8826';
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Criar ou Atualizar Usuário Master
    const email = 'waniely2357@gmail.com';
    const user = await prisma.user.upsert({
        where: { email: email },
        update: {
            password: hashedPassword,
            role: 'MASTER',
            subscriptionStatus: 'ACTIVE',
            firstName: 'Marcelo',
            lastName: 'Master'
        },
        create: {
            email: email,
            password: hashedPassword,
            role: 'MASTER',
            tenantId: tenant.id,
            subscriptionStatus: 'ACTIVE',
            firstName: 'Marcelo',
            lastName: 'Master'
        }
    });

    console.log(`✅ Usuário Master (${email}) configurado com sucesso.`);
    console.log('--- Seed Finalizado ---');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
