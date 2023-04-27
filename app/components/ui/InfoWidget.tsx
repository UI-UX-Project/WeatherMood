import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text } from 'react-native';

const InfoWidget = ({
  height = 150,
  width = 150,
  children,
}: {
  height?: number;
  width?: number;
  children?: any;
}) => {
  return (
    <View style={{ ...styles.contentContainer, height, width }}>
      <View style={[styles.draggableBox]}>
        <BlurView tint='dark' style={{ height, width }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {children}
          </LinearGradient>
        </BlurView>
      </View>
    </View>
  );
};

export const InfoWidgetSmall = ({
  title,
  content,
  description,
}: {
  title: string;
  content: string;
  description: string;
}) => {
  return (
    <InfoWidget>
      <View style={styles.content}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.bigText}>{content}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </InfoWidget>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: '100%',
    width: '100%',
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    borderWidth: 2,
  },
  draggableBox: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleText: {
    fontSize: 12,
    textTransform: 'uppercase',
    opacity: 0.8,
    color: 'lightgrey',
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.9,
    color: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default InfoWidget;
