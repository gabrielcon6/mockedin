import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';

import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import '../../../places/pages/PlaceForm.css';

const UpdateExperience = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedExperience, setLoadedExperience] = useState();
  const experienceId = useParams().experienceId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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
      description:{
        value: null,
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const responseData = await sendRequest(
          `/api/experiences/${experienceId}`
        );
        setLoadedExperience(responseData.experience);
        setFormData(
          {
            title: {
              value: responseData.experiences.name,
              isValid: true
            },
            company: {
              value: responseData.experiences.jobTitle,
              isValid: true
            },
            startDate: {
              value: responseData.experiences.about,
              isValid: true
            },
            endDate: {
              value: responseData.experiences.image,
              isValid: true
            },
            description: {
              value: responseData.experiences.description,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchExperience();
  }, [sendRequest, experienceId, setFormData]);

  const experienceUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/experiences/${experienceId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          company: formState.inputs.company.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value,
          description:formState.inputs.description.value,
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

  if (!loadedExperience && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find experience!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedExperience && (
        <form className="place-form" onSubmit={experienceUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your title."
            onInput={inputHandler}
            initialValue={loadedExperience.title}
            initialValid={true}
          />
          <Input
            id="company"
            element="input"
            type="text"
            label="Company"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the name of the company."
            onInput={inputHandler}
            initialValue={loadedExperience.company}
            initialValid={true}
          />
          <Input
            id="startDate"
            element="input"
            type="date"
            label="Start Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedExperience.startDate}
            initialValid={true}
          />
          <Input
            id="endDate"
            element="input"
            type="date"
            label="End Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your about text."
            onInput={inputHandler}
            initialValue={loadedExperience.endDate}
            initialValid={true}
          />
           <Input
            id="description"
            element="textarea"
            type="text"
            label="description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your title."
            onInput={inputHandler}
            initialValue={loadedExperience.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE Experience
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateExperience;
