import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { TasksService } from './tasks.service';

describe.only('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const task = await service.create({
      title: 'test task',
      description: 'test description',
    });

    expect(task).toBeDefined();
    expect(task.title).toBe('test task');
    expect(task.description).toBe('test description');
  });

  it('should return an array of tasks', async () => {
    const tasks = await service.findAll();

    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should return an task', async () => {
    const taskCreated = await service.create({
      title: 'task title test',
      description: 'description test',
    });

    const taskFinded = await service.findOne(taskCreated.id);

    expect(taskFinded).toBeDefined();
    expect(taskFinded.status).toBe('TODO');
    expect(taskFinded.title).toBe('task title test');
    expect(taskFinded.description).toBe('description test');
  });

  it('should not be able to return an task if not exists', async () => {
    await expect(service.findOne('not-exists')).rejects.toThrowError(
      new HttpException('Task not found', 404),
    );
  });

  it('should return task updated', async () => {
    const taskCreated = await service.create({
      title: 'task title test',
      description: 'description test',
    });

    const taskUpdated = await service.update(taskCreated.id, {
      title: 'task title test updated',
      description: 'description test updated',
      status: 'IN_PROGRESS',
    });

    expect(taskUpdated).toBeDefined();
    expect(taskUpdated.status).toBe('IN_PROGRESS');
    expect(taskUpdated.title).toBe('task title test updated');
    expect(taskUpdated.description).toBe('description test updated');
  });

  it('should not be able to update task if not exists', async () => {
    await expect(
      service.update('not-exists', { status: 'DONE' }),
    ).rejects.toThrowError(new HttpException('Task not found', 404));
  });

  it('should delete task', async () => {
    const taskCreated = await service.create({
      title: 'task title test',
      description: 'description test',
    });

    const deletedTask = await service.remove(taskCreated.id);

    expect(deletedTask).toBeDefined();
    expect(deletedTask.id).toBe(taskCreated.id);
    expect(deletedTask).toHaveProperty('title');
    expect(deletedTask).toHaveProperty('description');
  });

  it('should not be able to delete task if not exists', async () => {
    await expect(service.remove('not-exists')).rejects.toThrowError(
      new HttpException('Task not found', 404),
    );
  });
});
