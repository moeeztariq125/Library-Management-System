import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BookScreen from './screens/BookScreen'
import './index.css'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import BookListScreen from './screens/BookListScreen'
import BookEditScreen from './screens/BookEditScreen'
import BookBorrowersScreen from './screens/BookBorrowersScreen'
import BorrowedBooksScreen from './screens/BorrowedBooksScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/book/:id' component={BookScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/profile/' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/booklist' component={BookListScreen} />
          <Route path='/admin/book/:id/edit' component={BookEditScreen} />
          <Route path='/admin/borrowers' component={BookBorrowersScreen} />
          <Route path='/borrowed' component={BorrowedBooksScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
