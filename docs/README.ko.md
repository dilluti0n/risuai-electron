# risuai-electron: RisuAI의 Electron 포트

## 이 포트의 존재 이유

RisuAI의 공식 데스크톱 릴리스[^1]는 Tauri로 제작되었습니다. 이 릴리즈의
Linux 빌드는 성능이 충분하지 않아 쾌적한 사용이 어렵습니다. 이는 주로
Tauri가 UI 렌더링에 Chromium 기반 엔진보다 느리고 최적화가 부족한
WebKitGTK를 사용하기 때문입니다.

공식 AppImage 빌드에는 WebKitGTK가 포함되어 있지 않아 사용자가 직접
설치해야 합니다. 일부 사용자는 libc 버전 호환성 문제[^2]를 보고한
바 있습니다.

## 다른 릴리스 형식의 한계

**Docker 빌드**
- 채팅 API 호출을 Electron 내장 구현이 아닌, 컨테이너 내부 Node.js
  프록시를 거쳐 전달하므로 속도가 느립니다.
- Docker의 파일 시스템 접근 오버헤드로 인해 긴 대화를 불러올 때 눈에
  띄는 지연이 발생합니다.

**웹 버전 (risuai.xyz)**
- 모든 HTTP 요청을 **프로젝트의 자체 서버**를 통해 프록시합니다. 즉
  서버 운영자는 AI 캐릭터와의 대화 내용을 포함하는 모든 요청·응답
  데이터에 접근할 수 있습니다.
- RisuAI의 어플리케이션 소스 코드가 공개되어 있는 것과는 별개로,
  프록시의 소스 코드는 확인할 수 없습니다.
- 경우에 따라 트래픽이 홍콩 백업 서버로 리다이렉트되며, 이로 인해 지역
  제한이 있는 Gemini API가 동작하지 않을 수 있습니다.

## 이 포트가 해결하는 점

- Chromium을 번들링하여 일관된 성능 제공.
- 외부 프록시를 사용하지 않고 직접 요청 전송.
- Docker 오버헤드 없이 파일시스템 접근.

이를 통해 특히 Linux 환경에서 RisuAI를 더 안정적이고 빠르게 사용할 수
있습니다.

[^1]: https://github.com/kwaroran/RisuAI/releases
[^2]: https://github.com/kwaroran/RisuAI/issues/733
