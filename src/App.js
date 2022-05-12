import Home from './home';
import { Appwrite } from 'appwrite';
import Login from './login';
import { useState } from 'react';

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
  .setEndpoint('http://localhost:8080/v1') // Your Appwrite Endpoint
  .setProject('627d1ff6b672cf951da8') // Your project ID;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const checkCredentials = () => {
    appwrite
      .account.createSession(username, password)
      .then(response => {
        setUserId(response.userId);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setIsLoggedIn(true);
      })
      .catch(error => {
        alert(error.message);
      })
  }

  const handleSignup = () => {
    appwrite
      .account.create('unique()', username, password)
      .then(response => {
        appwrite.database.createDocument(
          '627d22ce27e7cbe044a2',
          response.$id,
          {savedMemesArr: []}
        )
        setIsLoggedIn(true);
        setUserId(response.userId);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      })
      .catch(error => {
        alert(error.message);
      })
  }

  if(!isLoggedIn) {
    return <Login checkCredentials={checkCredentials} setUsername={setUsername} setPassword={setPassword} handleSignup={handleSignup} setUserId={setUserId}/>
  }
  return (
      <Home userId={userId}/>
  )
}
 
export default App;