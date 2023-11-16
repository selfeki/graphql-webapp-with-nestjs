import { UserDTO } from './user.dto';

describe('UserDTO', () => {
  it('should be defined', () => {
    expect(new UserDTO()).toBeDefined();
  });
});
