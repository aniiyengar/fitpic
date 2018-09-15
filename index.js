
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import formidable from 'formidable';

const app = express();
app.use((req, res, next) => {
    const form = new formidable.IncomingForm({
        maxFileSize: 10 * 1024 * 1024,
    });
    form.once('error', console.error);
    form.parse(req, (err, fields, files) => {
        Object.assign(req, { fields, files });
        req.body = req.fields;
        next();
    });
});

const userSchema = new mongoose.Schema({
    username: 'string',
    password: 'string',
})

const User = mongoose.model('User', userSchema);

const picSchema = new mongoose.Schema({
    caption: 'string',
    url: 'string',
    user: 'string',
});

const Pic = mongoose.model('Pic', picSchema);

app.post('/register', (req, res, next) => {
    User.create({ ...req.body }, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            res.json(user);
        }
    });
});

app.post('/login', (req, res, next) => {
    User.findOne({ ...req.body }, (err, user) => {
        if (err) {
            console.error(err);
        } else if (!user || Object.keys(user).length === 0) {
            res.json({
                error: 'Invalid credentials.',
            });
        } else {
            res.json(user);
        }
    });
});

app.get('/', (req, res, next) => {
    res.send('i love it');
})

app.post('/pic', (req, res, next) => {
    User.findOne({
        username: req.body.username,
        password: req.body.password,
    }, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            // upload the thing
            if (pic.size !== 0) {
                // pic
            }
        }
    })
})

app.listen(8080);
