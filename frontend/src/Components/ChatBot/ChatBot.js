import React, { useState, useRef } from 'react';
import Message from './Message';

export default function ChatBot(props) {
    const [ messages, setMessages ] = useState([]);
    const [ expanded, setExpanded ] = useState(false);
    const chatPaneRef = useRef();

    const messageSentHandler = e => {
        e.preventDefault();
        
        const message = e.target.querySelector("input").value;
        setMessages(prevState => [ 
            ...prevState, 
            { from: props.loggedIn ? props.username : "Anonymous", message } 
        ]);

        fetch("ChatBotData.json")
            .then(response => response.json())
            .then(response => {
                let greetings = 0, formalQuestions = 0, newsletter = 0, meanQuestions = 0, resources = 0, practiceLeaderboard = 0, questions = 0, thanks = 0;
                response.greetings.forEach(greeting => message.includes(greeting) && greetings++);
                response.formalQuestions.forEach(question => message.includes(question.input) && formalQuestions++);
                response.newsletter.forEach(msg => message.includes(msg) && newsletter++);
                response.meanResponses.forEach(msg => message.includes(msg) && meanQuestions++);
                response.resources.forEach(msg => message.includes(msg) && resources++);
                response.practiceLeaderboard.forEach(msg => message.includes(msg) && practiceLeaderboard++);
                response.questions.forEach(msg => message.includes(msg) && questions++);
                response.thanks.forEach(msg => message.includes(msg) && thanks++);

                if (message.includes('potato')) {
                    setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "Bot detected \"potato\". Bot thinks you are willa mackin. Is Bot correct?"} ]);
                } else {
                    if (Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks) === 0) {
                        setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "I didn't understand that, sorry"} ]);
                    } else {
                        if (greetings === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "Hello!"} ]);
                        } else if (formalQuestions === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            response.formalQuestions.forEach(question => message.includes(question.input) && setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: question.output } ]));
                        } else if (newsletter === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "You can find the newsletter https://mtmsband.netlify.app/newsletter!!"} ]);
                        } else if (meanQuestions === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "no u"} ]);
                        } else if (resources === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "You can find your instrument and it's info https://mtmsband.netlify.app/instruments!!"} ]);
                        } else if (practiceLeaderboard === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "You can enter a practice time you're proud of https://mtmsband.netlify.app/practice-leaderboard!!"} ]);
                        } else if (questions === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "You can ask a question you have https://mtmsband.netlify.app/questions!!"} ]);
                        } else if (thanks === Math.max(greetings, formalQuestions, newsletter, meanQuestions, resources, practiceLeaderboard, questions, thanks)) {
                            setMessages(prevState => [ ...prevState, { from: "MTMS Band Chat Bot", message: "Your welcome! Happy to help."} ]);
                        }
                    }
                }
            }); 

        e.target.querySelector("input").value = "";
    }

    return (
        <div className="chat-bot" style={{
            borderRadius: expanded ? '12px 12px 4px 4px' : '2px',
            height: expanded ? '50%' : '38px'
        }}>  
            {expanded &&
                <React.Fragment>
                    <h4>MTMS Band Chat Bot <span onClick={() => setExpanded(false)}>&times;</span></h4>
                    <div className="chat-pane" ref={chatPaneRef}>
                        {messages.map(message => <Message message={message} isBot={message.from === "MTMS Band Chat Bot" ? true : false} />)}
                    </div>
                </React.Fragment>
            }
            <form className="chat-bot-form" onClick={() => !expanded && setExpanded(true)} onSubmit={e => messageSentHandler(e)}>
                <input placeholder="Ask a question..." required />
            </form>
        </div>
    );
}