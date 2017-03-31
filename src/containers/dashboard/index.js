/**
 * Created by gaurav.m on 3/31/17.
 */
import React, {Component} from 'react';
import './dashboard.css';
import {connect} from 'react-redux';
import {fetchWidgets} from '../../actions/dashboard'

class DashboardContainer extends Component {
    componentWillMount() {
        this.props.fetchWidgets({})
    }

    render() {
        return (
            <div className="dashboardContainer">

                {this.props.widgets.map(function(widget,index){
                    return (<div className="widget" key={index}>This is the widget {widget.name}</div>)
                })}

            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        widgets:state.dashboard.widgets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchWidgets: function (data) {
            dispatch(fetchWidgets(data));
        },
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
