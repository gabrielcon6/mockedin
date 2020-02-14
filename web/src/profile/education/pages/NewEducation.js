import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const NewEducation = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      school: {
        value: '',
        isValid: false
      },
      degree: {
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

  const history = useHistory();

  const educationSubmitHandler = async event => {
    event.preventDefault();
  try {
    await sendRequest(
      '/api/education',
      'POST',
      JSON.stringify({
        school: formState.inputs.school.value,
        degree: formState.inputs.degree.value,
        startDate: formState.inputs.startDate.value,
        endDate: formState.inputs.endDate.value,
        description: formState.inputs.description.value,
      }),
      { 
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.token
     }
    );
    history.push('/');
    history.push('/' + auth.userId + '/profile');
  } catch (err) {}
};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={educationSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="school"
          element="input"
          type="text"
          label="School"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your name to be displayed."
          onInput={inputHandler}
        />
        <Input
          id="degree"
          element="input"
          type="text"
          label="Degree"
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
        <Input
          id="endDate"
          element="input"
          type="date"
          label="End Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Comment by the recruiter."
          onInput={inputHandler}
        />
           <Input
          id="description"
          element="text"
          type="text"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Comment by the recruiter."
          onInput={inputHandler}
        />
      
        <Button type="submit" >
          ADD Education
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewEducation;
