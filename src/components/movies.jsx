import React, { Component } from 'react';
import MoviesTable from './movies-table';
import Pagination from './common/pagination';
import FilterList from './common/filter-list';
import Search from './common/search';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movie-service';
import { getGenres } from '../services/genre-service';
import { paginate } from '../utils/paginate';
import { Link } from 'react-router-dom';
import _ from 'lodash';


class Movies extends Component {

styles = {
  margin: '1.5em'
}

state = {
  movies: [],
  genres: [],
  currentPage: 1,
  pageSize: 4,
  searchQuery: '',
  selectedGenre: null,
  sortColumn: { path: 'title', order: 'asc'}
}

async componentDidMount() {
  const { data } = await getGenres();
  const genres = [{ _id:'', name: 'All Genres'}, ...data ];

  const { data: movies } = await getMovies();
  this.setState({ movies, genres });
}

handleDelete = async movie => {
  const originalMovies = this.state.movies;
  const movies = originalMovies.filter(m => m._id !== movie._id)
  this.setState({ movies })

  try {
    await deleteMovie(movie._id);
  }
  catch (err) {
    if (err.response && err.response.status === 404)
      toast.error("This movie has already been deleted.")

    this.setState({ movies: originalMovies })
  }
}

handleLike = movie => {
  const movies = [...this.state.movies]
  const i = movies.indexOf(movie)
  movies[i] = {...movie}
  movies[i].isLiked = !movies[i].isLiked

  this.setState({ movies })
}

handlePageChange = page => {
  this.setState({ currentPage: page })
}

handleGenreSelect = genre => {
  this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
}

handleSort = sortColumn => {
  this.setState({ sortColumn })
}

handleSearch = query => {
  this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
}

getPagedData = () => {
  const {
    pageSize,
    currentPage,
    movies: allMovies,
    selectedGenre,
    searchQuery,
    sortColumn
  } = this.state;

  let filtered = allMovies;

  if (searchQuery)
    filtered = allMovies.filter(m =>
    m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  if (selectedGenre && selectedGenre._id)
    filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

  const sorted = _.orderBy(filtered, [ sortColumn.path ], [ sortColumn.order ])
  const movies = paginate(sorted, currentPage, pageSize);

  return { totalCount: filtered.length, data: movies};
}

  render() {
    const { length: movieCount, searchQuery } = this.state;
    const { user } = this.props;
    const {
      pageSize,
      currentPage,
      selectedItem,
      sortColumn
    } = this.state;

    if (movieCount === 0 ) return <h4>No movies in the database</h4>

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row" style={ this.styles }>
        <div className="col-2">
          <FilterList
            items={ this.state.genres }
            onItemSelect={ this.handleGenreSelect }
            selectedItem={ selectedItem }/>
        </div>

        <div className="col">
          {user &&
            <Link to='/movies/new'>
              <button
                className="btn btn-primary"
                style={{ marginBottom: "1em"}}>
                New Movie
              </button>
            </Link>
          }

          <Search value={searchQuery} onChange={this.handleSearch} />

          <h4>There are { totalCount } movies on the list</h4>
          <MoviesTable
            movies={ movies }
            onLike={ this.handleLike }
            onDelete={ this.handleDelete }
            onSort={ this.handleSort }
            sortColumn={ sortColumn }/>
          <Pagination
            itemsCount={ totalCount }
            onPageChange={ this.handlePageChange }
            pageSize={ pageSize }
            currentPage={ currentPage }/>
        </div>
      </div>
    );
  }
}

export default Movies;
