import { BrowserRouter ,Route , Routes  } from "react-router-dom"
import SignIn from '../src/pages/SignIn'
import Register from '../src/pages/Register'
import Dashbord from '../src/pages/Dashbord'
import Completed from '../src/pages/Completed'
import Pending from '../src/pages/Pending'
import ProtectRout from '../src/components/ProtectRout'


function App() {


  return (
    <BrowserRouter>

     <Routes>

      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>

      <Route element={<ProtectRout/>} >
      <Route path="/" element={<Dashbord/>}></Route>
      <Route path="/completed" element={<Completed/>}></Route>
      <Route path="/pending" element={<Pending/>}></Route>
      </Route>


     </Routes>

    
    </BrowserRouter>
  )
}

export default App
