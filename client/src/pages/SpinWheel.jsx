import { useRef } from "react";
import WheelComponent from "react-wheel-of-prizes";

const SpinWheel = ()=> {
    const wheelRef = useRef(null);
  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass"
  ];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    console.log(winner);
  };

  const handleSpinClick = () => {
    if (wheelRef.current) {
      wheelRef.current.spin();
    }
  };

  return (
      <div className="w-full h-screen flex flex-col justify-center items-center" style={{
        height:'100vh'
      }}>
        <WheelComponent
            ref={wheelRef}
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />

        <button onClick={handleSpinClick} className="bg-green-500">Spin the Wheel</button>
      </div>
  );
}

export default SpinWheel
