// W pliku, w którym konfigurujesz nawigację (na przykład App.js lub navigation/index.js)

import { createStackNavigator } from '@react-navigation/stack';
import ResultsQuizScreen from '../screens/ResultsQuizScreen';
import QuizScreen from '../screens/QuizScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="QuizScreen">
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ResultsQuizScreen" component={ResultsQuizScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
