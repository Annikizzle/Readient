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
      Axios.get("/api/google", { params: { query: this.state.query } }).then((res) => {
        const books = res.data;
        const googleIDs = res.data.map((book) => book.googleID);
        Axios.get("/api/saved").then((res) => {
          const savedIDs = res.data.map((saved) => saved.book.googleID);
          const unsavedIDs = googleIDs.filter((id) => !savedIDs.includes(id));
          const toDisplay = books.filter((book) => unsavedIDs.includes(book.googleID));
          this.setState({
            books: toDisplay
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  handleSaveBook = (googleID) => {
    const [book] = this.state.books.filter(book => book.googleID === googleID);
    // console.log(book);
    Axios.get("/api/books/googleID/" + googleID).then((res) => {
      console.log(res);
      if (res.data.length > 0) { // If book is already saved, just add it to favorites if logged in
        const [foundBook] = res.data;
        const _id = foundBook._id;
        if (this.props.loggedIn) {
          Axios.post("/api/saved", { _id }).then((res) => {
          }).catch((err) => { // fail to save favorite
            console.log(err);
          });
        }
      }
      else {
        // Save book to database whether user is logged in or not
        Axios.post("/api/books", book).then((res) => {
          // console.log(res.data._id);
          const _id = res.data._id
          // If user is logged in, save book to their favorites as well
          if (this.props.loggedIn) {
            Axios.post("/api/saved", { _id }).catch((err) => { // fail to save favorite
              console.log(err);
            });
          }
    
        }).catch((err) => { // fail to post book
          console.log(err);
        });
      }
  }).catch((err) => { // catch get by googleID
    console.log(err);
  });

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
                          Button={() => (
                            <button 
                              onClick={() => this.handleSaveBook(book.googleID)}
                              className="btn btn-primary">Save</button>
                          )}
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