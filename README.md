# risuai-electron: An Electron port for RisuAI

한국어로 읽기: [README.ko.md](/docs/README.ko.md)

## Why this port exists

The official desktop release[^1] of RisuAI is built with Tauri. On
Linux, performance of this release is often insufficient for smooth
experience. This is mainly because Tauri renders the UI with
WebKitGTK, which is slower and less optimized than Chromium-based
engines.

The official AppImage build does not bundle WebKitGTK, requiring users
to install it manually. Some users have also reported libc version
mismatches[^2].

---

## Limitations of other release formats

**Docker build**
- Optimized for web deployment.
- Routes API calls through a private Node.js proxy, which is slower
  than Electron’s built-in implementation.
- Filesystem access overhead in Docker can cause noticeable delays
  when loading long conversations.

**Web version (risuai.xyz)**
- Proxies all HTTP requests through the **project’s own server**. As
  with any proxy, the *operator* has the ability to view request and
  response data, which may include chat content that you have with AI
  characters.
- Proxy source code is not published, which contrasts with the
  project’s open-source branding.
- In some cases, traffic is redirected to a Hong Kong fallback server,
  which may cause failures with region-restricted Gemini APIs.

---

## What this port changes

- Bundles Chromium for consistent performance.
- Avoids external proxies, sending requests directly.
- Runs locally without Docker overhead.

This results in a more stable and responsive RisuAI experience,
especially on Linux.

[^1]: https://github.com/kwaroran/RisuAI/releases
[^2]: https://github.com/kwaroran/RisuAI/issues/733
