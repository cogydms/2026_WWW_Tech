# Final Questions
## 1. Why are we using clamp() instead of media queries?

It allows the text to scale smoothly between a minimum and maximum size depending on the screen width.
This keeps the code cleaner and more flexible.

## 2. Why did we use minmax() instead of fixed columns?

We used minmax() to create flexible grid columns.
It ensures each column has a minimum width but can grow to fill available space.

## 3. Why is it important to implement a mobile-first website?

This is important because most users browse on mobile devices.
It improves performance, usability, and makes the design easier to scale for larger screens.

## 4. What happens if we remove the variables defined at the beginning?

If we remove the CSS variables, styles that use them will stop working correctly.
The design will lose consistency and it will be harder to maintain or update colors, spacing, and themes like dark mode.