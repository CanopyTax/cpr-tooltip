# cpr-tooltip
a React tooltip for heart-threatening situations

## Usage
```js
import CprTooltip from 'cpr-tooltip';

export default function MyComponent() {
  return (
    <CprTooltip
      text="This will be shown on hover"
      delayTime={1500}
    />
      <div>
        This is the content that will have a tooltip when hovered.
      </div>
    </CprTooltip>
}
```

## API / Props
- `text` (required): The string of text to show in the tooltip.
- `delayTime` (optional): The number of milliseconds to wait after mouseover before showing the tooltip. Defaults to `0` (instantaneous tooltip).
