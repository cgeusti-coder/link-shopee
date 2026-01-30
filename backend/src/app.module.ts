import { Module } from '@nestjs/common';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { AutomationModule } from './automation/automation.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagingModule } from './messaging/messaging.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        MarketplaceModule,
        ProductsModule,
        AutomationModule,
        MessagingModule,
        IntegrationsModule,
        ProfileModule,
        CoursesModule,
    ],
})
export class AppModule { }
