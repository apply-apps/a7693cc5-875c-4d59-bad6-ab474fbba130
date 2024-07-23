// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [hero, setHero] = useState('');
  const [villain, setVillain] = useState('');
  const [plot, setPlot] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
          {
            role: 'user',
            content: `Create a fairy tale with the hero: ${hero}, the villain: ${villain}, and the plot: ${plot}.`,
          },
        ],
        model: 'gpt-4o',
      });

      const { data } = response;
      setStory(data.response);
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('Sorry, there was an error generating your story.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the hero"
          value={hero}
          onChangeText={setHero}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the villain"
          value={villain}
          onChangeText={setVillain}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the plot"
          value={plot}
          onChangeText={setPlot}
        />
        <Button title="Generate Story" onPress={generateStory} />
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
        ) : (
          <View style={styles.storyBox}>
            <Text style={styles.story}>{story}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  loading: {
    marginTop: 20,
  },
  storyBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  story: {
    fontSize: 16,
  },
});