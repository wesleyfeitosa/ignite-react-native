import { StackScreenProps } from '@react-navigation/stack';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { AuthRoutesParamList } from '@routes/types';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/PasswordInput';
import { useAuth } from '@hooks/auth';
import { database } from '@database/index';

import { Container, Header, Title, SubTitle, Form, Footer } from './styles';

type Props = StackScreenProps<AuthRoutesParamList, 'SignIn'>;

export function SignIn({ navigation }: Props): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer o login, verique as credenciais'
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users');
      const users = await userCollection.query().fetch();
    }

    loadData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      contentContainerStyle={{
        height: Dimensions.get('window').height + getStatusBarHeight(),
        backgroundColor: theme.colors.background_primary,
      }}
    >
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <Header>
          <Title>Estamos{'\n'}quase lá.</Title>

          <SubTitle>
            Faça seu login para começar{'\n'}uma experiência incrível.
          </SubTitle>
        </Header>

        <Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />
        </Form>

        <Footer>
          <Button title="Login" onPress={handleSignIn} />
          <Button
            title="Criar conta gratuita"
            color={theme.colors.background_secondary}
            onPress={handleNewAccount}
            enabled={true}
            light
          />
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
}
