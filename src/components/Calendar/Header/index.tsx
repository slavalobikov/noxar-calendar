import {memo} from 'react';
import {MONTHS_SORT_ARR} from "@constants/calendar.ts";
import avatar from "@images/avatar.png";
import arrowIcon from "@svg/arrow.svg";

import "./styles.css";

type Props = {
    currentDate: Date;
    clickPrev: () => void;
    isWeekView: boolean;
    clickToday: () => void;
    clickNext: () => void;
}

const Header = ({currentDate, clickPrev, isWeekView, clickToday, clickNext}: Props) => {
    return (
        <div className="calendarHeader">
            <h1 className="h1">
                {MONTHS_SORT_ARR[currentDate.getMonth()]}
                <span> </span>
                <span className="h1Year">{currentDate.getFullYear()}</span>
            </h1>
            <div className="headerRight">
                <img className="avatar" src={avatar} alt="avatar"/>
                <div className="headerButtons">
                    <button onClick={clickPrev} aria-label={
                        isWeekView
                            ? 'Посмотреть предыдущую неделю'
                            : 'Посмотреть предыдущий месяц'
                    } className="headerNavigate">
                        <img src={arrowIcon} alt="arrow"/>
                    </button>
                    <button onClick={clickNext} aria-label={
                        isWeekView
                            ? 'Посмотреть следующую неделю'
                            : 'Посмотреть слудующий месяц'
                    } className="headerNavigate">
                        <img className="rightNavigateIcon" src={arrowIcon} alt="arrow"/>
                    </button>
                    <button aria-label={isWeekView
                        ? 'Посмотреть текущую неделю'
                        : 'Посмотреть текущий месяц'} onClick={clickToday} className="todayBtn">Сегодня
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(Header);