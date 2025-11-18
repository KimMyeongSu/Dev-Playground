# 3장. HTTP 메시지

## 3.1 메시지의 흐름

### 핵심 개념
HTTP 메시지는 클라이언트와 서버 간에 주고받는 데이터 블록입니다. 메시지는 단방향으로 흐르며, 요청은 "다운스트림", 응답은 "업스트림"이라고 표현합니다.

### 메시지 흐름 방향

```
[브라우저]                        [서버]
   │                                │
   │─── 요청 (다운스트림) ──────────→│
   │                                │
   │←── 응답 (업스트림) ─────────────│
   │                                │
```

**다운스트림(Downstream)**: 송신자 → 수신자
**업스트림(Upstream)**: 수신자 → 송신자

### 프록시를 통한 흐름

```
[클라이언트] → [프록시1] → [프록시2] → [서버]
      요청 ─────────────────────────→
                                다운스트림
      
      응답 ←─────────────────────────
                                업스트림
```

모든 메시지는 발신자에서 수신자로 흐릅니다. 프록시를 여러 개 거쳐도 방향성은 동일합니다.

```javascript
// Frontend에서 프록시를 거친 요청도 흐름은 동일
// 개발 환경: localhost:5173 → Vite 프록시 → localhost:3000
// 프로덕션: Browser → CloudFront → ALB → EC2

fetch('/api/users') // 흐름 시작점
  .then(response => response.json())
```

---

## 3.2 메시지의 각 부분

### HTTP 메시지 구조

```
시작줄 (Start Line)
헤더 (Headers)
헤더 (Headers)
헤더 (Headers)
        (빈 줄 - CRLF)
본문 (Body)
```

### 요청 메시지 예시

```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 27
Authorization: Bearer abc123

{"name":"김명수","age":30}
```

구조 분석:
```
POST /api/users HTTP/1.1        ← 시작줄 (메서드, URL, 버전)
Host: api.example.com            ← 헤더
Content-Type: application/json   ← 헤더
Content-Length: 27               ← 헤더
Authorization: Bearer abc123     ← 헤더
                                 ← 빈 줄 (CRLF)
{"name":"김명수","age":30}       ← 본문
```

### 응답 메시지 예시

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 45
Cache-Control: max-age=3600
Set-Cookie: sessionId=xyz789

{"id":123,"name":"김명수","age":30}
```

구조 분석:
```
HTTP/1.1 200 OK                  ← 시작줄 (버전, 상태코드, 사유구절)
Content-Type: application/json   ← 헤더
Content-Length: 45               ← 헤더
Cache-Control: max-age=3600      ← 헤더
Set-Cookie: sessionId=xyz789     ← 헤더
                                 ← 빈 줄 (CRLF)
{"id":123,"name":"김명수","age":30} ← 본문
```

### 시작줄 (Start Line)

#### 요청 시작줄
```
메서드 SP 요청URL SP HTTP버전 CRLF
```

예시:
```
GET /users/123 HTTP/1.1
POST /api/login HTTP/1.1
DELETE /posts/456 HTTP/2
```

#### 응답 시작줄 (상태줄)
```
HTTP버전 SP 상태코드 SP 사유구절 CRLF
```

예시:
```
HTTP/1.1 200 OK
HTTP/1.1 404 Not Found
HTTP/2 500 Internal Server Error
```

### 헤더 (Headers)

이름-값 쌍으로 구성

```
헤더이름: 값1, 값2
```

**특징:**
- 대소문자 구분 안 함 (`Content-Type` = `content-type`)
- 콜론(`:`) 뒤 공백은 무시됨
- 여러 줄로 나눌 수 있음 (접기, folding)

```javascript
// JavaScript에서 헤더 설정
const response = await fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'X-Custom-Header': 'value',
    'Accept': 'application/json, text/plain'
  },
  body: JSON.stringify(data)
});

// 응답 헤더 읽기
console.log(response.headers.get('Content-Type'));
console.log(response.headers.get('Cache-Control'));

// 모든 헤더 순회
response.headers.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

### 본문 (Body)

실제 전송할 데이터

**요청 본문:**
```javascript
// JSON
fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: '김명수' })
});

// FormData (파일 업로드)
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', '문서 제목');
fetch('/api/upload', {
  method: 'POST',
  body: formData
});

// Blob
const blob = new Blob(['Hello World'], { type: 'text/plain' });
fetch('/api/data', {
  method: 'POST',
  body: blob
});

// URLSearchParams (폼 데이터)
const params = new URLSearchParams();
params.append('username', 'user1');
params.append('password', 'pass123');
fetch('/api/login', {
  method: 'POST',
  body: params
});
```

**응답 본문:**
```javascript
// JSON 응답
const data = await response.json();

// 텍스트 응답
const text = await response.text();

// Blob 응답 (파일 다운로드)
const blob = await response.blob();
const url = URL.createObjectURL(blob);

// ArrayBuffer (바이너리 데이터)
const buffer = await response.arrayBuffer();

// ReadableStream (스트리밍)
const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log('청크 수신:', value);
}
```

---

## 3.3 메서드

### HTTP 메서드 분류

#### 안전한(Safe) 메서드
서버의 상태를 변경하지 않는 메서드

- `GET`
- `HEAD`
- `OPTIONS`

#### 멱등성(Idempotent) 메서드
같은 요청을 여러 번 해도 결과가 같은 메서드

- `GET`
- `HEAD`
- `PUT`
- `DELETE`
- `OPTIONS`

**멱등성 이해:**
```javascript
// GET - 멱등성 O
// 몇 번을 조회해도 리소스는 변하지 않음
fetch('/api/users/123')
fetch('/api/users/123')
fetch('/api/users/123')
// 결과: 항상 동일한 사용자 정보

// DELETE - 멱등성 O
// 이미 삭제된 리소스를 다시 삭제해도 결과는 같음 (404)
await fetch('/api/users/123', { method: 'DELETE' })  // 204 No Content
await fetch('/api/users/123', { method: 'DELETE' })  // 404 Not Found
await fetch('/api/users/123', { method: 'DELETE' })  // 404 Not Found
// 최종 상태는 동일: 리소스가 없음

// POST - 멱등성 X
// 매번 새로운 리소스 생성
await fetch('/api/users', { method: 'POST', body: data })  // user 생성
await fetch('/api/users', { method: 'POST', body: data })  // 또 다른 user 생성
// 결과: 서로 다른 두 개의 리소스 생성
```

### 주요 메서드 상세

#### GET
리소스 조회

```javascript
// 기본 GET
const users = await fetch('/api/users')
  .then(res => res.json());

// 쿼리 파라미터와 함께
const params = new URLSearchParams({
  page: 1,
  limit: 20,
  sort: 'name'
});
const users = await fetch(`/api/users?${params}`)
  .then(res => res.json());

// 헤더 포함
const data = await fetch('/api/protected', {
  headers: {
    'Authorization': 'Bearer token123'
  }
}).then(res => res.json());
```

**특징:**
- Body 없음 (있어도 무시됨)
- 캐시 가능
- 브라우저 히스토리에 남음
- URL에 데이터 노출

#### POST
리소스 생성, 데이터 전송

```javascript
// JSON 데이터 전송
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: '김명수',
    email: 'user@example.com'
  })
}).then(res => res.json());

// 파일 업로드
const formData = new FormData();
formData.append('avatar', fileInput.files[0]);
formData.append('username', 'user1');

await fetch('/api/upload', {
  method: 'POST',
  body: formData  // Content-Type 자동 설정 (multipart/form-data)
});

// 폼 데이터
const formData = new URLSearchParams();
formData.append('username', 'user1');
formData.append('password', 'pass123');

await fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: formData
});
```

**특징:**
- Body 포함
- 멱등성 없음
- 캐시 불가 (일반적으로)
- 브라우저 히스토리에 남지 않음

#### PUT
리소스 전체 교체

```javascript
// 전체 업데이트
await fetch('/api/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: '김명수',
    email: 'new@example.com',
    age: 30,
    role: 'admin'
    // 모든 필드를 포함해야 함
  })
});
```

**특징:**
- 리소스 전체를 요청 본문으로 교체
- 멱등성 있음
- 존재하지 않으면 생성할 수도 있음 (서버 구현에 따라)

#### PATCH
리소스 일부 수정

```javascript
// 일부 필드만 업데이트
await fetch('/api/users/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'updated@example.com'
    // 변경할 필드만 포함
  })
});

// JSON Patch 형식 (RFC 6902)
await fetch('/api/users/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json-patch+json'
  },
  body: JSON.stringify([
    { op: 'replace', path: '/email', value: 'new@example.com' },
    { op: 'add', path: '/phone', value: '010-1234-5678' }
  ])
});
```

**PUT vs PATCH:**
```javascript
// PUT - 전체 교체
// 기존: { name: '김명수', email: 'old@example.com', age: 30 }
PUT /api/users/123
{ name: '김명수', email: 'new@example.com' }
// 결과: { name: '김명수', email: 'new@example.com' }
// age 필드 사라짐!

// PATCH - 일부 수정
// 기존: { name: '김명수', email: 'old@example.com', age: 30 }
PATCH /api/users/123
{ email: 'new@example.com' }
// 결과: { name: '김명수', email: 'new@example.com', age: 30 }
// age 필드 유지됨
```

#### DELETE
리소스 삭제

```javascript
// 기본 삭제
await fetch('/api/users/123', {
  method: 'DELETE'
});

// 인증 헤더와 함께
await fetch('/api/posts/456', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer token123'
  }
});

// 본문과 함께 (드물게 사용)
await fetch('/api/users/bulk-delete', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ids: [1, 2, 3, 4, 5]
  })
});
```

**특징:**
- 멱등성 있음
- Body 없는 것이 일반적 (있어도 됨)
- 성공 시 `204 No Content` 또는 `200 OK` 반환

#### HEAD
GET과 동일하지만 본문 없이 헤더만 반환

```javascript
// 파일 크기 확인 (다운로드 전)
const response = await fetch('/api/large-file.zip', {
  method: 'HEAD'
});

const fileSize = response.headers.get('Content-Length');
const contentType = response.headers.get('Content-Type');
const lastModified = response.headers.get('Last-Modified');

console.log(`파일 크기: ${fileSize} bytes`);
console.log(`파일 타입: ${contentType}`);
console.log(`수정일: ${lastModified}`);

// 리소스 존재 여부 확인
const exists = await fetch('/api/users/123', { method: 'HEAD' })
  .then(res => res.ok);

if (exists) {
  // GET으로 실제 데이터 가져오기
  const user = await fetch('/api/users/123').then(res => res.json());
}
```

**사용 사례:**
- 파일 크기 확인
- 리소스 존재 여부 확인
- 캐시 유효성 검사

#### OPTIONS
서버가 지원하는 메서드 확인

```javascript
const response = await fetch('/api/users', {
  method: 'OPTIONS'
});

// 허용된 메서드 확인
const allowedMethods = response.headers.get('Allow');
console.log(allowedMethods);  // 'GET, POST, PUT, DELETE, OPTIONS'

// CORS preflight 요청 (브라우저가 자동 실행)
// 실제 요청 전에 서버가 요청을 허용하는지 확인
```

**CORS Preflight:**
```javascript
// 브라우저가 자동으로 보내는 preflight 요청
OPTIONS /api/users
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
Origin: https://frontend.example.com

// 서버 응답
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://frontend.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400

// 이후 실제 POST 요청 전송
```

#### 확장 메서드

표준에 없지만 자주 사용되는 메서드들

```javascript
// CONNECT - 터널링 (주로 프록시에서 HTTPS 연결 시)
// TRACE - 루프백 테스트 (보안 이슈로 비활성화되는 경우 많음)
// LINK/UNLINK - 리소스 간 관계 설정 (WebDAV)
```

---

## 3.4 상태 코드

### 상태 코드 분류

| 범위 | 카테고리 | 의미 |
|------|---------|------|
| 1xx | Informational | 정보성 응답 (요청 처리 중) |
| 2xx | Success | 성공 |
| 3xx | Redirection | 리다이렉션 |
| 4xx | Client Error | 클라이언트 오류 |
| 5xx | Server Error | 서버 오류 |

### 1xx: 정보성 응답

거의 사용되지 않음

| 코드 | 이름 | 설명 |
|------|------|------|
| 100 | Continue | 계속 진행 (요청의 일부 수신) |
| 101 | Switching Protocols | 프로토콜 전환 (WebSocket 업그레이드) |

```javascript
// 101 Switching Protocols 예시 (WebSocket)
// 브라우저가 자동 처리
const ws = new WebSocket('wss://chat.example.com');
// HTTP 연결을 WebSocket으로 업그레이드
```

### 2xx: 성공

| 코드 | 이름 | 설명 | 사용 시점 |
|------|------|------|----------|
| 200 | OK | 성공 | GET, POST 성공 시 |
| 201 | Created | 생성됨 | POST로 리소스 생성 시 |
| 202 | Accepted | 수락됨 | 비동기 처리 시작 |
| 204 | No Content | 내용 없음 | DELETE 성공, PUT 성공 |

```javascript
// 200 OK - 일반적인 성공
const users = await fetch('/api/users')
  .then(res => {
    if (res.status === 200) {
      return res.json();
    }
  });

// 201 Created - 리소스 생성
const newUser = await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: '김명수' })
})
  .then(res => {
    if (res.status === 201) {
      // Location 헤더에 생성된 리소스 URL 포함
      const location = res.headers.get('Location');
      console.log('생성된 리소스:', location);  // '/api/users/123'
      return res.json();
    }
  });

// 204 No Content - 본문 없음
await fetch('/api/users/123', {
  method: 'DELETE'
})
  .then(res => {
    if (res.status === 204) {
      console.log('삭제 완료');
      // res.json() 호출하면 에러 (본문이 없음)
    }
  });

// 202 Accepted - 비동기 처리
const response = await fetch('/api/reports/generate', {
  method: 'POST'
});

if (response.status === 202) {
  const { jobId } = await response.json();
  
  // 폴링으로 작업 상태 확인
  const checkStatus = async () => {
    const status = await fetch(`/api/jobs/${jobId}`)
      .then(res => res.json());
    
    if (status.completed) {
      console.log('보고서 생성 완료:', status.result);
    } else {
      setTimeout(checkStatus, 1000);  // 1초 후 재확인
    }
  };
  
  checkStatus();
}
```

### 3xx: 리다이렉션

| 코드 | 이름 | 설명 | 영구성 | 메서드 변경 |
|------|------|------|--------|------------|
| 301 | Moved Permanently | 영구 이동 | 영구 | GET으로 변경 가능 |
| 302 | Found | 임시 이동 | 임시 | GET으로 변경 가능 |
| 303 | See Other | 다른 URI 참조 | 임시 | GET으로 변경 |
| 304 | Not Modified | 수정 안됨 (캐시 사용) | - | - |
| 307 | Temporary Redirect | 임시 리다이렉트 | 임시 | 메서드 유지 |
| 308 | Permanent Redirect | 영구 리다이렉트 | 영구 | 메서드 유지 |

```javascript
// 브라우저는 자동으로 리다이렉트 처리
const response = await fetch('/api/old-endpoint');
// 서버가 301 응답 시 자동으로 새 위치로 재요청

// 수동 리다이렉트 처리
const response = await fetch('/api/endpoint', {
  redirect: 'manual'  // 자동 리다이렉트 비활성화
});

if (response.type === 'opaqueredirect') {
  console.log('리다이렉트 감지');
}

// 304 Not Modified - 캐시 활용
const response = await fetch('/api/data', {
  headers: {
    'If-None-Match': 'etag-12345'  // 이전에 받은 ETag
  }
});

if (response.status === 304) {
  console.log('변경 없음, 캐시 사용');
  // 로컬 캐시에서 데이터 가져오기
}
```

**리다이렉트 차이:**
```javascript
// 301 vs 308
// 301: POST → GET으로 변경될 수 있음
POST /api/old-endpoint → 301 → GET /api/new-endpoint (메서드 변경!)

// 308: POST → POST 유지
POST /api/old-endpoint → 308 → POST /api/new-endpoint (메서드 유지)

// 302 vs 307
// 302: POST → GET으로 변경될 수 있음
// 307: POST → POST 유지
```

### 4xx: 클라이언트 오류

| 코드 | 이름 | 설명 | Frontend 처리 |
|------|------|------|--------------|
| 400 | Bad Request | 잘못된 요청 | 입력값 검증 |
| 401 | Unauthorized | 인증 필요 | 로그인 페이지로 |
| 403 | Forbidden | 권한 없음 | 접근 거부 메시지 |
| 404 | Not Found | 찾을 수 없음 | 404 페이지 표시 |
| 405 | Method Not Allowed | 메서드 허용 안됨 | 다른 메서드 사용 |
| 408 | Request Timeout | 요청 시간 초과 | 재시도 |
| 409 | Conflict | 충돌 | 충돌 해결 UI |
| 422 | Unprocessable Entity | 처리 불가 | 상세 에러 표시 |
| 429 | Too Many Requests | 요청 과다 | Rate limit 표시 |

```javascript
// 에러 처리 패턴
async function apiCall(url, options) {
  try {
    const response = await fetch(url, options);
    
    // 400 Bad Request - 입력값 검증 실패
    if (response.status === 400) {
      const error = await response.json();
      // { field: 'email', message: '이메일 형식이 올바르지 않습니다' }
      showValidationError(error);
      return;
    }
    
    // 401 Unauthorized - 인증 필요
    if (response.status === 401) {
      // 토큰 만료 → 재로그인
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    
    // 403 Forbidden - 권한 없음
    if (response.status === 403) {
      showError('이 작업을 수행할 권한이 없습니다');
      return;
    }
    
    // 404 Not Found
    if (response.status === 404) {
      showError('요청한 리소스를 찾을 수 없습니다');
      return;
    }
    
    // 409 Conflict - 리소스 충돌
    if (response.status === 409) {
      const { message } = await response.json();
      // '이미 존재하는 이메일입니다'
      showError(message);
      return;
    }
    
    // 422 Unprocessable Entity - 의미적 오류
    if (response.status === 422) {
      const errors = await response.json();
      // { errors: [{ field: 'age', message: '나이는 0보다 커야 합니다' }] }
      showValidationErrors(errors);
      return;
    }
    
    // 429 Too Many Requests - Rate Limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      showError(`요청이 너무 많습니다. ${retryAfter}초 후 다시 시도해주세요`);
      return;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('API 호출 실패:', error);
    showError('네트워크 오류가 발생했습니다');
  }
}
```

**401 vs 403:**
```javascript
// 401 Unauthorized - "넌 누구야?" (신원 확인 필요)
// 로그인 안함, 토큰 없음, 토큰 만료
fetch('/api/profile')
// → 401 → 로그인 페이지로 리다이렉트

// 403 Forbidden - "너는 안돼" (인증은 됐지만 권한 없음)
// 일반 사용자가 관리자 기능 접근
fetch('/api/admin/users', {
  headers: { 'Authorization': 'Bearer user-token' }
})
// → 403 → 권한 없음 메시지
```

### 5xx: 서버 오류

| 코드 | 이름 | 설명 | Frontend 처리 |
|------|------|------|--------------|
| 500 | Internal Server Error | 서버 내부 오류 | 에러 알림, 재시도 |
| 501 | Not Implemented | 구현 안됨 | 다른 방법 제안 |
| 502 | Bad Gateway | 게이트웨이 오류 | 재시도 |
| 503 | Service Unavailable | 서비스 불가 | 유지보수 안내 |
| 504 | Gateway Timeout | 게이트웨이 시간초과 | 재시도 |

```javascript
// 5xx 에러 처리 - 재시도 로직
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      // 500, 502, 503, 504 - 재시도 가능
      if ([500, 502, 503, 504].includes(response.status)) {
        if (i < maxRetries - 1) {
          // Exponential backoff: 1초, 2초, 4초
          const delay = Math.pow(2, i) * 1000;
          console.log(`${response.status} 에러, ${delay}ms 후 재시도 (${i + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      // 503 Service Unavailable - Retry-After 헤더 확인
      if (response.status === 503) {
        const retryAfter = response.headers.get('Retry-After');
        if (retryAfter) {
          const delay = parseInt(retryAfter) * 1000;
          showError(`서버 점검 중입니다. ${retryAfter}초 후 다시 시도해주세요`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
      
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}

// 사용 예시
try {
  const data = await fetchWithRetry('/api/data', { method: 'GET' });
} catch (error) {
  showError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
}
```

**502 vs 504:**
```
502 Bad Gateway:
[브라우저] → [Nginx] → [Backend: 에러 응답]
                ↑
          여기서 502 반환

504 Gateway Timeout:
[브라우저] → [Nginx] → [Backend: 응답 없음...]
                ↑
          시간 초과로 504 반환
```

---

## 3.5 헤더

### 헤더 분류

#### 1) 일반 헤더 (General Headers)
요청과 응답 모두 사용

```javascript
// Date - 메시지 생성 시각
Date: Tue, 18 Nov 2025 12:00:00 GMT

// Connection - 연결 관리
Connection: keep-alive
Connection: close
```

#### 2) 요청 헤더 (Request Headers)
클라이언트 → 서버

```javascript
fetch('/api/data', {
  headers: {
    // Accept: 클라이언트가 받을 수 있는 타입
    'Accept': 'application/json, text/plain',
    
    // Accept-Language: 선호 언어
    'Accept-Language': 'ko-KR, en-US',
    
    // Accept-Encoding: 압축 방식
    'Accept-Encoding': 'gzip, deflate, br',
    
    // User-Agent: 클라이언트 정보
    'User-Agent': 'Mozilla/5.0 ...',
    
    // Referer: 이전 페이지 URL
    'Referer': 'https://example.com/page',
    
    // Authorization: 인증 정보
    'Authorization': 'Bearer token123',
    
    // Cookie: 쿠키
    'Cookie': 'sessionId=abc123; userId=456',
    
    // Cache-Control: 캐시 지시자
    'Cache-Control': 'no-cache',
    
    // If-None-Match: 조건부 요청 (ETag)
    'If-None-Match': '"abc123"',
    
    // If-Modified-Since: 조건부 요청 (날짜)
    'If-Modified-Since': 'Mon, 17 Nov 2025 12:00:00 GMT'
  }
});
```

#### 3) 응답 헤더 (Response Headers)
서버 → 클라이언트

```javascript
// 응답 헤더 읽기
const response = await fetch('/api/data');

// Age: 캐시 경과 시간 (초)
response.headers.get('Age');  // '3600'

// Server: 서버 소프트웨어
response.headers.get('Server');  // 'nginx/1.21.0'

// Location: 리다이렉트 URL
response.headers.get('Location');  // '/new-url'

// Retry-After: 재시도 대기 시간
response.headers.get('Retry-After');  // '120'

// Set-Cookie: 쿠키 설정
response.headers.get('Set-Cookie');  // 'sessionId=xyz789; Path=/'
```

#### 4) 엔티티 헤더 (Entity Headers)
본문 관련 정보

```javascript
// Content-Type: 본문 타입
'Content-Type': 'application/json; charset=utf-8'
'Content-Type': 'text/html; charset=utf-8'
'Content-Type': 'image/png'
'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary'

// Content-Length: 본문 크기 (bytes)
'Content-Length': '1024'

// Content-Encoding: 압축 방식
'Content-Encoding': 'gzip'

// Content-Language: 컨텐츠 언어
'Content-Language': 'ko-KR'

// Last-Modified: 최종 수정 시각
'Last-Modified': 'Mon, 17 Nov 2025 12:00:00 GMT'

// ETag: 리소스 버전 식별자
'ETag': '"abc123def456"'
```

### 주요 헤더 상세

#### Authorization
인증 정보 전달

```javascript
// Bearer 토큰 (가장 흔함)
fetch('/api/protected', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
  }
});

// Basic 인증 (username:password를 base64 인코딩)
const credentials = btoa('username:password');
fetch('/api/auth', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});

// API Key
fetch('/api/data', {
  headers: {
    'Authorization': 'ApiKey abc123def456'
  }
});
```

**토큰 갱신 패턴:**
```javascript
let accessToken = localStorage.getItem('accessToken');

async function fetchWithAuth(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  // 401 에러 시 토큰 갱신 시도
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    
    // 토큰 갱신
    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
    
    if (refreshResponse.ok) {
      const { accessToken: newToken } = await refreshResponse.json();
      accessToken = newToken;
      localStorage.setItem('accessToken', newToken);
      
      // 원래 요청 재시도
      return fetchWithAuth(url, options);
    } else {
      // 리프레시 토큰도 만료됨 → 로그아웃
      window.location.href = '/login';
    }
  }
  
  return response;
}
```

#### Content-Type
본문 데이터 타입

```javascript
// JSON
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: '김명수' })
});

// Form Data (URL-encoded)
const params = new URLSearchParams();
params.append('username', 'user1');
params.append('password', 'pass123');

fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params
});

// Multipart (파일 업로드)
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', '파일 제목');

fetch('/api/upload', {
  method: 'POST',
  // Content-Type 자동 설정됨 (boundary 포함)
  body: formData
});

// Plain Text
fetch('/api/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: 'Log message'
});
```

#### Cache-Control
캐싱 정책

```javascript
// 요청 시
fetch('/api/data', {
  headers: {
    'Cache-Control': 'no-cache'  // 캐시 검증 필요
  }
});

// 응답 헤더 (서버가 설정)
// Cache-Control: max-age=3600
// → 1시간 동안 캐시 유효

// Cache-Control: no-store
// → 캐시하지 않음

// Cache-Control: public, max-age=31536000, immutable
// → 공개 캐시, 1년, 변경 없음 (정적 자산)
```

**캐싱 전략:**
```javascript
// HTML - 항상 최신 확인
Cache-Control: no-cache

// JavaScript/CSS (해시된 파일명)
Cache-Control: public, max-age=31536000, immutable

// API 응답
Cache-Control: private, max-age=300  // 5분

// 이미지
Cache-Control: public, max-age=86400  // 1일
```

#### ETag & If-None-Match
조건부 요청으로 대역폭 절약

```javascript
// 첫 번째 요청
const response1 = await fetch('/api/data');
const etag = response1.headers.get('ETag');  // "abc123"
const data = await response1.json();

// 로컬에 저장
localStorage.setItem('data', JSON.stringify(data));
localStorage.setItem('etag', etag);

// 이후 요청 (조건부)
const response2 = await fetch('/api/data', {
  headers: {
    'If-None-Match': etag
  }
});

if (response2.status === 304) {
  // 변경 없음 → 로컬 캐시 사용
  const cachedData = JSON.parse(localStorage.getItem('data'));
  console.log('캐시 사용:', cachedData);
} else {
  // 변경됨 → 새 데이터 받음
  const newData = await response2.json();
  const newEtag = response2.headers.get('ETag');
  
  localStorage.setItem('data', JSON.stringify(newData));
  localStorage.setItem('etag', newEtag);
}
```

#### CORS 헤더
교차 출처 리소스 공유

```javascript
// Preflight 요청 (브라우저가 자동 전송)
OPTIONS /api/users
Origin: https://frontend.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 서버 응답
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://frontend.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400  // preflight 캐시 (24시간)
Access-Control-Allow-Credentials: true  // 쿠키 허용

// 실제 요청
POST /api/users
Origin: https://frontend.example.com
Authorization: Bearer token123

// 응답
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://frontend.example.com
Access-Control-Allow-Credentials: true
```

**Frontend에서 CORS:**
```javascript
// 쿠키 포함 요청
fetch('https://api.example.com/data', {
  credentials: 'include'  // 쿠키 전송
});

// CORS 에러 시 확인사항
// 1. 서버에 Access-Control-Allow-Origin 헤더가 있는가?
// 2. credentials: 'include' 사용 시 서버에서 Credentials: true 인가?
// 3. 와일드카드(*) 사용 시 credentials는 불가
```

**Nginx CORS 설정:**
```nginx
server {
    location /api {
        # Preflight 요청 처리
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin 'https://frontend.example.com';
            add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
            add_header Access-Control-Allow-Headers 'Content-Type, Authorization';
            add_header Access-Control-Max-Age 86400;
            return 204;
        }
        
        # 일반 요청
        add_header Access-Control-Allow-Origin 'https://frontend.example.com';
        add_header Access-Control-Allow-Credentials 'true';
        
        proxy_pass http://backend;
    }
}
```

#### Custom Headers
커스텀 헤더는 `X-` 접두사 사용 (관례, 필수 아님)

```javascript
// 요청 추적
fetch('/api/data', {
  headers: {
    'X-Request-ID': crypto.randomUUID(),
    'X-Client-Version': '1.2.3',
    'X-Device-Type': 'mobile'
  }
});

// 응답에서 커스텀 헤더 읽기
const response = await fetch('/api/data');
const requestId = response.headers.get('X-Request-ID');
const rateLimit = response.headers.get('X-RateLimit-Remaining');
```

---

