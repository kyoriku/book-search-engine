import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap'; // Importing the necessary components from react-bootstrap

import Auth from '../utils/auth'; // Importing the Auth module from the utils folder
import { removeBookId } from '../utils/localStorage'; // Importing the removeBookId function from the localStorage module
import { GET_ME } from '../utils/queries'; // Importing the GET_ME query from the queries module
import { REMOVE_BOOK } from '../utils/mutations'; // Importing the REMOVE_BOOK mutation from the mutations module
import { useQuery, useMutation } from '@apollo/client'; // Importing the necessary hooks from the apollo/client module

// Declaring the SavedBooks functional component, which takes in no parameters
const SavedBooks = () => {
  // Destructuring the loading and data properties from the useQuery hook, setting the GET_ME query as the query property
  const { loading, data } = useQuery(GET_ME);
  // Destructuring the me property from the data object, setting it as the userData variable
  const userData = data?.me || {};
  // Destructuring the removeBook mutation from the useMutation hook
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Declaring the handleDeleteBook function, which takes in a bookId parameter
  const handleDeleteBook = async (bookId) => {
    // Declaring the token variable and setting it to the result of the loggedIn method from the Auth module
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // If the token does not exist, return false and exit the function
    if (!token) {
      return false;
    }

    // Try block to execute the removeBook mutation
    try {
      const { data } = await removeBook({
        variables: { bookId }
      });
      
      // Executing the removeBookId function with the bookId parameter
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // If the loading property is true, return a heading element with the text 'LOADING...'
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // If the userData.savedBooks array has a length of 0, return a heading element with the text 'You have no saved books!'
  // Otherwise, return a heading element with the text 'Viewing saved books!' and display each book in the userData.savedBooks array 
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
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

export default SavedBooks; // Exporting the SavedBooks component