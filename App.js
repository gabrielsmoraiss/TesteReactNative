import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

type Props = {};
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    repos: [
      {
        id: 1,
        thumbnail: 'https://www.subaru.ca/content/7907/media/General/thumbnail/1048_3603.png',
        title: 'Subaru wrx STI 2019',
        author: 'Subaru ',
      },
      {
        id: 2,
        thumbnail: 'https://www.subaru.ca/content/7907/media/General/thumbnail/1048_3603.png',
        title: 'Subaru WRX 2019',
        author: 'Subaru',
      },
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Teste Subaru!</Text>
          <TouchableOpacity onPress={() => {this.setState({ modalVisible: true })}} >
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList} >
          { this.state.repos.map(repo => <Repo key={repo.id} data={repo} />) }
        </ScrollView>

        <NewRepoModal visible={this.state.modalVisible} onCancel={() => {this.setState({ modalVisible: false })}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },

  header: {
    height:(Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  headerButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold', 
  },

  repoList: {
    padding: 20,
  },
});
