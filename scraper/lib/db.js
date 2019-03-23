import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Setup the DB
const adapter = new FileSync('../db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ twitter: [], instagram: [] }).write();

//// Example of how to persist to db.json
// // Add a post
// db.get('posts')
// .push({ id: 1, title: 'lowdb is awesome'})
// .write();

export default db;