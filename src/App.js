import React, {Component} from 'react';
import { Button , Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : "",
            isStarted : false,
            randomSentence : "Click on Start button",
            helperText : "Click on Start !",
            timerValue : 0,
        }
        this.input = React.createRef();
    }

    timer;

    clickHandler = () => {
        const sentences = ["if you want peace prepare for war !" , "no pain without gain" , "we are losing objective doha"];
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        this.input.current.value = "";
        this.setState({
            isStarted : true,
            randomSentence : randomSentence,
            helperText : "you are far!",
        });
        this.timerHandler();
    };

    inputHandler = (event) => {

        this.setState({
            inputValue : event.target.value,
        },() => {

            const {randomSentence , inputValue} = this.state;
            let sameWord = [];
            let splitInputValue = inputValue.split(" ");
            let splitSentence = randomSentence.split(" ");

            splitInputValue.forEach(word => {
                let findWord = splitSentence.find(letter => letter === word);
                if(typeof findWord !== "undefined"){
                    sameWord.push(findWord);
                }
            });

            if(sameWord.length === splitSentence.length){

                this.setState({
                    isStarted : false,
                    helperText : "that is ture!",
                    timerValue : 0,
                    randomSentence : "Click on Start button",
                });
                this.fireAlert();
                clearInterval(this.timer);

            }else if(splitSentence.length - sameWord.length <= 3){

                this.setState({
                    helperText : "You are getting close",
                });

            }else if(splitSentence.length - sameWord.length > 3){

                this.setState({
                    helperText : "You are far!",
                });

            }
        });
    };

    fireAlert = () => {
        const {timerValue} = this.state;
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            icon : "success",
            title: "Great Job!",
            text : `You spent ${timerValue} doing this`,
        });
    };

    timerHandler = () => {
        let sec = 0;
        let min = 0;
        this.timer = setInterval(() => {
            sec++;
            if(sec === 59){
                min++;
                sec = 0;
            }
            // eslint-disable-next-line no-unused-expressions
            String(sec).length === 1 ? sec = "0" + sec : sec;
            // eslint-disable-next-line no-unused-expressions
            String(min).length === 1 ? min = "0" + min : min;

            this.setState({
                timerValue : `${min}:${sec}`,
            })
        },1000);
    };


  render() {
      const {isStarted , randomSentence , helperText , timerValue} = this.state;
    return (
        <Container>
            <div className="box mt-5 text-center">
                <h2 className="text-white">TestType <span className="text-info">Speed</span></h2>
                <div className="form rounded p-3 w-50 mx-auto mt-5">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="text-white">{randomSentence}</h5>
                        <h6 className="text-warning">{helperText}</h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <input type="text" className="input rounded text-white bg-black w-75" placeholder="type text above..." onChange={this.inputHandler} disabled={!isStarted} ref={this.input}/>
                        <h5 className="text-white">{timerValue ? timerValue : "00:00"}</h5>
                    </div>
                </div>
                <Button variant="warning" className="text-white mt-4" onClick={this.clickHandler} disabled={isStarted}>Start</Button>
            </div>
        </Container>
    );
  }
}

export default App;
