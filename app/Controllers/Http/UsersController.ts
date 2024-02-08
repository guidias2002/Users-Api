import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthService from 'App/Services/AuthService';

import User from 'App/Models/User'

export default class UsersController {

  public async firstUser({ request, response }: HttpContextContract) {
    const users = await User.findBy('access', true);

    if (users) {
      throw new Error("Já existe usuário criado")
    }

    const body = request.body();
    const user = await User.create({
      ...body,
      access: true
    })

    response.status(201)

    return user;
  }

  public async store({ request, response, auth }: HttpContextContract) {
    AuthService.authenticateAdmin(auth);

    const body = request.body()
    const user = await User.create(body)

    response.status(201)

    return {
      message: 'Usuário criado com sucesso',
      data: user,
    }
  }

  public async index({ auth }) {
    AuthService.authenticateAdmin(auth)
    const users = await User.all()

    return users;
  }

  public async show({ params, auth }: HttpContextContract) {
    AuthService.authenticate(Number(params.id), auth);

    const user = await User.findOrFail(params.id);

    return user;
  }

  public async update({ request, params, auth }: HttpContextContract) {
    AuthService.authenticateAdmin(auth);

    const body = request.body()
    const user = await User.findOrFail(params.id);

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    user.age = body.age;
    user.access = body.access;

    await user.save();

    return user;
  }

  public async destroy({ params, auth }: HttpContextContract) {
    AuthService.authenticateAdmin(auth);

    const user = await User.findOrFail(params.id);
    user.delete();

    return 'Usuário deletado';
  }

  public async deleteAll({ auth }) {
    AuthService.authenticateAdmin(auth);

    const users = await User.all();
    users.forEach((user) => user.delete());

    return users;
  }
}
