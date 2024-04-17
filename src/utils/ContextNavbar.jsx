import React, {Children, useState} from 'react'
import Navbar2 from "../Navbar2"
export const navBarContext = React.createContext();

function ContextNavbar() {
    const [isLogged, setIsLogged] = useState(1);

    function funcion(){

    }
  return (
    <div>
        <navBarContext.Provider value={{isLogged, setIsLogged}}>
            <Navbar2/>
        </navBarContext.Provider>
    </div>
  )
}

export default ContextNavbar