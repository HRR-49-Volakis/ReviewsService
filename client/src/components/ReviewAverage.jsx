import React from 'react';
import axios from 'axios';
import ReviewStars from './ReviewStars.jsx'
import ReviewBar from './ReviewBar.jsx'


class ReviewAverage extends React.Component {
  constructor(props){
    super(props);
  }

  getOverall(reviews) {
    var sum = 0;
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].overall_rating;
    }
    var result = Math.round(10*(sum / 100))/10;
    return result;
  }

  getValue(reviews){
    var sum = 0;
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].value_rating;
    }
    var result = Math.round(10*(sum / 100))/10;
    return result;
  }

  getQuality(reviews){
    var sum = 0;
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].quality_rating;
    }
    var result = Math.round(10*(sum / 100))/10;
    return result;
  }

  getAppearance(reviews){
    var sum = 0;
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].appearance_rating;
    }
    var result = Math.round(10*(sum / 100))/10;
    return result;
  }

  getAssembly(reviews){
    var sum = 0;
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].ease_of_assembly_rating;
    }
    var result = Math.round(10*(sum / 100))/10;
    return result;
  }

  getExpected(reviews){
    var sum = 0;
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].works_as_expected_rating;
    }
    var result = Math.round(10*(sum / 100))/10;
    return result;
  }

  render(){
    const {reviews} = this.props;

    return(
      <div>
        <div > <p>{this.getOverall(reviews)}</p></div>
        <div > <p> <ReviewStars value={this.getOverall(reviews)}/> ({reviews.length})</p></div>
        <div > Average customer ratings</div>
        <div><br></br></div>
        <div ><p>Ease of assembly/installation <ReviewBar completed={this.getAssembly(reviews)}/>{this.getAssembly(reviews)}</p></div>
        <div ><p>Value for money <ReviewBar completed={this.getValue(reviews)}/>{this.getValue(reviews)}</p></div>
        <div ><p>Product quality <ReviewBar completed={this.getQuality(reviews)}/>{this.getQuality(reviews)}</p></div>
        <div ><p>Appearance <ReviewBar completed={this.getAppearance(reviews)}/>{this.getAppearance(reviews)}</p></div>
        <div ><p>Works as expected <ReviewBar completed={this.getExpected(reviews)}/>{this.getExpected(reviews)}</p></div>
        <br></br>
    </div>
    )
  }

}

export default ReviewAverage;