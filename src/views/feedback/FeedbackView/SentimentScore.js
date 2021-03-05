/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Predictions } from 'aws-amplify';

export default function TextInterpretation({ text }) {
  const [response, setResponse] = useState('');
  const [textToInterpret] = useState(text);

  function interpretFromPredictions() {
    console.log('Interpeting from predictions', textToInterpret);
    try {
      Predictions.interpret({
        text: {
          source: {
            text: textToInterpret,
          },
          type: 'ALL'
        }
      }).then((result) => {
        console.log('got result');
        console.log(result);
        setResponse(JSON.stringify(result, null, 2));
      }).catch((err) => {
        console.log('caught error');
        setResponse(JSON.stringify(err, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    interpretFromPredictions();
  }, []);

  return response;
}
