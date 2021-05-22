import React from 'react'
import { 
  StyleSheet, 
  Text,
  TouchableOpacity, 
  View 
} from 'react-native'

const RestaurantesTela = (props) => {
  return (
    <View style={styles.container}>
      <Text>Restaurantes</Text>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => props.navigation.navigate('AdicionarRestauranteTela')}>
          <Text 
            style={styles.iconeFab}>
              +
          </Text>
      </TouchableOpacity>
    </View>
  )
}

export default RestaurantesTela;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03A9F4',
    right: 30,
    bottom: 30,
    borderRadius: 30,
    elevation: 8
  },
  iconeFab: {
    fontSize: 20,
    color: 'white'
  }
})
