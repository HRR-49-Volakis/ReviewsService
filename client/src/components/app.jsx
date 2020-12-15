import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import Slider from './Slider.jsx';
import SliderButton from './SliderButton.jsx';
import BackSlider from './BackSlider.jsx';
import '../styles.css'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reviewsArray: [],
      slideOpen: false
    }
    this.getReviews = this.getReviews.bind(this);
    this.SliderClick = this.SliderClick.bind(this);
    this.BackSliderClick = this.BackSliderClick.bind(this);

  }

  SliderClick() {
    this.setState({
      slideOpen: !this.state.slideOpen
    })
  }

  getProductIdFromPath() {
    var url = window.location.pathname;
    var result = url.split('/');
    var id = result[3];
    if (id === undefined) {
      id = 1;
    }
    console.log('the id is: ', id);
    return id;
  }

  BackSliderClick() {
    this.setState({
      slideOpen: false
    })
  }
  getReviews(){
    console.log(this.getProductIdFromPath());
    axios.get('/api/products/' + this.getProductIdFromPath() + '/reviews/allReviews')
    .then(res => {
      console.log('in getReviews function')
      console.log('this is res:', res)
      this.setState({
        reviewsArray: res.data.rows
      });
    })
    .catch(err => console.log('Couldn\'t GET reviews', err))
  }

  componentDidMount() {
    this.getReviews();
  }

  render(){
    let backdrop;
    if(this.state.slideOpen){
      backdrop = <BackSlider close={this.BackSliderClick}/>;
     }

    return(
      <div>
        <Slider reviews={this.state.reviewsArray} show={this.state.slideOpen}/>
        { backdrop }
        <SliderButton reviews={this.state.reviewsArray} toggle={this.SliderClick}/>
      </div>
    )
  }

}

export default App;