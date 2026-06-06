import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categoriesData, CategoryData } from '../data/messages';

export type RootStackParamList = {
  Home: undefined;
  Messages: { category: CategoryData };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const HALF = (width - 48) / 2;

const CARD_SPANS = ['half', 'half', 'full', 'half', 'half', 'full'];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const anims = useRef(categoriesData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      90,
      anims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1923" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>✉️  PERSONAL</Text>
          <Text style={styles.title}>Message{'\n'}Directory</Text>
          <Text style={styles.subtitle}>
            {categoriesData.length} categories ·{' '}
            {categoriesData.reduce((a, c) => a + c.messages.length, 0)} messages
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.grid}>
          {categoriesData.map((cat, i) => {
            const isFull = CARD_SPANS[i] === 'full';
            const translateY = anims[i].interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            });
            return (
              <Animated.View
                key={cat.name}
                style={[
                  styles.cardWrapper,
                  isFull ? styles.cardFull : styles.cardHalf,
                  { opacity: anims[i], transform: [{ translateY }] },
                ]}
              >
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: cat.color }]}
                  onPress={() => navigation.navigate('Messages', { category: cat })}
                  activeOpacity={0.85}
                >
                  <View style={styles.decorCircle} />
                  <View style={styles.decorCircle2} />
                  <Text style={styles.cardEmoji}>{cat.emoji}</Text>
                  <Text style={styles.cardName}>{cat.name}</Text>
                  <Text style={styles.cardCount}>{cat.messages.length} messages</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F1923',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 28,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#F0A500',
    marginBottom: 10,
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    color: '#F5F0E8',
    lineHeight: 48,
    letterSpacing: -1.5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#5A6A7E',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  cardWrapper: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  cardHalf: {
    width: HALF,
    height: HALF * 1.15,
  },
  cardFull: {
    width: width - 32,
    height: HALF * 0.72,
  },
  card: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -35,
    right: -35,
  },
  decorCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: 30,
    right: 40,
  },
  cardEmoji: {
    fontSize: 38,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  cardCount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
    marginTop: 3,
    letterSpacing: 0.4,
  },
});

export default HomeScreen;