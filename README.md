
# Animated ASCII

Animated ASCII is an npm package that provides a component to display animated ASCII art in a React application. You can make the animation at https://animated-ascii.com.

## Installation

To install the package, use the following command:

```bash
npm install animated-ascii
```

## Usage

Below is an example of how to use the `AsciiAnimation` component in your React application.

```javascript
import React from 'react';
import { AsciiAnimation } from 'animated-ascii';
import ballerina from './ballerina.json'; // Created on animated-ascii.com

function App() {
  return (
    <div>
      <AsciiAnimation
        height={500} // Height of the animation container
        animation={ballerina} // Animation data
      />
    </div>
  );
}

export default App;
```

## Component Props

### `AsciiAnimation`

- `color` (string, optional): The override color for ASCII characters if `animationColors` is not provided. Default is undefined, if the animation does not have dynamic color it is `#000`.
- `height` (number, required): The height of the animation container in pixels.
- `animation` (object, required): The animation data object containing:
  - `animation` (string, required): Base64 encoded string of the animation frames.
  - `animationColors` (string, optional): Base64 encoded string of the colors for each character in the frames.
  - `frameRate` (number, required): The frame rate of the animation in frames per second.

## Example Animation Data

You can easily create an animation at animated-ascii.com. The `animation` object should contain the Base64 encoded strings of your animation frames and optional colors. You can use tools like `pako` to compress and encode your data.

```javascript
const animation = {
  animation: 'BASE64_ENCODED_ANIMATION_FRAMES',
  animationColors: 'BASE64_ENCODED_ANIMATION_COLORS', // Optional
  frameRate: 24, // Frames per second
};
```

## Notes

- Ensure that the `height` prop is set appropriately to fit your animation frames.
- If `animationColors` is provided, it should be an array of Base64 encoded strings matching the length of the animation frames.

For more details and examples, please refer to the source code and additional documentation.
