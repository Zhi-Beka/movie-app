import imageShow from '../images/not-found.jpg';

export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3';
  API_KEY = 'ec32ee203bb1918ee735c44c14ca245e';
  _imgBase = 'https://image.tmdb.org/t/p';
  size = '/w500/';
  sessionID = '';

  getImage = (imgPath) => (imgPath ? `${this._imgBase}${this.size}${imgPath}` : `${imageShow}`);

  async getData(url) {
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
      return await this.getData(`/search/movie?api_key=${this.API_KEY}&query=${title}&page=${page}`);
    }
    return await this.getData(`/search/movie?api_key=${this.API_KEY}&query=${title}&page=${page}`);
  }

  async createSessionID() {
    const sessionIDParams = `/authentication/guest_session/new?api_key=${this.API_KEY}`;
    try {
      return await this.getData(sessionIDParams)
        .then((data) => {
          if (localStorage.getItem('guest_session_id')) {
            this.sessionID = localStorage.getItem('guest_session_id');
            return this.sessionID;
            // localStorage.removeItem('guest_session_id')
          }
          this.sessionID = data.guest_session_id;
          localStorage.setItem('guest_session_id', this.sessionID);
          return this.sessionID;
        })
        .catch((err) => err.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  async postRatedMovies(id, stars) {
    if (localStorage.getItem('guest_session_id')) {
      this.sessionID = localStorage.getItem('guest_session_id');
    } else {
      await this.createSessionID();
    }

    const getSessionId = localStorage.getItem('guest_session_id');
    const path = `/movie/${id}/rating?api_key=${this.API_KEY}`;
    const url = `${this._apiBase}${path}&guest_session_id=${getSessionId}`;
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
      return data.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log(err);
    }
  }

  //const x = 'https://api.themoviedb.org/3/guest_session/c3155a46169aae254313e2c990d95d1b/rated/movies?api_key=ec32ee203bb1918ee735c44c14ca245e'
  async getRatedMovies() {
    const sessionId = localStorage.getItem('guest_session_id');

    const url = `${this._apiBase}/guest_session/${sessionId}/rated/movies?api_key=${this.API_KEY}`;
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error('NO RESPONSE!');
      }
      return await data.json();
    } catch (err) {
      console.log(err.message);
    }
  }
}
