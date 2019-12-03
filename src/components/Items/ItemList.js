import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemsActions from "../../redux/actions/ItemActions";
import {  ListGroup } from 'reactstrap';
import SelectInput from "../toolbox/SelectInput";
import Pagination from "react-js-pagination";
import {Row,Col} from "reactstrap" 
import alertify from "alertifyjs"

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSort: 0,
      activePage: 1,
      isHovered: {}

    };

    this.onChange = this.onChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

  }
  componentDidMount() {
 //   this.props.actions.getItems(this.props.items);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  handleMouseEnter = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };

  toggleSortDate = (key, type) => {
    this.props.actions.changeSort(key, type, this.props.items);
    this.forceUpdate();
  };



  upItem(item) {
    this.props.actions.upItem(item);
    this.toggleSortDate("upVote", "desc");
  }

  deleteItem(item) {
    this.props.actions.deleteItem(item.id);
    alertify.error(item.name + " removed");

  }

  downItem(item) {
    this.props.actions.downItem(item);
    this.toggleSortDate("upVote", "desc");
  }


  onChange(event) {
    const { name, value } = event.target;

    this.setState({ selectedSort: value }, () => {
      if (value == 1) {
        this.toggleSortDate("upVote", "desc");
      } else if (value == 2) {
        this.toggleSortDate("upVote", "asc");
      }
    });


  }


  render() {
    const { selectedSort, isHovered } = this.state;

    let toogleSort = [{ id: 1, text: "Most Voted(Z -> A)" }, { id: 2, text: "Less Voted(A -> Z)" }];
    return (
      <div>
        <SelectInput
          name="id"
          label=""
          value={selectedSort}
          defaultOption="Order By"
          options={toogleSort.map(item => ({
            value: item.id,
            text: item.text
          }))}
          onChange={this.onChange}
        //  error={errors.itemKey}
        />
        <ListGroup>

          {this.props.items.slice((this.state.activePage*5)-5,this.state.activePage*5).map((item, index) => (
             <Row style={{flex:1,justifyContent: "center",alignItems: "center", marginBottom: '10px'}}> 
             <Col xs="4" style={{ 'display': 'flex',  'flex-direction': 'column',  'justify-content': 'center',   'align-items': 'center',    'border': '1px solid',    'height': '72px',    'border-radius': '12px',    'background-color': 'lightgray' }} >
                <strong>{item.upVote}</strong>
                <span>Points</span>
            </Col>
            <Col xs="8">
            <div onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={() => this.handleMouseLeave(index)}>
            <Col xs="12">  {item.name} </Col>
            <Col xs="12">  {item.link} </Col>
             
              <i onClick={() => this.upItem(item)} className="fa fa-arrow-up" icon="spinner" inverse />Up Vote
             
              <i onClick={() => this.downItem(item)} className="fa fa-arrow-down" icon="spinner" inverse />Down Vote
              
              {isHovered[index] && <i  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(item) } } className="fa fa-trash" icon="spinner" inverse />
              }
            </div>
            </Col>
        </Row>
          ))}
        </ListGroup>

        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.props.items.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
       </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.itemsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeSort: bindActionCreators(itemsActions.changeSort, dispatch),
      addItem: bindActionCreators(itemsActions.addItem, dispatch),
      upItem: bindActionCreators(itemsActions.upItem, dispatch),
      downItem: bindActionCreators(itemsActions.downItem, dispatch),
      deleteItem: bindActionCreators(itemsActions.deleteItem, dispatch)
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
