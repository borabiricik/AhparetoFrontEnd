export const getLayoutName = (history) => {
    const layoutName = history.location.pathname.split("/")[1]
  return "/"+layoutName
}