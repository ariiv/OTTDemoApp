import { render } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';
import catalog from '../assets/catalog.json';

test('renders first 3 catalog items', () => {
  const { getByText } = render(<HomeScreen />);
  catalog.items.slice(0, 3).forEach(item => {
    expect(getByText(item.title)).toBeTruthy();
  });
});
