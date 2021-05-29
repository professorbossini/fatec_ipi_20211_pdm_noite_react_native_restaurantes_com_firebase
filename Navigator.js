import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import RestaurantesTela from './telas/RestaurantesTela';
import AdicionarRestauranteTela from './telas/AdicionarRestauranteTela';
import DetalhesRestauranteTela from './telas/DetalhesRestauranteTela';

const Navigator = createStackNavigator({
  RestaurantesTela: RestaurantesTela,
  AdicionarRestauranteTela : AdicionarRestauranteTela,
  DetalhesRestauranteTela: DetalhesRestauranteTela
});

export default createAppContainer(Navigator);