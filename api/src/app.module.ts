import { Module } from '@nestjs/common';
import { TodoModule } from './rest/v1/todo.module'

@Module({
  imports: [TodoModule]
})
export class AppModule {}
