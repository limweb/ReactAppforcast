import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore,combineReducers,applyMiddleware } from 'redux'
import { Provider, connect,thunk } from 'react-redux'
import _ from 'lodash'



// Main component.
class Main extends React.Component {
  render() {
    return (
      <div>
        <Child {...this.props} />
        <p><a href="#" onClick={this.props.onChangeName}>Change Name</a></p>
        <p><a href="#" onClick={this.props.onChangeSurname}>Change Surname</a></p>
      </div>
    )
  }
}

// Child component using same props.
class Child extends React.Component {
  render() {
    return (
      <h2>
        <a href="#" onClick={(e) => this.props.onChangeMe(e, "Tee", "Pluss")}>{this.props.name} {this.props.surname}</a>
      </h2>
    )
  }
}

// Properties and function defined.
Main.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  onChangeMe: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeSurname: PropTypes.func.isRequired
}

// const changeMe = { type: 'changeMe' }
// const changeName = { type: 'changeName', to: "Mr.Tee" }
// const changeSurname = {type: 'changeSurname', to: "Plus Plus" }

// The logic and data, depend on action type.

function actionx(state={},action){
	switch(action.type){
	//case 'xxxx':
	//	do some thing
	//	return state
	default:
    	return state;
	}
}

function actionStore(state = {name: "Hi", surname: "You"}, action) {
  var name = state.name;
  switch (action.type) {
    case 'changeMe':
      return { 
        name: action.name,
        surname: action.surname
      }
    case 'changeName': 
      return {
        name: action.name,
        surname: state.surname
      };
    case 'changeSurname': 
      return {
        name: state.name,
        surname: action.surname
      }
  }
  return state;
}

const rootReducer = combineReducers({
  actionStore,
  actionx
});

// Create store.
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}

var store = configureStore();

// Mapping state properties from store.
function mapStateToProps(state) {
  return {
    name: state.name,
    surname: state.surname
  }
}

// Mapping actions.
function mapDispatchToProps(dispatch) {
  return {
    onChangeMe: (e, name, surname) => {
      e.preventDefault();
      dispatch({
        type: 'changeMe',
        name: name,
        surname: surname
      });
    },
    onChangeName: (e) => {
      e.preventDefault();
      dispatch({
        type: 'changeName',
        name: 'T'
      });
    },
    onChangeSurname: (e) => {
      e.preventDefault();
      dispatch({
        type: 'changeSurname',
        surname: 'P'
      });
    } 
  }
}

// Main App.
var App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

// Render to document.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)