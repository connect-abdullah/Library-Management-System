# Library Management System 📚  

Welcome to the **Library Management System** repository! This is a backend-only project built using **Node.js** and **MongoDB** to practice working with databases and performing CRUD operations.

---

## 📌 Features  

### Data Collections  
1. **Books**: A collection of all books in the library.  
2. **Authors**: Details about the authors of the books.  
3. **Borrowers**: Records of who borrowed which books and when.  

### Tasks Performed  
1. Connected to a **MongoDB** database using the `MongoClient`.  
2. Inserted data into collections:  
   - Books  
   - Authors  
   - Borrowers  
3. Executed **MongoDB Aggregation Queries**:  
   - `$lookup`: Performed joins between collections.  
   - `$unwind`: Flattened arrays to simplify query results.  
   - `$project`: Selected specific fields from collections for cleaner outputs.  
   - `$match`: Applied filters to retrieve specific data.  

### Example Queries  
1. **Find Books by a Specific Author**  
   - Used `$lookup` to join the `Books` collection with `Authors`.  
2. **Filter Books Published After a Certain Year**  
   - Applied `$match` to filter books based on the `publication_year`.  
3. **Find Borrowed Books by Genre**  
   - Used `$lookup` to join `Borrowers` with `Books` and filtered based on `genre`.  
4. **List Authors by Country**  
   - Filtered authors based on their country of origin.
5. **Update Book Genre**
   - Update the Books collection to set a new genre to a specific book.
6. **Limit Results**
   - Find the first 3 books sorted by publication year.
7. **Join Data Using $lookup**
   - Use the $lookup operator to join Books with Authors based on the author field in Books (which is the author_id from Authors).
   - Return the list of books along with the author's name.
8. **Final Task**
   - Use $lookup to join Books with Authors and Borrowers to return a list of books, with their authors' details, and the names of borrowers who have borrowed them.
---

## 🛠️ Technologies Used  
- **Node.js**: For server-side programming and logic.  
- **MongoDB**: As the database to store and query information.  

---

## 🌱 Purpose  
This project is solely for learning and practicing backend development. It helped me understand how to:  
1. Work with multiple collections and their relationships.  
2. Use MongoDB’s powerful aggregation framework.  
3. Manage backend functionality using Node.js.
   
--- 
## 📝 How to Run  
1. Clone the repository:  
   ```bash
   git clone https://github.com/connect-abdullah/Library-Management-System.git
2. Navigate to the project directory:
   ```bash
   cd Library-Management-System
3. Install dependencies:
   ```bash
   npm install nodejs mongodb
4. Run the application:
   ```bash
   node script.js
