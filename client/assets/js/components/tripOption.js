import React from 'react'
import { render } from 'react-dom'
import emoji from 'node-emoji'
import randomcolor from 'randomcolor'



export default React.createClass({
  generateTags(tags) {
    var self = this;
    var tag_elems = tags.map(function(word) {
      return (<div className='keyword'>{word}</div>)
    });
    return tag_elems;
  },
  render() {
    var trip = this.props.trip;
    var dep = trip.departure,
        ret= trip.return,
        dest = trip.destination;
    var tags = this.generateTags(dest.tags);
    var hStyle = {
      color: randomcolor({hue: "blue"})
    }


    var flightCost = Math.floor(dep.depart_price + ret.return_price);
    var hotelCost = Math.floor(300.00);
    var finalCost = hotelCost + flightCost;
    var priceStyle;
     if (finalCost < this.props.price - 150) {
      priceStyle = {color: '#1E824C'};
     } else if (finalCost >= this.props.price -150 && finalCost <= this.props.price + 100) {
      priceStyle = {color: '#F2784B'};
    } else {
      priceStyle = {color: '#EF4836'}
    }

    return (
      <div className="trip-option">
        <div className="location">
          <h1> {dep.departure_airport_leave} - <span style={hStyle}>{dep.arrival_airport_leave}</span></h1>
          <sub className="subscript">Travel to <b> {dest.city} </b></sub>
          <p className="description">
            {dest.description}
          </p>
          <div className="dest-keywords">
            {tags}
          </div>
        </div>
        <div className="price">
          <table className="price-breakdown">
            <tr>
              <td className="label">Hotel</td>
              <td>{"+ $" + hotelCost.toString()}</td>
            </tr>
            <tr>
              <td className="label">Flight</td>
              <td>{"+ $" + flightCost.toString()}</td>
            </tr>
          </table>
          <h1 style={priceStyle}> {"$" + finalCost.toString()} </h1>
        </div>
      </div>
    )
  }
})