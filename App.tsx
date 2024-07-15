import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import Toast from 'react-native-toast-message';


function App(): React.JSX.Element {

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <Toast />
    </>
  );
}


export default App;
