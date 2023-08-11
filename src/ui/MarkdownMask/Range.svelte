<script lang="ts">
  export let strong: boolean | undefined = undefined;
  export let color: string | undefined = undefined;
  export let gradientColor: string | undefined = undefined;
  export let italic: boolean | undefined = undefined;

  const style = {
    ...(color ? { color } : {}),
    ...(gradientColor
      ? {
          background: gradientColor,
          '-webkit-background-clip': 'text',
          color: 'transparent',
        }
      : {}),
    ...(strong ? { fontWeight: 'bold' } : {}),
    ...(italic ? { fontStyle: 'italic' } : {}),
  };

  const styleString = Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
</script>

<span style="{styleString}"> </span>
