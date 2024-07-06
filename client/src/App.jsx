import { BrowserRouter ,Route , Routes  } from "react-router-dom"
import SignIn from '../src/pages/SignIn'
import Register from '../src/pages/Register'
import Dashbord from '../src/pages/Dashbord'


function App() {


  return (
    <BrowserRouter>

     <Routes>

      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Dashbord/>}></Route>



     </Routes>

    
    </BrowserRouter>
  )
}

export default App
