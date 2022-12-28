import { Favorites } from '@entities/Favorites.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Test } from '@entities/Test.entity';
import { User } from '@entities/User.entity';
import { WorkHistory } from '@entities/WorkHistory.entity';
import { Education } from '@entities/Education.entity';
import { Category } from '@entities/Category.entity';
import { Job } from '@entities/Job.entity';
import { Skill } from '@entities/Skill.entity';
import { Conversation } from '@entities/Conversation.entity';
import { Message } from '@entities/Message.entity';
import { Request } from '@entities/Request.entity';
import { Notification } from '@entities/Notification.entity';
import { Offer } from '@entities/Offer.entity';
import { Contract } from '@entities/Contract.entity';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { TestModule } from '@/modules/test/test.module';
import { UserModule } from '@/modules/user/user.module';
import { filePath } from '@/modules/file/constants';
import { PropertiesModule } from '@/modules/properties/properties.module';
import { JobsModule } from '@/modules/jobs/job.module';
import { ChatModule } from '@/modules/chat/chat.module';
import { InviteModule } from './modules/conversations/conversations.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { RequestModule } from './modules/requests/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Test,
        User,
        WorkHistory,
        Education,
        Category,
        Job,
        Skill,
        Conversation,
        Message,
        Request,
        Notification,
        Offer,
        Contract,
        Favorites,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: filePath,
    }),
    AuthModule,
    TestModule,
    UserModule,
    JobsModule,
    PropertiesModule,
    ChatModule,
    InviteModule,
    ContractsModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
