import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prisma.task.findMany({ orderBy: { title: 'asc' } });
  }

  async findOne(id: string) {
    const taskExists = await this.prisma.task.findUnique({ where: { id } });

    if (!taskExists) {
      throw new HttpException('Task not found', 404);
    }

    return taskExists;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskExists = await this.prisma.task.findUnique({ where: { id } });

    if (!taskExists) {
      throw new HttpException('Task not found', 404);
    }

    return this.prisma.task.update({
      data: updateTaskDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const taskExists = await this.prisma.task.findUnique({ where: { id } });

    if (!taskExists) {
      throw new HttpException('Task not found', 404);
    }

    return this.prisma.task.delete({ where: { id } });
  }
}
