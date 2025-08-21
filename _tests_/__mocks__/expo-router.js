export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
});

export const useSegments = () => [];
export const useSearchParams = () => ({});
