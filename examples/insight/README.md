# Example of RTCStatsInsight
## serve in localhost
1. write your SkyWay API key which allows domain `localhost` to `key.js`
2. build this library

```sh
$ # (cd to root directory of this repository.)
$ npm run build
```

3. serve http locally

```sh
$ python3 -m http.server
```

4. open `/examples/insight/index.html`

```sh
$ open http://localhost:8000/
```

## try bad network condition
in macOS, you can try bad network condition with `dnctl` and `pfctl`.

1. create a new dummy net

```sh
$ sudo dnctl pipe 1 config delay 100ms plr 0.01
```

2. edit and load pf.conf

```sh
$ cat /etc/pf.conf
dummynet out quick proto udp all pipe 1
$ sudo pfctl -f /etc/pf.conf
```

3. enable pfctl

```sh
$ sudo pfctl -e
```

4. After the experimentation, Don't forget disable pfctl :D

```sh
$ sudo pfctl -d
```

FYI, in Linux, `NETEM(8)` is famous as a network emulator.
