import Home from './home';
const Login = ({setUsername, setPassword, checkCredentials, handleSignup, setUserId}) => {
  if(localStorage.getItem('userId')) {
    setUsername(localStorage.getItem('username'));
    setPassword(localStorage.getItem('password'));
    setUserId(localStorage.getItem('userId'));
    return <Home userId={localStorage.getItem('userId')}/>
  }
    return ( 
        <section className="h-screen">
  <div className="px-6 h-full text-gray-800">
    <div
      className="flex flex-col xl:items-center lg:items-between justify-center items-center flex-wrap h-full g-6"
    >
      <div className='flex items-center'>
            <img src="https://appwrite.io/images-ee/press/square-logo-pink.svg" className='w-40' alt="" />
            <img src="https://i.ibb.co/T2zx0cW/Screenshot-2022-05-13-at-3-12-55-AM.png" className='w-40 h-32 rounded-lg' alt="" />
      </div>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="username"
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Pass Input */}
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              type="button"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={()=>checkCredentials()}
            >
              Login
            </button>
            <button
              type="button"
              className=" ml-2 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={()=>handleSignup()}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
     );
}
 
export default Login;