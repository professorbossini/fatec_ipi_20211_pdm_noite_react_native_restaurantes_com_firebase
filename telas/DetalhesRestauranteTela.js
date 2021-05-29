import React, { useState } from 'react'
import {Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal, { ModalContent } from 'react-native-modals';

import * as firebase from 'firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();
const restaurantesCollection = firestore.collection("restaurantes");

const DetalhesRestauranteTela = (props) => {
  const[modalVisivel, setModalVisivel] = useState(false);
  const[avaliacaoDigitada, setAvaliacaoDigitada] = useState("");
  const restaurante = props.navigation.state.params.restaurante;
  const avaliacoesCollection = restaurantesCollection.doc(restaurante.chave).collection("avaliacoes");
  const realizarAvaliacao = () => {
    return firestore.runTransaction((transaction) => {
      return transaction.get(restaurantesCollection.doc(restaurante.chave)).then(doc => {
        let novaAvaliacao = avaliacoesCollection.doc();
        console.log(`Nova Avaliação: ${novaAvaliacao}`);
        console.log(`Avaliacao Media: ${doc.data().avaliacaoMedia}`);
        console.log(`Qtde avaliações: ${doc.data().qtdeAvaliacoes}`);
        console.log(`Avaliação digitada: ${avaliacaoDigitada}`);
        const novaMedia = (doc.data().avaliacaoMedia * doc.data().qtdeAvaliacoes + +avaliacaoDigitada) / (doc.data().qtdeAvaliacoes + 1);
        console.log(novaMedia);
        transaction.update(restaurantesCollection.doc(restaurante.chave), {
          qtdeAvaliacoes: doc.data().qtdeAvaliacoes + 1,
          avaliacaoMedia: novaMedia
        })
        setAvaliacaoDigitada("");
        return transaction.set(novaAvaliacao, {
          data: new Date(),
          avaliacao: avaliacaoDigitada
        })
      });
    })
  }
  return (
    <View style={styles.container}>
      <Image 
        style={styles.restauranteImage}
        source={{uri: restaurante.fotoURL}}
      />
      <Text style={styles.nomeEAvaliacaoRestauranteText}>
        {restaurante.nome} : {restaurante.avaliacaoMedia}
      </Text>
      <View style={styles.avaliarButton}>
        <Button 
          title="Avaliar Restaurante"
          onPress={() => {
            setModalVisivel(true)
          }}
        />
      </View>
      <Modal      
        visible={modalVisivel}
        onTouchOutside={() => setModalVisivel(false)}>
        <ModalContent>
          <View>
            <TextInput 
              style={styles.avaliacaoTextInput}
              placeholder="Digite uma nota de 1 a 5"
              onChangeText={(t) => setAvaliacaoDigitada(t)}
              value={avaliacaoDigitada}
            />
            <Button 
              title="OK"
              onPress={() =>{
                setModalVisivel(false);
                realizarAvaliacao();
                props.navigation.goBack();
              }}
            />
          </View>
        </ModalContent>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  restauranteImage: {
    width: "90%",
    height: 250
  },
  nomeEAvaliacaoRestauranteText: {
    fontSize: 22,
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
    padding: 4,
    marginVertical: 8,
    width: "90%",
    textAlign: "center"
  },
  avaliarButton: {
    width: '90%'
  },
  avaliacaoTextInput: {
    borderBottomColor: "#DDD",
    borderBottomWidth: 2,
    padding: 4,
    textAlign: "center",
    marginBottom: 4
  }
})
export default DetalhesRestauranteTela;
