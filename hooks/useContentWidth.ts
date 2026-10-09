import { useWindowDimensions } from "react-native";

/**
 * The app is laid out as a phone-sized column. On tablets and desktop
 * browsers it is centred and capped at this width (see the root layout).
 */
export const MAX_CONTENT_WIDTH = 480;

/** Width of the app column: the window width on phones, capped on wider screens. */
export function useContentWidth(): number {
  const { width } = useWindowDimensions();
  return Math.min(width, MAX_CONTENT_WIDTH);
}
