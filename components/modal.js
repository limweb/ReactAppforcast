import './modal.css';
import React  from 'react';
import ReactDOM   from 'react-dom';
import { ModalActions, ModalStore } from './../store/modalstore';
import Reflux from 'reflux';

var Modal = React.createClass({
  mixins: [ Reflux.listenTo(ModalStore, 'onChange') ],
  getInitialState: function () {
    return {
        isOpened: false
      , hasOverlay: true
    }
  },

  componentDidUpdate: function () {
    if (this.state.isOpened) {
      this.positionModal()
      this.addKeyUpListener()
    }
    else {
      this.removeKeyUpListener()
    }
  },

  positionModal: function () {
    // Position the modal to the center of the screen
    // Due to dynamic width\height, CSS is out of the question *sadface*
    // Unless flex-box knows something I don't (this is distinctly possible)
    // var modal = this.refs.modal.getDOMNode()
    var modal = ReactDOM.findDOMNode(this.refs.modal)
      , vh = window.innerHeight
      , vw = window.innerWidth
      , mh = $(modal).height()
      , mw = $(modal).width()

    $(modal).css({
      left: ((vw / 2) - (mw / 2)) + 'px',
      top:  ((vh / 2) - (mh / 2)) + 'px'
    })
  },

  // TODO: Probably a cleaner way of doing this....
  onChange: function (state) {
    if (state.action === 'open') {
      this.state.title      = state.title
      this.state.content    = state.content
      this.state.buttons    = state.buttons
      this.handleOpenModal()
    }
    else {
      this.state.title      = ''
      this.state.content    = ''
      this.state.buttons    = null
      this.handleCloseModal()
    }
  },
  
  addKeyUpListener: function () {
    window.addEventListener('keyup', this.handleKeyUp)
  },

  removeKeyUpListener: function () {
    window.removeEventListener('keyup', this.handleKeyUp)
  },

  handleClickOutside: function (event) {
    if (event.target === event.currentTarget) {
      this.handleCloseModal()
    }
  },

  handleKeyUp: function (event) {
    if (event.keyCode === 27) {
      this.handleCloseModal()
    }
  },

  handleOpenModal: function () {
    this.setState({ isOpened: true })
    $('body').addClass('modal-is-shown')
  },

  handleCloseModal: function () {
    this.setState({ isOpened: false })
    $('body').removeClass('modal-is-shown')
  },

  renderOverlay: function () {
    if (this.state.hasOverlay) {
      return <div className='ui-modal-overlay' onClick={this.handleClickOutside} />
    }
  },

  renderTitle: function () {
    if (this.state.title) {
      return (
        <div className='modal-title'>
          <h4>{this.state.title}</h4>
        </div>
      )
    }
  },

  renderContent: function () {
    return (
      <div className='modal-content'>{this.state.content}</div>
    )
  },

  renderActions: function () {
    if (this.state.buttons) {

      var modalButtons = this.state.buttons.map(function (button, key) {
        var classes = 'btn btn-' + button.type
        return (
          <button key={key} onClick={button.callBack} className={classes}>{button.text}</button>
        )
      }, this)

      return (
        <div className='modal-actions'>
          {modalButtons}
        </div>
      )
      
    }
  },
  
  render: function () {
    if (this.state.isOpened) {
      return (
        <div className='ui-modal-wrapper'>
          {this.renderOverlay()}
          <div ref='modal' className='ui-modal'>
            <div className='modal-inner'>
              {this.renderTitle()}
              {this.renderContent()}
              {this.renderActions()}
            </div>
            <div className='ui-close-modal'>
              <a href='#' onClick={this.handleCloseModal}><i className='fa fa-close' /></a>
            </div>
          </div>
        </div>
      )
    } 
    else {
      return <div></div>
    }
  }
})

export default Modal;
