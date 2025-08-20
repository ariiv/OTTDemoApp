import { fireEvent, render, waitFor } from '@testing-library/react-native';
import App from '../App';

test('Home → Details → Player flow', async () => {
  const { getByText, getByTestId } = render(<App />);
  fireEvent.press(getByText('Big Buck Bunny (HLS)'));
  await waitFor(() =>
    expect(getByText('Short animated film used as a demo stream.')).toBeTruthy()
  );
  fireEvent.press(getByTestId('PlayButton'));
  expect(getByTestId('VideoPlayer')).toBeTruthy();
});
