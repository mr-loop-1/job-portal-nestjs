import { Test, TestingModule } from '@nestjs/testing';
import { UserApisController } from './user-apis.controller';
import { UserApisService } from './user-apis.service';

describe('UserApisController', () => {
  let userApisController: UserApisController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserApisController],
      providers: [UserApisService],
    }).compile();

    userApisController = app.get<UserApisController>(UserApisController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userApisController.getHello()).toBe('Hello World!');
    });
  });
});
