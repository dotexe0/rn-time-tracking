import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import uuidv4 from "uuid/v4";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimeForm from "./components/ToggleableTimerForm";
import { newTimer } from "./utils/TimerUtils";

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

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;
    this.setState({ timers: [newTimer(timer), ...timers] });
  };

  handleFormSubmit = formData => {
    const { timers } = this.state;
    this.setState({
      timers: timers.map(timer => {
        if (timer.id === formData.id) {
          const { title, project } = formData
          return {
            ...timer, title, project
          }
        }
        return timer
      })
    })
  }

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
