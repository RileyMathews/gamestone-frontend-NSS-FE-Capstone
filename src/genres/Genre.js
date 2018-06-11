import React, { Component } from 'react'
import './Genre.css'

class Genre extends Component {


    render() {
        return (
            <p className="genre">{this.props.genre}</p>
        )
    }
}

export default Genre
