const Auth = {
  login(email, password) {
    const db = DB.get();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Login inválido.');
      return false;
    }
    sessionStorage.setItem('N1_USER', JSON.stringify(user));
    Router.navigate(user.role === 'Admin' || user.role === 'Manager' ? 'dashboard' : 'dashboard');
    return true;
  },
  logout() {
    sessionStorage.removeItem('N1_USER');
    Router.navigate('login');
  },
  getUser() {
    const raw = sessionStorage.getItem('N1_USER');
    return raw ? JSON.parse(raw) : null;
  }
};
