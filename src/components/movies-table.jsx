import React, { Component } from 'react';
import Table from '../components/common/table';
import Likes from '../components/common/likes';
import { Link } from 'react-router-dom'

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{ movie.title }</Link>
    },
    { path: 'genre.name', label: 'Genre'},
    { path: 'numberInStock', label: 'Stock'},
    { path: 'dailyRentalRate', label: 'Rate'},
    {
      key: 'like',
      content: movie =>
        <Likes
          liked={ movie.isLiked }
          onLike={ () => this.props.onLike(movie) }/>
    },
    {
      key: 'delete',
      content: movie =>
        <button
          className="btn btn-danger"
          onClick={ () => this.props.onDelete(movie) }>
          Delete
        </button>
     }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        sortColumn={ sortColumn }
        onSort={ onSort }
        columns={ this.columns }
        data={ movies }
      />
    )
  }
}

export default MoviesTable;
