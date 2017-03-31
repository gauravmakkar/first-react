/**
 * Created by gaurav.m on 3/31/17.
 */
/**
 * Importing Router dependencies
 */
import React  from 'react';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
export default class Routes extends React.Component {

    render() {
        return (
            <Router history={hashHistory}>

                <Route name="dashboard" path="/"
                       getComponent={(location, callback) => {
                           require.ensure([], function (require) {
                               callback(null, require('../containers/dashboard/DashboardContainer').default);
                           }, "dashboard");
                       }}>

                    <IndexRoute getComponent={(location, callback) => {
                        require.ensure([], function (require) {
                            callback(null, require('../containers/dashboard/DashboardContainer').default);
                        }, "dashboard");
                    }}/>
                    <Route name="dashboard" path="/dashboard"
                           getComponent={(location, callback) => {
                               require.ensure([], function (require) {
                                   callback(null, require('../containers/dashboard/DashboardContainer').default);
                               }, "dashboard");
                           }}
                    />
                </Route>

            </Router>
        )
    }
}
