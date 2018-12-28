import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import uuidv4 from "uuid/v4";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimeForm from "./components/ToggleableTimerForm";
import { newTimer } from "./utils/TimerUtils";
import { SERVFAIL } from "dns";

export default class App extends Component {
  state = {
    timers: [
      {
        title: "Mow the lawn",
        project: "House Chores",
        id: uuidv4(),
        elapsed: 30000,
        isRunning: true
      },
      {
        title: "Call Geico",
        project: "Cleanup Stuff",
        id: uuidv4(),
        elapsed: 1536000,
        isRunning: false
      }
    ]
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + ONE_SECOND : elapsed
          };
        })
      });
    }, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;
    this.setState({ timers: [newTimer(timer), ...timers] });
  };

  handleFormSubmit = formData => {
    const { timers } = this.state;
    this.setState({
      timers: timers.map(timer => {
        if (timer.id === formData.id) {
          const { title, project } = formData;
          return {
            ...timer,
            title,
            project
          };
        }
        return timer;
      })
    });
  };

  handleDeleteTimer = timerId => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId)
    });
  };

  toggleTimer = timerId => {
    this.setState(prevState => {
      const { timers } = prevState;
      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer;
          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning
            };
          }
          return timer;
        })
      };
    });
  };

  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimeForm onFormSubmit={this.handleCreateFormSubmit} />
          {timers.map(({ id, title, project, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={this.handleFormSubmit}
              onRemovePress={this.handleDeleteTimer}
              onStartPress={this.toggleTimer}
              onStopPress={this.toggleTimer}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timerList: {
    paddingBottom: 15
  }
});
