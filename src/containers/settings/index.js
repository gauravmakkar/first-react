/**
 * Created by gaurav.m on 3/31/17.
 */
import React, {Component} from 'react';
import './settings.css';
import {connect} from 'react-redux'
import {fetchDefaultSettings} from '../../actions/settings';

class SettingsContainer extends Component {
    render() {
        return (
            <div className="settingsContainer">

                {JSON.stringify(this.props.settings)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        settings:state.settings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDefaultSettings: function (data) {
            dispatch(fetchDefaultSettings(data));
        },
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
