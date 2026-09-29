import React from "react";
import "./MainContent.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/Store";
import {  
  plusClick,
  openTime,
  minusTime,
  setTimerRunning, 
  openScore,
  closeBtn
} from "../Reduser/Reduser";

interface MainContentProps {};

const MainContent: React.FC<MainContentProps> = () => {
  const clicks = useSelector((state: RootState) => state.reduser.clicks);
  const showTime = useSelector((state: RootState) => state.reduser.showTime);
  const time = useSelector((state: RootState) => state.reduser.time);
  const timerRunning = useSelector(
    (state: RootState) => state.reduser.timerRunning
  );
  const showScore = useSelector((state: RootState) => state.reduser.showScore);
  const userScore = useSelector((state: RootState) => state.reduser.userScore);
  const removeBtn = useSelector((state: RootState) => state.reduser.removeBtn);
  const dispatch = useDispatch<AppDispatch>();

  const setClicks = (): void => {
    dispatch(openTime(true));

    dispatch(setTimerRunning(true));
    dispatch(openTime(true));

    let timer = 0;
    
      const intervalId = setInterval(() => {
        if (timer < 10) {
          dispatch(minusTime());
          timer++;
        } else {
          dispatch(setTimerRunning(false));
          dispatch(openScore());
          clearInterval(intervalId);
        }
      }, 1000);
  };

  const onButtonEvents = () => {
    dispatch(closeBtn());
    return timerRunning ? null : setClicks();
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timerRunning) return;

    dispatch(plusClick());

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const wave = document.createElement("div");
    wave.className = "wave";
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    target.appendChild(wave);

    requestAnimationFrame(() => {
      wave.classList.add("animate");
    });

    wave.addEventListener("transitionend", () => {
      wave.remove();
    });
  };

  let index = 0;

  switch (true) {
    case clicks < 20:
      index = 0;
      break;
      case clicks >= 20 && clicks < 40:
        index = 1;
      break;
      case clicks >= 40 && clicks < 50:
        index = 2;
      break;
      case clicks >= 50 && clicks < 60:
        index = 3;
      break;
      case clicks >= 60:
        index = 4;
      break;
    default:
      index = 0; 
  }

  const showUserScore = () => {
    if (showScore) {
      return (
        <div className="good_job_modal_place">
        <div className={`good_job_modal ${userScore[index].scoreColor}`}>
          <p className="user_score_description">{userScore[index].userMessage}</p>
          <div className="stars_for_user">{userScore[index].userStars}</div>
        </div>
      </div>
      )
    } else {
      return;
    }
  }

  const onShowBtn = () => {
    if (removeBtn) {
      return (<button className="click_btn_useless">Start</button> );
    }
    return (<button onClick={onButtonEvents} className="click_btn">Start</button>)
  }

  return (
    <div className="main_content">
      <div className="click_gretting">
      <div className="click_title">
        <p className="title_one">
        Let's see how many clicks you can make in 10 seconds.
        </p>
        <p className="title_two">Click the button below to start.</p>
      </div>
      {showUserScore()}
      </div>
      <div className="click_gretting_mobile">
      <div className="click_title_mobile">
        <p className="title_one_mobile">
        Let's see how many clicks you can make in 10 seconds.
        </p>
        <p className="title_two_mobile">Click the button below to start.</p>
      </div>
      </div>
      <div className="click_place">
        <div className="click_settings">
        <div className="click_counter">
          <p>Clicks made: {clicks}</p>
        </div>
        <div className="click_btn_place">
          {onShowBtn()}
        </div>
        </div>
        <div
          onClick={(e) => {
            handleClick(e);
          }}
          className="click_blcok"
        >
          {showTime ? <p className="time_remain">{time}</p> : null}
        </div>
      </div>
      <div className="modal_place_mobile">
          {showUserScore()}
      </div>
      <div className="autor_link_place"><a className="autor_link" href="https://aleksey-the-developer.vercel.app" target="blank">Author link</a></div>
    </div>
  );
};

export default MainContent;
