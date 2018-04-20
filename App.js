import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

type Props = {};
export default class App extends Component<Props> {
  state = {
    modalVisible: false,
    repos: [
    ],
  };

  async componentDidMount() {
    const repos = JSON.parse(await AsyncStorage.getItem('@Minicurso:repositories')) || [];

    this.setState({ repos })
  };

  _addRepository = async (newRepoText) => {
    const repoCall = await fetch(`http://api.github.com/repos/${newRepoText}`);
    const response = await repoCall.json();

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login,
    };

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos,
        repository,
      ],
    });

    await AsyncStorage.setItem('@Minicurso:repositories', JSON.stringify(this.state.repos));
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

        <NewRepoModal
          onCancel={() => {this.setState({ modalVisible: false })}}
          visible={this.state.modalVisible}
          onAdd={this._addRepository}
        />
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
