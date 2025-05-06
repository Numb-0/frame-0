import { bind, execAsync } from "astal";
import Bluetooth from "gi://AstalBluetooth";

export default function BluetoothStatus() {
  const bluetooth = Bluetooth.get_default();

  const custom_icons: { [key: string]: string } = {
    "audio-headset": "headset-symbolic",
  };

  function toggle_device(device: Bluetooth.Device) {
    if (bluetooth.adapter.powered) {
      if (!device.paired) {
        device.trusted = true;
        device.pair();
        //device.connect_device(null);
      } else if (!device.connected) {
        device.connect_device(null);
      } else {
        device.disconnect_device(null);
      }
    }
  }

  function DeviceButton({ device }: { device: Bluetooth.Device }): JSX.Element {
    return (
      <box cssClasses={["device"]}>
        <button
          hexpand
          onButtonPressed={() =>
            !device.connecting ? toggle_device(device) : null
          }
          cssClasses={bind(device, "connected").as((connected) =>
            connected ? ["connected"] : [""]
          )}
        >
          <box spacing={4}>
          {/*<image iconName={custom_icons[device.get_icon()] || device.get_icon()} />*/}
            <label label={device.alias} />
          </box>
        </button>
        <button
          cssClasses={["forget"]}
          halign={END}
          hexpand
          onButtonPressed={()=>forget_device(device)}
        >
          <image
            iconName={bind(device, "connecting").as((connecting) =>
              connecting ? "network-transmit" : "edit-delete"
            )}
          />
        </button>
      </box>
    );
  }

  const device_list = bind(bluetooth, "devices").as((devices) =>
    devices
      .filter((device) => device.name && device.icon)
      .sort((a, b) => {
        if (a.connected && !b.connected) return -1;
        if (!a.connected && b.connected) return 1;
        if (a.paired && !b.paired) return -1;
        if (!a.paired && b.paired) return 1;
        return 0;
      })
      .map((device) => <DeviceButton device={device} />)
  );

  function forget_device(device: Bluetooth.Device) {
    if (device.paired) {
      execAsync(["bluetoothctl", "remove", device.address]).catch((err) => console.error(err))
    }
  }

  return (
    <box cssClasses={["bluetooth"]}>
      <menubutton>
        <image
          iconName={bind(bluetooth.adapter, "powered").as((powered) =>
            powered
              ? "bluetooth-active-symbolic"
              : "bluetooth-disabled-symbolic"
          )}
        />
        <popover>
          <box vertical spacing={4}>
            <box>
              <label label={"Bluetooth"} />
              <switch
                hexpand
                halign={END}
                onNotifyActive={(self) =>
                  self.active
                    ? (bluetooth.adapter.powered = true)
                    : (bluetooth.adapter.powered = false)
                }
              />
            </box>
            {device_list}
          </box>
        </popover>
      </menubutton>
    </box>
  );
}
