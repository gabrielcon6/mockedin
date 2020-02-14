import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import { Checkbox } from '@thumbtack/thumbprint-react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';



import './Feedback.scss'

const Feedback = () =>{

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedFeedback, setLoadedFeedback] = useState();
    const [check, setCheck] = useState(false);
    const userId = useParams().userId;
    // const feedbackId = useParams().feedbackId;
    const history = useHistory();
  
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const isAdmin = storedData.isAdmin
    
  
    const [formState, inputHandler, setFormData] = useForm(
      {
        name: {
            aboutFeedback: '',
          isValid: false
        },
        educationFeedback: {
          value: '',
          isValid: false
        },
        experienceFeedback: {
          value: '',
          isValid: false
        },
        strength: {
          value: '',
          isValid: false
        }
      },
      false
    );
  
    useEffect(() => {
      const fetchFeedback = async () => {
        try {
          const responseData = await sendRequest(
            `/api/feedback/user/${userId}`
          );
          setLoadedFeedback(responseData.feedback[0]);
          setFormData(
            {
              aboutFeedback: {
                value: responseData.feedback.aboutFeedback,
                isValid: true
              },
              educationFeedback: {
                value: responseData.feedback.educationFeedback,
                isValid: true
              },
              experienceFeedback: {
                value: responseData.feedback.experienceFeedback,
                isValid: true
              },
              strength: {
                value: responseData.feedback.strength,
                isValid: true
              }
            },
            true
          );
          console.log('aaaaaaa',loadedFeedback)
        } catch (err) {}

      };
      fetchFeedback();
    }, [sendRequest, userId, setFormData]);
  
      //   vvvvvv Admin is OK checkbox logic here
      useEffect(() => {
        setCheck(check)
        }, [check])
    
      const handleCheck = (e) =>{
        setCheck(!check)
      }
    //   ^^^^^^^ Admin is OK checkbox logic up here

  const feedbackUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/feedback/${loadedFeedback._id}`,
        'PATCH',
        JSON.stringify({
            aboutFeedback: formState.inputs.aboutFeedback.value,
            educationFeedback: formState.inputs.educationFeedback.value,
            experienceFeedback: formState.inputs.experienceFeedback.value,
            strength: formState.inputs.strength.value
            // feedbackId: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
    } catch (err) {}
    history.push('/');
    history.push('/' + auth.userId + '/profile');
  };
  
    if (isLoading) {
      return (
        <div className="center">
          <LoadingSpinner />
        </div>
      );
    }
  
    if (!loadedFeedback && !error) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find feedback!</h2>
          </Card>
        </div>
      );
    }
  
    console.log('aaaaaaa',loadedFeedback)

    return(
        <div className='comments-main-container'>
            <div className='comments__container' >
                <div className='comments__title' >
                    <h2>Feedback</h2>
                </div>
                <form onSubmit={feedbackUpdateSubmitHandler}>
                    <div className='comments__area' 
                    style={{display:'flex',
                    flexDirection:'column', 
                    width:'80%', 
                    height:'20vh', 
                    margin:'0 auto', 
                    marginBottom:'3%'}}>
                        <h4>About</h4>
                        <Input
                        id="aboutFeedback"
                        element="textarea"
                        className='comments__area-element' 
                        style={{width:'100%',height:'100%',
                        display:'flex', 
                        border: '1px solid black', fontSize:'15px'}} 
                        // type='text'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter feedback."
                        onInput={inputHandler}
                        initialValue={loadedFeedback.aboutFeedback}
                        initialValid={true}/>
                    </div>
                    <div className='comments__area' style={{display:'flex',flexDirection:'column', width:'80%', height:'20vh', margin:'0 auto', marginBottom:'3%'}}>
                        <h4>Experience</h4>
                        <Input
                        id="experienceFeedback"
                        element="textarea"
                        className='comments__area-element' 
                        style={{width:'100%',height:'100%',
                        display:'flex', 
                        border: '1px solid black', fontSize:'15px'}} 
                        // type='text'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter feedback."
                        onInput={inputHandler}
                        initialValue={loadedFeedback.experienceFeedback}
                        initialValid={true}/>
                    </div>
                    <div className='comments__area' style={{display:'flex',flexDirection:'column', width:'80%', height:'20vh', margin:'0 auto', marginBottom:'3%'}}>
                        <h4>Education</h4>
                        <Input
                        id="educationFeedback"
                        element="textarea"
                        className='comments__area-element' 
                        style={{width:'100%',height:'100%',
                        display:'flex', 
                        border: '1px solid black', fontSize:'15px'}} 
                        // type='text'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter feedback."
                        onInput={inputHandler}
                        initialValue={loadedFeedback.educationFeedback}
                        initialValid={true}/>
                    </div>
                    <div className='comments-button'>
                        <Button type="submit" disabled={!formState.isValid}>Send Review</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Feedback ;