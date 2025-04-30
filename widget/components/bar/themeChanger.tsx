import { bind, execAsync, Variable } from "astal";

export const changeTheme = () => {
  const currentIndex = COLORSCHEMES.indexOf(THEME.get());
  THEME.set(COLORSCHEMES[(currentIndex + 1) % COLORSCHEMES.length]);
};

export default function ThemesChanger() {
  const animating = Variable<boolean>(false);

  const handleClick = () => {
    animating.set(!animating.get());
    changeTheme();
  };

  return (
    <button
      cssClasses={animating().as((animating) => [
        "theme",
        animating ? "active" : "deactive",
      ])}
      onClicked={handleClick}
    >
      <image iconName={"arrow-symbolic"}></image>
    </button>
  );
}
