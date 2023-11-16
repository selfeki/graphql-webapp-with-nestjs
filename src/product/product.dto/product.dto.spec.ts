import { ProductDTO } from './product.dto';

describe('ProductDTO', () => {
  it('should be defined', () => {
    expect(new ProductDTO()).toBeDefined();
  });
});
