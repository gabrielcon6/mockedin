import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox } from '@thumbtack/thumbprint-react';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const NewExperience = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [check, setCheck] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      company: {
        value: '',
        isValid: false
      },
      startDate: {
        value: '',
        isValid: false
      },
      endDate: {
        value: null,
        isValid: false
      },
      description: {
        value: null,
        isValid: false
      }
    },
    false
  );

    useEffect(() => {
      setCheck(check)
      }, [check])
      const handleCheck = (e) =>{
      setCheck(!check)
    }  

  const history = useHistory();

  const experienceSubmitHandler = async event => {
    event.preventDefault();
  try {
    await sendRequest(
      '/api/experiences',
      'POST',
      JSON.stringify({
        title: formState.inputs.title.value,
        company: formState.inputs.company.value,
        startDate: formState.inputs.startDate.value,
        endDate: formState.inputs.endDate.value,
        description: formState.inputs.description.value,
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={experienceSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your name to be displayed."
          onInput={inputHandler}
        />
        <Input
          id="company"
          element="input"
          label="Company"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Job Title."
          onInput={inputHandler}
        />
        <Input
          id="startDate"
          element="input"
          type="date"
          label="Start Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter something about yourself."
          onInput={inputHandler}
        />
        { !check &&(
          <Input
            id="endDate"
            element="input"
            type="date"
            label="End Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Comment by the recruiter."
            onInput={inputHandler}
          />
        )}
          <div className='text-area-check'>
            <Checkbox  type="checkbox" onChange={handleCheck}  isChecked={check}>
              <div>
                {check ? <span style={{color:'grey', fontSize:'18px'}}>
                  I am currently working in this role</span> 
                : 
                <span style={{color:'black', fontSize:'18px'}}>
                I am currently working in this role.</span>}
              </div>
            </Checkbox>
          </div>
         <Input
          id="description"
          element="textarea"
          type="text"
          label="description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Comment by the recruiter."
          onInput={inputHandler}
        />
        <Button type="submit" >
          ADD experience
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewExperience;
