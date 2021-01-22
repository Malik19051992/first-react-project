import * as _ from 'lodash';
import React from 'react';

import './Product-rating.scss';
import starempty from '../../assets/images/starempty.png';
import starfull from '../../assets/images/starfull.png';
import starhalffull from '../../assets/images/starhalffull.png';

export class ProductRating extends React.Component<{ rating: number }> {


  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="product-rating-wrapper">
        {_.map([1, 2, 3, 4, 5], (item: number) => {
          if (item <= this.props.rating) {
            return (<img key={'star' + item} src={starfull}/>);
          } else if (this.props.rating > item - 1 &&  this.props.rating < item ) {
            return (<img key={'star' + item} src={starhalffull}/>);
          } else {
            return (<img key={'star' + item} src={starempty}/>);
          }
        })}
      </div>
    );
  }
}