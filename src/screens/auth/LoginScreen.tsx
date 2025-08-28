import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, Card, Chip, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  
  const { login } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = {
    student: { email: 'marie.kouame@ead.cg', password: 'demo' },
    admin: { email: 'admin@ead.cg', password: 'admin' }
  };

  const fillDemo = () => {
    setEmail(demoCredentials[userType].email);
    setPassword(demoCredentials[userType].password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons 
              name="school" 
              size={64} 
              color={theme.colors.primary} 
            />
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            École Africaine de Développement
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Plateforme Éducative Sécurisée
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            {/* User Type Selector */}
            <View style={styles.chipContainer}>
              <Chip
                selected={userType === 'student'}
                onPress={() => setUserType('student')}
                style={styles.chip}
              >
                Étudiant
              </Chip>
              <Chip
                selected={userType === 'admin'}
                onPress={() => setUserType('admin')}
                style={styles.chip}
              >
                Administration
              </Chip>
            </View>

            {/* Demo Credentials */}
            <Card style={styles.demoCard}>
              <Card.Content>
                <Text variant="bodySmall" style={styles.demoText}>
                  Comptes de démonstration :
                </Text>
                <Button
                  mode="text"
                  onPress={fillDemo}
                  style={styles.demoButton}
                >
                  Utiliser les identifiants de demo {userType === 'student' ? 'étudiant' : 'admin'}
                </Button>
              </Card.Content>
            </Card>

            {/* Login Form */}
            <View style={styles.form}>
              <TextInput
                label="Adresse email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                style={styles.input}
              />

              <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading || !email || !password}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
              >
                Se connecter
              </Button>
            </View>

            {/* Security Notice */}
            <Card style={styles.securityCard}>
              <Card.Content style={styles.securityContent}>
                <MaterialCommunityIcons 
                  name="shield-check" 
                  size={16} 
                  color={theme.colors.secondary} 
                />
                <Text variant="bodySmall" style={styles.securityText}>
                  Connexion sécurisée par chiffrement TLS 1.3
                </Text>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.footerText}>
            © 2024 École Africaine de Développement - Brazzaville
          </Text>
          <Text variant="bodySmall" style={styles.footerText}>
            Plateforme sécurisée pour l'excellence académique
          </Text>
        </View>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={4000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    marginHorizontal: 4,
  },
  demoCard: {
    backgroundColor: theme.colors.primaryContainer,
    marginBottom: 16,
  },
  demoText: {
    color: theme.colors.primary,
    marginBottom: 8,
  },
  demoButton: {
    alignSelf: 'flex-start',
  },
  form: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  securityCard: {
    backgroundColor: theme.colors.secondaryContainer,
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  securityText: {
    marginLeft: 8,
    color: theme.colors.secondary,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 4,
  },
  snackbar: {
    backgroundColor: theme.colors.error,
  },
});