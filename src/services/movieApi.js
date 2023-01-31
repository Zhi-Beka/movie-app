import imageShow from '../images/not-found.jpg';

export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3';
  API_KEY = 'ec32ee203bb1918ee735c44c14ca245e';
  _imgBase = 'https://image.tmdb.org/t/p';
  size = '/w500/';
  urlSession = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.API_KEY}`;
  getImage = (imgPath) => (imgPath ? `${this._imgBase}${this.size}${imgPath}` : `${imageShow}`);

  async createGuestSession() {
    try {
      const res = await fetch(this.urlSession);
      if (!res.ok) {
        throw new Error();
      }
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getAllData(url) {
    try {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Sorry could not get data from ${this._apiBase}, received ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getMovieBySearch(title, page) {
    if (!title) {
      title = 'return';

      return this.getAllData(`/search/movie?api_key=${this.API_KEY}&query=${title}&page=${page}`);
    }
    return this.getAllData(`/search/movie?api_key=${this.API_KEY}&query=${title}&page=${page}`);
  }
}
