const axios = require('axios').default;

class ApiThemoviedb {
  constructor() {
    this.base_url = 'https://api.themoviedb.org/3';
    this.api_key = 'df4f25ddce476816dc7867d9ac4bd1ea';
    this.media_type = 'movie';
    this.time_window = 'day';
  }
  async getRequestData() {
    return await axios.get(
      `${this.base_url}/trending/${this.media_type}/${this.time_window}`,
      {
        params: {
          api_key: this.api_key,
        },
      }
    );
  }
  async getRequestVideos(idMovie) {
    return await axios.get(`${this.base_url}/movie/${idMovie}/videos`, {
      params: {
        api_key: this.api_key,
      },
    });
  }
}

export { ApiThemoviedb };
