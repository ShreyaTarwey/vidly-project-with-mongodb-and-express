import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/likes";
import Pagination from "./common/pagination";
class Movies extends Component {
  state = {
    movies: getMovies(),
    count: getMovies().length,
    pageSize: 4,
    currentPage: 1,
  };
  render() {
    return (
      <React.Fragment>
        {this.handleMessage()}
        <table className="table">
          <thead>
            <tr>
              <th> Title </th> <th> Genre </th> <th> Stock </th> <th> rate </th>
              <th> </th> <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td> {movie.title} </td> <td> {movie.genre.name} </td>
                <td> {movie.numberInStock} </td>
                <td> {movie.dailyRentalRate} </td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handeLike(movie)}
                  />
                </td>
                <td>
                  {
                    <button
                      key={movie._id}
                      onClick={() => this.handledeleteButton(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={this.state.count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }

  handledeleteButton = (movie) => {
    const index = this.state.movies.indexOf(movie);
    let result = this.state.movies.splice(index, 1);
    this.setState({ movies: this.state.movies });
    this.setState({ count: this.state.movies.length });
    if (this.state.count === 0)
      return <p> There are no movies in the database </p>;
  };
  handleMessage = () => {
    if (this.state.count === 0)
      return <p> There are no movies in the database </p>;
    return (
      <p>
        There are {this.state.count}
        movies in the database
      </p>
    );
  };
  handeLike = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
}

export default Movies;
