import { Gio, GLib, Variable } from "astal";
import { Gtk, Gdk } from "astal/gtk4";
import Notifd from "gi://AstalNotifd";

function urgency(n: Notifd.Notification) {
  const { LOW, NORMAL, CRITICAL } = Notifd.Urgency;
  switch (n.urgency) {
    case LOW:
      return "low";
    case CRITICAL:
      return "critical";
    case NORMAL:
    default:
      return "normal";
  }
}

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);

export function notificationItem(n: Notifd.Notification) {
  const status = Variable<string>("") 
  return (
    <box vertical cssClasses={["notification", `notif${n.id}`]}>
      <box cssClasses={["header", urgency(n)]}>
        {(n.appIcon || n.desktopEntry) && (
          <image
            cssClasses={["app-icon"]}
            iconName={n.appIcon || n.desktopEntry || "notification-symbolic"}
          />
        )}
        <label
          cssClasses={["app-name"]}
          halign={START}
          label={n.appName || "Unknown"}
        />
        <label cssClasses={["time"]} hexpand halign={END} label={TIME.get()} />
        <button
          cssClasses={["close-button"]}
          halign={END}
          onClicked={() => n.dismiss()}
        >
          <image iconName="window-close-symbolic" />
        </button>
      </box>
      <box cssClasses={["content"]}>
        <box>
          {n.image && fileExists(n.image) && (
            <Gtk.Picture
              contentFit={Gtk.ContentFit.FILL}
              cssClasses={["image"]}
              file={Gio.file_new_for_path(n.image)}
            />
          )}
          <box vertical valign={CENTER}>
            <label
              cssClasses={["summary"]}
              halign={START}
              wrap
              label={n.summary}
            />
            {n.body && (
              <label cssClasses={["body"]} wrap useMarkup label={n.body} />
            )}
            {n.get_actions().length > 0 && (
              <box cssClasses={["actions"]} spacing={5}>
                {n.get_actions().map(({ label, id }) => (
                  <button
                    hexpand
                    cursor={Gdk.Cursor.new_from_name("pointer", null)}
                    onButtonPressed={() => {
                      n.invoke(id);
                    }}
                  >
                    <label label={label} halign={CENTER} />
                  </button>
                ))}
              </box>
            )}
          </box>
        </box>
      </box>
    </box>
  );
}
