import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const SurveyForm = () => {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const watchTopic = watch('surveyTopic', '');

  useEffect(() => {
    if (watchTopic) {
      
      axios.get(`https://api.example.com/questions?topic=${watchTopic}`)
        .then(response => {
          setAdditionalQuestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching additional questions:', error);
        });
    }
  }, [watchTopic]);

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="form-container">
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <select {...register('surveyTopic', { required: 'Survey Topic is required' })}>
            <option value="">Select Survey Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="error">{errors.surveyTopic.message}</p>}
        </div>

        {watchTopic === 'Technology' && (
          <>
            <div className="form-group">
              <select {...register('favoriteProgrammingLanguage', { required: 'Favorite Programming Language is required' })}>
                <option value="">Favorite Programming Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && <p className="error">{errors.favoriteProgrammingLanguage.message}</p>}
            </div>

            <div className="form-group">
              <input
                type="number"
                placeholder="Years of Experience"
                {...register('yearsOfExperience', {
                  required: 'Years of Experience is required',
                  min: { value: 1, message: 'Experience must be greater than 0' },
                })}
              />
              {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience.message}</p>}
            </div>
          </>
        )}

        {watchTopic === 'Health' && (
          <>
            <div className="form-group">
              <select {...register('exerciseFrequency', { required: 'Exercise Frequency is required' })}>
                <option value="">Exercise Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency.message}</p>}
            </div>

            <div className="form-group">
              <select {...register('dietPreference', { required: 'Diet Preference is required' })}>
                <option value="">Diet Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="error">{errors.dietPreference.message}</p>}
            </div>
          </>
        )}

        {watchTopic === 'Education' && (
          <>
            <div className="form-group">
              <select {...register('highestQualification', { required: 'Highest Qualification is required' })}>
                <option value="">Highest Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <p className="error">{errors.highestQualification.message}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Field of Study"
                {...register('fieldOfStudy', { required: 'Field of Study is required' })}
              />
              {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy.message}</p>}
            </div>
          </>
        )}

        <div className="form-group">
          <textarea
            placeholder="Feedback"
            {...register('feedback', {
              required: 'Feedback is required',
              minLength: { value: 50, message: 'Feedback must be at least 50 characters' },
            })}
          />
          {errors.feedback && <p className="error">{errors.feedback.message}</p>}
        </div>

        {additionalQuestions.map((question, index) => (
          <div className="form-group" key={index}>
            <label>{question.text}</label>
            <Controller
              name={`additionalQuestion${index}`}
              control={control}
              rules={{ required: `${question.text} is required` }}
              render={({ field }) => (
                <input {...field} placeholder={question.placeholder} />
              )}
            />
            {errors[`additionalQuestion${index}`] && <p className="error">{errors[`additionalQuestion${index}`].message}</p>}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="form-summary">
          <h2>Form Submitted Successfully!</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
