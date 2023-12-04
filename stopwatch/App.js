import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setMilliseconds(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    if (running) {
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  const handleLapReset = () => {
    if (running) {
      setLaps([...laps, milliseconds]);
    } else {
      setMilliseconds(0);
      setLaps([]);
    }
  };

  const formatTime = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(2);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(milliseconds)}</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={handleLapReset} style={styles.button}>
          <Text>{running ? 'Lap' : 'Reset'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStartStop} style={[styles.button, running ? styles.stopButton : styles.startButton]}>
          <Text>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lapsWrapper}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>Lap #{index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'gray',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    
  },
  startButton: {
    borderColor: '#7C93C3',
  },
  stopButton: {
    borderColor: 'red',
  },
  lapsWrapper: {
    width: '100%',
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#435585',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    backgroundColor:'#FF9900',
  },
  lapText: {
    fontSize: 16,
    
  },
});

export default App;
