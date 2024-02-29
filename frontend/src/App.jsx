import { useState } from 'react';

// IMPORT CONTEXT
import { Username } from './context/Username.jsx';
import { LogInContext } from './context/LogInContext.jsx';

// IMPORT COMPONENT
import StartSite from './component/01-start.jsx'
import './App.css'

function App() {
 

  return (
    <>
     <div>
      <StartSite/>
     </div>
    </>
  )
}

export default App
