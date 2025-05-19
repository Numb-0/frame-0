import { App } from "astal/gtk4";
import style from "./scss/style.scss";
import Bar from "./widget/Bar";
import { optionsManager } from "./config/options";
import Applauncher from "./widget/Applauncher";
import PowerActions from "./widget/PowerActions";
import Notifications from "./widget/Notifications";

App.start({
  icons: `${SRC}/assets`,
  css: style,
  main() {
    optionsManager;
    App.get_monitors().map(Bar);
    Notifications();
    Applauncher();
    PowerActions();
  },
  requestHandler(request: string, res: (response: any) => void) {
    switch (request) {
      case "applauncher":
        App.toggle_window("Applauncher");
        break;
      //   case "dashboard":
      //     App.toggle_window("Dashboard");
      //     break;
      //   case "pldashboard":
      //     App.toggle_window("PlayerDashboard");
      //     break;
      case "poweractions":
        App.toggle_window("PowerActions");
        break;
      //   case "clearnotification":            break;
    }
    return res("toggled window");
  },
});
