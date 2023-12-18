const mongoose = require('mongoose');
const Book = require('./models/book'); 


const mongoDBURI = 'mongodb://localhost:27017/SmartyShelfApp';


mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


async function addBooks() {
  
  for (let i = 1; i <= 10; i++) {
    try {
      const newBook = new Book({
        title: `Book ${i}`,
        author: `Author ${i}`,
       
      });

      await newBook.save(); 
      console.log(`Book ${i} added successfully.`);
    } catch (err) {
      console.error(`Failed to add Book ${i}:`, err.message);
    }
  }

  
  mongoose.disconnect();
}


addBooks();

