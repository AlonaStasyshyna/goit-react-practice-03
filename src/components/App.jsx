import { Component } from "react";
import movies from '../data/movies.json';
import { MoviesGallary } from "./MoviesGallary/MoviesGallary";
import { Modal } from "./Modal/Modal";
import { mapper } from "./utils/mapper";

export class App extends Component {
  state = {
    movies: mapper(movies),
    currentImage: null,
  }

  componentDidUpdate(_, prevState) {
    const { movies } = this.state;

    if (movies !== prevState.movies) {
      localStorage.setItem('movies', JSON.stringify(movies))
    }
  }

  componentDidMount() {
    const movies = localStorage.getItem('movies');

    if (movies) {
      this.setState({movies: JSON.parse(movies)})
    }
  }

  deleteMovie = (movieId) => {
    const updateMovies = this.state.movies.filter(({ id }) => id !== movieId);

    this.setState({
      movies: updateMovies,
    })
  }

  updateCurrentImage = (data) => {
    this.setState({
      currentImage: data,
    })
  }

  closeModal = () => {
    this.setState({
      currentImage: null,
    })
  }

  render() {
    const { movies, currentImage } = this.state;
    
    return (
      <>
        <MoviesGallary movies={movies} openModal={this.updateCurrentImage} deleteMovie={this.deleteMovie} />
        {currentImage && <Modal image={currentImage} closeModal={this.closeModal} />}
      </>
  )}
}
