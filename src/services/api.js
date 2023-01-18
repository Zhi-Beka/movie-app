export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3';
  API_KEY = 'ec32ee203bb1918ee735c44c14ca245e';

  async getAllData(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Sorry could not get data from ${this._apiBase}, received ${res.status}`);
    }

    const data = await res.json();
    return data;
  }

  async getOneData(id) {
    return this.getAllData(`/movie/${id}?api_key=${this.API_KEY}`);
  }

  async getSearchMovie(title) {
    return this.getAllData(`/search/movie?api_key=${this.API_KEY}&query=${title}`);
  }
}
