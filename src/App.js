import React from 'react';
import styles from './App.module.css'; 
import { Tabs, Tab, AppBar, Toolbar } from "@material-ui/core";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Table from './components/wordTable/table';
import Flashcards from './components/flashcards/cards';
import Slider from './components/game';
import PageNotFound from './components/notFound';
import photoshop from './components/images/photoshop.png';


export default function Nav() {
    const routes = ["/", "/flashcards", "/game"]
    return (  
        <div className={styles.nav} >            
            <BrowserRouter>
                <Route path="/" render={(history) => (
                    <AppBar position="static" className={styles.appBar}>
                        <Toolbar variant="dense" className={styles.toolbar}>
                            <div className={styles.logo}>
                                <Link to={'/'}>
                                    <img src={photoshop} alt=" "/>
                                </Link>
                            </div>
                            <Tabs className={styles.tabs}>
                                <Tab value={routes[0]} label="Table" component={Link} to={routes[0]} />
                                <Tab value={routes[1]} label="Flashcards" component={Link} to={routes[1]} />
                                <Tab value={routes[2]} label="Game"  component={Link} to={routes[2]} />
                            </Tabs>
                        </Toolbar>
                    </AppBar>
                )} />
                <Switch>
                    <Route exact path="/flashcards" component={Flashcards} />
                    <Route exact path="/game" component={Slider} />
                    <Route exact path="/" component={Table} /> 
                    <Route component={PageNotFound} />                                                                 
                </Switch>
            </BrowserRouter>
        </div>
    );
}


