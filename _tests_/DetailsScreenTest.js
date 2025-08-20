import { render } from '@testing-library/react-native';
import catalog from '../assets/catalog.json';
import DetailsScreen from '../screens/DetailsScreen';

const item = catalog.items[0];

test('renders video title and description', () => {
  const { getByText } = render(<DetailsScreen item={item} />);
  expect(getByText(item.title)).toBeTruthy();
  expect(getByText(item.description)).toBeTruthy();
});
