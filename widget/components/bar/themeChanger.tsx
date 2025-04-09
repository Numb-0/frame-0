import { bind, execAsync, Variable } from "astal";
import { App, Astal, Gtk, Gdk, hook } from "astal/gtk4";

// Take a look in scss/colorschemes
const colorschemes = ["catppuccin","gruv"]
export const themeVar = Variable<string>(colorschemes[0])

export default function ThemesChanger() {

    var currentIndex = 0

    const changeTheme = () => {
        currentIndex = (currentIndex + 1) % colorschemes.length
        themeVar.set(colorschemes[currentIndex]);
    }

    return (
        <button onClicked={changeTheme}>
            {bind(themeVar)}
        </button>
    )
}