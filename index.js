
const steps = {
    start: {
        question: "some question?",
        helper: "",
        yes: "oneWayTogo",
        no: "anotherWayTogo",
    },
    oneWayTogo: {
        question: "Is the printer online?",
        helper: "",
        yes: "storyEnds",
        no: "eitherWay",
    },
    anotherWayTogo: {
        question: "Try restarting the print job.",
        helper: "",
        yes: "oneWayTogo",
        no: "eitherWay",
    },
    storyEnds: {
        message: "The document is printing successfully.",
    },
    eitherWay: {
        message: "Please contact IT for assistance.",
    }

   
};


let currentStep = localStorage.getItem('currentStep') || 'start';


function updateCard(step) {
    const card = document.getElementById('question-card'); 

    if (steps[step].message) {
        
        card.innerHTML = `<h2 class="end-message">${steps[step].message}</h2>`;
        localStorage.removeItem('currentStep'); 
    } else {
        
        card.innerHTML = `
            <h2 id="question-text">${steps[step].question}</h2>
            <h2 id="question-text">${steps[step].helper}</h2>
            <button onclick="nextStep('yes')">Yes</button>
            <button onclick="nextStep('no')">No</button>
        `;
        localStorage.setItem('currentStep', step); 
    }
}


function nextStep(answer) {
    const currentStepObj = steps[currentStep];  

    if (currentStepObj && currentStepObj[answer]) {
        currentStep = currentStepObj[answer];  
        updateCard(currentStep); 
    } else {
        console.error("Invalid step or answer");  
    }
}


updateCard(currentStep);
        