import { BrowserRouter ,Route , Routes  } from "react-router-dom"
import SignIn from '../src/pages/SignIn'
import Register from '../src/pages/Register'
import Dashbord from '../src/pages/Dashbord'

import ProtectRout from '../src/components/ProtectRout'
import LandingPage from "./pages/LandingPage"


function App() {


  return (
    <BrowserRouter>

     <Routes>

      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<LandingPage/>}></Route>
       


      <Route element={<ProtectRout/>} >
      <Route path="/dashbord" element={<Dashbord/>}></Route>
      
      </Route>


     </Routes>

    
    </BrowserRouter>
  )
}

export default App
