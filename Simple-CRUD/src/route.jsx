import { BrowserRouter as Router, Routes, Route } from 'react-dom'
import Home from './components/home'

function RouterComponent() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </Router>
    )
}

export default RouterComponent
