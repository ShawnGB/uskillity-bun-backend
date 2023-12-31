import { Elysia, t } from 'elysia';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user';

const users = new Elysia().group('users', (app) =>
  app
    // get all users
    .get('/', () => getAllUsers())

    // get a user by id
    .get('/:id', ({ params: { id } }) => getUser(id))

    // update a user
    .patch('/:id', ({ body }) => updateUser(body), {
      body: t.Object({
        id: t.String(),
        firstName: t.Optional(t.String()),
        lastName: t.Optional(t.String()),
        email: t.Optional(t.String()),
        username: t.Optional(t.String()),
        bio: t.Optional(t.String()),
        profilePicture: t.Optional(t.String()),
      }),
    })

    // delete a user
    .delete('/:id', ({ params: { id } }) => deleteUser(id))
);

export { users };
