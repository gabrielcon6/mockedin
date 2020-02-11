import React, { useState , useEffect} from 'react'
import Button from '../../shared/components/FormElements/Button';


const Comments = () =>{
    const [check, setCheck] = useState(false);
    useEffect(() => { 
        setCheck(check)
       
        }, [check])

const handleCheck = (e) =>{
    setCheck(!check)
    console.log(check)

}
  
    return(
        <div>
            <div style={{display:'flex', justifyContent:'flex-start', marginLeft:'3%'}}>
                <h4>Comments :</h4>
            </div>
            <div className='comments__area' style={{display:'flex', width:'90%', height:'20vh', margin:'0 auto', marginBottom:'3%'}}>
                <textarea style={{width:'100%',height:'100%', display:'flex', border: '1px solid black'}} type='text'/>
            </div>
            <div style={{marginBottom:'3%'}}>
                <Button>Save Comment</Button>
                <input type="checkbox" defaultChecked={check} onChange={handleCheck} />
                 {check &&
                <div>
                    <p>porraaaaa</p>
                </div>}
            </div>
        </div>
    )
}

export default Comments ;