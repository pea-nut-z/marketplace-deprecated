import React, { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { useAuth } from "../../AuthContext";
import { COLORS, SIZES } from "../../constants";

export default function Signup({ navigation }) {
  //   const usernameRef = useRef();
  //   const emailRef = useRef();
  //   const passwordRef = useRef();
  //   const passwordConfirmRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const id = 11111;

  const onSignup = () => {
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    if (!username || !email || !password || !passwordConfirm) {
      return setError("Empty field");
    }
    setError("");
    setLoading(true);
    signup(email, password)
      .then((cred) => {
        cred.user.updateProfile({
          displayName: username,
        });
        setError("");
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch(() => {
        setError("Sign up failed");
        setLoading(false);
      });
  };

  const renderButtonOrLoading = () => {
    if (loading) {
      return <Text>Loading</Text>;
    }
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: SIZES.padding,
        }}
      >
        <Button color={COLORS.primary} onPress={() => navigation.goBack()} title="Cancel" />
        <Button color={COLORS.primary} onPress={() => onSignup()} title="Sign Up" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: SIZES.padding * 2 }}>
      <View style={{ alignItems: "center", paddingVertical: SIZES.padding }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            paddingVertical: SIZES.padding,
          }}
        >
          Sign up
        </Text>
      </View>

      <View>
        <Text style={styles.label}>Username:</Text>
        <TextInput onChangeText={setUsername} style={styles.input} />
        <Text style={styles.label}>Email:</Text>
        <TextInput onChangeText={setEmail} style={styles.input} />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder={"Minimum 6 characters"}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Text style={styles.label}>Password Confirmation:</Text>
        <TextInput secureTextEntry={true} onChangeText={setPasswordConfirm} style={styles.input} />
      </View>
      <Text>{error}</Text>
      {renderButtonOrLoading()}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    paddingVertical: SIZES.padding,
  },
  input: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
  },
});
