import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (showFinalMessage) {
      setShowHearts(true);
    }
  }, [showFinalMessage]);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => setShowQuestion(true), 1500);
  };

  const handleNoButtonHover = () => {
    const container = document.querySelector(".question-container");
    const containerRect = container.getBoundingClientRect();

    const buttonWidth = 100;
    const buttonHeight = 50;

    const maxX = Math.min(
      containerRect.width - buttonWidth,
      window.innerWidth - buttonWidth - 40
    );
    const maxY = Math.min(
      containerRect.height - buttonHeight,
      window.innerHeight - buttonHeight - 40
    );

    const newX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    const newY = Math.max(0, Math.min(Math.random() * maxY, maxY));

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowQuestion(false);
    setShowFinalMessage(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  useEffect(() => {
    const noButton = document.querySelector(".no-button");
    if (noButton) {
      noButton.addEventListener("touchstart", handleNoButtonHover);
      return () =>
        noButton.removeEventListener("touchstart", handleNoButtonHover);
    }
  }, []);

  return (
    <div className="container">
      {showHearts &&
        [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ❤️
          </div>
        ))}

      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          colors={["#ff80ab", "#ff4081", "#f50057", "#c51162"]}
        />
      )}

      {!isEnvelopeOpen && (
        <div className="envelope magical-hover" onClick={handleEnvelopeClick}>
          <div className="envelope-front">
            <div className="heart-seal wobble">❤️</div>
            <p className="glow-text rainbow-text">Нажми на меня</p>
          </div>
        </div>
      )}

      {isEnvelopeOpen && !showQuestion && !showFinalMessage && (
        <div className="flying-heart sparkle">❤️</div>
      )}

      {showQuestion && (
        <div className="question-container fade-in">
          <h2 className="glow-text">
            Любимая, будешь готовить для меня вкусняшки? 🥰
          </h2>
          <div className="buttons">
            <button className="yes-button pulse" onClick={handleYesClick}>
              Да!
            </button>
            <button
              className="no-button"
              style={{
                position: "absolute",
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
              }}
              onMouseOver={handleNoButtonHover}
            >
              Нет
            </button>
          </div>
        </div>
      )}

      {showFinalMessage && (
        <div className="final-message scale-in">
          <div className="icons-container">
            <span className="icon animate sparkle-intense">🥘</span>
            <span className="icon animate delay-1 sparkle-intense">👨‍🍳</span>
            <span className="icon animate delay-2 sparkle-intense">🍝</span>
          </div>
          <h2 className="glow-text rainbow-text magical">
            Я тебя очень люблю! ❤️
          </h2>
          <div className="love-messages">
            <p className="typing-text magical-text">
              Ты - моя самая прекрасная! ✨
            </p>
            <p className="typing-text magical-text delay-1">
              Ты делаешь каждый мой день особенным! 🌟
            </p>
            <p className="typing-text magical-text delay-2">
              Не переживай, я тоже буду готовить для тебя! 👨‍🍳
            </p>
            <p className="typing-text magical-text delay-3">
              Ты - мое счастье и моя радость! 🥰
            </p>
            <p className="typing-text magical-text delay-4">
              С тобой каждый день как праздник! 🎉
            </p>
          </div>
          <div className="hearts-burst">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="burst-heart"
                style={{
                  "--delay": `${i * 0.1}s`,
                  "--angle": `${i * 18}deg`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
