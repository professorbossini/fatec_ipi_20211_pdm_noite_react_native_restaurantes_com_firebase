import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';

const store = createStore(() => {});
export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
      <ModalPortal />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
