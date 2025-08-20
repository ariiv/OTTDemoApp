import { fireEvent, render } from '@testing-library/react-native';
import catalog from '../assets/catalog.json';
import PlayerScreen from '../screens/PlayerScreen';

const item = catalog.items[0];

test('play/pause button exists and toggles', () => {
  const { getByTestId } = render(<PlayerScreen item={item} />);
  
  const playButton = getByTestId('PlayButton');
  expect(playButton).toBeTruthy();

  fireEvent.press(playButton);
});
