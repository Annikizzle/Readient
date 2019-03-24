import React, { Component } from "react";
import Axios from "axios";
import { Input, FormBtn } from "../components/Form";
import { Book } from "../components/Book";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      query: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.query.length > 0) {
      Axios.get("/api/google", { params: { query: this.state.query} }).then((res) => {
        console.log(res);
        this.setState({
          books: res.data
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 my-5 mx-auto">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Search</h2>
            </div>
            <div className="card-body">
              <form>
              <div className="form-group">
                <label htmlFor="searchBooksInput">Book</label>
                <Input type="text" 
                  id="searchBooksInput" 
                  placeholder="The Martian"
                  name="query"
                  value={this.state.query}
                  onChange={this.handleChange}
                />
              </div>
              <FormBtn className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</FormBtn>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 my-5 mx-auto">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Results</h2>
            </div>
            <div className="card-body">
              {this.state.books.length < 1 ? <h2 className="text-center">Search for a book to begin!</h2> : (
                <ul className="p-0">
                  {this.state.books.map((book) => (
                    <Book key={book.googleID} 
                          title={book.title}
                          authors={book.authors}
                          description={book.description}
                          image={book.image}
                          link={book.link}
                          googleID={book.googleID}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;