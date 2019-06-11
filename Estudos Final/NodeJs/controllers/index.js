const Qualquer = require('../models/note');

exports.getNotes = (req, res, next) => {
    Qualquer.fetchRecords()
        .then(notes => {
            console.log(notes);
            res.render('/index', {
                notes: notes,
            });
        }).catch(err => {
            console.log(err);
        })
}
