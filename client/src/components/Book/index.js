import React from "react";

export function Book(props) {
  return (
    <li className="card my-2">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <img src={props.image} alt={props.title}></img>
          </div>
          <div className="col-md-9">
            <h3><a href={props.link}>{props.title}</a></h3>
            <p>{props.authors.join(", ")}</p>
            <p>{props.description}</p>
            {props.Button ? <props.Button/> : ""}
          </div>
        </div>
      </div>
    </li>
  )
}

