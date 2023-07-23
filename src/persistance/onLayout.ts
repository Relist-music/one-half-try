export const onLayout = (sizes: number[]) => {
  document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)};SameSite=Lax`;
};
