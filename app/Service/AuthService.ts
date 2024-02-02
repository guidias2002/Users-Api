class AuthService {

  async authenticateAdmin({ auth }) {
    const userAuth = auth.user

    if (!userAuth?.access) {
      throw new Error("Você não tem permissão para essa funcionalidade")
    }
  }

  async authenticate({ auth }) {
    // se o usuario tiver qualquer acesso, ele pode autenticar
    const userAuth = auth.user;

    if (!userAuth?.access && userAuth.access !== 0) {
      throw new Error("Você não tem permissão para essa funcionalidade")
    }
  }
}


export default new AuthService();
