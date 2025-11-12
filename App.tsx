import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/(tabs)/home';
import Login from './app/(tabs)/index';
import Recipes from './app/(tabs)/recipes';
import Shops from './app/(tabs)/shops';
import { RootStackParamList } from './types/navigation';
import RecipeResult from './app/(tabs)/recipeResult';
import AddRecipe from './app/(tabs)/addRecipes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"> {}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Shops" component={Shops} />
        <Stack.Screen name="AddRecipes" component={AddRecipe} />
        <Stack.Screen name="RecipeResult" component={RecipeResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
