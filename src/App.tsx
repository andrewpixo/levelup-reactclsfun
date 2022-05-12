import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import * as Classes from "./Classes";
import * as Functions from './Functions';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <div>
            <h1>Classes</h1>
              <Classes.ErrorWrapper>
                  I should still show

                  <Classes.ErrorWrapper>
                      <Classes.BuggyComponent />
                  </Classes.ErrorWrapper>
              </Classes.ErrorWrapper>

          </div>
        <div>
          <h1>Functions</h1>
            <Functions.MyContextWrapper value={"hello world"}>


                <Functions.ContextConsumer />

            </Functions.MyContextWrapper>

            <Functions.MyContextWrapper value={"something different"}>


                <Functions.ContextConsumer />

            </Functions.MyContextWrapper>
        </div>
      </header>
    </div>
  )
}

export default App
