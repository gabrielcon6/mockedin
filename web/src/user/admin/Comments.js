import React, { useState , useEffect} from 'react'
import Button from '../../shared/components/FormElements/Button';
import { Checkbox } from '@thumbtack/thumbprint-react';

import './Comments.scss'
const Comments = () =>{

    const [check, setCheck] = useState(false);

     //   vvvvvv Admin is OK checkbox logic here
     useEffect(() => {
        setCheck(check)
        }, [check])
      const handleCheck = (e) =>{
        setCheck(!check)
      }
    //   ^^^^^^^ Admin is OK checkbox logic up here
    
   
  
    return(
        <div className='comments-main-container'>
            <div className='comments__container' >
                <div className='comments__title' >
                    <h2>Feedback</h2>
                </div>
                <div className='comments__area' style={{display:'flex',flexDirection:'column', width:'80%', height:'20vh', margin:'0 auto', marginBottom:'3%'}}>
                    <h4>About</h4>
                    <textarea className='comments__area-element' style={{width:'100%',height:'100%', display:'flex', border: '1px solid black', fontSize:'15px'}} type='text'/>
                </div>
                <div className='comments__area' style={{display:'flex',flexDirection:'column', width:'80%', height:'20vh', margin:'0 auto', marginBottom:'3%'}}>
                    <h4>Experience</h4>
                    <textarea className='comments__area-element' style={{width:'100%',height:'100%', display:'flex', border: '1px solid black', fontSize:'15px'}} type='text'/>
                </div>
                <div className='comments__area' style={{display:'flex',flexDirection:'column', width:'80%', height:'20vh', margin:'0 auto', marginBottom:'3%'}}>
                    <h4>Education</h4>
                    <textarea className='comments__area-element' style={{width:'100%',height:'100%', display:'flex', border: '1px solid black', fontSize:'15px'}} type='text'/>
                </div>
                <div className='comments-button'>
                    <Button>Send Review</Button>
                </div>
                {/* <div className='text-area-check'>
                    <Checkbox  type="checkbox" onChange={handleCheck}  isChecked={check}>
                    <div>
                    {check ? <span style={{color:'green', fontSize:'18px'}}>Approved</span> 
                    : 
                    <span style={{color:'black', fontSize:'18px'}}>
                    Approve Profile.</span>}
                    </div>
                    </Checkbox>
                </div> */}
            </div>
        </div>
    )
}

export default Comments ;