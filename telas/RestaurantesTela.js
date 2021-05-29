import React, { useState, useEffect } from 'react'
import { 
  FlatList,
  Image,
  StyleSheet, 
  Text,
  TouchableOpacity, 
  View 
} from 'react-native';

import ENV from '../env';
import * as firebase from 'firebase';
if (!firebase.apps.length) {
  firebase.initializeApp(ENV);
}

const firestore = firebase.firestore();
const restaurantesCollection = firestore.collection("restaurantes");

const RestaurantesTela = (props) => {
  useEffect(() => {
    restaurantesCollection.onSnapshot((collection) => {
      let aux = [];
      collection.docs.forEach(doc => {
        aux.push({
          categoria: doc.data().categoria,
          cidade: doc.data().cidade,
          fotoURL: doc.data().fotoURL,
          nome: doc.data().nome,
          preco: doc.data().preco,
          chave: doc.id,
          avaliacaoMedia: doc.data().avaliacaoMedia,
          qtdeAvaliacoes: doc.data().qtdeAvaliacoes
        });
      })
      setRestaurantes(aux);
    })
  }, []);
  const [restaurantes, setRestaurantes] = useState([]);
  return (
    <View style={styles.container}>
      <FlatList 
        data={restaurantes}
        renderItem={restaurante => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("DetalhesRestauranteTela", {restaurante: restaurante.item})
            }}
          >
            <View style={styles.restauranteItemView}>
              <Image 
                source={{uri: restaurante.item.fotoURL}}
                style={styles.restauranteImage}
              />
              <Text style={styles.nomeRestauranteText}>
                {restaurante.item.nome}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={restaurante => restaurante.chave}
      />

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
    flex: 1,
    paddingTop: 20
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
  },
  restauranteImage: {
    width: "60%",
    height: 100,
    marginBottom: 12
  },
  restauranteItemView: {
    padding: 8,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    marginBottom: 8,
    alignItems: 'center',
    width: "80%",
    alignSelf: "center"
  },
  nomeRestauranteText: {
    fontSize: 20
  }
})
