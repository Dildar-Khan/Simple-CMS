const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
postTitle: { type: String, required: true },
postStatus: { type: String, required: true},
// allowComments: { type: Boolean, required: true },
postDescription: { type: String, required: true },
imagePath: { type: String, required: true },
creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Post', postSchema);
