# 2장. URL과 리소스

## 2.1 인터넷의 리소스 탐색하기

### 핵심 개념
URL(Uniform Resource Locator)은 인터넷에 있는 리소스의 위치를 나타내는 표준 방식입니다. 브라우저가 정보를 찾는 데 필요한 모든 것을 담고 있습니다.

### URL의 역할
```
사용자: "네이버 메인 페이지 보여줘"
       ↓
브라우저: https://www.naver.com 해석
       ↓
1. 프로토콜: https (보안 HTTP 사용)
2. 호스트: www.naver.com (어디로 갈지)
3. 포트: 443 (생략됨, https 기본값)
4. 경로: / (루트)
```

### URI vs URL vs URN

```
URI (Uniform Resource Identifier)
├── URL (Uniform Resource Locator) - 위치로 식별
│   예: https://example.com/users/123
│
└── URN (Uniform Resource Name) - 이름으로 식별
    예: urn:isbn:0-486-27557-4
```

**일상적으로는 URL만 사용**합니다. URN은 거의 쓰이지 않아요.

```javascript
// Frontend에서 사용하는 것들은 모두 URL
const apiUrl = 'https://api.example.com/users';
const imageUrl = 'https://cdn.example.com/logo.png';
const wsUrl = 'wss://chat.example.com/room/1';
```

---

## 2.2 URL 문법

### URL의 구조

```
https://user:pass@www.example.com:8080/path/to/page?key=value#section
└─┬─┘  └───┬───┘ └──────┬──────┘└┬─┘ └────┬────┘ └───┬───┘ └──┬──┘
  │        │            │        │        │          │        │
스킴    사용자정보      호스트    포트     경로      쿼리    프래그먼트
```

### 각 구성요소 상세

#### 1) 스킴 (Scheme/Protocol)
어떤 프로토콜을 사용할지 지정

| 스킴 | 용도 | 기본 포트 | Frontend 사용 예시 |
|------|------|----------|-------------------|
| `http://` | 일반 웹 | 80 | 개발 환경 로컬 API |
| `https://` | 보안 웹 | 443 | 프로덕션 API, 이미지 |
| `ws://` | WebSocket | 80 | 채팅 (개발) |
| `wss://` | 보안 WebSocket | 443 | 채팅 (프로덕션) |
| `ftp://` | 파일 전송 | 21 | (거의 안씀) |
| `file://` | 로컬 파일 | - | 로컬 HTML 열기 |

```javascript
// Vue.js/React에서 환경별 스킴 처리
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.example.com'  // 프로덕션: HTTPS
  : 'http://localhost:3000';    // 개발: HTTP

// WebSocket도 마찬가지
const WS_URL = process.env.NODE_ENV === 'production'
  ? 'wss://chat.example.com'
  : 'ws://localhost:8080';
```

#### 2) 사용자 정보 (User Information)
```
ftp://anonymous:myemail@ftp.example.com/file.zip
      └────────┬────────┘
           사용자:비밀번호
```

**현대 웹에서는 거의 사용하지 않습니다.**
- 보안 취약 (URL에 비밀번호 노출)
- 대신 Authorization 헤더 사용

```javascript
// ❌ 나쁜 방식 (URL에 인증 정보)
fetch('https://user:pass@api.example.com/data')

// ✅ 좋은 방식 (헤더로 전달)
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```

#### 3) 호스트 (Host)
서버의 위치를 나타냄

```javascript
// 도메인 이름
'https://www.example.com'
'https://api.carrotenglish.com'

// IP 주소 (직접 사용 가능하지만 권장하지 않음)
'https://192.168.1.1'
'https://13.124.123.45'

// 로컬 개발
'http://localhost'
'http://127.0.0.1'
```

**AWS와 도메인**
```
사용자 요청: https://www.example.com
       ↓
Route 53 (DNS): "이 도메인은 13.124.123.45야"
       ↓
CloudFront: "내가 캐시 가지고 있어!"
       ↓
ALB: "백엔드 서버들 중 하나로 보낼게"
       ↓
EC2 인스턴스들
```

#### 4) 포트 (Port)
서버의 특정 프로그램을 지정

| 포트 | 용도 | 생략 가능 여부 |
|------|------|---------------|
| 80 | HTTP | ✅ (기본값) |
| 443 | HTTPS | ✅ (기본값) |
| 3000 | Node.js 개발 서버 | ❌ 명시 필요 |
| 8080 | 대체 HTTP | ❌ 명시 필요 |
| 5173 | Vite 개발 서버 | ❌ 명시 필요 |

```javascript
// 포트 생략 (자동으로 443 사용)
fetch('https://api.example.com/users')

// 포트 명시
fetch('http://localhost:3000/users')  // Backend 개발 서버
fetch('http://localhost:5173/')        // Vite Frontend 개발 서버

// Nginx 설정에서 포트 매핑
```

```nginx
# Nginx에서 외부 80포트를 내부 3000포트로 포워딩
server {
    listen 80;
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

#### 5) 경로 (Path)
서버 내에서 리소스의 위치

```javascript
// REST API 경로 패턴
'https://api.example.com/users'           // 사용자 목록
'https://api.example.com/users/123'       // 특정 사용자
'https://api.example.com/users/123/posts' // 사용자의 게시글
'https://api.example.com/posts/456'       // 특정 게시글

// Vue Router 경로와 유사
const routes = [
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserDetail },
  { path: '/users/:id/posts', component: UserPosts }
]
```

**경로 구분자**
- `/` : 계층 구조 구분
- 마지막 `/` : 있어도 되고 없어도 됨 (서버 설정에 따라 다름)

```javascript
// 보통 같은 것으로 취급되지만, 서버 설정에 따라 다를 수 있음
'/users'
'/users/'

// Nginx에서 리다이렉트 설정
```

```nginx
# 마지막 슬래시 자동 추가
server {
    location /users {
        return 301 /users/;
    }
}
```

#### 6) 쿼리 스트링 (Query String)
추가 파라미터 전달

```javascript
// 기본 형식: ?key1=value1&key2=value2

// 검색 기능
'https://api.example.com/search?q=javascript&page=1&limit=20'

// 필터링
'https://api.example.com/products?category=laptop&min_price=1000&max_price=2000'

// 정렬
'https://api.example.com/users?sort=name&order=asc'
```

**Frontend에서 쿼리 스트링 다루기**

```javascript
// 1. URL 직접 작성
fetch('https://api.example.com/users?page=1&limit=10')

// 2. URLSearchParams 사용 (권장)
const params = new URLSearchParams({
  page: 1,
  limit: 10,
  sort: 'name'
});
fetch(`https://api.example.com/users?${params}`)
// 결과: /users?page=1&limit=10&sort=name

// 3. 배열 파라미터
const params = new URLSearchParams();
params.append('tags', 'javascript');
params.append('tags', 'typescript');
params.append('tags', 'vue');
// 결과: ?tags=javascript&tags=typescript&tags=vue

// 4. Vue Router에서 쿼리 파라미터 읽기
// URL: /search?q=vue&page=2
const route = useRoute();
console.log(route.query.q);      // 'vue'
console.log(route.query.page);   // '2'

// 5. React Router에서
const [searchParams] = useSearchParams();
console.log(searchParams.get('q'));     // 'vue'
console.log(searchParams.get('page'));  // '2'
```

**쿼리 파라미터 vs 경로 파라미터**

```javascript
// 경로 파라미터: 리소스 식별
'/users/123'              // 123번 사용자 (필수)
'/posts/456'              // 456번 게시글 (필수)

// 쿼리 파라미터: 옵션, 필터, 정렬
'/users?role=admin'       // admin 역할 사용자 필터링 (선택)
'/posts?sort=date&page=1' // 날짜순 정렬, 1페이지 (선택)
```

#### 7) 프래그먼트 (Fragment/Hash)
페이지 내부 위치 지정

```
https://example.com/docs#section-2
                          └──┬──┘
                          프래그먼트
```

**특징:**
- **서버로 전송되지 않음** (클라이언트에서만 사용)
- 페이지 내 스크롤 위치 이동
- SPA 라우팅에 사용 (Hash 모드)

```javascript
// HTML 앵커 링크
<a href="#introduction">소개로 이동</a>
<h2 id="introduction">소개</h2>

// Vue Router Hash 모드
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...]
})
// URL 형태: https://example.com/#/users
//                              ↑ 프래그먼트

// 프래그먼트 접근
console.log(window.location.hash);  // '#section-2'

// 프로그래밍 방식으로 이동
window.location.hash = '#section-3';
```

**Hash 모드 vs History 모드 (SPA 라우팅)**

```javascript
// Hash 모드
// URL: https://example.com/#/users/123
// 서버는 항상 index.html만 반환
// 장점: 서버 설정 불필요
// 단점: URL이 좀 이상해 보임

// History 모드 (권장)
// URL: https://example.com/users/123
// 서버에서 모든 경로를 index.html로 처리 필요
// 장점: 깔끔한 URL
// 단점: Nginx/CloudFront 설정 필요
```

**Nginx에서 SPA History 모드 설정**
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    
    location / {
        try_files $uri $uri/ /index.html;
        # 모든 경로를 index.html로 fallback
    }
}
```

---

## 2.3 단축 URL

### 상대 URL vs 절대 URL

#### 절대 URL (Absolute URL)
리소스에 접근하는 데 필요한 모든 정보 포함

```javascript
// 절대 URL
'https://api.example.com/users/123'
'https://cdn.example.com/images/logo.png'
```

#### 상대 URL (Relative URL)
기준 URL을 기반으로 해석

```html
<!-- 현재 페이지: https://example.com/products/detail.html -->

<!-- 상대 URL 예시 -->
<a href="list.html">목록</a>
<!-- 결과: https://example.com/products/list.html -->

<img src="../images/logo.png">
<!-- 결과: https://example.com/images/logo.png -->

<link href="/css/style.css">
<!-- 결과: https://example.com/css/style.css -->

<script src="./utils.js">
<!-- 결과: https://example.com/products/utils.js -->
```

### 상대 URL 규칙

| 표기 | 의미 | 예시 | 결과 |
|------|------|------|------|
| `./file` | 현재 디렉토리 | `./api.js` | 같은 폴더 |
| `../file` | 상위 디렉토리 | `../images/logo.png` | 한 단계 위 |
| `/file` | 루트부터 | `/api/users` | 도메인 루트 |
| `file` | 현재 디렉토리 | `style.css` | 같은 폴더 |

```javascript
// Frontend 빌드 도구에서 상대 경로 처리

// Vue.js/Vite
import Logo from './assets/logo.png'  // 상대 경로
import api from '@/services/api'      // @ = src 디렉토리 (절대 경로 별칭)

// Next.js
import Image from 'next/image'
<Image src="/images/hero.jpg" />     // public 폴더 기준

// React
import logo from '../assets/logo.svg'
```

### Base URL 설정

HTML에서 기준 URL 설정

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Base URL 설정 -->
    <base href="https://cdn.example.com/">
</head>
<body>
    <!-- 이제 모든 상대 URL은 cdn.example.com 기준 -->
    <img src="images/logo.png">
    <!-- 실제: https://cdn.example.com/images/logo.png -->
    
    <link href="css/style.css">
    <!-- 실제: https://cdn.example.com/css/style.css -->
</body>
</html>
```

**Vite/Webpack에서 Base Path 설정**

```javascript
// vite.config.js
export default {
  base: '/my-app/',  // 앱이 /my-app/ 경로에 배포됨
}

// 결과
// https://example.com/my-app/
// https://example.com/my-app/assets/logo.png
```

---

## 2.4 안전하지 않은 문자

### URL 인코딩이 필요한 이유

URL은 ASCII 문자만 사용할 수 있습니다. 특수 문자나 한글은 인코딩이 필요합니다.

### 인코딩이 필요한 문자들

#### 1) 예약 문자
URL에서 특별한 의미를 가진 문자

| 문자 | 의미 | 인코딩 | 예시 |
|------|------|--------|------|
| `:` | 포트 구분 | `%3A` | http://example.com |
| `/` | 경로 구분 | `%2F` | /users/123 |
| `?` | 쿼리 시작 | `%3F` | ?page=1 |
| `&` | 파라미터 구분 | `%26` | page=1&limit=10 |
| `=` | 키-값 구분 | `%3D` | key=value |
| `#` | 프래그먼트 | `%23` | #section |
| `%` | 인코딩 표시 | `%25` | %20 |

#### 2) 비 ASCII 문자
한글, 이모지 등

```javascript
// 한글
'안녕하세요' → '%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94'

// 공백
' ' → '%20' 또는 '+'

// 이모지
'😀' → '%F0%9F%98%80'
```

### JavaScript에서 URL 인코딩

```javascript
// 1. encodeURIComponent (가장 많이 사용)
// 거의 모든 특수 문자를 인코딩 (/, ?, & 등 포함)
const keyword = '자바스크립트 & 타입스크립트';
encodeURIComponent(keyword);
// 결과: '%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%26%20%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8'

// API 호출 시 사용
const searchUrl = `https://api.example.com/search?q=${encodeURIComponent(keyword)}`;

// 2. encodeURI (전체 URL 인코딩)
// /, ?, & 같은 URL 구조는 인코딩하지 않음
const url = 'https://example.com/검색?q=자바스크립트';
encodeURI(url);
// 결과: 'https://example.com/%EA%B2%80%EC%83%89?q=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8'

// 3. 디코딩
decodeURIComponent('%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8')
// 결과: '자바스크립트'
```

### 실전 예시

```javascript
// ❌ 잘못된 방식 - 인코딩 안함
const username = '김명수';
fetch(`/api/users?name=${username}`)
// URL: /api/users?name=김명수 (깨질 수 있음)

// ✅ 올바른 방식
fetch(`/api/users?name=${encodeURIComponent(username)}`)
// URL: /api/users?name=%EA%B9%80%EB%AA%85%EC%88%98

// URLSearchParams는 자동으로 인코딩
const params = new URLSearchParams({
  name: '김명수',
  query: 'JavaScript & TypeScript'
});
fetch(`/api/search?${params}`)
// URL: /api/search?name=%EA%B9%80%EB%AA%85%EC%88%98&query=JavaScript+%26+TypeScript

// axios도 자동 인코딩
axios.get('/api/users', {
  params: {
    name: '김명수',
    role: 'admin'
  }
});
```

### 공백 문자 처리

```javascript
// 쿼리 파라미터에서 공백
'hello world'
// encodeURIComponent: 'hello%20world'
// application/x-www-form-urlencoded: 'hello+world'

// URLSearchParams는 + 사용
new URLSearchParams({ q: 'hello world' }).toString()
// 'q=hello+world'

// fetch는 %20 사용
fetch(`/search?q=${encodeURIComponent('hello world')}`)
// /search?q=hello%20world

// 둘 다 서버에서 'hello world'로 올바르게 디코딩됨
```

### Nginx에서 URL 디코딩

```nginx
server {
    location /search {
        # Nginx가 자동으로 URL 디코딩
        # /search?q=%EA%B9%80%EB%AA%85%EC%88%98
        # → Backend로 전달 시 '김명수'로 디코딩됨
        
        proxy_pass http://backend;
    }
}
```

---

## 2.5 스킴의 바다

다양한 URL 스킴들을 살펴봅니다.

### 주요 스킴 목록

| 스킴 | 설명 | 예시 |
|------|------|------|
| `http` | 일반 HTTP |`http://localhost:3000` |
| `https` | 보안 HTTP |`https://api.example.com` |
| `file` | 로컬 파일 |`file:///C:/Users/document.pdf` |
| `ftp` | 파일 전송 |`ftp://files.example.com` |
| `mailto` | 이메일 |`mailto:support@example.com` |
| `tel` | 전화 |`tel:+82-10-1234-5678` |
| `data` | 인라인 데이터 |`data:image/png;base64,...` |
| `ws` | WebSocket |`ws://chat.example.com` |
| `wss` | 보안 WebSocket |`wss://chat.example.com` |
| `blob` | Blob 객체 |`blob:http://example.com/uuid` |

### 1) HTTP / HTTPS

가장 많이 사용하는 스킴

```javascript
// HTTP (개발 환경)
fetch('http://localhost:3000/api/users')

// HTTPS (프로덕션)
fetch('https://api.example.com/users')

// Mixed Content 이슈
// HTTPS 페이지에서 HTTP 리소스 로드 시 브라우저가 차단
// https://example.com 에서
<img src="http://images.example.com/logo.png">  // ❌ 차단됨
<img src="https://images.example.com/logo.png"> // ✅ 정상
```

### 2) file://

로컬 파일 접근

```javascript
// 브라우저에서 직접 열기
'file:///C:/Users/myname/Desktop/index.html'
'file:///home/user/project/index.html'

// ⚠️ 보안 제약
// CORS 정책으로 file:// 프로토콜에서는 fetch가 제한됨
// → 개발 서버 사용 권장 (Vite, webpack-dev-server)
```

### 3) mailto:

이메일 링크

```html
<!-- 기본 이메일 -->
<a href="mailto:support@example.com">문의하기</a>

<!-- 제목과 본문 포함 -->
<a href="mailto:support@example.com?subject=문의사항&body=안녕하세요">문의하기</a>

<!-- 여러 수신자 -->
<a href="mailto:user1@example.com,user2@example.com">이메일 보내기</a>
```

```javascript
// JavaScript로 이메일 열기
const subject = encodeURIComponent('서비스 문의');
const body = encodeURIComponent('안녕하세요. 문의 드립니다.');
window.location.href = `mailto:support@example.com?subject=${subject}&body=${body}`;
```

### 4) tel:

전화 걸기 (모바일에서 유용)

```html
<!-- 전화 링크 -->
<a href="tel:+82-10-1234-5678">전화걸기</a>

<!-- 국제 전화 형식 권장 -->
<a href="tel:+821012345678">+82 10-1234-5678</a>
```

```javascript
// Vue.js 컴포넌트에서
<template>
  <a :href="`tel:${phoneNumber}`">
    {{ formatPhone(phoneNumber) }}
  </a>
</template>

<script setup>
const phoneNumber = '+821012345678';
const formatPhone = (phone) => {
  // 표시용 포맷팅
  return phone.replace(/(\+82)(\d{2})(\d{4})(\d{4})/, '$1-$2-$3-$4');
};
</script>
```

### 5) data:

인라인 데이터 (base64 인코딩)

```javascript
// 이미지를 base64로 인코딩
const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...';

// HTML에서 사용
<img src="data:image/png;base64,iVBORw0KGgo..." alt="logo">

// Canvas에서 이미지를 data URL로 변환
const canvas = document.getElementById('canvas');
const dataUrl = canvas.toDataURL('image/png');
// 결과: 'data:image/png;base64,...'

// 파일을 data URL로 읽기
const file = event.target.files[0];
const reader = new FileReader();
reader.onload = (e) => {
  const dataUrl = e.target.result;
  // data:image/jpeg;base64,...
};
reader.readAsDataURL(file);

// CSS에서 배경 이미지로 사용
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR...');
}
```

**장점:**
- 별도 HTTP 요청 없음
- 작은 이미지/아이콘에 적합

**단점:**
- 파일 크기 약 33% 증가 (base64 인코딩)
- 캐싱 불가능

### 6) WebSocket (ws:// / wss://)

실시간 양방향 통신

```javascript
// 일반 WebSocket (개발)
const ws = new WebSocket('ws://localhost:8080/chat');

// 보안 WebSocket (프로덕션)
const wss = new WebSocket('wss://chat.example.com/room/123');

wss.onopen = () => {
  console.log('연결됨');
  wss.send(JSON.stringify({ type: 'join', user: '김명수' }));
};

wss.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('메시지 수신:', data);
};

wss.onclose = () => {
  console.log('연결 종료');
};

// Socket.io 사용 시 (추상화)
import io from 'socket.io-client';
const socket = io('https://chat.example.com');
```

**Nginx에서 WebSocket 프록시**
```nginx
server {
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 7) blob:

브라우저가 생성한 임시 URL

```javascript
// 파일 다운로드 구현
const data = { name: '김명수', age: 30 };
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
const blobUrl = URL.createObjectURL(blob);
// 결과: 'blob:http://example.com/a1b2c3d4-e5f6-...'

// 다운로드 링크 생성
const link = document.createElement('a');
link.href = blobUrl;
link.download = 'data.json';
link.click();

// 사용 후 메모리 해제 (중요!)
URL.revokeObjectURL(blobUrl);

// 이미지 미리보기
const imageFile = event.target.files[0];
const imageUrl = URL.createObjectURL(imageFile);
document.getElementById('preview').src = imageUrl;
// 이미지 표시 후 해제
img.onload = () => URL.revokeObjectURL(imageUrl);
```

**Canvas를 Blob으로 변환**
```javascript
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  downloadImage.src = url;
});
```

---

## 2.6 미래

### 현대적 URL 처리

#### URL API (권장)
```javascript
// URL 객체 생성
const url = new URL('https://api.example.com/users?page=1&limit=10#section');

// 각 부분 접근
console.log(url.protocol);   // 'https:'
console.log(url.hostname);   // 'api.example.com'
console.log(url.port);       // '' (기본 포트)
console.log(url.pathname);   // '/users'
console.log(url.search);     // '?page=1&limit=10'
console.log(url.hash);       // '#section'

// 쿼리 파라미터 다루기
console.log(url.searchParams.get('page'));   // '1'
url.searchParams.set('page', '2');
url.searchParams.append('sort', 'name');
console.log(url.toString());
// 'https://api.example.com/users?page=2&limit=10&sort=name#section'

// 상대 URL 해석
const baseUrl = 'https://api.example.com/v1/';
const relativeUrl = new URL('users/123', baseUrl);
console.log(relativeUrl.href);
// 'https://api.example.com/v1/users/123'
```

#### URLSearchParams (쿼리 전문)
```javascript
// 생성
const params = new URLSearchParams({
  page: 1,
  limit: 10,
  tags: 'javascript'  // 단일 값
});

// 배열 처리
params.append('tags', 'typescript');
params.append('tags', 'vue');
// 결과: tags=javascript&tags=typescript&tags=vue

// 반복
for (const [key, value] of params) {
  console.log(`${key}: ${value}`);
}

// 변환
params.toString();  // 'page=1&limit=10&tags=javascript&tags=typescript&tags=vue'

// 기존 쿼리 파싱
const params2 = new URLSearchParams('?page=1&limit=10');
console.log(params2.get('page'));  // '1'
```

### SPA 라우팅 URL 패턴

```javascript
// Vue Router
const routes = [
  {
    path: '/users/:id',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/users/:id/posts/:postId',
    name: 'PostDetail',
    component: PostDetail
  }
];

// 라우터 네비게이션
router.push({ name: 'UserDetail', params: { id: 123 } });
// URL: /users/123

router.push({ 
  name: 'UserList',
  query: { page: 1, sort: 'name' }
});
// URL: /users?page=1&sort=name

// React Router
<Route path="/users/:id" element={<UserDetail />} />
<Route path="/posts/:id/comments" element={<Comments />} />

// useParams 훅
const { id } = useParams();  // URL 파라미터 접근
```

### Deep Link (모바일 앱)

```javascript
// 커스텀 URL 스킴
'carrotenglish://lesson/123'
'carrotenglish://profile/settings'

// 웹에서 앱 열기
<a href="carrotenglish://lesson/123">레슨 열기</a>

// JavaScript로 앱 열기
function openApp() {
  const appUrl = 'carrotenglish://lesson/123';
  const webUrl = 'https://carrotenglish.com/lesson/123';
  
  // 앱 열기 시도
  window.location.href = appUrl;
  
  // 앱이 없으면 웹으로 (2초 후)
  setTimeout(() => {
    window.location.href = webUrl;
  }, 2000);
}
```
