import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { AuthSession } from 'expo';
import { decode } from 'base-64';

export default function App() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'x',
  });

  const [userInfo, setUserInfo] = React.useState(null); // State to hold user info

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // Decode the id_token manually
      const decodedToken = decodeJWT(id_token);
      // Set user info
      setUserInfo(decodedToken);
    }
  }, [response]);

  const decodeJWT = (token) => {
    const parts = token.split('.');
    const decoded = {
      header: JSON.parse(decode(parts[0])),
      payload: JSON.parse(decode(parts[1])),
      signature: parts[2],
    };
    return decoded.payload;
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {userInfo ? (
        <View>
          <Image
            source={{ uri: userInfo.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text>Welcome, {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Button title="Logout" onPress={() => setUserInfo(null)} />
        </View>
      ) : (
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      )}
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
