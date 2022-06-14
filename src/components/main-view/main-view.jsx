import React from 'react';

import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';

import { LoginView } from '../login-view/login-view';

import { MovieCard } from '../movie-card/movie-card';

import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Componen {
    constructor() {
      super();
      // Initial state is set to null
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    }

    componentDidMount(){
      axios.get('https://myapiflix.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(user) {
        this.setState({
          user
        });
    }

    onRegister(registered) {
        this.setState({
          registered,
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (registered) {
          return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;
        }

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
            //forcing a registration form for testing
        if (!user) {
          return (
            <LoginView
              onLoggedIn={(user) => this.onLoggedIn(user)}
              onRegister={(bool) => this.onRegister(bool)}
            />
          );
        }
        
        if (movies.length === 0) return <div className="main-view"/>;

        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
    }
    
}
