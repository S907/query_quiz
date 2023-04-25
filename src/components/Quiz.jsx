import React, { useState, useEffect} from 'react';
import { useQuizData } from '../Queries/QueryHooks/quiz.hook';

console.log('Line 3')
const ind =0;
const questions = [
    {
        questionText: 'What is the capital of France?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Dublin', isCorrect: false },
        ],
    },
    {
        questionText: 'Who is CEO of Tesla?',
        answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Bill Gates', isCorrect: false },
            { answerText: 'Tony Stark', isCorrect: false },
        ],
    },
    {
        questionText: 'The iPhone was created by which company?',
        answerOptions: [
            { answerText: 'Apple', isCorrect: true },
            { answerText: 'Intel', isCorrect: false },
            { answerText: 'Amazon', isCorrect: false },
            { answerText: 'Microsoft', isCorrect: false },
        ],
    },
    {
        questionText: 'How many Harry Potter books are there?',
        answerOptions: [
            { answerText: '1', isCorrect: false },
            { answerText: '4', isCorrect: false },
            { answerText: '6', isCorrect: false },
            { answerText: '7', isCorrect: true },
        ],
    },
];

const Quiz = ()=> {
    const[currentQues, setCurrentQues]=useState(0);
    const[showScore, setShowScore] =useState(false);
    const [categoryType, setcategoryType]=useState('');
    const[parseData, setParseData]=useState('');
    const[surveyQues, setSurveyQues]=useState('');
    const [newCuQues, setNewCuQues]=useState('')
    const[getOptions, setOptions]=useState([])
    console.log('Component Start')
    useEffect(()=>{
        console.log('Use Effect start')
        document.title = 'Quiz App Page'
        console.log('Use Effect end:::::::::::')
        return ()=>{}
        
    },[])
    console.log('Component mid')

    const onSuccess = (data)=>{
        // console.log(`Response from json-server ${data}`);

        let apiData = data[0];
        console.log('onSuccess::::', apiData.category);
        if(apiData.category === 'poll'){
            setcategoryType(apiData.category);
            let cleanJsonString = apiData.json_data.replace(/\n/g, '')
            console.log('70:::::::', typeof cleanJsonString);
            let parsedData = JSON.parse(cleanJsonString);
            console.log('72::::::::', parsedData);
            setNewCuQues(parsedData.surveys.question1.question);
            setOptions(parsedData.surveys.question1.options)


            // console.log('OPTIONS:::::::', parsedData.surveys.question1);
            // setParseData(JSON.parse(apiData.json_data));
            // console.log('Data:::::', apiData.json_data);
        }

    }
    const onError = (error)=>{
        console.log(`Error is ${error}`);
    }

    const{data:quizData, isLoading:contentLoader} = useQuizData(onSuccess,onError)
	console.log('QUIZDATA:::::', quizData);
	console.log('OPTIONS:::::::::', typeof getOptions, getOptions);
	
   
   
    const handleOnClick = (e) =>{
        // console.log(`alert You Clicked ${e.target}`);
        const nextQuestion = currentQues + 1
        console.log('nextQuestion:::::',nextQuestion);
        if(nextQuestion < questions.length){
            setCurrentQues(nextQuestion);
        }else{
            setShowScore(true)

        }
        
    }
    console.log('Component end:::::::::::::::::');
    // console.log('::::::::', questions[currentQues]);
    
	return (
		<div className='app'>
			{/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
			{contentLoader ? (
				<div className='score-section'>You scored {currentQues+1} out of {questions.length}</div>
			) : (
				<>
             
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQues+1}</span>/{questions.length}
						</div>
						{/* <div className='question-text'>{questions[currentQues].questionText}</div> */}
						<div className='question-text'>{newCuQues}</div>
					</div>
					<div className='answer-section'>
						{/* {questions[currentQues].answerOptions.map(({answerText}, ind)=>{
                        return <button key={ind+1} onClick={handleOnClick}>{answerText}</button>
                        })} */}

                        {getOptions.map((data, ind)=>{
                            return <button key={ind+1}>{data.label}</button>
                        })}
					</div>
				</>
			)}
		</div>
	);

    
}

console.log('Component Last End')

export default Quiz