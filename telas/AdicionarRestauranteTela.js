import React, { useState } from 'react'
import {
  Button,
  Image, 
  Picker,
  Slider,
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity, 
  View } 
from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'
import * as firebase from 'firebase';


const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

const restaurantesCollection = firestore.collection('restaurantes');
const imagensRef = storage.ref("imagens");
const imagensCounterRef = firebase.database().ref("imagensCounter");

const AdicionarRestauranteTela = (props) => {

  const [nome, setNome] = useState('');  
  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState(3);
  const [fotoURI, setFotoURI] = useState();

  const obterFoto = async () => {
    let foto = await ImagePicker.launchImageLibraryAsync({
      quality: 1
    })
    setFotoURI(foto.uri);
  }

  const salvarRestaurante = async () => {
    const foto = await fetch (fotoURI);
    const blob = await foto.blob();
    const idImagem =  (await imagensCounterRef.once('value')).val().toString();
    await imagensRef.child(idImagem).put(blob);
    const downloadURL = await imagensRef.child(idImagem).getDownloadURL();
    imagensCounterRef.set(+idImagem + 1);
    restaurantesCollection.add({
      nome: nome,
      cidade: cidade,
      fotoURL: downloadURL,
      preco: preco,
      categoria: categoria,
      avaliacaoMedia: 0,
      qtdeAvaliacoes: 0
    })

  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.nomeTextInput}
        placeholder="Nome do restaurante"
        onChangeText={(texto) => setNome(texto)}
        value={nome}
      />
      <View style={styles.cidadeECategoriaView}>
        <TextInput 
          style={styles.cidadeTextInput}
          placeholder="Cidade"
          onChangeText={(texto) => setCidade(texto)}
          value={cidade}
        />
        <Picker
          selectedValue={categoria}
          style={styles.categoriaPicker}
          onValueChange={(value, index) => setCategoria(value)}
          mode="dropdown">
            <Picker.Item label="Categoria" value="Categoria"/>
            <Picker.Item label="Japonês" value="Japonês" />
            <Picker.Item label="Brasileiro" value="Brasileiro" />
        </Picker>
      </View>
      <View style={styles.precoView}>
        <Text>Preço</Text>
        <Slider 
          style={styles.precoSlider}
          minimumValue={1}
          maximumValue={5}
          value={preco}
          step={1}
          onValueChange={(value) => setPreco(value)}
        />
      </View>
      <View style={styles.previewImagemView}>
        {
          fotoURI ?
          <Image 
            style={{width: '100%', height: '100%'}}
            source={{uri: fotoURI}}
          />
          :
          <Text>Sem foto</Text>
        }
      </View>
      <View style={styles.tirarFotoButton}>
        <Button 
          title="Selecionar foto"
          onPress={obterFoto}
        />
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => {
        salvarRestaurante();
        props.navigation.goBack();
      }}>
        <Text style={styles.iconeFab}>OK</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AdicionarRestauranteTela

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  nomeTextInput: {
    width: '90%',
    textAlign: 'center',
    padding: 8,
    fontSize: 16,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    alignSelf: 'center'
  },
  cidadeECategoriaView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12
  },
  cidadeTextInput: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: "40%"
  },
  categoriaPicker: {
    width: "40%"
  },
  precoView: {
    marginVertical: 12,
    alignItems: 'center'
  },
  precoSlider: {
    width: "95%",
    marginTop: 8
  },
  previewImagemView: {
    alignSelf: 'center',
    width: "90%",
    height: 200,
    borderWidth: 1,
    borderColor: "#BBB",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  tirarFotoButton: {
    width: '90%',
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    backgroundColor:'#03A9F4',
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    right: 30,
    bottom: 30,
    elevation: 8
  },
  iconeFab: {
    fontSize: 16,
    color: 'white'
  }
})
