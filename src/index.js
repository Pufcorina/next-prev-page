import React from "react";
import './index.css';


const Page = props => {
    const {page} = props;
    return (<div> {page} </div>);
}

class NextPrevPage extends React.Component{
  constructor(props) {
    super(props)

    let disabledNext = false;
    let disabledPrev = true;
    let showSubmit = false;

    if (props.pages.length == 1)
    {
      disabledNext = true;
      disabledPrev = true;
      showSubmit = true;
    }

    this.state = {
      index: 0,
      disabledNext: disabledNext,
      disabledPrev: disabledPrev,
      showSubmit: showSubmit
    }
  }

  togglePrev(e) {
    let index = this.state.index - 1
    let disabledPrev = false
    let showSubmit = false
    if (index <= 0) {
      e.preventDefault()
      index = 0
      disabledPrev = true
      showSubmit = false
    }

    this.setState({ index: index, disabledPrev: disabledPrev, disabledNext: false, showSubmit: showSubmit })
  }

  toggleNext(e) {
    let index = this.state.index + 1
    let disabledNext = false
    let showSubmit = false
    if (index === this.props.pages.length - 1) {
      e.preventDefault()
      index = this.props.pages.length - 1
      disabledNext = true
      showSubmit = true
    }

    this.setState({ index: index, disabledNext: disabledNext, disabledPrev: false, showSubmit: showSubmit })
  }

  
  render() {
    const { index, disabledNext, disabledPrev, showSubmit } = this.state
    const page = this.props.pages ? this.props.pages[index] : null
    if (page) {
      return (
       <div className='container-next-prev'>
          <div className='container-body'>
            <Page page={page} />
          </div>
          
          <div className='container-buttons'>
            <button onClick={this.props.submitOnClick.bind(this)} className={"subbmit-button " + (showSubmit ? "" : "hidden")}>Submit</button>
            <button onClick={this.toggleNext.bind(this)} className={(disabledNext ? "hidden" : "")} disabled={disabledNext}>Next &raquo;</button>
            <button onClick={this.togglePrev.bind(this)} className={(disabledPrev ? "hidden" : "")} disabled={disabledPrev}>&laquo; Previous</button>
          </div>
       </div>
      )
    } else {
      return (
        <div className='container-next-prev'>
          <p>Empty string, please add at least one component!</p>
       </div>
      )
    }
  }
}

export default NextPrevPage;
