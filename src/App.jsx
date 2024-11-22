import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlappyCat from './components/FlappyCat';

function App() {
  const [isShook, setIsShook] = useState(false);
  const [moneyLost, setMoneyLost] = useState(0);
  const [showRug, setShowRug] = useState(false);
  const [showGame, setShowGame] = useState(false);

  // Money counter effect when clicking the cat
  const increaseLoss = () => {
    setMoneyLost(prev => prev + 1337);
    setIsShook(true);
    setTimeout(() => setIsShook(false), 500);
  };

  // Random "rug pull" warning that pops up
  useEffect(() => {
    const interval = setInterval(() => {
      setShowRug(true);
      setTimeout(() => setShowRug(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-fuchsia-900 text-white relative overflow-hidden">
      {/* Money rain effect in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight + 20 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute text-2xl"
          >
            {Math.random() > 0.5 ? "💸" : "🪙"}
          </motion.div>
        ))}
      </div>

      {/* Rug Pull Warning */}
      <AnimatePresence>
        {showRug && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center font-bold z-50"
          >
            🚨 BREAKING: ANOTHER CASINO RUG PULL JUST DROPPED FR FR NO CAP 🚨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl relative">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            $SHOOKCAT
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">absolutely shooketh 😱</p>
        </motion.div>

        {/* Loss Counter with trolling close button */}
        <motion.div
          animate={{ scale: moneyLost > 0 ? [1, 1.2, 1] : 1 }}
          className="text-xl md:text-2xl text-red-400 mb-8 flex items-center justify-center gap-4"
        >
          {moneyLost > 0 ? (
            <>
              <div>SOL Rugged: {moneyLost} 💀</div>
              <motion.button
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-full text-white text-base"
                animate={{ x: 0 }}
                initial={{ x: 0, y: 0 }}
                whileHover={() => {
                  // 20% chance to stay still and be clickable
                  if (Math.random() < 0.2) {
                    return { x: 0, y: 0 };
                  }
                  // 80% chance to move away
                  const randomX = (Math.random() - 0.5) * 500;
                  const randomY = (Math.random() - 0.5) * 200;
                  return {
                    x: randomX,
                    y: randomY,
                    transition: { duration: 0.3 }
                  };
                }}
                onClick={() => {
                  // If we managed to click it, show the game
                  setShowGame(true);
                }}
              >
                Close Position 🙏
              </motion.button>
            </>
          ) : (
            <div className="text-gray-400 italic">ser... you still have money? 👀</div>
          )}
        </motion.div>

        {/* Animated Cat - now with click interaction */}
        <motion.div
          animate={{ 
            rotate: isShook ? [-10, 10, -10] : 0,
            scale: isShook ? 1.1 : 1
          }}
          onClick={increaseLoss}
          className="my-8 md:my-12 flex justify-center cursor-pointer relative group"
        >
          <img 
            src="/shook-cat.gif" 
            alt="Shook Cat" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-pink-500 shadow-lg shadow-purple-500/50"
          />
          <div className="absolute -bottom-2 scale-0 group-hover:scale-100 transition-transform text-sm bg-black/50 px-2 py-1 rounded-full">
            click me if ngmi 👆
          </div>
        </motion.div>

        {/* Story Section - adjusted padding and text sizes */}
        <div className="max-w-2xl mx-auto bg-black/30 p-4 md:p-8 rounded-xl backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">TL;DR: Crypto casinos are sus, even for cats. 🎰</h2>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Ziggy Meowla, a crypto-savvy cat, stumbles on a neon-lit Solana casino ad: "Turn 1 SOL into 10 SOL!" Bet. 
            <span className="text-green-400"> He connects his Phantom wallet and starts raking in wins like a legend—0.1 SOL to 2 SOL in minutes. Vibes immaculate.</span>
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Then, a pop-up: "Double or Nothing: Spin Me!" Say less. He spins. And spins. 
            <span className="text-red-400"> Suddenly, L's ONLY. His SOL? Gone. The screen glitches: "Mystery Bonus Activated!" Pixel's like, "Let's go!" but nah—his wallet gets drained. Sardine NFTs? Rugged.</span>
          </p>
          <p className="text-base md:text-lg font-bold text-purple-300">
            Moral? Ziggy Meowla logs off crypto for life and sticks to vibing with laser pointers. 🐱✨
          </p>
        </div>

        <div className="mt-8 md:mt-12 px-4 md:px-0">
          <motion.div 
            className="bg-black/30 p-4 md:p-6 rounded-xl backdrop-blur-sm max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-pink-400 mb-2 text-center">Contract Address</h3>
            <div className="flex items-center justify-center space-x-2 bg-black/20 p-3 rounded-lg">
              <code className="text-sm md:text-base text-purple-300 font-mono">
                8xpz9Yx7GiEmHxU9V7uF9LUwHj9DTx6aS5MgymQjrgle
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText('8xpz9Yx7GiEmHxU9V7uF9LUwHj9DTx6aS5MgymQjrgle')}
                className="hover:bg-purple-500/20 p-2 rounded-full transition-colors"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </motion.div>
        </div>

        {/* Token Info - improved mobile layout */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center px-4 md:px-0">
          <div className="bg-black/20 p-4 md:p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-pink-400">Supply</h3>
            <p className="text-lg md:text-xl">1.000,000,000</p>
          </div>
          <div className="bg-black/20 p-4 md:p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-pink-400">Launchpad</h3>
            <p className="text-lg md:text-xl"><a href="https://pump.fun">PUMP.FUN</a></p>
          </div>
          <div className="bg-black/20 p-4 md:p-6 rounded-xl backdrop-blur-sm sm:col-span-2 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold text-pink-400">LP</h3>
            <p className="text-lg md:text-xl">Burns on Raydium 🔥</p>
          </div>
        </div>

        {/* Developer Message */}
        <div className="mt-12 max-w-3xl mx-auto bg-black/40 p-6 rounded-2xl backdrop-blur-sm border border-pink-500/20">
          <h3 className="text-2xl font-bold text-pink-400 mb-4 text-center">💜 A Message from the Dev</h3>
          <div className="space-y-4 text-gray-200">
            <p className="leading-relaxed">
              Fam, this isn't about rugging anyone - we've all seen enough of that pain in the space. 
              This project started as a way to cope with the casino losses through memes and bring some 
              laughs to our community. 
            </p>
            <p className="leading-relaxed">
              With your support, I'll keep building more based features, 
              drop daily memes on Twitter, and keep the copium flowing. Every tip helps cover costs and 
              lets me focus on making <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">$SHOOKCAT</span> the most entertaining corner of Solana.
            </p>
            <p className="leading-relaxed">
              If <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">$SHOOKCAT</span> made you smile or helped you feel less alone in your trading journey, 
              you can support more based content by sending some SOL to:
            </p>
            <div className="flex items-center justify-center space-x-2 bg-black/20 p-3 rounded-lg my-4">
              <code className="text-sm md:text-base text-purple-300 font-mono">
              9RXDsXa3AVdaqJbte58vuHA5kJPzG8ngmymUX5QbQUDW
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText('9RXDsXa3AVdaqJbte58vuHA5kJPzG8ngmymUX5QbQUDW')}
                className="hover:bg-purple-500/20 p-2 rounded-full transition-colors"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
            <p className="text-center text-gray-400 text-sm">
              Together we cope, together we hope, together we WAGMI 🐱✨
            </p>
          </div>
        </div>

        {/* Added meme stats */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-pink-400">Copium Level</h3>
            <p className="text-2xl">📈 MAXIMUM</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-pink-400">Trust Me Bro Rating</h3>
            <p className="text-2xl">💯/💯</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-pink-400">Hopium Status</h3>
            <p className="text-2xl">🚀 LOADED</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-pink-400">Paper Hands</h3>
            <p className="text-2xl">🧻 REKT</p>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-pink-400"
          >
            🚨 BREAKING NEWS: Local cat still malding about casino losses • Source: Trust me bro • NFA DYOR WAGMI • No cats were harmed in the making of this meme (except their portfolios) • 
            This is definitely not financial advice (cats can't give financial advice anyway) • 
            Local cat spotted buying high and selling low • 
            Studies show 420.69% of cats are bad at trading
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showGame && <FlappyCat onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;