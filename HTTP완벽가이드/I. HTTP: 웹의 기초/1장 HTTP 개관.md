# 1장. HTTP 개관

## 1.1 HTTP: 인터넷의 멀티미디어 배달부

### 핵심 개념
HTTP(HyperText Transfer Protocol)는 웹에서 데이터를 주고받기 위한 프로토콜입니다. 텍스트, 이미지, 비디오 등 모든 종류의 멀티미디어 데이터를 안전하고 신뢰성 있게 전송합니다.

- **FrontEnd 관점**: `fetch()` API나 `axios`로 API를 호출할 때 사용하는 것이 바로 HTTP
- **AWS 연결**: CloudFront(CDN)는 HTTP/HTTPS를 통해 정적 자산을 배포
- **Nginx**: 웹 서버로서 HTTP 요청을 받아 애플리케이션으로 전달하는 역할

```javascript
// HTTP 프로토콜을 사용해서 요청 fetch / axios 
// 1. 기본 GET 요청
// fetch
fetch('https://api.example.com/users')
  .then(response => response.json())  // json() 변환 필요
  .then(data => console.log(data));

// axios
axios.get('https://api.example.com/users')
  .then(response => console.log(response.data));  // 자동 파싱


// 2. POST 요청
// fetch
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: '김명수' })
})
  .then(response => response.json())
  .then(data => console.log(data));

// axios
axios.post('https://api.example.com/users', {
  name: '김명수'  // 자동으로 JSON 변환
})
  .then(response => console.log(response.data));


// 3. 에러 처리
// fetch (상태 코드 체크 필요)
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    return response.json();
  })
  .catch(error => console.error(error));

// axios (자동 에러 처리)
axios.get('https://api.example.com/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```

## 1.2 웹 클라이언트와 서버

### 핵심 개념
- **클라이언트**: HTTP 요청을 보내는 주체 (브라우저, 모바일 앱 등)
- **서버**: HTTP 요청을 받아 처리하고 응답을 돌려주는 주체

### 클라이언트-서버 모델
```
[클라이언트] ---HTTP 요청---> [서버]
    ↑                           ↓
    └--------HTTP 응답----------┘
```

**클라이언트 역할 (FrontEnd)**
- SPA 프레임워크: Vue.js, React, Svelte, Solid.js
- 풀스택 프레임워크: Next.js (React), Nuxt.js (Vue), SvelteKit, Remix
- 기타: Angular, Preact, Qwik

**서버 역할 (BackEnd)**
- JavaScript/TypeScript: Node.js/Express, NestJS, Fastify, Koa
- Python: Django, FastAPI, Flask
- Java: Spring Boot, Quarkus
- Go: Gin, Echo, Fiber
- Rust: Actix, Rocket

**인프라**
- **AWS**: EC2 인스턴스에서 서버 구동, ALB(Application Load Balancer)로 트래픽 분산
- **Nginx**: 리버스 프록시로 클라이언트 요청을 백엔드 서버로 라우팅

```nginx
# Nginx 리버스 프록시 설정 예시
server {
    listen 80;
    server_name example.com;
    
    location /api {
        proxy_pass http://backend-server:3000;
    }
}
```

---

## 1.3 리소스

### 핵심 개념
웹 서버가 제공하는 모든 콘텐츠를 리소스라고 합니다.

#### 리소스의 종류
1. **정적 리소스**: HTML, CSS, JS, 이미지, 비디오 파일 등
2. **동적 리소스**: API 응답, 실시간 데이터, 사용자별 맞춤 콘텐츠

#### MIME 타입
리소스의 종류를 식별하기 위한 표준 방식

| MIME 타입 | 설명 | 예시 |
|----------|------|------|
| `text/html` | HTML 문서 | 웹 페이지 |
| `application/json` | JSON 데이터 | API 응답 |
| `image/png` | PNG 이미지 | 로고, 아이콘 |
| `application/javascript` | JavaScript | 번들 파일 |


```javascript

// 1. JSON 데이터 (동적 리소스)
const response = await fetch('/api/users');
const users = await response.json(); // Content-Type: application/json

// 2. 이미지 업로드
const formData = new FormData();
formData.append('image', file); // Content-Type: multipart/form-data
```

**AWS S3 + CloudFront 활용**
- S3에 정적 리소스 저장 (이미지, CSS, JS)
- CloudFront로 전세계에 빠르게 배포
- 올바른 MIME 타입 설정이 중요 (브라우저가 리소스를 올바르게 해석)

---

## 1.4 트랜잭션

### 핵심 개념
HTTP 트랜잭션은 요청(Request)과 응답(Response)으로 구성됩니다.

```
트랜잭션 = 요청 메시지 + 응답 메시지
```

### HTTP 메서드 (주요)
| 메서드 | 용도 | 프론트엔드 사용 예시 |
|--------|------|---------------------|
| GET | 리소스 조회 | 게시글 목록 불러오기 |
| POST | 리소스 생성 | 회원가입, 게시글 작성 |
| PUT | 리소스 전체 수정 | 프로필 전체 업데이트 |
| PATCH | 리소스 일부 수정 | 닉네임만 변경 |
| DELETE | 리소스 삭제 | 게시글 삭제 |

### 상태 코드 (주요)
| 코드 | 의미 | 프론트엔드 처리 |
|------|------|----------------|
| 200 | 성공 | 데이터 화면에 표시 |
| 201 | 생성 완료 | 성공 메시지 표시 |
| 400 | 잘못된 요청 | 입력값 검증 에러 표시 |
| 401 | 인증 필요 | 로그인 페이지로 리다이렉트 |
| 404 | 찾을 수 없음 | 404 페이지 표시 |
| 500 | 서버 에러 | 에러 알림 표시 |


```javascript
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      // 상태 코드에 따른 처리
      if (response.status === 404) {
        throw new Error('사용자를 찾을 수 없습니다');
      }
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      throw new Error('요청 실패');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 호출 에러:', error);
    // 사용자에게 에러 표시
  }
}
```

---

## 1.5 메시지

### 핵심 개념
HTTP 메시지는 구조화된 텍스트 형식입니다.

#### 요청 메시지 구조
```
GET /api/users HTTP/1.1              ← 시작줄
Host: api.example.com                ← 헤더
Authorization: Bearer token123       ← 헤더
Content-Type: application/json       ← 헤더
                                     ← 빈 줄
{"name": "김명수"}                    ← 본문 (선택)
```

#### 응답 메시지 구조
```
HTTP/1.1 200 OK                      ← 시작줄
Content-Type: application/json       ← 헤더
Content-Length: 45                   ← 헤더
Cache-Control: max-age=3600          ← 헤더
                                     ← 빈 줄
{"id": 1, "name": "김명수"}           ← 본문
```

### 주요 헤더 (프론트엔드 관점)

#### 요청 헤더
- `Authorization`: 인증 토큰 전달
- `Content-Type`: 보내는 데이터 형식
- `Accept`: 받고 싶은 데이터 형식
- `User-Agent`: 브라우저/클라이언트 정보

#### 응답 헤더
- `Content-Type`: 응답 데이터 형식
- `Cache-Control`: 캐싱 정책
- `Set-Cookie`: 쿠키 설정
- `Access-Control-Allow-Origin`: CORS 설정

```javascript
// fetch API에서 헤더 설정
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify({ name: '김명수' })
});

// 응답 헤더 확인
fetch('/api/data')
  .then(response => {
    console.log(response.headers.get('Content-Type'));
    console.log(response.headers.get('Cache-Control'));
    return response.json();
  });
```

**Nginx에서 헤더 제어**
```nginx
server {
    location / {
        # CORS 헤더 추가
        add_header Access-Control-Allow-Origin *;
        
        # 캐싱 헤더 설정
        add_header Cache-Control "public, max-age=86400";
        
        # 보안 헤더
        add_header X-Content-Type-Options nosniff;
    }
}
```

---

## 1.6 TCP 커넥션

### 핵심 개념
HTTP는 TCP/IP 위에서 동작합니다. TCP는 신뢰성 있는 데이터 전송을 보장하는 프로토콜입니다.

#### HTTP 통신 과정
```
1. 브라우저가 URL 파싱 (www.example.com)
2. DNS로 IP 주소 찾기 (93.184.216.34)
3. TCP 커넥션 수립 (3-way handshake)
4. HTTP 요청 전송
5. HTTP 응답 수신
6. TCP 커넥션 종료
```

### TCP 3-way Handshake
```
클라이언트          서버
   │                │
   │─── SYN ───────→│  (연결 요청)
   │                │
   │←── SYN-ACK ────│  (요청 수락)
   │                │
   │─── ACK ───────→│  (확인)
   │                │
   [커넥션 수립 완료]
```


#### 프론트엔드 영향
- **초기 연결 지연**: 첫 API 호출 시 TCP 연결 수립 시간 소요
- **Keep-Alive**: 연결 재사용으로 성능 향상

```javascript
// 브라우저는 자동으로 연결을 관리하지만,
// 개발자는 네트워크 탭에서 확인 가능
// Connection: keep-alive 헤더 확인
```

#### AWS에서의 TCP
- **ALB (Application Load Balancer)**: TCP 커넥션을 관리하고 백엔드로 분산
- **ELB Health Check**: TCP 레벨에서 서버 상태 확인

#### Nginx의 TCP 설정
```nginx
http {
    # Keep-Alive 설정
    keepalive_timeout 65;
    keepalive_requests 100;
    
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        keepalive 32;  # 백엔드 연결 유지
    }
}
```

### 성능 고려사항
1. **연결 수립 비용**: TCP handshake로 약 1.5 RTT(Round Trip Time) 소요
2. **HTTP/2**: 하나의 TCP 연결로 여러 요청 처리 (멀티플렉싱)
3. **CDN 활용**: CloudFront 같은 CDN으로 거리 단축

---

## 1.7 프로토콜 버전

### HTTP 버전별 특징

| 버전 | 출시년도 | 주요 특징 | 현재 상태 |
|------|---------|----------|----------|
| HTTP/0.9 | 1991 | GET만 지원, 헤더 없음 | 폐기 |
| HTTP/1.0 | 1996 | 헤더, 메서드 추가 | 거의 사용 안함 |
| HTTP/1.1 | 1997 | Keep-Alive, 파이프라인 | 여전히 많이 사용 |
| HTTP/2 | 2015 | 멀티플렉싱, 헤더 압축 | 점점 증가 |
| HTTP/3 | 2022 | QUIC 기반 (UDP 사용) | 도입 중 |

### HTTP/1.1 vs HTTP/2 차이

#### HTTP/1.1 문제점
```
[브라우저]                [서버]
    │──── 요청1 ──────→│
    │←──── 응답1 ───────│
    │──── 요청2 ──────→│  (대기 발생)
    │←──── 응답2 ───────│
```

#### HTTP/2 개선
```
[브라우저]                [서버]
    │──── 요청1,2,3 ──→│  (동시 전송)
    │←─ 응답1,2,3 ─────│  (순서 무관)
```


#### 프론트엔드에서 확인
```javascript
// 브라우저에서 HTTP 버전 확인
fetch('https://api.example.com')
  .then(response => {
    // 개발자 도구 Network 탭에서 Protocol 컬럼 확인
    // h2 = HTTP/2, http/1.1 = HTTP/1.1
  });
```

#### Nginx에서 HTTP/2 활성화
```nginx
server {
    listen 443 ssl http2;  # HTTP/2 활성화
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;  # 백엔드는 1.1 사용 가능
    }
}
```

#### AWS CloudFront
- 자동으로 HTTP/2 지원
- 클라이언트-CloudFront 간: HTTP/2
- CloudFront-Origin 간: HTTP/1.1 또는 HTTP/2

### 성능 비교 (프론트엔드 관점)
```javascript
// HTTP/1.1에서의 최적화 (옛날 방식)
// - 도메인 샤딩 (여러 도메인 사용)
// - CSS 스프라이트
// - 파일 번들링 최소화

// HTTP/2에서는 불필요
// - 작은 파일 여러 개가 오히려 유리할 수 있음
// - 동시 요청 제한 없음
```

---

## 1.8 웹의 구성요소

### 1) 프록시 (Proxy)
클라이언트와 서버 사이에 위치한 중개 서버

#### 역할
- 보안: 방화벽 역할
- 캐싱: 자주 요청되는 리소스 저장
- 콘텐츠 필터링: 특정 콘텐츠 차단
- 로드 밸런싱: 요청 분산

```
[브라우저] → [Nginx Proxy] → [백엔드 서버]
              ↑
           캐싱, 로깅,
           보안 검사
```

**Nginx 프록시 설정**
```nginx
server {
    location /api {
        proxy_pass http://backend-api;
        proxy_cache my_cache;
        proxy_cache_valid 200 10m;
        
        # 프록시 헤더 전달
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**프론트엔드 개발 환경에서의 프록시**
```javascript
// Vite 개발 서버 프록시 설정
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
}
```

### 2) 캐시 (Cache)
자주 사용되는 리소스의 복사본을 저장

#### 캐시 계층
```
브라우저 캐시 → CDN 캐시 → 프록시 캐시 → 원본 서버
```

#### 실무 연결
**CloudFront (CDN) 캐싱**
- 정적 자산(이미지, CSS, JS)을 전세계 엣지 로케이션에 캐싱
- Cache-Control 헤더로 캐싱 전략 제어

```javascript
// 프론트엔드에서 캐싱 제어
fetch('/api/static-data', {
  headers: {
    'Cache-Control': 'max-age=3600', // 1시간 캐싱
  }
});

// 캐시 무효화 (버전 관리)
import logo from './logo.png?v=1.2.3';
```

### 3) 게이트웨이 (Gateway)
다른 프로토콜로 변환하는 서버

#### 예시
- HTTP → HTTPS (SSL/TLS 터미네이션)
- HTTP → Database
- HTTP → FTP

**AWS API Gateway**
- REST API를 Lambda 함수로 연결
- HTTP 요청을 다양한 백엔드로 라우팅

### 4) 터널 (Tunnel)
두 연결 사이의 raw 데이터를 전달

#### 예시
- HTTPS (HTTP over SSL)
- WebSocket 연결

### 5) 에이전트 (Agent)
사용자를 위해 HTTP 요청을 만드는 클라이언트

#### 예시
- 웹 브라우저 (Chrome, Firefox, Safari)
- 검색 엔진 크롤러
- 모바일 앱

**프론트엔드에서의 User-Agent**
```javascript
// User-Agent 헤더 확인
console.log(navigator.userAgent);

// 브라우저 감지
const isChrome = /Chrome/.test(navigator.userAgent);
const isSafari = /Safari/.test(navigator.userAgent);
```

---

## 1.9 시작의 끝

HTTP는 단순하면서도 강력한 프로토콜입니다. 이 장에서 배운 기본 개념들은 앞으로 다룰 더 복잡한 주제들의 기초

### 주요 내용 요약
1. HTTP는 클라이언트-서버 모델 기반
2. 리소스는 URL로 식별
3. 트랜잭션은 요청과 응답으로 구성
4. TCP 연결 위에서 동작
5. 다양한 웹 구성요소들이 협력

---

## 토론 주제 (프론트엔드 개발자 관점)

### 1. HTTP 버전 선택과 성능 최적화
**주제**: "우리 서비스에서 HTTP/2로 전환하면 실제로 얼마나 빨라질까?"

**토론 포인트**
- HTTP/1.1에서 사용하던 최적화 기법 (번들링, 스프라이트)이 HTTP/2에서는 오히려 역효과?
- 번들 크기 vs 요청 개수: HTTP/2 시대의 최적 전략은?
- 실제 프로젝트에서 측정한 성능 개선 사례 공유

**실험 아이디어**
```javascript
// HTTP/1.1 vs HTTP/2 성능 비교
// Lighthouse 또는 WebPageTest로 측정
// - 100개의 작은 이미지 로딩 시간
// - 여러 API 동시 호출 시간
```

### 2. 캐싱 전략과 버전 관리
**주제**: "정적 자산은 어떻게 캐싱해야 할까? 업데이트는 어떻게?"

**토론 포인트**
- 파일명 해싱 vs 쿼리 파라미터 버전 관리
- CloudFront 캐시 무효화 비용과 전략
- Service Worker 캐싱과 서버 캐싱의 조합

**실무 사례**
```javascript
// Vite/Webpack의 자동 해싱
// build/assets/main.abc123.js

// Cache-Control 전략
// HTML: no-cache (항상 검증)
// JS/CSS: immutable (영구 캐싱)
```

### 3. 프록시와 CORS 문제 해결
**주제**: "개발 환경의 프록시 설정, 어떻게 하는 게 좋을까?"

**토론 포인트**
- Vite/Vue CLI 프록시 vs Nginx 프록시
- 프로덕션 환경에서 CORS 설정 (Nginx, CloudFront)
- preflight 요청 최소화 방법

**문제 상황**
```javascript
// CORS 에러 해결 과정
// 1. 개발: Vite 프록시로 우회
// 2. 스테이징: Nginx에서 CORS 헤더 추가
// 3. 프로덕션: CloudFront에서 CORS 설정
```

### 4. 상태 코드와 에러 핸들링
**주제**: "프론트엔드에서 HTTP 에러를 어떻게 처리하면 좋을까?"

**토론 포인트**
- 401 vs 403: 리다이렉트 전략의 차이
- 5xx 에러의 재시도 로직 (exponential backoff)
- 네트워크 에러와 HTTP 에러의 구분

**코드 패턴 공유**
```javascript
// 에러 처리 래퍼 함수
async function apiCall(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 401) {
      // 토큰 갱신 시도
      await refreshToken();
      return apiCall(url, options); // 재시도
    }
    
    if (response.status >= 500) {
      // 재시도 로직
      return retryWithBackoff(url, options);
    }
    
    if (!response.ok) {
      throw new HttpError(response.status, await response.json());
    }
    
    return response.json();
  } catch (error) {
    // 네트워크 에러 vs HTTP 에러 구분
    handleError(error);
  }
}
```

### 5. TCP 커넥션과 실제 성능
**주제**: "HTTP Keep-Alive, 실제로 체감되나요?"

**토론 포인트**
- 브라우저의 동시 연결 수 제한 (도메인당 6개)
- API 호스트를 분리하는 것의 장단점
- WebSocket으로 전환하는 기준은?

**측정 방법**
```javascript
// Performance API로 네트워크 타이밍 측정
performance.getEntriesByType('navigation')[0];
// connectStart, connectEnd 값으로 연결 시간 확인
```

### 6. 메시지 헤더 활용
**주제**: "Authorization 헤더 외에 유용한 커스텀 헤더들"

**토론 포인트**
- X-Request-ID로 분산 추적
- X-Client-Version으로 버전 관리
- Accept-Language와 다국어 처리

**실제 활용**
```javascript
// axios 인터셉터로 공통 헤더 추가
axios.interceptors.request.use(config => {
  config.headers['X-Client-Version'] = APP_VERSION;
  config.headers['X-Request-ID'] = generateRequestId();
  config.headers['X-Device-Type'] = detectDevice();
  return config;
});
```

---
