/**
 * Created by gaurav.m on 4/3/17.
 */
import React, {Component} from 'react';
import './table.css'
export default class Table extends Component {

    render() {

        if (this.props.rows.length > 0) {
            return (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Is Internal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.rows.map(function(row){
                        return (<tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.internal?'Internal':'External'}</td>
                        </tr>)
                    })}

                    </tbody>
                </table>
            )

        } else {
            return null
        }

    }
}