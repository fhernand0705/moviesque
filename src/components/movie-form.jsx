import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { toast } from 'react-toastify';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(2).required(),
    genreId: Joi.string().min(2).required(),
    numberInStock: Joi.number().integer().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required()
  }

  async populateGenres() {
    const { data: genres} = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      console.log(movie.title)
      this.setState({ data: this.mapToViewModel(movie) });
    }
    catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await saveMovie(data);
      this.props.history.push('/movies');
    }
    catch (err) {
      if (err.response && err.response.status > 400)
        toast.error("400 - bad request");
    }
  }

  render() {
    const { data: movie } = this.state;

    return (
      <div>
        { movie._id && <h2>Edit the selected movie - <i>{ movie.title }</i></h2> }
        { !movie._id && <h1>Add New Movie</h1> }
        <form onSubmit={ this.handleSubmit }>
          { this.renderInput("title", "Title") }
          { this.renderSelect("genreId", "Genre", this.state.genres) }
          { this.renderInput("numberInStock", "Number in Stock", "number") }
          { this.renderInput("dailyRentalRate", "Daily Rate", "number") }
          { movie._id && this.renderButton("Save Changes") }
          { !movie._id && this.renderButton("Save") }
        </form>
      </div>
    )
  }
}

export default MovieForm;
