// const express = require("express")
// const movies = express.Router()
const db = require("../models");
const Movie = db.movies;
const axios = require('axios');

require('dotenv').config()
const KEY = process.env.KEY

exports.getByTitle = (req, res) => {
    const { title } = req.query
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${title}&page=1&include_adult=false`)
    .then(response => {
        const { results } = response.data 
        if (results.length) res.status(200).json(results)
        else res.status(422).json( {error: "No results to display!"} )
    })
}

exports.getById = (req, res) => {
    const { id } = req.params
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`)
    .then(response => res.json(response.data))
    .catch(response => response.status(404).json( {error: "No movie with that ID!"} ))
}

exports.getPopular = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`)
    .then(response => {res.json(response.data)})
    .catch(response => response.status(404).json( {error: "Unable to get popular movies."} ))
}