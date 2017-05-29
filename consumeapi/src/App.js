import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      postdetail: [],
      isPostDetail: false,
      loading: true
    }

  }

  componentDidMount() {
    var that = this;
    var url = 'https://jsonplaceholder.typicode.com/posts'

    fetch(url).then(function (response) {
      return response.json()
    })
      .then(function (json) {
        //console.log('parsed json', json)
        that.setState({data: json})
        that.setState({loading: false})

      })
      .catch(function (ex) {
        console.log('parsing failed', ex)
      })

  }

  // click event on post title
  handleClick(postid)
  {
    console.log("clicked" + postid)
    this.setState({loading: true})
    if (postid > 0) { // fetch post detail
      this.setState({isPostDetail: true})

      var that = this;
      var url = 'https://jsonplaceholder.typicode.com/posts/' + postid;

      fetch(url).then(function (response) {
        return response.json()
      })
        .then(function (json) {
          console.log('parsed post json', json)
          that.setState({postdetail: json})
          that.setState({loading: false})
        })
        .catch(function (ex) {
          console.log('parsing failed', ex)
        })
    } else { // back to post list page.
      this.setState({isPostDetail: false})
      this.setState({loading: false})
    }

  }

  render() {

    const {loading} = this.state;

    if (loading) {
      return <div className="loading">loading..</div>; // render null when app is not ready
    }

    const isPostDetail = this.state.isPostDetail;
    let parseddata = null
    console.log("isPostDetail: " + isPostDetail);
    if (isPostDetail) { // post detail
      const jsondata = this.state.postdetail;
      parseddata = <div className="postRow">
        <h2>
          {jsondata.title}</h2>
        <p>{jsondata.body}</p>
        <div>
          <button className="btnBack" onClick={() => this.handleClick(0)}>BACK</button>
        </div>
      </div>

    } else { // list of post
      const jsondata = this.state.data;
      parseddata = jsondata.map((jsond, index) => {
        return (

          <li className="postRow" key={index}>
            <h2 onClick={() => this.handleClick(jsond.id)} id={jsond.id}>{jsond.title}</h2>
            <p>{jsond.body}</p>
          </li>

        )
      })
    }

    return (

      <div className="wrapper">
        <ul>{parseddata}</ul>
      </div>
    );
  }
}

export default App;
