const GenresReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_TO_RATED':
      return {
        ...state,
        ratedMovies: [action.payload, ...state.ratedMovies],
      };
    default:
      return state;
  }
};

export default GenresReducer;
