import { useState, useEffect } from 'react'; // Importing the useState and useEffect hooks from React
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap'; // Importing the necessary components from react-bootstrap

import Auth from '../utils/auth'; // Importing the Auth module from the utils folder
import { searchGoogleBooks } from '../utils/API'; // Importing the searchGoogleBooks function from the API module
import { saveBookIds, getSavedBookIds } from '../utils/localStorage'; // Importing the saveBookIds and getSavedBookIds functions from the localStorage module

import { useMutation } from '@apollo/client'; // Importing the useMutation hook from the apollo/client module
import { SAVE_BOOK } from '../utils/mutations'; // Importing the SAVE_BOOK mutation from the mutations module

// Declaring the SearchBooks functional component, which takes in no parameters
const SearchBooks = () => {
  // Declare a searchedBooks state variable and a setSearchedBooks function to update the state variable
  const [searchedBooks, setSearchedBooks] = useState([]);
  // Declare a searchInput state variable and a setSearchInput function to update the state variable
  const [searchInput, setSearchInput] = useState('');
  // Declare a savedBookIds state variable and a setSavedBookIds function to update the state variable
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Destructure the saveBook mutation from the useMutation hook
  const [saveBook] = useMutation(SAVE_BOOK);

  // Use the useEffect hook to save the savedBookIds list to localStorage on component unmount
  useEffect(() => {
    return () => saveBookIds(savedBookIds); 
  });

  // Declare the handleFormSubmit function, which takes in an event parameter
  const handleFormSubmit = async (event) => {
    event.preventDefault(); 

    // If the searchInput state variable is empty, return false and exit the function
    if (!searchInput) {
      return false;
    }

    // Try block to execute the searchGoogleBooks function and update the searchedBooks state variable with the result
    try {
      const response = await searchGoogleBooks(searchInput);

      // If the response is not ok, throw an error and exit the function
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // Destructure the items property from the response object and map over the array to create a new array of book objects
      const { items } = await response.json();
      // Map over the items array and create a new array of book objects with the desired properties
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      // Update the searchedBooks state variable with the new array of book objects
      setSearchedBooks(bookData);
      // Clear the searchInput state variable
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // Declare the handleSaveBook function, which takes in a bookId parameter
  const handleSaveBook = async (bookId) => {
    // Find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Declaring the token variable and setting it to the result of the loggedIn method from the Auth module
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // If the token does not exist, return false and exit the function
    if (!token) {
      return false;
    }

    // Try block to execute the saveBook mutation
    try {
      await saveBook({
        variables: { bookData: { ...bookToSave } },
      });

      // If the book is successfully saved, update the savedBookIds state variable with the new bookId
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) { 
      console.error(err);
    }
  };

  // Return form to search for books and display the search results
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks; // Exporting the SearchBooks component
