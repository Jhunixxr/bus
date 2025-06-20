import React, { useState } from 'react';
import { Star, Gift, Zap, Heart, TrendingUp, Award, CreditCard, Users, Calendar, MapPin, Gamepad2, Trophy, Target } from 'lucide-react';

export function LoyaltyPage() {
  const [userPoints, setUserPoints] = useState(2450);
  const [userLevel, setUserLevel] = useState('Oro');
  const [isRegistered, setIsRegistered] = useState(true); // Cambiado a true para mostrar el dashboard
  const [showGame, setShowGame] = useState(false);
  const [gameType, setGameType] = useState('memory');
  const [gameActive, setGameActive] = useState(false);
  const [gamePoints, setGamePoints] = useState(0);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const levels = [
    {
      name: 'Bronce',
      minPoints: 0,
      color: 'bg-amber-600',
      benefits: ['5% descuento', 'Puntos básicos', 'Soporte estándar']
    },
    {
      name: 'Plata',
      minPoints: 1000,
      color: 'bg-gray-400',
      benefits: ['10% descuento', 'Puntos x1.5', 'Check-in prioritario', 'Soporte premium']
    },
    {
      name: 'Oro',
      minPoints: 2500,
      color: 'bg-yellow-500',
      benefits: ['15% descuento', 'Puntos x2', 'Embarque prioritario', 'Asientos preferenciales', 'Soporte VIP']
    },
    {
      name: 'Platino',
      minPoints: 5000,
      color: 'bg-purple-600',
      benefits: ['20% descuento', 'Puntos x3', 'Upgrade gratuito', 'Sala VIP', 'Concierge personal']
    }
  ];

  const rewards = [
    {
      name: 'Viaje Gratis Lima-Arequipa',
      points: 3000,
      description: 'Canjea por un viaje completo',
      icon: MapPin,
      available: userPoints >= 3000
    },
    {
      name: 'Descuento 50%',
      points: 1500,
      description: 'En tu próximo viaje',
      icon: Gift,
      available: userPoints >= 1500
    },
    {
      name: 'Upgrade a Premium',
      points: 800,
      description: 'Asiento premium gratis',
      icon: Star,
      available: userPoints >= 800
    },
    {
      name: 'Snack Box',
      points: 300,
      description: 'Box de snacks para el viaje',
      icon: Heart,
      available: userPoints >= 300
    }
  ];

  const recentActivity = [
    {
      date: '15 Ene 2024',
      description: 'Viaje Lima - Trujillo',
      points: '+150 puntos',
      type: 'earned'
    },
    {
      date: '14 Ene 2024',
      description: 'Juego completado: Memoria Norteña',
      points: '+50 puntos',
      type: 'game'
    },
    {
      date: '10 Ene 2024',
      description: 'Descuento 10% canjeado',
      points: '-500 puntos',
      type: 'redeemed'
    },
    {
      date: '08 Ene 2024',
      description: 'Trivia del Norte completada',
      points: '+75 puntos',
      type: 'game'
    },
    {
      date: '05 Ene 2024',
      description: 'Viaje Lima - Cusco',
      points: '+200 puntos',
      type: 'earned'
    }
  ];

  const games = [
    {
      id: 'memory',
      name: 'Memoria Norteña',
      description: 'Encuentra las parejas de destinos',
      icon: Target,
      maxPoints: 100
    },
    {
      id: 'trivia',
      name: 'Trivia del Norte',
      description: 'Preguntas sobre el norte del Perú',
      icon: Trophy,
      maxPoints: 150
    },
    {
      id: 'wheel',
      name: 'Ruleta de la Suerte',
      description: 'Gira y gana puntos',
      icon: Zap,
      maxPoints: 200
    }
  ];

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const getCurrentLevel = () => {
    return levels.find(level => 
      userPoints >= level.minPoints && 
      (levels.indexOf(level) === levels.length - 1 || userPoints < levels[levels.indexOf(level) + 1].minPoints)
    ) || levels[0];
  };

  const getNextLevel = () => {
    const currentLevelIndex = levels.findIndex(level => level.name === getCurrentLevel().name);
    return currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;
  };

  const getProgressToNextLevel = () => {
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;
    
    const currentLevel = getCurrentLevel();
    const progress = ((userPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  const initializeMemoryGame = () => {
    const destinations = ['Trujillo', 'Chiclayo', 'Piura', 'Cajamarca', 'Tumbes', 'Chimbote'];
    const cards = [...destinations, ...destinations]
      .sort(() => Math.random() - 0.5)
      .map((dest, index) => ({ id: index, destination: dest }));
    setMemoryCards(cards);
    setFlippedCards([]);
    setMatchedCards([]);
    setGamePoints(0);
    setTimeLeft(60);
  };

  const startGame = (gameId) => {
    setGameType(gameId);
    setGameActive(true);
    
    if (gameId === 'memory') {
      initializeMemoryGame();
      
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const endGame = () => {
    setGameActive(false);
    setUserPoints(prev => prev + gamePoints);
    alert(`¡Juego terminado! Ganaste ${gamePoints} puntos.`);
  };

  const handleMemoryCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);

      if (firstCard.destination === secondCard.destination) {
        setMatchedCards(prev => [...prev, first, second]);
        setGamePoints(prev => prev + 20);
        setFlippedCards([]);

        if (matchedCards.length + 2 === memoryCards.length) {
          setTimeout(endGame, 1000);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-blanco-crema py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-amarillo-dorado/20 px-4 py-2 rounded-full mb-6">
              <Award className="h-5 w-5 text-amarillo-dorado" />
              <span className="text-sm font-medium text-azul-oscuro">Programa VIP</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-azul-oscuro mb-6">
              Programa de Fidelidad
            </h1>
            <p className="text-xl text-gris-suave max-w-3xl mx-auto">
              Viaja más, ahorra más. Acumula puntos en cada viaje y disfruta de beneficios exclusivos.
            </p>
          </div>

          {!isRegistered ? (
            /* Registration Section */
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-amarillo-dorado rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="h-10 w-10 text-azul-oscuro" />
                </div>
                
                <h2 className="text-3xl font-bold text-azul-oscuro mb-4">
                  ¡Únete al Programa VIP!
                </h2>
                <p className="text-gris-suave mb-8 max-w-2xl mx-auto">
                  Regístrate gratis y comienza a acumular puntos desde tu primer viaje. 
                  Obtén descuentos, upgrades y beneficios exclusivos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: Gift, title: 'Puntos por viaje', desc: 'Gana 10 puntos por cada sol gastado' },
                    { icon: Star, title: 'Descuentos exclusivos', desc: 'Hasta 20% de descuento en tus viajes' },
                    { icon: Zap, title: 'Beneficios VIP', desc: 'Check-in prioritario y asientos preferenciales' }
                  ].map((benefit, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="w-12 h-12 bg-azul-oscuro/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <benefit.icon className="h-6 w-6 text-azul-oscuro" />
                      </div>
                      <h3 className="font-semibold text-azul-oscuro mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gris-suave">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleRegister}
                  className="bg-amarillo-dorado text-azul-oscuro px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition-colors text-lg"
                >
                  Registrarme Gratis
                </button>
              </div>
            </div>
          ) : (
            /* Dashboard Section */
            <>
              {/* User Status */}
              <div className="bg-gradient-to-r from-azul-oscuro to-primary-700 text-white rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">¡Hola, María González!</h2>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                      <div className={`w-4 h-4 rounded-full ${getCurrentLevel().color}`}></div>
                      <span className="text-lg font-semibold">Nivel {getCurrentLevel().name}</span>
                    </div>
                    <div className="text-3xl font-bold text-amarillo-dorado">
                      {userPoints.toLocaleString()} puntos
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Award className="h-16 w-16 text-amarillo-dorado" />
                    </div>
                    {getNextLevel() && (
                      <div>
                        <p className="text-sm mb-2">Progreso a {getNextLevel()?.name}</p>
                        <div className="w-32 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-amarillo-dorado h-2 rounded-full transition-all duration-500"
                            style={{ width: `${getProgressToNextLevel()}%` }}
                          ></div>
                        </div>
                        <p className="text-xs mt-1">
                          {getNextLevel()?.minPoints! - userPoints} puntos restantes
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Games Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-azul-oscuro flex items-center">
                    <Gamepad2 className="h-6 w-6 mr-2 text-amarillo-dorado" />
                    Juegos para Ganar Puntos
                  </h3>
                  {showGame && (
                    <button
                      onClick={() => {
                        setShowGame(false);
                        setGameActive(false);
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Volver
                    </button>
                  )}
                </div>

                {!showGame ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((game) => (
                      <div key={game.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-azul-oscuro rounded-full flex items-center justify-center mx-auto mb-4">
                            <game.icon className="h-8 w-8 text-amarillo-dorado" />
                          </div>
                          <h4 className="font-bold text-azul-oscuro mb-2">{game.name}</h4>
                          <p className="text-sm text-gris-suave mb-4">{game.description}</p>
                          <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full mb-4">
                            Hasta {game.maxPoints} puntos
                          </div>
                          <button
                            onClick={() => {
                              setShowGame(true);
                              startGame(game.id);
                            }}
                            className="w-full bg-azul-oscuro text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            Jugar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Game Area */
                  <div>
                    {gameType === 'memory' && gameActive && (
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="text-xl font-bold text-azul-oscuro">Memoria Norteña</h4>
                          <div className="flex space-x-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-azul-oscuro">{timeLeft}s</div>
                              <div className="text-sm text-gris-suave">Tiempo</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-amarillo-dorado">{gamePoints}</div>
                              <div className="text-sm text-gris-suave">Puntos</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                          {memoryCards.map((card) => (
                            <button
                              key={card.id}
                              onClick={() => handleMemoryCardClick(card.id)}
                              className={`aspect-square rounded-lg text-white font-bold text-sm transition-all ${
                                flippedCards.includes(card.id) || matchedCards.includes(card.id)
                                  ? 'bg-azul-oscuro'
                                  : 'bg-gray-400 hover:bg-gray-500'
                              }`}
                            >
                              {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) 
                                ? card.destination 
                                : '?'
                              }
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {gameType === 'trivia' && (
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-azul-oscuro mb-6">Trivia del Norte</h4>
                        <p className="text-gris-suave mb-4">¡Próximamente! Este juego estará disponible pronto.</p>
                        <button
                          onClick={() => {
                            setGamePoints(75);
                            endGame();
                          }}
                          className="bg-amarillo-dorado text-azul-oscuro px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                        >
                          Simular Juego (+75 puntos)
                        </button>
                      </div>
                    )}

                    {gameType === 'wheel' && (
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-azul-oscuro mb-6">Ruleta de la Suerte</h4>
                        <p className="text-gris-suave mb-4">¡Próximamente! Este juego estará disponible pronto.</p>
                        <button
                          onClick={() => {
                            setGamePoints(Math.floor(Math.random() * 200) + 50);
                            endGame();
                          }}
                          className="bg-amarillo-dorado text-azul-oscuro px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                        >
                          Simular Juego (50-250 puntos)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Levels */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-azul-oscuro mb-6">Niveles del Programa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {levels.map((level, index) => (
                    <div 
                      key={level.name}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        level.name === getCurrentLevel().name 
                          ? 'border-amarillo-dorado bg-yellow-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-4 h-4 rounded-full ${level.color} mr-2`}></div>
                        <h4 className="font-bold text-azul-oscuro">{level.name}</h4>
                        {level.name === getCurrentLevel().name && (
                          <span className="ml-2 text-xs bg-amarillo-dorado text-azul-oscuro px-2 py-1 rounded-full">
                            Actual
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gris-suave mb-4">
                        Desde {level.minPoints.toLocaleString()} puntos
                      </p>
                      <ul className="space-y-2">
                        {level.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-gris-suave flex items-center">
                            <div className="w-1.5 h-1.5 bg-amarillo-dorado rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-azul-oscuro mb-6">Canjear Puntos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {rewards.map((reward, index) => (
                    <div 
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        reward.available 
                          ? 'border-green-200 bg-green-50 hover:border-green-300' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                        reward.available ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        <reward.icon className={`h-6 w-6 ${
                          reward.available ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <h4 className="font-bold text-azul-oscuro mb-2">{reward.name}</h4>
                      <p className="text-sm text-gris-suave mb-4">{reward.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amarillo-dorado">
                          {reward.points.toLocaleString()} pts
                        </span>
                        <button 
                          disabled={!reward.available}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            reward.available 
                              ? 'bg-azul-oscuro text-white hover:bg-primary-600' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {reward.available ? 'Canjear' : 'No disponible'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-azul-oscuro mb-6">Actividad Reciente</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-4 ${
                          activity.type === 'earned' ? 'bg-green-500' : 
                          activity.type === 'game' ? 'bg-blue-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-azul-oscuro">{activity.description}</p>
                          <p className="text-sm text-gris-suave">{activity.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${
                        activity.type === 'redeemed' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {activity.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}