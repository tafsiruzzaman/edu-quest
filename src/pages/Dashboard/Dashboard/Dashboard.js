import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Dashboard.css';
import NewQuiz from '../NewQuiz/NewQuiz';
import NotFound from '../../NotFound/NotFound';
import ManageQuizzes from '../ManageQuizzes/ManageQuizzes/ManageQuizzes';
import Edit from '../Edit/Edit/Edit';
import Manage from '../Manage/Manage/Manage';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const {user, logOut} = useAuth();
    return (
        <div className="container my-5">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <NavLink className="text-decoration-none text-danger ms-5" to="/dashboard"><span><i className="me-2 fas fa-user-cog"></i></span>Dashboard</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav>
                            <NavLink className="text-decoration-none text-danger mt-2 me-5" to="/home">Home</NavLink>
                            <NavLink className="text-decoration-none text-danger mt-2 me-5" to={`${url}/newquiz`}>New Quiz</NavLink>
                            <NavLink className="text-decoration-none text-danger mt-2 me-5" to={`${url}/quizzes`}>Manage Quizzes</NavLink>
                            {
                                user.email &&
                                <div className="btn-colour">
                                    <Button onClick={logOut} variant="rounded-0 text-white me-5 px-3">
                                        <i className="fas fa-sign-in-alt"></i> Sign Out
                                    </Button>
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path={path}>
                    <ManageQuizzes></ManageQuizzes>
                </Route>
                <Route path={`${path}/quizzes`}>
                    <ManageQuizzes></ManageQuizzes>
                </Route>
                <Route path={`${path}/newquiz`}>
                    <NewQuiz></NewQuiz>
                </Route>
                <Route path={`${path}/edit/:id`}>
                    <Edit></Edit>
                </Route>
                <Route path={`${path}/manage/:id`}>
                    <Manage></Manage>
                </Route>
                <Route path={`${path}/*`}>
                    <NotFound></NotFound>
                </Route>
            </Switch>
        </div>
    );
};

export default Dashboard;