import React from "react";

export function Input(props) {
  return (
    <input className="form-control" {...props} />
  )
}

export function FormBtn(props) {
  return (
    <button {...props}/>
  )
}
