const getDb = require('../database/cloudKit').getDb;

class Note {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    static save() {
        getDb.saveRecord(record).then(
            function(response) {
                if (response.hasErrors) {
                    console.error(response.errors[0]);
                    self.saveButtonEnabled(true);
                    return;
                }
                var createdRecord = response.records[0];
                self.notes.push(createdRecord);

                self.newNoteTitle("");
                self.newNoteContent("");
                self.saveButtonEnabled(true);
            }
        );
        // Define o titulo da nota
        if (self.newNoteTitle().length > 0 && self.newNoteContent().length > 0) {
            self.saveButtonEnabled(false);
            
            //Pega os valores do HTML e salva dentro de um Jeason 
            var record = {
                recordType: "CloudNote",
                fields: {
                    title: {
                        value: self.newNoteTitle()
                    },
                    text: {
                        value: self.newNoteContent()
                    }
                }
            };
            
        

        }
        else {
            alert('Note must have a title and some content');
        }
    }

    static fetchRecords () {
        var query = { recordType: 'CloudNote' };
        const db = getDb();
        // Execute the query.
        return db.performQuery(query).then(function (response) {
            if(response.hasErrors) {
                console.error(response.errors[0]);
                return;
            }
            var records = response.records;
            var numberOfRecords = records.length;
            if (numberOfRecords === 0) {
                console.error('No matching items');
                return;
            }

            self.notes(records);
        });
    }
}

module.exports = Note;