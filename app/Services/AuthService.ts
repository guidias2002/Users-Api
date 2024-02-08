import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/User";

class AuthService {

  public authenticateAdmin(auth: AuthContract) {
    const userAuth = auth.user as User;

    if (!userAuth?.access) {
      throw new Error('Você não tem permissão para essa funcionalidade')
    }
  }

  public authenticate(id: number, auth: AuthContract) {
    // se o usuario tiver qualquer acesso, ele pode autenticar
    const authId = auth.user?.id;

    if (id != authId && !this.authenticateAdmin(auth)) {
      throw new Error('Você não tem permissão para essa funcionalidade')
    }

    return true;
  }
}


export default new AuthService();
