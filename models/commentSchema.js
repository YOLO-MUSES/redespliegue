const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Asegúrate de que 'User' sea el modelo correcto
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile', // Asegúrate de que 'Profile' sea el modelo correcto
    },
    stars: {
        type: Number,
        required: true,
    },
    commentaries: {
        type: String,
        required: true, // Asegúrate de que el campo correcto sea 'commentaries'
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
