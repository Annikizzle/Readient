import React, { Component } from "react";
import Axios from "axios";
import { Book } from "../components/Book";

class Saved extends Component {
  constructor(props) {
    super();

    this.state = {
      saved: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getSavedBooks();
  }
  
  getSavedBooks = () => {
    if (this.props.loggedIn) { // Get user's saved books
      Axios.get("/api/saved").then((res) => {
        this.setState({
          saved: res.data
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  handleDeleteBook = (id) => {
    if (this.props.loggedIn) {
      Axios.delete("/api/saved/" + id).then((res) => {
        this.getSavedBooks();
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  
  render() {
    return (
      <div className="col-12 my-5 mx-auto">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Favorites</h2>
            </div>
            <div className="card-body">
              {!this.props.loggedIn ? <h2 className="text-center">Log in to see your saved books</h2> : 
                this.state.saved.length < 1 ? <h2 className="text-center">No Saved Books Yet</h2> : (
                  <ul className="p-0">
                    {this.props.loggedIn ? this.state.saved.map((entry) => (
                      <Book key={entry.book.googleID} 
                            title={entry.book.title}
                            authors={entry.book.authors}
                            description={entry.book.description}
                            image={entry.book.image}
                            link={entry.book.link}
                            googleID={entry.book.googleID}
                            status={entry.status}
                            Button={() => (
                              <button 
                                onClick={() => this.handleDeleteBook(entry.book._id)}
                                className="btn btn-primary">Delete</button>
                            )}
                      />
                    )) : <h2 className="text-center">Log in to see your saved books</h2>}
                  </ul>
                )}
            </div>
          </div>
        </div>
    )
  }
}

export default Saved;