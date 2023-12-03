// Create web server
// 
// Created by Jesse Jurman
// Version 0.0.1

// Requires
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Models
var Comment = require('../models/comment');

// Middleware
router.use(bodyParser.json());

// Routes
router.route('/')
	// Get all comments
	.get(function (req, res, next) {
		Comment.find({}, function (err, comments) {
			if (err) throw err;
			res.json(comments);
		});
	})
	// Post a new comment
	.post(function (req, res, next) {
		Comment.create(req.body, function (err, comment) {
			if (err) throw err;
			res.json(comment);
		});
	});

router.route('/:commentId')
	// Get a comment by id
	.get(function (req, res, next) {
		Comment.findById(req.params.commentId, function (err, comment) {
			if (err) throw err;
			res.json(comment);
		});
	})
	// Update a comment by id
	.put(function (req, res, next) {
		Comment.findByIdAndUpdate(req.params.commentId, {
			$set: req.body
		}, {
			new: true
		}, function (err, comment) {
			if (err) throw err;
			res.json(comment);
		});
	})
	// Delete a comment by id
	.delete(function (req, res, next) {
		Comment.findByIdAndRemove(req.params.commentId, function (err, comment) {
			if (err) throw err;
			res.json(comment);
		});
	});

module.exports = router;