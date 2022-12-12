import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifierGateway } from 'modules/notifier/notifier.gateway';
import { RecordModule } from 'modules/record/record.module';
import { UserModule } from 'modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        console.log({
          uri: `mongodb://${config.get('MONGODB_ACCESS_KEY')}:${config.get(
            'MONGODB_SECRET_KEY',
          )}@${config.get('MONGODB_HOST')}:${config.get('MONGODB_PORT')}`,
          dbName: config.get('MONGODB_DBNAME'),
        });

        return {
          uri: `mongodb://${config.get('MONGODB_ACCESS_KEY')}:${config.get(
            'MONGODB_SECRET_KEY',
          )}@${config.get('MONGODB_HOST')}:${config.get('MONGODB_PORT')}`,
          dbName: config.get('MONGODB_DBNAME'),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UserModule,
    RecordModule,
    NotifierGateway,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
