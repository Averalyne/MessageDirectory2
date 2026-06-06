import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './HomeScreen';
import { Message } from '../data/messages';

type MessagesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Messages'>;
type MessagesScreenRouteProp = RouteProp<RootStackParamList, 'Messages'>;

interface Props {
  navigation: MessagesScreenNavigationProp;
  route: MessagesScreenRouteProp;
}

const MessagesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;
  const anims = useRef(category.messages.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      100,
      anims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const translateX = anims[index].interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 0],
    });
    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: anims[index],
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={[styles.accentBar, { backgroundColor: category.color }]} />
        <View style={styles.cardBody}>
          <View style={[styles.pill, { backgroundColor: category.color + '25' }]}>
            <Text style={[styles.pillText, { color: category.color }]}>
              {String(index + 1).padStart(2, '0')}
            </Text>
          </View>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1923" />

      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: category.color }]}>
        <View style={styles.heroBubble} />
        <View style={styles.heroBubble2} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.heroEmoji}>{category.emoji}</Text>
        <Text style={styles.heroTitle}>{category.name}</Text>
        <Text style={styles.heroSub}>{category.messages.length} stored messages</Text>
      </View>

      <FlatList
        data={category.messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F1923',
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 36,
    overflow: 'hidden',
  },
  heroBubble: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -40,
  },
  heroBubble2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -20,
    right: 70,
  },
  backBtn: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heroEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1.2,
    lineHeight: 42,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 0.4,
  },
  flatList: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1A2535',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  pill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 36,
    alignItems: 'center',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  messageText: {
    flex: 1,
    fontSize: 15,
    color: '#C8C2BA',
    lineHeight: 24,
    fontWeight: '400',
  },
});

export default MessagesScreen;