import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
