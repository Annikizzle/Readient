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
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    console.log(this.props.loggedIn);
    if (this.props.loggedIn) { // Get user's saved books
      Axios.get("/api/saved").then((res) => {
        console.log(res);
        this.setState({
          saved: res.data
        });
      }).catch((err) => {
        console.log(err);
      });

    }
    else { // Otherwise get books stored in database

    }
  }
  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (this.state.query.length > 0) {
  //     Axios.get("/api/google", { params: { query: this.state.query } }).then((res) => {
  //       console.log(res);
  //       this.setState({
  //         books: res.data
  //       });
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }

  // handleSaveBook = (googleID) => {
  //   const [book] = this.state.books.filter(book => book.googleID === googleID);

  //   // Save book to database whether user is logged in or not
  //   Axios.post("/api/books", book).then((res) => {
  //     // console.log(res.data._id);
  //     const _id = res.data._id
  //     // If user is logged in, save book to their favorites as well
  //     if (this.props.loggedIn) {
  //       Axios.post("/api/saved", { _id }).then((res) => {
  //         console.log(res);
  //       }).catch((err) => { // fail to save favorite
  //         console.log(err);
  //       });
  //     }

  //   }).catch((err) => { // fail to post book
  //     console.log(err);
  //   });

  // }

  render() {
    return (
      <div className="col-12 my-5 mx-auto">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Saved</h2>
            </div>
            <div className="card-body">
              {this.state.saved.length < 1 ? <h2 className="text-center">No Saved Books Yet</h2> : (
                <ul className="p-0">
                  {this.state.saved.map((entry) => (
                    <Book key={entry.book.googleID} 
                          title={entry.book.title}
                          authors={entry.book.authors}
                          description={entry.book.description}
                          image={entry.book.image}
                          link={entry.book.link}
                          googleID={entry.book.googleID}
                          status={entry.status}
                          // Button={() => (
                          //   <button 
                          //     onClick={() => this.handleSaveBook(entry.book.googleID)}
                          //     className="btn btn-primary">Save</button>
                          // )}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
    )
  }
}

export default Saved;