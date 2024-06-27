const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const discussionRoutes = require('./routes/discussions');
const commentRoutes = require('./routes/comments');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);
app.use('/comments', commentRoutes);

module.exports = app;
