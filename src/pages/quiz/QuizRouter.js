// src/navigation/QuizRouter.js

import React from 'react';
import { View, Text } from 'react-native';
import MathQuizScreen from './MathQuizScreen';
import EnglishQuizScreen from './EnglishQuizScreen';
import ScienceQuizScreen from './ScienceQuizScreen';

const screens = {
  math: MathQuizScreen,
  english: EnglishQuizScreen,
  science: ScienceQuizScreen,
};

const QuizRouter = ({ route, navigation }) => {
  const { subject } = route.params ?? {};

  const Screen = screens[subject];

  if (!Screen) {
    return (
      <View>
        <Text>Unknown subject: {subject}</Text>
      </View>
    );
  }

  return <Screen route={route} navigation={navigation} />;
};

export default QuizRouter; 