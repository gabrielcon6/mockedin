import React, {useState} from 'react';
import CardMockedin from '../../../shared/components/UIElements/CardMockedin'

import { FaStar, FaPoo } from 'react-icons/fa';
import './ProgressBar.css';


const ProgressBar = props => {
    const [progress, setProgres] = useState(0)

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const isAdmin = storedData.isAdmin

    const handleScore = (e) => {
        let score = parseInt(e.target.value)*25
        setProgres(score)
    }

    return (
        <CardMockedin className="cardMocke">

            <div className='progress-bar-title'>
                <h2>Profile strengh: </h2>
            </div>
            <div className='strenght-bar'>
                <div className='strengh-bar__element'>
                    <div className="progress-wrap progress">
                        <div className="progress-bar progress" style={{left: progress + '%'}}></div>
                    
                    </div>
                    <div className='strenght-bar-star'>
                            <FaPoo style={{color: 'rgb(100,70,41)'}}/>
                            <FaStar style={{color:'rgb(238,184,44)'}}/>
                        </div>
                    
                </div>
            </div>
            {isAdmin && (
            <div className='select-element'>
                <div class="select">
                <select name="slct" id="slct" onChange={handleScore}>
                    <option selected disabled>Rate this profile</option>
                    <option value="1">Bad</option>
                    <option value="2">Meh...</option>
                    <option value="3">Good.</option>
                    <option value="4">Great!!</option>
                </select>
                </div>
            </div>
            )}
            <br />
        </CardMockedin>
    );
};

export default ProgressBar;
