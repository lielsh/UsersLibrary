import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={() => (<Home/>)}/>
                <Route component={() => (<NotFound/>)}/>
            </Switch>
        </Router>
    );
}