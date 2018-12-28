import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from "./TimerButton";

export default function Timer({ title, project, elapsed }) {
  const elapsedString = millisecondsToHuman(elapsed);

  return (
    <View>
      <Text style={StyleSheet.title}>{title}</Text>&gt;
      <Text>{project}</Text>
      <Text style={StyleSheet.elapsedTime}>{elapsedString}</Text>
      <View style={StyleSheet.buttonGroup}>
        <TimerButton color="blue" small title="Edit" />
        <TimerButton color="blue" small title="Remove" />
      </View>
      <TimerButton color="#21BA45" title="Start" />
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#d6d7da",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
