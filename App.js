import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { AuthSession } from 'expo';

export default function App() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'x',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // You can now use the id_token for further operations
      console.log(id_token);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
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
