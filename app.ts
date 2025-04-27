import { App } from "astal/gtk4"
import style from "./scss/style.scss";
import Bar from "./widget/Bar"
import { optionsManager } from "./config/options";

App.start({
    icons: `${SRC}/assets`,
    css: style,
    main() {
        optionsManager
        App.get_monitors().map(Bar)
    },
})
