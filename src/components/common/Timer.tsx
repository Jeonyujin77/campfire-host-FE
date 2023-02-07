import styled from "@emotion/styled";
import { useEffect } from "react";

const Timer = ({
  minutes,
  seconds,
  setSeconds,
  setMinutes,
}: {
  minutes: number;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <TimerText>
      {minutes === 0 && seconds === 0 ? (
        <div>인증번호가 만료되었습니다</div>
      ) : (
        <>
          인증번호 만료시간 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </>
      )}
    </TimerText>
  );
};

const TimerText = styled.div`
  text-align: right;
  font-size: 14px;
  color: tomato;
  padding: 10px 0;
`;

export default Timer;
