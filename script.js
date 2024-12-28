// Importing and Connecting to the Database
import { lookup } from "dns/promises";
import { MongoClient } from "mongodb";
let url = "mongodb://localhost:27017/";

let cilent = new MongoClient(url);

// Adding Data To DataBase
/* async function addData() {
  try {
    await cilent.connect();
    console.log("Connected to the Database");

    let db = cilent.db("LibrarySystem");

    let books = db.collection("Books");
    let authors = db.collection("Authors");
    let borrowers = db.collection("Borrowers");

    let booksCollection = [
        {
            "_id": 1,
            "title": "Harry Potter and the Philosopher's Stone",
            "author": 1,
            "genre": "Fantasy",
            "publication_year": 1997
        },
        {
            "_id": 2,
            "title": "1984",
            "author": 2,
            "genre": "Dystopian",
            "publication_year": 1949
        },
        {
            "_id": 3,
            "title": "The Hobbit",
            "author": 3,
            "genre": "Fantasy",
            "publication_year": 1937
        },
        {
            "_id": 4,
            "title": "Animal Farm",
            "author": 2,
            "genre": "Political Fiction",
            "publication_year": 1945
        },
        {
            "_id": 5,
            "title": "The Lord of the Rings: The Fellowship of the Ring",
            "author": 3,
            "genre": "Fantasy",
            "publication_year": 1954
        }
    ]

        let authorCollection = [
        {
            _id: 1,
            name: "J.K. Rowling",
            age: 58,
            country: "United Kingdom",
        },
        {
            _id: 2,
            name: "George Orwell",
            age: 46,
            country: "USA",
        },
        {
            _id: 3,
            name: "J.R.R. Tolkien",
            age: 81,
            country: "United Kingdom",
        },
        ];

        let borrowersCollection = [
        {
            _id: 1,
            name: "Alice",
            borrowed_books: [1],
            borrow_date: "2023-12-01",
        },
        {
            _id: 2,
            name: "Bob",
            borrowed_books: [2],
            borrow_date: "2023-12-05",
        },
        {
            _id: 3,
            name: "Charlie",
            borrowed_books: [5],
            borrow_date: "2023-12-10",
        },
        ];




    
    
    let result1 = await books.insertMany(booksCollection);
    let result2 = await authors.insertMany(authorCollection);
    let result3 = await borrowers.insertMany(borrowersCollection);

    console.log("Books added to the database:", result1.insertedCount);
    console.log("Authors added to the database:", result2.insertedCount);
    console.log("Borrowers added to the database:", result3.insertedCount);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await cilent.close();
  }
}

addData(); */
 

// Find and Query Data
/*
 async function findData() {
  try {
    await cilent.connect();
    console.log("Connected to the Database");

    let db = cilent.db("LibrarySystem");

    let books = db.collection("Books");
    let authors = db.collection("Authors");
    let borrowers = db.collection("Borrowers");

    // Query to find all books by a particular author
    let authorQuery = authors.aggregate([
      {
        $lookup: {
          from: "Books", // Join with the Books collection
          localField: "_id", // Match _id from Authors
          foreignField: "author", // Match the 'author' field in Books
          as: "Books_Written",
        },
      },
      {
        $unwind: "$Books_Written", // Flatten the array of books
      },
      {
        $match: {
          "Books_Written.author": 2, // Match author as a number
        },
      },
      {
        $project: {
          name: 1, // Include the author's name
          "Books_Written.title": 1, // Include the title of the book
          "Books_Written.genre": 1, // Include the genre of the book
        },
      },
    ]);

    // Query to find all books published after a certain year
    let publicationQuery = { publication_year: { $gt: 1950 } };

    // Query to find all books borrowed of a particular genre
    let borrowersQuery = borrowers.aggregate([
      {
        $lookup: {
          from: "Books", // Join with the Books collection
          localField: "borrowed_books", // Field in Borrowers collection
          foreignField: "_id", // Field in Books collection
          as: "borrowed_book_info", // Alias for the joined data
        },
      },
      {
        $unwind: "$borrowed_book_info", // Flatten the array of borrowed books
      },
      {
        $match: { "borrowed_book_info.genre": "Fantasy" }, // Filter by genre
      },
      {
        $project: {
          name: 1, // Return the borrower's name
          borrowed_books: 1, // Return the list of borrowed books
          borrow_date: 1,
          "borrowed_book_info.title": 1, // Return book titles
        },
      },
    ]);

    // Query to find all authors from a particular country
    let countryQuery = { country: "United Kingdom" };

    // Printing the results
    let result1 = await authorQuery.toArray();
    let result2 = await books.find(publicationQuery).toArray();
    let result3 = await borrowersQuery.toArray();
    let result4 = await authors.find(countryQuery).toArray();

    console.log("Find all books by a particular author:", result1);
    console.log("Find all books published after 1950:", result2);
    console.log(
      "Find all borrowers who borrowed books of a particular genre:",
      result3
    );
    console.log("Find all authors from United Kingdom:", result4);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await cilent.close();
  }
}

findData();
 */

// Sort Data
/* 
async function sortData () {
    try {
        await cilent.connect();
        console.log("Connected to Database");

        const db = cilent.db("LibrarySystem");
        let books = db.collection("Books");
        let authors = db.collection("Authors");
        let borrowers = db.collection("Borrowers");

        let result1 = await books.find({}, {projection : {_id : 0,title : 1,publication_year : 1}}).sort({ publication_year : 1}).toArray();

        let result2 = await authors.find({}, {projection : {_id : 0,name : 1,age : 1}}).sort({ age : -1 }).toArray();

        let result3 = await borrowers.find({}, {projection : {_id :0,name:1,borrowed_books: 1}}).sort({ borrowed_books : -1}).toArray();

        console.log("Sort books by publication year (ascending): ", result1)
        console.log("Sort authors by age (descending): ", result2)
        console.log("Sort borrowers by the number of books borrowed (descending)", result3)
    } catch(err) {
        console.log(err)
    } finally {
        await cilent.close()
    }
}

sortData();
 */

// Update Data
/* 
async function updateData () {
    try {
        await cilent.connect();
        console.log("Connected to Database");

        const db = cilent.db("LibrarySystem");
        let books = db.collection("Books");

        let existingGenre = { genre : "Fantasy" }
        let addGenre = { $set : {genre : "Thriller"}}



        let result = await books.updateMany(existingGenre,addGenre)

        console.log(result.matchedCount,"Document Updated !!!")

    } catch(err) {
        console.log(err)
    } finally {
        await cilent.close()
    }
}

updateData();  */

// Delete Data
/* 
async function deleteData () {
    try {
        await cilent.connect();
        console.log("Connected to Database");

        const db = cilent.db("LibrarySystem");
        let books = db.collection("Books");

        let existingGenre = { genre : "Fantasy" }



        let result = await books.deleteOne(existingGenre)

        console.log(result.matchedCount,"Document deleted !!!")

    } catch(err) {
        console.log(err)
    } finally {
        await cilent.close()
    }
}

deleteData();  */

// Limit Data
/* 
async function limitData () {
    try {
        await cilent.connect();
        console.log("Connected to Database");

        const db = cilent.db("LibrarySystem");
        let books = db.collection("Books");
        let authors = db.collection("Authors");
        let borrowers = db.collection("Borrowers");

        let result1 = await books.find({}, {projection : {_id : 0,title : 1,publication_year : 1}}).sort({ publication_year : 1}).limit(3).toArray();

        let result2 = await authors.find({}, {projection : {_id : 0,name : 1,age : 1}}).sort({ age : 1 }).limit(2).toArray();


        console.log("Find the first 3 books sorted by publication year: ", result1)
        console.log("Find the first 2 authors who are the youngest: ", result2)
    } catch(err) {
        console.log(err)
    } finally {
        await cilent.close()
    }
}

limitData();
 */



// Join Data Using $lookup
/* Use the $lookup operator to join Books with Authors based on the author field in Books (which is the author_id from Authors).
Return the list of books along with the author's name.  */

/* async function findData() {
    try {
      await cilent.connect();
      console.log("Connected to the Database");
  
      let db = cilent.db("LibrarySystem");
  
      let books = db.collection("Books");
      
      let booksQuery = books.aggregate([
        {
            $lookup : {
                from : "Authors",
                localField : "author",
                foreignField : "_id",
                as : "author_info"
            }
        },
        {
            $unwind: "$author_info",
        },
        {
            $project : {
                title : 1,
                genre : 1,
                publication_year : 1,
                "author_info.name" : 1,
                "author_info.country" : 1
            }
        }
      ])

      let result = await booksQuery.toArray();

      console.log(result)
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      await cilent.close();
    }
  }

  findData(); */



//  A Complex Join
/*  Use $lookup to join Books with Authors and Borrowers to return a list of books, with their authors' details, and the names of borrowers who have borrowed them. */
  async function joinedData () {
    try {
        await cilent.connect();
        console.log("Connected to Database");

        const db = cilent.db("LibrarySystem");
        let books = db.collection("Books");

        let booksQuery = books.aggregate([
            {
                $lookup : {
                    from : "Authors",
                    localField : "author",
                    foreignField : "_id",
                    as : "author_details"
                }
            }, 
            {
                $unwind : "$author_details"
            },
            {
                $lookup : {
                    from : "Borrowers",
                    localField : "_id",
                    foreignField : "borrowed_books",
                    as : "borrower_details"
                }
            }, 
            {
                $unwind : {
                    path: "$borrower_details", // Flatten borrower_info if it exists
                    preserveNullAndEmptyArrays: true // Keep books without borrowers
                }
            },
            {
                $project: {
                    title: 1, 
                    genre: 1, 
                    "author_details.name": 1, 
                    "author_details.country": 1, 
                    "borrower_details.name": 1, 
                    "borrower_details.borrow_date": 1 
                }
            }
             
        ])

        let result = await booksQuery.toArray();
        console.log("Books with Author & Borrower Details",result)
    } catch(err) {
        console.log(err)
    } finally {
        await cilent.close()
    }
}

joinedData();