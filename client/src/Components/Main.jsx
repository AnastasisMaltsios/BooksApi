import React, {useState} from "react";
import Footer from "./Footer";
import "../styles/Main.css"
import axios from "axios";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SearchIcon from '@mui/icons-material/Search';


function Main() {
        const [error, setError] = useState("");
        const [books, setBooks] = useState({items: []});
        const [search, setSearch] = useState("");


    async function searchData() {
        try {
            setError("");
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}+inauthor:${search}&filter=free-ebooks&key=${apiKey}`);   
            if (response.data.totalItems === 0) {
                setBooks({items: []});
            setError("No books found, please try again.");
            } else {
                setBooks(response.data);
        console.log(response.data);
            }
        } catch (error) {
            console.log(error);    
        }
    }
    function handleEnter (event) {
    if (event.key === 'Enter') {
        setSearch("");
        searchData();
    };
}
    return  (
    <div>
        <div className="main-navbar">
            <h1><ImportContactsIcon fontSize="large"/>  Book Store</h1>
            <ul className="main-nav-list">
            </ul>
        </div>
        <div className="main-container">
            <h1 className="main-title">Time to Search</h1>
            <div className="search">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Search by title or author.."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={handleEnter}
                />
                {error && <p className="error-message">{error}</p>}
                <span><SearchIcon /></span>
            </div>
        </div>
        {books.items && books.items.length > 0 && (
  <div className="books-list">
    {books.items.map((book) => (
      <div key={book.id} className="book-item">
        <h3>Title: {book.volumeInfo.title}</h3>
        <p>Author: {book.volumeInfo.authors}</p>
      </div>
    ))}
  </div>
) }
        <Footer/>
    </div>
    );
}


export default Main;