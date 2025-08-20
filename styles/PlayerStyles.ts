import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const PlayerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: width,
    height: height,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(17,17,17,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  topButton: {
    marginRight: 10,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    flexShrink: 1,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  middleControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    borderRadius: 40,
  },
  controlText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});
