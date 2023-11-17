import { DataSource } from "typeorm"
import { UserEntity } from './user.entity/user.entity'
import { ProductEntity } from '../product/product.entity/product.entity';
import * as pactum from 'pactum';

const ENDPOINT = 'http://localhost:3000/graphql'
const TestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [UserEntity, ProductEntity],
  synchronize: true,
  logging: false,
});

describe('UserResolver E2E Tests', () => {
  beforeAll(async () => {
    await TestDataSource.initialize();
  });

  afterAll(async () => {
    await TestDataSource.destroy();
  });

  describe('createOneUser Mutation', () => {
    it('should create a new user', async () => {
      const createUserInput = `{
        name: "Test User",
        email: "testuser@example.com",
        age: 30
      }`;

      const createUserMutation = `
        mutation {
          createOneUser(input: ${createUserInput}) {
            id
            name
            email
            age
          }
        }
      `;
      await pactum.spec()
        .post(ENDPOINT)
        .withGraphQLQuery(createUserMutation)
        .expectStatus(200)
        .expectJson({
          data: {
            createOneUser: {
              id: "1",
              name: "Test User",
              email: "testuser@example.com",
              age: 30
            }
          }
        });
      });
    });
  });

  describe('addUserOrder Mutation', () => {
    it('should add an order to an existing user', async () => {
      const userName = 'Test User';
      const productName = 'Existing Product';

      const addProductMutation = `
        mutation {
          createOneProduct(input: {
            product: {
              name: "${productName}",
              price: 99.99
            }
          }) {
              id
              name
              price
          }
        }
      `

      await pactum.spec()
        .post(ENDPOINT)
        .withGraphQLQuery(addProductMutation)
        .expectStatus(200)

      const addUserOrderMutation = `
        mutation {
          addUserOrder(userName: "${userName}", productName: "${productName}") {
            name
            order {
              name
            }
          }
        }
      `;

      await pactum.spec()
        .post(ENDPOINT)
        .withGraphQLQuery(addUserOrderMutation)
        .expectStatus(200)
        .expectJson({
          data: {
            addUserOrder: {
              name: userName,
              order: [{
                "name": "Existing Product"
              }],
            }
          }
        });
    });
  });

  describe('getUsersWithOrder Query', () => {
    it('should fetch users with orders', async () => {
      const getUsersWithOrderQuery = `
        query {
          getUsersWithOrder {
            name
            order {
              name
            }
          }
        }
      `;

      await pactum.spec()
        .post(ENDPOINT) 
        .withGraphQLQuery(getUsersWithOrderQuery)
        .expectStatus(200)
        .expectJson({
          data: {
            getUsersWithOrder: [
              {
                "name": "Test User",
                "order": [{
                  "name": "Existing Product"
                }],
              },
            ],
          }
        });
    });
  });

