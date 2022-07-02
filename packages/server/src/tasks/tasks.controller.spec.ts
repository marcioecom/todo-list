import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksModule } from './tasks.module';
import { TasksService } from './tasks.service';

describe.only('TasksController', () => {
  const task = {
    id: 'abc',
    title: 'test',
    description: 'test description',
  };

  let app: INestApplication;
  const tasksService = {
    create: () => task,
    findAll: () => ['test'],
    findOne: () => task,
    update: () => ({ ...task, status: 'IN_PROGRESS' }),
    remove: () => task,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    })
      .overrideProvider(TasksService)
      .useValue(tasksService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should create an tasks', async () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send(task)
      .expect(201)
      .expect(tasksService.create());
  });

  it('should return all tasks', async () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(tasksService.findAll());
  });

  it('should return an task by id', async () => {
    return request(app.getHttpServer())
      .get('/tasks/abc')
      .expect(200)
      .expect(tasksService.findOne());
  });

  it('should return an updated task', async () => {
    return request(app.getHttpServer())
      .patch('/tasks/abc')
      .send({ status: 'IN_PROGRESS' })
      .expect(200)
      .expect(tasksService.update());
  });

  it('should return an deleted task', async () => {
    return request(app.getHttpServer())
      .delete('/tasks/abc')
      .expect(200)
      .expect(tasksService.remove());
  });
});
