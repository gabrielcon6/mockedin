import React from 'react';
import CardMockedin from '../../../shared/components/UIElements/CardMockedin'

import { FaStar, FaPoo } from 'react-icons/fa';
import './ProgressBar.css';

// var progress = 25;

// var wrapper_elt = document.querySelector('.progress-wrap');
// var progress_elt = document.querySelector('.progress-bar');

// //resize
// var width = wrapper_elt.getBoundingClientRect().width;

// var update = function(progress) {
//   var percent = progress / 100;
//   var total = percent * width;
  
//   progress_elt.style.left = Math.floor(total)+'px';
// };

// var make_loop = function(val, duration) {
//   var current = 0;
//   var tsinc = duration / val;
//   var loop = function() {
//     if( current <= val ) {
//       update(current++);
//       window.setTimeout(loop, tsinc);
//     }
//   }
//   loop();
// };

// make_loop(60, 2000);

const ProgressBar = props => {
  return (
    <CardMockedin className="cardMocke">

        <div className='progress-bar-title'>
            <h2>Profile strengh: </h2>
        </div>
        <div className='strenght-bar'>
            <div className='strengh-bar__element'>
                <div class="progress-wrap progress">
                    <div class="progress-bar progress" style={{left:'100%'}}></div>
                   
                </div>
                <div className='strenght-bar-star'>
                        <FaPoo style={{color: 'rgb(100,70,41)'}}/>
                        <FaStar style={{color:'rgb(238,184,44)'}}/>
                    </div>
                
            </div>
        </div>
        <div className='select-element'>
            <div class="select">
            <select name="slct" id="slct">
                <option selected disabled>Rate this profile</option>
                <option value="1">Bad</option>
                <option value="2">Meh...</option>
                <option value="3">Good.</option>
                <option value="4">Great!!</option>
            </select>
            </div>
        </div>
    </CardMockedin>
  );
};

export default ProgressBar;
