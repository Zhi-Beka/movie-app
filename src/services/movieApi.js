/* eslint-disable prettier/prettier */
import imageShow from '../images/not-found.jpg';

export default class ApiService {
  constructor () {
    this._apiBase = 'https://api.themoviedb.org/3';
    this.API_KEY = 'ec32ee203bb1918ee735c44c14ca245e';
    this._imgBase = 'https://image.tmdb.org/t/p';
    this.size = '/w500/';
    this.sessionID = '';
  }

  getImage = (imgPath) => (imgPath ? `${ this._imgBase }${ this.size }${ imgPath }` : `${ imageShow }`);
  async getData(url) {
    try {
      const res = await fetch(`${ this._apiBase }${ url }`);
      if (!res.ok) {
        throw new Error(`Sorry could not get data from ${ this._apiBase }, received ${ res.status }`);
      }
      const data = await res.json();
      data.results.map((el) => {
        el.poster_path = this.getImage(el.poster_path);
        return el;
      });
      return {...data};
    } catch (err) {
      throw new Error(err);
    }
  }

  async getGenres() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ec32ee203bb1918ee735c44c14ca245e';
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error('NO RESPONSE!');
      }
      return await data.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMovieBySearch(title, page) {
    try {
      if (title) {
        let urlQuery = `/search/movie?api_key=${ this.API_KEY }&query=${ title }&page=${ page }`;
        return await this.getData(urlQuery);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async createSessionID() {
    const sessionIDParams = `/authentication/guest_session/new?api_key=${ this.API_KEY }`;
    try {
      if (localStorage['guest_session_id']) {
        return (this.sessionID = localStorage.getItem('guest_session_id'));
      }
      const res = await fetch(`${ this._apiBase }${ sessionIDParams }`);
      const data = await res.json();
      this.sessionID = data.guest_session_id;
      localStorage.setItem('guest_session_id', this.sessionID);
      return this.sessionID;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postRatedMovies(id, stars) {
    const path = `/movie/${ id }/rating?api_key=${ this.API_KEY }`;


    const url = `${ this._apiBase }${ path }&guest_session_id=${ this.sessionID }`;

    try {
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: stars,
        }),
      });
      if (!data.ok) {
        throw new Error('NO success!');
      }
      return data.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRatedMovies(page) {
    this.sessionID = localStorage.getItem('guest_session_id');

    const url = `/guest_session/${ this.sessionID }/rated/movies?api_key=${ this.API_KEY }&page=${ page }`;
    return await this.getData(url);
  }
}
