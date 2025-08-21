import { fireEvent, render } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';
import { PlayButton } from '../components/PlayButton';

// --- Unit tests ---
describe('PlayButton (unit)', () => {
  jest.useFakeTimers();
  it('renders with default label', () => {
    const { getByText } = render(<PlayButton onPress={() => {}} />);
    expect(getByText('Play')).toBeTruthy();
    expect(getByText('▶')).toBeTruthy();
  });

  it('renders with custom label', () => {
    const { getByText } = render(<PlayButton onPress={() => {}} label="Start" />);
    expect(getByText('Start')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<PlayButton onPress={onPressMock} />);
    fireEvent.press(getByText('Play'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

// --- Integration test ---
describe('PlayButton inside HomeScreen (integration)', () => {
  it('navigates when PlayButton in hero is pressed', () => {
    const mockPush = jest.fn();
    jest.mock('expo-router', () => ({
      useRouter: () => ({ push: mockPush }),
    }));

    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Play'));
    expect(mockPush).toHaveBeenCalled();
  });
});
