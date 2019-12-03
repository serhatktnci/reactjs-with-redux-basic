import React, { Component } from 'react'
import {Row,Col} from "reactstrap" 
import ItemList from '../Items/ItemList'
import {Link} from "react-router-dom"

export default class Dashboard extends Component {
    render() {
        return (
            <div>
             <Row style={{flex:1,justifyContent: "center",alignItems: "center"}}> 
                <Col xs="4">
                    <ItemList/>
                </Col>
             </Row>
            </div>
        )
    }
}
