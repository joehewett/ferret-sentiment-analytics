import React from 'react';
import { css } from '@emotion/css';


export default function Button({ title, onClick }) {
    return (
      <button className={buttonStyle} onClick={onClick}>
        { title }
      </button>
  )
}

const buttonStyle = css`
    background-color: white;
    font-size: 16px;
    color: black;
    border: 2px solid black;
    padding: 14px 28px;
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 2em;
    margin-right: 2px;
    margin-left: 2rem;
    cursor: pointer;
        :hover {
            background-color: #f2f2f2 

  }
`