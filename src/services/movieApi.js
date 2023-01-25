import imageShow from '../images/not-found.jpg';

export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3';
  API_KEY = 'ec32ee203bb1918ee735c44c14ca245e';
  _imgBase = 'https://image.tmdb.org/t/p';
  size = '/w500/';

  async getAllData(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Sorry could not get data from ${this._apiBase}, received ${res.status}`);
    }
    return await res.json();
  }

  async getSearchMovie(title) {
    return this.getAllData(`/search/movie?api_key=${this.API_KEY}&query=${title}`);
  }

  getImage = (imgPath) => (imgPath ? `${this._imgBase}${this.size}${imgPath}` : `${imageShow}`);

  async getPaginationMovie(title, page) {
    if (!title) {
      title = 'return';

      return this.getAllData(`/search/movie?api_key=${this.API_KEY}&query=${title}&page=${page}`);
    }
    return this.getAllData(`/search/movie?api_key=${this.API_KEY}&query=${title}&page=${page}`);
  }
}
