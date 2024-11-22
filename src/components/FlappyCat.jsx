import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const FlappyCat = ({ onClose }) => {
  const [catPosition, setCatPosition] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const gameLoopRef = useRef(null);
  const gravity = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setObstacles(prev => {
          // Move obstacles left and filter out ones that are off screen
          const newObstacles = prev
            .map(obs => ({ ...obs, x: obs.x - 5 }))
            .filter(obs => obs.x > -50);

          // Add new obstacle
          if (Math.random() < 0.02) {
            const gap = Math.random() * 150 + 150;
            const height = Math.random() * 300 + 100;
            newObstacles.push({ x: 800, height, gap });
          }

          return newObstacles;
        });
      }
    }, 16);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const gameLoop = () => {
      setCatPosition(prev => {
        const newPosition = prev + gravity;
        // Check collision with ground or ceiling
        if (newPosition > 580 || newPosition < 0) {
          setGameOver(true);
          return prev;
        }
        
        // Check collision with obstacles
        obstacles.forEach(obstacle => {
          if (obstacle.x < 100 && obstacle.x > 0) {
            if (newPosition < obstacle.height || 
                newPosition > obstacle.height + obstacle.gap) {
              setGameOver(true);
            } else if (obstacle.x === 50) {
              setScore(s => s + 1);
            }
          }
        });

        return newPosition;
      });
      
      if (!gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [obstacles, gameOver]);

  const jump = () => {
    if (!gameOver) {
      setCatPosition(prev => prev - 60);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={jump}
    >
      <div className="relative w-[800px] h-[600px] bg-gradient-to-b from-purple-900 to-black border-4 border-pink-500 rounded-xl overflow-hidden">
        {/* Score */}
        <div className="absolute top-4 left-4 text-2xl text-pink-400">
          Score: {score}
        </div>

        {/* Cat */}
        <motion.div
          animate={{ y: catPosition, rotate: gravity * 2 }}
          className="absolute left-20"
        >
          <img 
            src="/shook-cat.gif" 
            alt="Flappy Cat" 
            className="w-16 h-16 rounded-full"
          />
        </motion.div>

        {/* Obstacles */}
        {obstacles.map((obstacle, index) => (
          <div key={index}>
            <div 
              className="absolute bg-gradient-to-b from-pink-500 to-purple-500 w-12 rounded-lg"
              style={{
                height: obstacle.height,
                left: obstacle.x,
                top: 0
              }}
            />
            <div 
              className="absolute bg-gradient-to-b from-purple-500 to-pink-500 w-12 rounded-lg"
              style={{
                height: 600 - (obstacle.height + obstacle.gap),
                left: obstacle.x,
                bottom: 0
              }}
            />
          </div>
        ))}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            <h2 className="text-4xl text-pink-400 mb-4">NGMI 💀</h2>
            <p className="text-2xl text-white mb-4">Score: {score}</p>
            <button 
              onClick={onClose}
              className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-full text-white"
            >
              Back to Copium
            </button>
          </div>
        )}

        {/* Instructions */}
        {!gameOver && score === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black/50 p-4 rounded-xl">
            Click anywhere to jump!<br/>
            Don't hit the pipes or you're NGMI
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FlappyCat; 