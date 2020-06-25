const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const { Rentals, validate } = require('../models/rentals');